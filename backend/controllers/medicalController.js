const User = require("../models/User");
const MedicalModel = require("../models/MedicalRecord");
const PatientModel = require("../models/MedicalRecordPatient");
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
      cb(null, true);
  } else {
      cb(new Error('Only image files are allowed!'), false);
  }
};
require('dotenv').config();
const storage2 = multer.diskStorage({
  destination: 'uploads/MedicalRecord',
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload2 = multer({ storage: storage2, fileFilter: fileFilter });
  // get liste of all consultation
  exports.getAllMedicalRecords = async (req, res) => {
    try {
      const medicalRecords = await MedicalModel.find();
      const newMedical = await Promise.all(medicalRecords.map(async medical => {
        const doctor = await User.findById(medical.doctor);
        const nurse = await User.findById(medical.nurse); 
        return { ...medical.toObject(), doctor, nurse };
      }));
      res.status(200).json(newMedical);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  // add consultation 
  exports.addMedical = [upload2.single('image'), async (req, res) => {
    try {
      const medicalRecordData = { ...req.body };
      if (req.file) {
        medicalRecordData.image = req.file.filename;
    }
    if (typeof medicalRecordData.commentaire === 'string') {
      medicalRecordData.commentaire = JSON.parse(medicalRecordData.commentaire);
    }
      const medicalRecord = new MedicalModel(medicalRecordData);
      await medicalRecord.save();
      res.status(200).json(medicalRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }];
  // update consultation by id 
  exports.updateMedical =async (req, res)=>{
    try{
        myid=req.params.id;
        newData= { ...req.body };
        updatedMedical= await MedicalModel.findByIdAndUpdate({_id:myid}, newData)
        if (!updatedMedical){
          return res.status(404).json({ message: 'Medical not found' });
        }
        res.status(200).send(updatedMedical);
    }catch(error){
        res.status(400).send(error.message);
    }
  };   
  // delete consultation by id
  exports.deleteMedical= async (req, res) => {
    try {
      const medical= await MedicalModel.findByIdAndDelete(req.params.id);
      if (!medical) return res.status(404).json({ message: 'Medicalnot record not found' });
      res.status(200).json({ message: 'Medical record deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  // get  one consultation by id
  exports.getMedicalRecordById = async (req, res) => {
    try {
      const id = req.params.id.trim();
      const medicalRecord = await MedicalModel.findById(id);
  
      if (!medicalRecord) {
        return res.status(404).json({ message: "Medical record not found" });
      }
  
      const fetchUserData = async (comment) => {
        try {
          const user = await User.findById(comment.user_id);
          return {
            commentaire_texte: comment.commentaire_texte,
            created_at: comment.created_at,
            name: user.firstName + " " + user.lastName,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error('Error fetching user data:', error);
          return null;
        }
      };
  
      const populatedComments = await Promise.all(medicalRecord.commentaire.map(fetchUserData));
      const doctor = await User.findById(medicalRecord.doctor);
      const nurse = await User.findById(medicalRecord.nurse);
      const patient = await PatientModel.findById(medicalRecord.patient_id);
  
      const populatedMedicalRecord = {
        ...medicalRecord.toObject(),
        patient,
        doctor,
        nurse,
        commentaire: populatedComments.filter(comment => comment !== null),
      };
  
      res.status(200).json(populatedMedicalRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // get list of consultation by patientId
  exports.getMedicalRecordByIdPatient = async (req, res) => {
    try {
          const patient_id = req.params.patient_id; 
          const medicalRecord = await MedicalModel.find({ patient_id });
          if (!medicalRecord || medicalRecord.length === 0) { 
            return res.status(404).json({ message: "Medical record not found" });
          }
          const fetchUserData = async (comment) => {
            try {
              const user = await User.findById(comment.user_id);
              return {
                commentaire_texte: comment.commentaire_texte,
                created_at: comment.created_at,
                name: user.firstName+" "+ user.lastName,
                role: user.role,
                image: user.image 
              };
            } catch (error) {
              console.error('Error fetching user data:', error);
              return null;
            }
          };
            const populatedMedicalRecords = await Promise.all(medicalRecord.map(async (record) => {
            const populatedComments = await Promise.all(record.commentaire.map(fetchUserData));
            const doctor = await User.findById(record.doctor);
            const nurse = await User.findById(record.nurse); 
            return {
              ...record.toObject(), doctor, nurse ,
              commentaire: populatedComments.filter(comment => comment !== null)
            };
          }));
        
          res.status(200).json(populatedMedicalRecords);
        } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  // Nombre consulation par patientId
  exports.getNumberConsultationByIdPatient = async (req, res) => {
    try {
      const patient_id = req.params.patient_id; 
      const medicalRecord = await MedicalModel.find({ patient_id });
      if (!medicalRecord) { 
        return res.status(404).json({ message: "Medical record not found" });
      }
      res.status(200).json({"number_consultation":medicalRecord.length});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  // get list of all image consultation sort by examinationDate
  exports.getImagesByPatientId = async (req, res) => {
    try {
      const patient_id = req.params.patient_id;
      const medicalRecords = await MedicalModel.find({ patient_id });

      if (!medicalRecords || medicalRecords.length === 0) {
        return res.status(404).json({ message: "No medical records found for the given patient_id" });
      }

      const imageValues = medicalRecords.map(record=> ({
        "image": record.image,
        "examinationDate": record.examinationDate,
      }));

      // Sort the imageValues array based on examinationDate
      imageValues.sort((a, b) => new Date(a.examinationDate) - new Date(b.examinationDate));

      res.status(200).json(imageValues);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  //add newCommentaire to consultation 
  exports.newCommentaire = async (req, res) => {
    try {
      const myid = req.params.id;
      const newCommentaire = req.body.commentaire; 
      const updatedMedical = await MedicalModel.findByIdAndUpdate(
        { _id: myid },
        { $push: { commentaire: newCommentaire } },
        { new: true } 
      );
      if (!updatedMedical) {
        return res.status(404).json({ message: 'Medical not found' });
      }

      res.status(200).send(updatedMedical);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

    // pagination 
  exports.paginatedMedicals = async (req, res) => {
      try {
        const currentPage = parseInt(req.query.currentPage) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const searchQuery = new RegExp(search, 'i');
        const isDateSearch = !isNaN(Date.parse(search));
        const filters = {
          $or: [
            { pansement: searchQuery },
            { referenceMachine: searchQuery },
            { taillePlaies: searchQuery },
            { modeType: searchQuery },
          ],
        };
        if (isDateSearch) {
          filters.$or.push({ examinationDate: new Date(search) });
        }
        const data = await MedicalModel.find(filters)
        .skip(currentPage * limit)
        .limit(limit);
      
      const total = await MedicalModel.countDocuments(filters);
        const pageCount = Math.ceil(total / limit);
  
        const response = {
          search,
          total,
          currentPage: currentPage + 1,
          pageCount,
          limit,
          data,
        };
  
        res.status(200).json(response);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
      }
    };
    // recherche consultation 
    exports.search = async (req, res) => {
      const { key } = req.params; 
      try {
          const results = await MedicalModel.find({
              $or: [
                  { examinationDate: { $regex: key, $options: 'i' } }, 
                  { referenceMachine: { $regex: key, $options: 'i' } },
                  { taillePlaies: { $regex: key, $options: 'i' } },
                  { pansement: { $regex: key, $options: 'i' } },
              ],
          });
  
          res.json(results);
      } catch (error) {
          console.error('Error searching:', error);
          res.status(500).json({ error: 'An error occurred while searching.' });
      }
    };