const mongoose = require("mongoose");

const path = require('path');
const user = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');


const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const multer = require('multer');
require('dotenv');
const upload = multer({ dest: 'uploads/userProfile' }); 
require('dotenv').config();
const nodemailer = require('nodemailer');
const _ = require('lodash');
const speakeasy = require('speakeasy');

const imagePath = 'C:/Users/FELFEL/OneDrive/Bureau/fi/npwt-2/Back-app/backend/uploads/11111.jpg';
const imageSrc = `cid:image`;




const secretKey = 'mysecretkey';
const EMAIL_SECRET = 'mysecretemail';


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});





exports.getUserById = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const userSearched = await user.findById(idUser);
        res.json(userSearched);
    } catch (err) {
        res.status(500).json(err.message);
    }
}




exports.updatePatient = async (req, res) => {
    try {
        const patientId = req.params.userId;
        const patientBefore = await user.findById(patientId);
        const emailBefore = patientBefore.email;
        const emailAfter = req.body.email;
        console.log(patientId);
        const userFound = await user.find({ email: emailAfter, _id: { $ne: patientId } });
        if (userFound.length > 0) {
            console.log("email used");
            return res.status(400).json({ message: 'Email already in use' });
        } else {
            const emailTemplate = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    position: relative;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: white;
                    opacity: 0.9;
                    background-image: url("cid:image");
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                h1 {
                    color: #333333;
                }
                p {
                    color: #666666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Email Change Notification</h1>
                <p>Your email has been changed from <strong>${emailBefore}</strong> to <strong>${emailAfter}</strong>.</p>
                <p>Please review this change and contact us if you did not initiate it.</p>
            </div>
        </body>
    </html>
`;

if (emailBefore !== emailAfter) {
    transporter.sendMail({
        to: emailBefore,
        subject: 'Email Change Notification',
        html: emailTemplate,
        attachments: [{
            filename: '11111.jpg',
            path: imagePath,
            cid: 'image'
        }]
    }, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}
        
        
        
        
        
        
        
        

            const updatePatient = await user.findByIdAndUpdate(patientId, req.body);
            res.json(updatePatient);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const oldPassword = req.body.oldPassword;
        const userId = req.params.userId;
        const newPassword = req.body.newPassword;
        const confirmNewPassword = req.body.confirmNewPassword;
        const updatedUser = await user.findById(userId);
        console.log(updatedUser);
        bcrypt.compare(oldPassword, updatedUser.password).then((match) => {
            if (!match) {
                res.status(400).json({ error: "Wrong password !" })
            } else {
                if (newPassword == confirmNewPassword) {
                    bcrypt.hash(newPassword, 10).then((hashedNewPassword) => {
                        updatedUser.password = hashedNewPassword;
                        res.json("password updated ! ")
                        updatedUser.save();
                    })
                } else {
                    res.status(400).json({ error: "wrong confirm password" })
                }
            }
        })

    } catch (err) {
        res.status(500).json(err.message);
    }
}



