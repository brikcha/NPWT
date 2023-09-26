const mongoose=require('mongoose');
const {isEmail}=require('validator')  //isEmail mawjouda deja f west validator
const bcrypt=require("bcrypt")
const codePostale =require('./codePostale');
const { Schema } = mongoose;

const userSchema=new mongoose.Schema({
  /*codePostale:[{
    type:Schema.Types.ObjectId,
    ref:"codePostale"
  }],*/
    codePostale:String,
    userName:String,
    firstName:String,
    lastName:String,
    dateOfBirth:Date,
    gender:String,
    //address:String,
    phoneNumber:String,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,  
      maxlength: 10,
      trim: true,
      default:true
    },
    secteur:{
      type:String,
      enum:['publique','privée'],
    },
    etablissement:{
      type:String,
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
    confirmPassword:String,
    code:String,
    phoneNotVerif:String,
    role:{
        type:String,
        //requried:true,
        enum:['doctor','nurse', 'admin'],
        default:'doctor'
    },
    confirmed:{
        type:Boolean,
        defaultValue:true,
    },
    token:{
        type:String,
        default:''
    },
    secret:{
        type:String,
        default:'' 
    },
    image:{
      type:String
    }
},{
    discriminatorKey: 'userType' // set discriminator key to 'userType'
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
  
    if (!user) {
      throw Error("incorrect email");
    }
  
    if (!(user.confirmed )  || !(user.verified)) {
      throw new Error("email not confirmed!");
    }
    
    
  

    
  
    const auth = await bcrypt.compare(password, user.password);
  
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  };



const User = mongoose.model('User', userSchema);
module.exports=User;