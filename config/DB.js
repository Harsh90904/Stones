const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUri =  "mongodb+srv://diyoraharsh6:PVf5iq7ymWhxVuEa@cluster0.yqlxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
