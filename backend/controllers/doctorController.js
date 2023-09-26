const mongoose = require("mongoose");
//const medicalRecord = require('../models/MedicalRecord');
const path = require('path');
const user = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const nodemailer = require('nodemailer');



const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");


exports.updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.userId;
        const updateDoctor = await user.findByIdAndUpdate(doctorId, req.body);
        res.json(updateDoctor);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


exports.updateUserPassword = async (req, res) => {
    try {
        const oldPassword = req.body.oldPassword;
        const userId = req.params.userId;
        const newPassword = req.body.newPassword;
        const confirmNewPassword = req.body.confirmNewPassword;
        const updatedUser = await user.findById(userId);
        bcrypt.compare(oldPassword, updatedUser.password).then((match) => {
            if (!match) {
                res.status(400).json({ error: "Wrong password !" })
            } else {
                if (newPassword == confirmNewPassword) {
                    bcrypt.hash(newPassword, 10).then((hashedNewPassword) => {
                        updatedUser.password = hashedNewPassword;
                        res.json("password updated ! ")
                        updatedUser.save();
                    })
                } else {
                    res.status(400).json({ error: "wrong confirm password" })
                }
            }
        })

    } catch (err) {
        res.status(500).json(err.message);
    }
}
exports.getAllDoctor = async (req, res) => {
    try {
      const users = await user.find({ role:"doctor"});
      const doctors = users.map(doctor => ({ id: doctor._id, image:doctor.image, name: doctor.firstName + " " + doctor.lastName+" ("+doctor.userName+")" }));
      res.status(200).json({ doctors });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  exports.getAllNurse= async (req, res) => {
    try {
      const users = await user.find({ role:"nurse"});
      const nurses = users.map(nurse => ({ id: nurse._id, name: nurse.firstName + " " + nurse.lastName }));
      res.status(200).json({ nurses });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };








  
  
  