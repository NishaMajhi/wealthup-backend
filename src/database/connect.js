import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        const dbConnectionInstance = await mongoose.connect(process.env.MONGO_URI)
        if (dbConnectionInstance) {
            console.log("DB Connect Successfully !! host -> ", dbConnectionInstance.connection.host);
        }

    } catch (error) {
        console.log("MongoDB Connection error : ", error);
        process.exit(1)
    }
}


export {
    connectDB
}