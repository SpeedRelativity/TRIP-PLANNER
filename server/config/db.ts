import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
};

export default connectDb;

