const express=require('express'); 
const router=express.Router(); 
const MedicalRecordPatientController =require('../controllers/medicalRecordPatientController');

router.post("/addMedicalRecordPatient",MedicalRecordPatientController.addMedicalRecordPatient);
router.get("/paginatedPatient", MedicalRecordPatientController.paginatedPatient);
router.get("/getMedicalRecordPatientsByExaminationDate",MedicalRecordPatientController.getMedicalRecordPatientsByExaminationDate);
router.put("/updateMedicalRecordPatient/:patientId",MedicalRecordPatientController.updateMedicalRecordPatient);
router.delete("/deleteMedicalRecordPatient/:patientId",MedicalRecordPatientController.deleteMedicalRecordPatient);
router.get("/getMedicalRecordPatientDetails/:patientId",MedicalRecordPatientController.getMedicalRecordPatientDetails);
router.put("/archiveMedicalRecordPatient/:patientId/archive",MedicalRecordPatientController.archiveMedicalRecordPatient);
router.put("/unArchiveMedicalRecordPatient/:patientId/unarchive",MedicalRecordPatientController.unArchiveMedicalRecordPatient);
router.get("/getAllMedicalRecordPatient", MedicalRecordPatientController.getAllMedicalRecordPatient);
module.exports = router;







