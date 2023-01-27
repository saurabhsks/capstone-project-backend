import { User } from "../models/User.js"; 
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//REGISTER
export  const register=async(req,res,next)=>{
      console.log("Inside Register function");
      console.log(req.body);
      try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password, salt);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })
        console.log("NewUser ****");
        console.log(newUser);
        await newUser.save()
        console.log("After Save");
        res.status(200).send("User has been created.")
      }catch(err){
        //res.status(500).json(err);
        next(err)
      }
}

//LOGIN
export  const login=async(req,res,next)=>{
    console.log("Inside LogIn Function");
    console.log(req.body);
    try{
     const user= await User.findOne({username:req.body.username})
     if(!user)return  next (createError(404,"User not found"));

     const isPasswordCorrect=await bcrypt.compare(
        req.body.password,
        user.password
     );

     if(!isPasswordCorrect)
     return next(createError(400,"Wrong password or username!"));

     const token=jwt.sign({id: user._id, isAdmin:user.isAdmin},process.env.JWT );

     const { password,isAdmin,...otherDetails}=user._doc;
      res.cookie("access_token",token,{
        httpOnly:true,
      }).status(200)
      .json({...otherDetails});

    }catch(err){
        console.log(err);
      res.status(500).json(err);
      
    }
}

// (req,res)=>{
//     res.send("Hello,this is auth register endpoint");
// }