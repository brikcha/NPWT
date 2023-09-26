const MedicalRecordPatient = require('../models/MedicalRecordPatient'); 

// Create a new MedicalRecordPatient
exports.addMedicalRecordPatient= async (req, res) => {
    try {
        const Patient = new MedicalRecordPatient(req.body);
        await Patient.save();
        res.status(201).json(Patient);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            const duplicateKeyError = {
                error: "Erreur : e-mail en double. Il y a déjà un patient avec cet email."
            };
            res.status(400).json(duplicateKeyError);
        } else {
            res.status(400).json({ error: error.message });
        }
    } 
};
// filtrage par date de consultation
exports.getMedicalRecordPatientsByExaminationDate = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize) || 10;
        const page = parseInt(req.query.page) || 1;
        const searchQuery = req.query.search || '';
        const minExaminationDate = req.query.minExaminationDate || '2023-08-01';

        if (isNaN(Date.parse(minExaminationDate))) {
            return res.status(400).json({ error: 'Invalid minExaminationDate format' });
        }

        // Filtrage par date de première consultation
        const filters = [
            { firstExaminationDate: { $gte: new Date(minExaminationDate) } }
        ];

        const totalMedicalRecordPatients = await MedicalRecordPatient.countDocuments({ $or: filters });
        const medicalRecordPatients = await MedicalRecordPatient.find({ $or: filters })
            .limit(pageSize)
            .skip((page - 1) * pageSize);

        const formattedPatients = medicalRecordPatients.map(patient => ({
            ...patient.toObject()
        }));

        res.json({
            data: formattedPatients,
            currentPage: page,
            totalPages: Math.ceil(totalMedicalRecordPatients / pageSize)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// update patient 
exports.updateMedicalRecordPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId; 
        const updates = req.body;

        const existingPatient = await MedicalRecordPatient.findById(patientId);
        if (!existingPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        Object.assign(existingPatient, updates);
        await existingPatient.save();

        res.json(existingPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// delete patient 
exports.deleteMedicalRecordPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId; 
        const existingPatient = await MedicalRecordPatient.findById(patientId);
        if (!existingPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        await MedicalRecordPatient.deleteOne({ _id: patientId });

        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// details patient
exports.getMedicalRecordPatientDetails = async (req, res) => {
    try {
        const patientId = req.params.patientId; 
        const patient = await MedicalRecordPatient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// archiver patient 
exports.archiveMedicalRecordPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const existingPatient = await MedicalRecordPatient.findById(patientId);
        if (!existingPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        existingPatient.archived = true;
        await existingPatient.save();

        res.json({ message: 'Patient archived successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// unarchiver patient 
exports.unArchiveMedicalRecordPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const existingPatient = await MedicalRecordPatient.findById(patientId);
        if (!existingPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        existingPatient.archived = false;
        await existingPatient.save();

        res.json({ message: 'Patient archived successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.paginatedPatient = async (req, res) => {
    try {
      const currentPage = parseInt(req.query.currentPage) - 1 || 0;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const searchQuery = new RegExp(search, 'i');
      const isDateSearch = !isNaN(Date.parse(search));
      const filters = {
        $or: [
          { firstName: searchQuery },
          { lastName: searchQuery },
          { email: searchQuery },
          { phoneNumber: searchQuery },
          { governorate: searchQuery },
          { gender: searchQuery },
          { medicalConditions: searchQuery },
          { MedicalHistory: searchQuery },
        ],
      };
      if (isDateSearch) {
        filters.$or.push({ dateOfBirth: new Date(search) });
        filters.$or.push({ firstExaminationDate: new Date(search) });
      }
      const data = await MedicalRecordPatient.find(filters)
      .skip(currentPage * limit)
      .limit(limit);
    
    const total = await MedicalRecordPatient.countDocuments(filters);
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
function formatDate(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else {
    return 'Invalid Date';
  }
}


exports.getAllPatients = async (req, res) => {
    try {
      const patients = await MedicalRecordPatient.find({}, 'firstName lastName');
      const formattedPatients = patients.map(patient => ({
        id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName
      }));
      res.status(200).json(formattedPatients);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Get paginated and filtered MedicalRecordPatients pour les caeds partie client
exports.getAllMedicalRecordPatient = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.search || '';
    const filters = [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { phoneNumber: { $regex: searchQuery, $options: 'i' } },
        { governorate: { $regex: searchQuery, $options: 'i' } },
        { medicalConditions: { $regex: searchQuery, $options: 'i' } },
        { MedicalHistory: { $regex: searchQuery, $options: 'i' } },
        { gender: { $regex: searchQuery, $options: 'i' } },
        { dateOfBirth: { $gte: new Date("2005-01-01T00:00:00.000Z") } },
        { firstExaminationDate: { $gte: new Date("2005-01-01T00:00:00.000Z") } }    
    ];
    try {
        const totalMedicalRecordPatients = await MedicalRecordPatient.countDocuments({ $or: filters });
        const medicalRecordPatients = await MedicalRecordPatient.find({ $or: filters })
            .limit(pageSize)
            .skip((page - 1) * pageSize);

        const formattedPatients = medicalRecordPatients.map(patient => ({
            ...patient.toObject(),
            dateOfBirth: formatDate(patient.dateOfBirth),
            firstExaminationDate: formatDate(patient.firstExaminationDate)
        }));

        res.json({
            data: formattedPatients,
            currentPage: page,
            totalPages: Math.ceil(totalMedicalRecordPatients / pageSize)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};