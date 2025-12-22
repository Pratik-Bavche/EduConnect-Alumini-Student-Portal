import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'alumni', 'staff', 'admin'],
        default: 'student'
    },

    // Academic Details (for Students/Alumni)
    prn: { type: String }, // Permanent Registration Number
    rollNumber: { type: String },
    branch: { type: String },
    division: { type: String },
    year: { type: String }, // e.g., "Third Year"

    // Professional Details (for Alumni)
    currentCompany: { type: String },
    designation: { type: String },

    // Verification Status
    isVerified: { type: Boolean, default: false }, // True if matched with Excel or approved by Staff

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
