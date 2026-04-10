/**
 * Campus Connect — Database Reset Script
 * Wipes all Users, Problems, and Solutions from MongoDB.
 * Run once: node init/clearDB.js
 */

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URI;

async function clearDB() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to DB");

        const db = mongoose.connection.db;

        const collections = await db.listCollections().toArray();
        const names = collections.map(c => c.name);
        console.log("📋 Collections found:", names.join(", ") || "(none)");

        for (const name of names) {
            await db.collection(name).deleteMany({});
            console.log(`🗑️  Cleared: ${name}`);
        }

        console.log("\n✅ Campus Connect DB reset complete — fresh start!");
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected.");
        process.exit(0);
    }
}

clearDB();
