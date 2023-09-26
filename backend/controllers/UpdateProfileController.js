const multer = require('multer');
const path = require('path');
const User = require("../models/User");

/*       Update user(Nurse, doctor, Admin, SuperAdmin) profile image  */
const storage = multer.diskStorage({
    destination: 'uploads/userProfile',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
const uploadUserProfile = multer({ storage: storage, fileFilter: fileFilter });
exports.addImageProfile = [uploadUserProfile.single('image'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.file) {
            user.image = req.file.filename;
        }

        await user.save();
        res.json({ message: 'Profile image updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

