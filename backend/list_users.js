import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';
import Staff from './models/Staff.js';
import Admin from './models/Admin.js';

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb+srv://pratikbavche:pratik123@cluster0.ffc0zc0.mongodb.net/educonnect?retryWrites=true&w=majority&appName=Cluster0';

async function listUsers() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB...");

        const students = await Student.find({});
        console.log(`\nFound ${students.length} Students:`);
        students.forEach(s => console.log(` - ${s.name} (${s.email})`));

        const staff = await Staff.find({});
        console.log(`\nFound ${staff.length} Staff:`);
        staff.forEach(s => console.log(` - ${s.name} (${s.email})`));

        const admins = await Admin.find({});
        console.log(`\nFound ${admins.length} Admins:`);
        admins.forEach(s => console.log(` - ${s.name} (${s.email})`));

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

listUsers();
