const mongoose=require('mongoose');
const User=require('./User');
const Schema=mongoose.Schema;


const PatientSchema = new mongoose.Schema({
 

});

const Patient = User.discriminator('Patient', PatientSchema);
module.exports=Patient;