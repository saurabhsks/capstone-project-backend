import express from "express";

import { connectDB } from "./config/connectDB.js";
import dotenv from "dotenv";
import hotel from "./routes/hotels.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import bodyParser from "body-parser";
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())






app.use(hotel)
connectDB();

 app.get("/",(req,res)=>{
  res.send("running")
 })
//middleware
// app.use((req,res,next)=>{
//     console.log("Hi I am a middleware!")
//     next()
// })
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
    });
    //return res.status(500).json("Hello error from handler")
});
console.log("run")
app.listen(process.env.PORT, () => {
    console.log(`Connected Successfully http://localhost:${process.env.PORT}/`)
})
// app.use((msg, req, res, next) => {
//     console.log(msg.message)
//     next()
// })
