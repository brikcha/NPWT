const User = require("../models/User");
const MachineMaintenance = require('../models/MachineMaintenance'); 
const Consultation = require('../models/MedicalRecord'); 
const Patient = require('../models/MedicalRecordPatient'); 
var moment = require('moment');
const MedicalRecord = require("../models/MedicalRecord");
 
require('dotenv').config();

exports.countUsers = async (req, res) => {
  try {
      const userCount = await User.countDocuments(); 
      const nurseCount = await User.countDocuments({role:"nurse"}); 
      const doctorCount = await User.countDocuments({role:"doctor"}); 
      const adminCount = await User.countDocuments({role:"admin"}); 
      const verifiedCount = await User.countDocuments({verified:true}); 
      res.status(200).json({
          "nombre totale responsables":userCount, 
          "nombre totale d'infirmières":nurseCount, 
          "nombre totale de médecins":doctorCount, 
          "nombre totale d'administrateurs":adminCount, 
          "nombre totale comptes vérifiés":verifiedCount
      }
  );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.countConsultation = async (req, res) => {
  try {
      const consultationCount = await MedicalRecord.countDocuments(); 
      const modeContinu = await MedicalRecord.countDocuments({modeType:"ContinuousMode"}); 
      const modeIntermittentMode = await MedicalRecord.countDocuments({modeType:"IntermittentMode"}); 
      const modeContinuousInstillation = await MedicalRecord.countDocuments({modeType:"ContinuousInstillationMode"}); 
      const modeIntermittentInstillation = await MedicalRecord.countDocuments({modeType:"IntermittentInstillationMode"}); 

      res.status(200).json({
          "Nombre consultations":consultationCount, 
          "Consultations en mode Continu":modeContinu, 
          "Consultations en mode intermittent":modeIntermittentMode, 
          "Consultations en mode instillation continu":modeContinuousInstillation, 
          "Consultations en mode Intermittent instillation":modeIntermittentInstillation
      }
  );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.countMachine = async (req, res) => {
  try {
    const machineCount = await MachineMaintenance.countDocuments(); 
    const machineDisponibleCount = await MachineMaintenance.countDocuments({disponibilite:"disponible"}); 
    const machineNonDisponibleCount = await MachineMaintenance.countDocuments({disponibilite:"non disponible"});  
    const machineEtatMaintenanceCount = await MachineMaintenance.countDocuments({etat:"activee"}); 
    const machineEtatEndommageeCount = await MachineMaintenance.countDocuments({etat:"endommagée"}); 

      res.status(200).json({
        "nombre totale de machines":machineCount,
        "Machines disponibles":machineDisponibleCount,
        "Machines non disponibles":machineNonDisponibleCount,
        "Machines activées":machineEtatMaintenanceCount,
        "Machines endommagées":machineEtatEndommageeCount,
      
      }
  );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.countDashboard = async (req, res) => {
  try {
      const userCount = await User.countDocuments(); 
      const machineCount = await MachineMaintenance.countDocuments(); 
      const ConsultationCount = await Consultation.countDocuments();       
      const PatientCount = await Patient.countDocuments(); 

      res.status(200).json({
          "nombre totale de responsables":userCount, 
          "nombre totale de patients":PatientCount,
          "Nombre totale de consultations":ConsultationCount,
          "nombre totale de machines":machineCount,        
      }
  );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.listeMachineDisponible= async (req, res)=>{
  try {
    const machineDiponible = await MachineMaintenance.find({disponibilite:"disponible", etat:"activee"});
    res.status(200).json(machineDiponible);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
}
exports.getLastConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .sort({ examinationDate: -1 }) 
      .limit(5);

    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.weekPatientNumber = async (req, res) => {
  try {
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();
    
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(moment(startOfWeek).add(i, 'days').toDate());
    }

    const result = await Patient.aggregate([
      {
        $match: {
          firstExaminationDate: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$firstExaminationDate" } },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    const resultMap = new Map(result.map((entry) => [entry._id.date, entry.count]));
    const modifiedResult = daysOfWeek.map((date) => ({
      date: moment(date).format('dd/MM'), 
      count: resultMap.get(moment(date).format('YYYY-MM-DD')) || 0,
    }));

    res.status(200).json(modifiedResult);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTotalConsultationsByModeType = async (req, res) => {
  try {
    const consultationCounts = await MedicalRecord.aggregate([
      {
        $group: {
          _id: '$modeType',
          count: { $sum: 1 }
        }
      }
    ]).exec();

    res.status(200).json(consultationCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};