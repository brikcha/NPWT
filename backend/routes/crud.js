const express=require('express'); 
const router=express.Router(); 
const crudController =require('../controllers/Crud');

router.post("/addUser",crudController.addUser);
router.get("/unverifyUser/:userId",crudController.unverifyUser);
router.get("/verifyUser/:userId", crudController.verifyUser);
router.delete("/deleteUser/:id", crudController.deleteUser);
router.get("/listUser", crudController.listUser);    
router.put("/updateUser/:id", crudController.updateUser);
router.get("/paginatedUsers", crudController.paginatedUsers);
router.get("/search/:key", crudController.search);
router.put("/update/:id",crudController.update);

router.get("/get1", (req,res)=> {crudController.getUsers});
router.get("/get/:id",crudController.getDetails);

module.exports = router;