const bcrypt = require ("bcryptjs");
const UserModal = require ("../models/User");
  exports.addUser = async (req, res) => {
      try {
        const salt = await bcrypt.genSalt(Number("hey"));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        let userToAdd = { ...req.body, password: hashPassword, verified: false, role: "doctor", name: `${req.body.firstName} ${req.body.lastName}` }
        delete userToAdd.firstName;
        delete userToAdd.lastName;
    
        let user = await new UserModal(userToAdd).save();
        res.status(201).json(user);
    
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  }
  exports.listUser = async (req, res) => { 
      try {
        const Users = await UserModal.find();
        res.status(200).send(Users);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
  }
  exports.unverifyUser = async (req, res) => {
      try {
        const { userId } = req.params;
        await UserModal.findByIdAndUpdate(userId, { verified: false });
        res.status(200).send({ message: "User verified successfully" });
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
  }
  exports.verifyUser = async (req, res) => {
    try {
      const { userId } = req.params;
      await UserModal.findByIdAndUpdate(userId, { verified: true });
      res.status(200).send({ message: "User verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  exports.deleteUser = async (req, res) => {
    try {
      const user = await UserModal.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  exports.updateUser = async (req, res) => {
    try {
      const saltRounds = 10; // Set the number of salt rounds for bcrypt hashing
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const userToUpdate = { ...req.body, password: hashPassword, verified: false,  };  
      const updatedUser = await UserModal.updateOne({ _id: req.params.id }, { $set: userToUpdate });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.paginatedUsers = async (req, res) => {
    try {
      const currentPage = parseInt(req.query.currentPage) - 1 || 0;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const role = req.query.role || "";
      const searchQuery = new RegExp(search, 'i');
      const isDateSearch = !isNaN(Date.parse(search));

      const filters = {
        $or: [
          { userName: searchQuery },
          { firstName: searchQuery },
          { lastName: searchQuery },
          { email: searchQuery },
          { phoneNumber: searchQuery },
          { governorate: searchQuery },
          { gender: searchQuery },
          { secteur: searchQuery },
          { etablissement: searchQuery },
          { codePostale: searchQuery },
        ],
      };
      if (isDateSearch) {
        filters.$or.push({ dateOfBirth: new Date(search) });
      }
      const data = await UserModal.find({ $and: [filters, { role: { $regex: role, $options: "i" } }] })
      .skip(currentPage * limit)
      .limit(limit);
    
    const total = await UserModal.countDocuments({ $and: [filters, { role: { $regex: role, $options: "i" } }] });
      const pageCount = Math.ceil(total / limit);

      const response = {
        role,
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
  exports.search = async (req, res) => {
	
    let result = await UserModal.find({
        "$or": [
            {name: {$regex: req.params.key}},
            {email: {$regex: req.params.key}},
        ],
    });
    res.send(result);
  }; 
  exports.update = async (req, res) => {
    try {
      const userId = req.params.id; // Get the user ID from the URL parameters
      const userData = req.body; // Get the updated user data from the request body
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.getDetails = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModal.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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
  