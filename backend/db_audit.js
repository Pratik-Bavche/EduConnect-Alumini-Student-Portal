import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb+srv://pratikbavche:pratik123@cluster0.ffc0zc0.mongodb.net/educonnect?retryWrites=true&w=majority&appName=Cluster0';

async function auditDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB...");

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("\nCollections Found:");

        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(` - ${col.name}: ${count} documents`);

            if (count > 0) {
                const docs = await mongoose.connection.db.collection(col.name).find().limit(3).toArray();
                console.log(`   Sample data:`, JSON.stringify(docs, null, 2));
            }
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

auditDB();
