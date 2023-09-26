const mongoose = require("mongoose");
const MedicalRecordSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecordPatient',
    },
    examinationDate: { type: Date},
    modeType: {
        type: String,
        enum: ['ContinuousMode', 'IntermittentMode', 'ContinuousInstillationMode', 'IntermittentInstillationMode'],
    },
    modeInputs: {
        ContinuousMode: {
            Pressure: { type: Number },
        },
        IntermittentMode: {
            MinimumPressure: { type: Number },
            MinimumPressureDuration: { type: Number },
            MaximumPressure: { type: Number },
            MaximumPressureDuration: { type: Number },
        },
        ContinuousInstillationMode: {
            Pressure: { type: Number },
            PressureDuration: { type: Number },
            Volume: { type: Number },
            VolumeDuration: { type: Number },
        },
        IntermittentInstillationMode: {
            MinimumPressure: { type: Number },
            MinimumPressureDuration: { type: Number },
            MaximumPressure: { type: Number },
            MaximumPressureDuration: { type: Number },
            Volume: { type: Number },
            VolumeDuration: { type: Number },
        },
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    nurse: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image:{ type: String },
    taillePlaies: { type: String, },
    pansement: {  type: String, enum: ["small", "medium", "large"],},
    commentaire: [{
        created_at : { type: Date, required: true, default: Date.now },
        commentaire_texte : { type: String},
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }],
    referenceMachine: {
        type: String,
    },

});
const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
module.exports = MedicalRecord;

// const mongoose=require("mongoose");

// const  MedicalRecordSchema=new mongoose.Schema({ 
//     patient: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Patient',
//     },
//     examinationDate:{ 
//         type:Date , 
//     },
//     modeType:{
//         type:String, 
//         enum:['Continuous Mode','Intermittent Mode', 'Continuous Instillation Mode','Intermittent Instillation Mode'],
//     }, 
//     modeInputs: {
//         ContinuousMode: {
//           Pressure: { type: Number },
//         },
//         IntermittentMode: {
//           MinimumPressure: { type: Number },
//           MinimumPressureDuration: { type: Number },
//           MaximumPressure: { type: Number },
//           MaximumPressureDuration: { type: Number },
//         },
//         ContinuousInstillationMode: {
//           Pressure: { type: Number },
//           PressureDuration: { type: Number },
//           Volume: { type: Number },
//           VolumeDuration : { type: Number },
//         },
//         IntermittentInstillationMode: {
//           MinimumPressure: { type: Number },
//           MinimumPressureDuration: { type: Number },
//           MaximumPressure: { type: Number },
//           MaximumPressureDuration: { type: Number },
//           Volume: { type: Number },
//           VolumeDuration: { type: Number },
//         },
//     },
//     doctor :{
//         type:String,
//     },
//     nurse :{
//         type:String,
//     },
//     image: [
//         {  type: String, },
//     ],
//     taillePlaies:{
//         type : String,
//     },
//     pansement:{
//         type : String,
//         enum:["small","meduim","large"],
//     },
//     commentaire:[{
//         type:String,
//     }],
//     referenceMachine:[{
//         type:String, 
//     }]
// })

// MedicalRecordSchema.pre('save', function (next) {
//     const consultations = this.consultation;
//     consultations.forEach((consultation) => {
//         if (consultation.modeType === 'Continuous Mode') {
//             if (!consultation.modeInputs.ContinuousMode || consultation.modeInputs.ContinuousMode.Pressure === undefined) {
//                 return next(new Error('Invalid mode inputs'));
//             }
//         }
//         if (consultation.modeType === 'Intermittent Mode') {
//             const inputs = consultation.modeInputs.IntermittentMode;
//             if (!inputs || 
//                 inputs.MinimumPressure === undefined ||    
//                 inputs.MinimumPressureDuration === undefined ||    
//                 inputs.MaximumPressure === undefined || 
//                 inputs.MaximumPressureDuration === undefined) {
//                 return next(new Error('Invalid mode inputs'));
//             }
//         }
//         if (consultation.modeType === 'Continuous Instillation Mode') {
//             const inputs = consultation.modeInputs.ContinuousInstillationMode;
//             if (!inputs || 
//                 inputs.Pressure === undefined ||    
//                 inputs.PressureDuration === undefined ||    
//                 inputs.Volume === undefined || 
//                 inputs.VolumeDuration === undefined) {
//                 return next(new Error('Invalid mode inputs Continuous Instillation Mode'));
//             }
//         }
//         if (consultation.modeType === 'Intermittent Instillation Mode') {
//             const inputs = consultation.modeInputs.IntermittentInstillationMode;
//             if (!inputs || inputs.MinimumPressure === undefined ||    
//                 inputs.MinimumPressureDuration === undefined ||    
//                 inputs.MaximumPressure === undefined || 
//                 inputs.MaximumPressureDuration === undefined || 
//                 inputs.Volume === undefined || 
//                 inputs.VolumeDuration === undefined) {
//                 return next(new Error('Invalid mode inputs Intermittent Instillation Mode',inputs));
//             }
//         }
//     });
//     next();
// });
// const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
// module.exports = MedicalRecord;