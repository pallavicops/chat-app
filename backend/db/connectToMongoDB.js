import mongoose from "mongoose";

const connectToMongoDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to database");
        
    } catch (error) {
        console.log("Error Connecting to MongoDb", error.message);
        
    }

};

export default connectToMongoDb;