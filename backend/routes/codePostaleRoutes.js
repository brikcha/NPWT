const express = require('express');
const router = express.Router();
const locations = require("../public/data/locations.json");
const path = require('path');

const getPostalCodes = async (req, res) => {
  try {
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.get(`${process.env.REACT_APP_SUPER_URL}/postal-codes`, (req, res)=>{
    const filePath = path.join(__dirname, '../public/data/postal-codes.json');
  res.sendFile(filePath)
});

module.exports = router;
