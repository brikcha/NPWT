const express = require('express');
var router = express.Router();
const { signUpFunction } = require('../controllers/signUpController');


const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');



const maxAge= 3 * 24 * 60 * 60 




const EMAIL_SECRET = 'mysecretemail';


router.post('/', signUpFunction);

// Endpoint for email verification
router.get('/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
      // Update the confirmed flag for the patient
      const nurse = await Patient.findByIdAndUpdate(id, {
        $set: { confirmed: true },
      }, { new: true });
      if(nurse){
        
        // Associate medical record with patient
      await Patient.findByIdAndUpdate(id, {
        $set: { confirmed: true },
      }, { new: true });
      };
      if (!nurse) {
        const doctor = await Doctor.findByIdAndUpdate(id, {
          $set: { confirmed: true },
        }, { new: true })
        if (!doctor) {
          return res.json('doctor not found !');
        }
      }
      // Redirect to home page
      res.redirect(`${process.env.REACT_APP_CLIENT_URL}/signIn`)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  });

  /*router.get('/api/locations', (req, res) => {
    res.json(locations);
  });*/


module.exports = router