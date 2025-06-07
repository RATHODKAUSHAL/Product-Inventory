const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const uri = process.env.MONGO_URL;

    if (!uri) {
        console.error("❌ MongoDB URI not found in environment variables");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("✅ DB Connected");
    } catch (error) {
        console.error("❌ DB Connection Failed:", error);
        process.exit(1);
    }
};

// ✅ Corrected export (was "module.export", should be "module.exports")
module.exports = connectDB;
