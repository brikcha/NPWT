const MachineMaintenance = require('../models/MachineMaintenance'); 
const Patient = require('../models/MedicalRecordPatient'); 
    // Create a new Machine
    exports.addMachine= async (req, res) => {
        try {
            const existingMachineMaintenance = await MachineMaintenance.findOne({ reference: req.body.reference });

            const machine = new MachineMaintenance(req.body);
            if (existingMachineMaintenance) {
                return res.status(400).json({ error: 'Reference machine doit etre unique.' });
            }
            await machine.save();
            res.status(201).json(machine);
        } catch (error) {
            res.status(400).json({ error: error.message });
        } 
    };
    // get liste of all Machine 
    exports.getAllMachine= async (req, res) => {
        try {
            const machineMaintenance = await MachineMaintenance.find();
            const newMachine = await Promise.all(machineMaintenance.map(async machine => {
                const patientAffecte = await Patient.findById(machine.patientAffecte); 
                return { ...machine.toObject(), patientAffecte };
            }));
            res.status(200).json(newMachine);
        } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        }
    };
    // Get paginated and filtered Machine 
    exports.getPaginatedFilteredMachine= async (req, res) => {
    try {
        const currentPage = parseInt(req.query.currentPage) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const searchQuery = new RegExp(search, 'i');
        const isDateSearch = !isNaN(Date.parse(search));
        const filters = {
          $or: [
            { reference: searchQuery },
            { disponibilite: searchQuery },
            { etat: searchQuery },
          ],
        };
        if (isDateSearch) {
          filters.$or.push({ dateDebut: new Date(search) });
          filters.$or.push({ dateFin: new Date(search) });
          filters.$or.push({ dateFinEtendu: new Date(search) });
        }
        const data = await MachineMaintenance.find(filters)
        .skip(currentPage * limit)
        .limit(limit);
    
      const total = await MachineMaintenance.countDocuments(filters);
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
    // details Machine 
    exports.getMachineDetails = async (req, res) => {
        try {
            const machineId = req.params.machineId; 
            const machine = await MachineMaintenance.findById(machineId);
            if (!machine) {
                return res.status(404).json({ error: 'machine not found' });
            }
            
            const patient = await Patient.findById(machine.patientAffecte);
            
            if (!patient) {
                return res.status(200).json(machine);
            }else{
                const combinedData = { ...machine.toObject(), ...patient.toObject() };                            
                res.status(200).json(combinedData);
            }            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    // update machine 
    exports.updateMachine= async (req, res) => {
        try {
            const machineId = req.params.machineId; 
            const updates = req.body;

            const existingMachine = await MachineMaintenance.findById(machineId);
            if (!existingMachine) {
                return res.status(404).json({ error: 'machine not found' });
            }
            Object.assign(existingMachine, updates);
            await existingMachine.save();

            res.json(existingMachine);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    // delete machine 
    exports.deleteMachine= async (req, res) => {
        try {
            const machineId = req.params.machineId; 
            const existingMachine = await MachineMaintenance.findById(machineId);
            if (!existingMachine) {
                return res.status(404).json({ error: 'Machine not found' });
            }
            await MachineMaintenance.deleteOne({ _id: machineId });

            res.json({ message: 'Machine deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
