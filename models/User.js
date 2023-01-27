import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    // country: {
    //     type: String,
    //     required: false,
    //   },
    //   img: {
    //     type: String,
    //   },
    //   city: {
    //     type: String,
    //     required: true,
    //   },
    //   phone: {
    //     type: String,
    //     required: true,
    //   },
    password:{
        type:String,
        required:true
    },
     IsAdmin:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
);

//export const User=new mongoose.model("User",UserSchema)

export const User=new mongoose.model("User",UserSchema)

//export default mongoose.model("User", UserSchema);