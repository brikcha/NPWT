const express=require('express'); 
const router=express.Router(); 
const patientControlleur =require('../controllers/patientController');
router.get("/getUserById/:idUser",patientControlleur.getUserById);

router.put("/updatePatient/:userId",patientControlleur.updatePatient);
router.put("/updatePasswordPatient/:userId",patientControlleur.updateUserPassword);

module.exports = router;