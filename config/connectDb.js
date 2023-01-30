import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        // await mongoose.connect(`mongodb://127.0.0.1:27017/products`)
        await mongoose.connect(process.env.DBurl)
        console.log('Database connected sucessfully')
    }
    catch (error) {
        console.log(error)
    }
};
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected ")
})


