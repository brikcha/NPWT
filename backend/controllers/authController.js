const { response } = require("express");
const User = require("../models/User");

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const bcryptjs = require('bcryptjs');
const speakeasy = require('speakeasy');

require('dotenv').config();
const bcrypt = require('bcrypt');


//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', confirmed: '', validated: '',blocked: '',archived: ''};

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Cet email n'est pas enregistré";
  }

  // incorrect password
  else if (err.message === "incorrect password") {
    errors.password = "Ce mot de passe est incorrect";
  }

  // email not verified
  else if (err.message === "Sorry doctor ur not validated yet!") {
    errors.validated = "Sorry doctor ur not validated yet!";
  }
 

  // doctor not validated
  else if (err.message === "email not confirmed!") {
    errors.confirmed = "email not confirmed!";
  }

  // duplicate email error code
  else if (err.code === 11000) {
    errors.email = "that email is already registred";
    return errors;
  }

  // validation errors
  else if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // filter out empty strings
  return Object.fromEntries(
    Object.entries(errors).filter(([key, value]) => value !== '')
  );
};

const handleErrorsAdmin = (err) => {
  console.log(err.message, err.code);
  let errors = { ErrorEmail: '', ErrorPassword: '' };

  // incorrect email
  if (err.message === "incorrect admin email" && "incorrect superAdmin email") {
    errors.ErrorEmail = "Cet email n'est pas enregistré";
  }

  // incorrect password
  else if (err.message === "incorrect admin password" && "incorrect superAdmin password") {
    errors.ErrorPassword = "Ce mot de passe est incorrect";
  }
  // filter out empty strings
  return Object.fromEntries(
    Object.entries(errors).filter(([key, value]) => value !== '')
  );
};

// create json web token
const maxAge = 15 * 60  //15 minutes with seconds

//function createToken the encoded data here is the id
const createToken = (id, role) => {
  return jwt.sign({ id, role }, 'User information secret', {    //secret key that is used to sign the jwt (should not share)
    expiresIn: maxAge
  })
}

const login_post = async (req, res) => {
  const { email, password, secret } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.role, user.secret)
    //login trajaa user
    if (user.secret) {
      if (!secret) {
        await sendSecretByEmail(email, user.secret);

        return res.status(200).json({ message: 'A new 2FA secret has been sent to your email', token });
      } else if (secret != user.secret) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Two Factor Auth Code!",
        });
      }
    }
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id, role: user.role, token });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

const createTokenAdmin = (id, role) => {
  return jwt.sign({ id, role }, 'Admin information secret', {    //secret key that is used to sign the jwt (should not share)
    expiresIn: maxAge
  })
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  },
});

const sendSecretByEmail = async (email, secret) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Your 2FA Secret',
      text: `Your 2FA secret is ${secret}`,
    });
    console.log(`2FA secret sent to ${email}`);
  } catch (error) {
    console.error(`Error sending 2FA secret to ${email}:`, error);
  }
};

const logout_get = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ user: "Disconnected" });
}

const sendRestPasswordMail = async (user, token,url) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      }
    });
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: 'Réinitialisez votre mot de passe',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 1.5; text-align: center; background-image: url('https://wallpapercave.com/wp/wp8002975.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center; padding: 50px;">
          <h2 style="margin-top: 50px; margin-bottom: 10px; color: navy; font-size: 28px;">
            Réinitialisation du mot de passe
          </h2>
          <h3 style=" color: navy; font-size: 26px;">Bienvenue ${user.firstName} ${user.lastName}</h3>
          <p style="margin-bottom: 30px; color: navy; font-size: 20px;">Pour réinitialiser votre mot de passe, veuillez cliquer sur le bouton ci-dessous :</p>
          <div style="text-align: center; width: 100%;">
            <a href="${url}/reinitialisation-mot-de-passe/${token}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 20px; font-weight: bold; cursor: pointer; margin-bottom: 50px;">
              Changer le mot de passe
            </a>
          </div>
        </div>
      `
    };
               
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:- ", info.response);
      }
    })
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

const forget_password = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await User.updateOne({ email: email }, { $set: { token: randomString } });
      if(userData.role==="admin"){
        sendRestPasswordMail(userData, randomString,process.env.REACT_APP_SUPER_URL);
      }else{
        sendRestPasswordMail(userData, randomString,process.env.REACT_APP_CLIENT_URL);
      }
      res.status(200).send({ success: true, msg: "Please check your inbox of mail and reset your password." });
    } else {
      res.status(400).send({ success: true, msg: "this email does not exists" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message })
  }
}

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    throw new Error(error.message); // throw the error instead of sending a response
  }
}

const reset_password = async (req, res) => {
  const saltRounds = 10;
  try {
    const token = req.params.token;
    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      const password = req.body.password;
      const hashedPassword = tokenData.password; // Get the hashed password from the tokenData object

      const passwordMatches = await bcrypt.compare(password, hashedPassword); // Compare the entered password with the hashed password

      if (passwordMatches) {
        res.status(400).json({ success: false, msg: "New password must be different from old password." });
      } else {
        const newPassword = await bcrypt.hash(password, saltRounds); // Hash the new password

        const userData = await User.findByIdAndUpdate(
          { _id: tokenData._id },
          { $set: { password: newPassword, token: '' } },
          { new: true }
        );
        res.status(200).json({ success: true, msg: "User password has been reset" });
      }
    } else {
      res.status(200).json({ success: true, msg: "This link has expired." });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
}




module.exports = {
  login_post,
  logout_get,
  forget_password,
  reset_password,
  
}


