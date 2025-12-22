import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register User
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, role, ...otherDetails } = req.body;

    try {
        // Validation: Basic Fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // Validation: Role-specific fields
        if (role === 'student' && (!otherDetails.rollNo || !otherDetails.year || !otherDetails.division)) {
            return res.status(400).json({ message: 'Please provide all academic details (Roll No, Year, Division)' });
        }
        if (role === 'staff' && (!otherDetails.department || !otherDetails.designation)) {
            return res.status(400).json({ message: 'Please provide all staff details (Department, Designation)' });
        }

        // 1. Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            ...otherDetails // Spread extra fields like rollNumber, dept, etc.
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/auth/login
// @desc    Login User
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
