import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },

    // Student Specific Details
    rollNo: { type: String, required: true },
    year: { type: String, required: true },
    division: { type: String, required: true },
    prn: { type: String },
    branch: { type: String },
    department: { type: String },
    phone: { type: String },
    location: { type: String },
    gradYear: { type: String },

    // Career / Alumni Details
    company: { type: String },
    position: { type: String },
    skills: { type: String },
    linkedin: { type: String },

    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Student', studentSchema);
