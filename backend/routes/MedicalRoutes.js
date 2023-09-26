const express=require('express'); 
const router=express.Router(); 
const medicalController =require('../controllers/medicalController');
const doctorController = require('../controllers/doctorController');
const patientController = require('../controllers/medicalRecordPatientController');

router.delete("/deleteMedical/:id", medicalController.deleteMedical);
router.get("/search/:key", medicalController.search);

router.get('/getAllDoctor', doctorController.getAllDoctor);
router.get('/getAllNurse', doctorController.getAllNurse);
router.get('/getAllPatients', patientController.getAllPatients);


router.get("/getAllMedicalRecords", medicalController.getAllMedicalRecords);    
router.post("/addMedical",medicalController.addMedical);
router.put("/updateMedical/:id", medicalController.updateMedical);
router.get("/paginatedMedicals", medicalController.paginatedMedicals);

router.get("/get1", (req,res)=> {medicalController.getMedicals});

router.get('/getMedicalRecordById/:id', medicalController.getMedicalRecordById); 
router.get('/getMedicalRecordByIdPatient/:patient_id', medicalController.getMedicalRecordByIdPatient); 
router.get('/getNumberConsultationByIdPatient/:patient_id', medicalController.getNumberConsultationByIdPatient); 

router.get('/images/:patient_id', medicalController.getImagesByPatientId);
router.put('/newCommentaire/:id', medicalController.newCommentaire);

module.exports = router;

