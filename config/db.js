import mongoose from "mongoose"
import dotenv from "dotenv"
const connectToMongoDB = async () => {
    try {
        //to load from env file and store in process.env
        dotenv.config()
        //{ path: '../.env' }
        console.log("MONGODB_URL:", process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL)
        // ✅ If this line runs, you're connected
        console.log("✅ Connected to MongoDB");

    } catch (error) {
        console.log("Error--------", error)
    }
}
// export { connectToMongoDB }
// or
export default connectToMongoDB