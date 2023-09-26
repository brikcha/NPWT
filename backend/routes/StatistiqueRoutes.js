const express=require('express'); 
const router=express.Router(); 
const StatistiqueController =require('../controllers/StatistiqueController');

router.get("/countUsers", StatistiqueController.countUsers);
router.get("/countMachine", StatistiqueController.countMachine);
router.get("/countDashboard", StatistiqueController.countDashboard);
router.get("/countConsultation", StatistiqueController.countConsultation);

router.get("/listeMachineDisponible", StatistiqueController.listeMachineDisponible);
router.get("/getLastConsultations", StatistiqueController.getLastConsultations);
router.get("/weekPatientNumber", StatistiqueController.weekPatientNumber);
router.get("/getTotalConsultationsByModeType", StatistiqueController.getTotalConsultationsByModeType);
module.exports = router;