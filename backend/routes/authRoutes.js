import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Staff from '../models/Staff.js';
import Admin from '../models/Admin.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

// Seed Default Admin (One-time setup for demo)
const seedDefaultAdmin = async () => {
    try {
        const defaultEmail = 'admin@admin.com';
        const exists = await Admin.findOne({ email: defaultEmail });
        if (!exists) {
            console.log('Seeding default admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin', salt); // Default password 'admin'
            await Admin.create({
                name: 'Default Admin',
                email: defaultEmail,
                password: hashedPassword,
                role: 'admin',
                institution: 'DYPCOE'
            });
            console.log('Default Admin Created: admin@admin.com / admin');
        }
    } catch (err) {
        console.error('Error seeding default admin:', err.message);
    }
};
// Execute seeding
seedDefaultAdmin();

// @route   POST /api/auth/register
// @desc    Register User (Student, Staff, or Admin)
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, role, ...otherDetails } = req.body;

    try {
        let Model;
        if (role === 'student') Model = Student;
        else if (role === 'staff') Model = Staff;
        else if (role === 'admin') Model = Admin;
        else return res.status(400).json({ message: 'Invalid Role' });

        // 1. Validation for common fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // 2. Check if user exists in the specific collection
        const userExists = await Model.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User
        // Dynamically spread role-specific fields
        // Note: Make sure the frontend sends exactly the fields defined in the schema
        const userData = {
            name,
            email,
            password: hashedPassword,
            role,
            ...otherDetails
        };

        console.log('Attempting to save user to collection:', Model.collection.name);
        console.log('Data:', userData);

        const user = await Model.create(userData);
        console.log('User saved successfully:', user);

        if (user) {
            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(201).json({
                ...userResponse,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register Error:', error); // Log full error to console
        // Return detailed error to help debug
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
});

// @route   POST /api/auth/login
// @desc    Login User
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        let user;

        // Strategy: Frontend SHOULD send role for efficiency.
        // If role is sent, we search strictly in that collection.
        if (role === 'staff') {
            user = await Staff.findOne({ email });
        } else if (role === 'student') {
            user = await Student.findOne({ email });
        } else if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else {
            // Fallback: Check all if role is missing (less efficient)
            user = await Student.findOne({ email });
            if (!user) user = await Staff.findOne({ email });
            if (!user) user = await Admin.findOne({ email });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const userResponse = user.toObject();
            delete userResponse.password;

            res.json({
                ...userResponse,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/auth/profile
// @desc    Update User Profile
// @access  Private (Needs token ideally, but we'll use ID/Email for now or assume simple)
// IMPORTANT: In a real app, use Middleware to verify JWT and get user ID from token
router.put('/profile', async (req, res) => {
    const { _id, role, ...updates } = req.body;

    try {
        if (!_id || !role) {
            return res.status(400).json({ message: 'User ID and Role are required' });
        }

        let Model;
        if (role === 'student') Model = Student;
        else if (role === 'staff') Model = Staff;
        else if (role === 'admin') Model = Admin;
        else return res.status(400).json({ message: 'Invalid Role' });

        // Remove password from updates if it exists to prevent accidental overwrite (handle password separately)
        delete updates.password;

        const updatedUser = await Model.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true, runValidators: true } // Return new doc, run schema validators
        ).select('-password'); // Exclude password from result

        if (updatedUser) {
            const userResponse = updatedUser.toObject();
            delete userResponse.password;

            // Keep the token as is (or generate new one if roles changed, but purely profile update usually doesn't need new token)
            res.json(userResponse);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
