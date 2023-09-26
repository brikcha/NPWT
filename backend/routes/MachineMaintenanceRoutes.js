const express=require('express'); 
const router=express.Router(); 
const MachineMaintenanceController =require('../controllers/MachineMaintenanceController');

router.post("/addMachine",MachineMaintenanceController.addMachine);
router.get("/getAllMachine", MachineMaintenanceController.getAllMachine); 
router.get("/paginatedFilteredMachine", MachineMaintenanceController.getPaginatedFilteredMachine);
router.get("/getMachineDetails/:machineId",MachineMaintenanceController.getMachineDetails);
router.put("/updateMachine/:machineId",MachineMaintenanceController.updateMachine);
router.delete("/deleteMachine/:machineId",MachineMaintenanceController.deleteMachine);

module.exports = router;