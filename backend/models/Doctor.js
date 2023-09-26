const mongoose=require('mongoose');
const User=require('./User');
const Schema=mongoose.Schema;


const DoctorSchema = new mongoose.Schema({
 
  });

  const Doctor = User.discriminator('Doctor', DoctorSchema);

  module.exports=Doctor;