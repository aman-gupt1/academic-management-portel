import mongoose from 'mongoose'

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DataBase Connect Successfully🛢️')
    } catch (error) {
       console.log('DataBase Error: ', error.message) 
    }
}

export default connectDB;