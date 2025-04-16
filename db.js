import mongoose from "mongoose"
const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://saiteja:Hello%40123@cluster0.yj1mtat.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0")
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.log("Error--------", error)
    }
}
export default connectToMongoDB