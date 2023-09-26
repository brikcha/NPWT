const mongoose=require("mongoose");
const  MachineMaintenanceSchema=new mongoose.Schema({ 
    reference:{
        type:String,
        required:[true,'Le champs reference machine est obligatoire'],
    }, 
    disponibilite:{
        type:String, 
        enum:['disponible','non disponible'],
        required:[true,'Le champs disponibilite machine est obligatoire'],
    }, 
    etat:{
        type:String, 
        enum:['activee','endommagée'],
        required:[true,'Le champs etat machine est obligatoire'],
    }, 
    patientAffecte:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecordPatient',
    },
    dateDebut:{ 
        type:Date, 
    },
    dateFin:{ 
        type:Date, 
    },
    dateFinEtendu:{ 
        type:Date, 
    },
})
const MachineMaintenance = mongoose.model('MachineMaintenance', MachineMaintenanceSchema);
module.exports = MachineMaintenance;