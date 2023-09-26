const mongoose=require("mongoose");
const  MedicalRecordPatientSchema=new mongoose.Schema({ 
    firstName:{
        type:String,
        required:[true,'Please enter the firstname'],
    },
    lastName:{
        type:String,
        required:[true,'Please enter the lastname'],
    },
    gender:{
        type:String, 
        enum:['Masculin','Feminin'],
    }, 
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    governorate:{ 
        type:String, 
        enum:[ "", "Ariana",  "Beja",  "Ben Arous",  "Bizerte",  "Gabes",  "Gafsa",  "Jendouba",  "Kairouan",  "Kasserine",  "Kebili",  "Kef",  "Mahdia",  "Manouba",  "Médenine",  "Monastir",  "Nabeul",  "Sfax",  "Sidi Bouzid",  "Siliana",  "Sousse",  "Tataouine",  "Tozeur",  "Zaghouan", "Tunis"]
    },
    phoneNumber:{ 
        type:String, 
    },
    firstExaminationDate:{ 
        type:Date, 
    },
    dateOfBirth:{ 
        type:Date, 
    },
    medicalConditions:{ 
        type:String,
    },
    archived: {
        type: Boolean,
        default: false 
    },
    accesUser:[
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,                    
                ref: 'User',
            },
        } ,
    ],

})
const MedicalRecordPatient = mongoose.model('MedicalRecordPatient', MedicalRecordPatientSchema);
module.exports = MedicalRecordPatient;