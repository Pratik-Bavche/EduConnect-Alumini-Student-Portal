import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb+srv://pratikbavche:pratik123@cluster0.ffc0zc0.mongodb.net/educonnect?retryWrites=true&w=majority&appName=Cluster0';

async function checkDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to:", uri);

        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log("\nAvailable Databases:");
        dbs.databases.forEach(db => console.log(` - ${db.name}`));

        console.log(`\nCurrent Database: ${mongoose.connection.db.databaseName}`);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections in current DB:");
        collections.forEach(c => console.log(` - ${c.name}`));

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkDB();
