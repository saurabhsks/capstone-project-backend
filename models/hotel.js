import mongoose from "mongoose"


const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
       min:0,
       max:5
    },
    rooms:{
        type:[String],
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        default:false,
    },
})

 //export const Hotel=new mongoose.model("hotels",schema)

export default mongoose.model("Hotel", schema);
//module.exports =mongoose.model("Hotel",schema);