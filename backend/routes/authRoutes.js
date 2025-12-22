import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Staff from '../models/Staff.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register User (Student or Staff)
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, role, ...otherDetails } = req.body;

    try {
        let Model;
        if (role === 'student') Model = Student;
        else if (role === 'staff') Model = Staff;
        else return res.status(400).json({ message: 'Invalid Role' });

        // 1. Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // 2. Check if user exists
        const userExists = await Model.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User
        const userData = {
            name,
            email,
            password: hashedPassword,
            role,
            ...otherDetails
        };

        const user = await Model.create(userData);

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register Error:', error); // Log full error
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

        // Strategy: If role is sent from frontend utilize it
        if (role === 'staff') {
            user = await Staff.findOne({ email });
        } else if (role === 'student') {
            user = await Student.findOne({ email });
        } else {
            // Fallback: Check Student first, then Staff
            user = await Student.findOne({ email });
            if (!user) user = await Staff.findOne({ email });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
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

export default router;
