import mongoose from 'mongoose';
import 'dotenv/config';

// MongoDB connection URI
const mongoDB_URI = process.env.MONGO_URI;

// Function to connect to MongoDB
export const connectDB = async () => {
    await mongoose.connect(mongoDB_URI) // Connect to the MongoDB database
        .then(() => console.log("DB Connected"));
};
