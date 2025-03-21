import mongoose from "mongoose"

const connectDB = async()=>{
    
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("mongoDb connected")
    }).catch((err)=>{
        console.log(err.message)
    })
    
}

export default connectDB;