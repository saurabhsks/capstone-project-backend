import express from "express";
// getHotels
import { countByCity,countByType,createHotel, deleteHotel, getHotel, getHotelRooms, updateHotel, getHotelsByCity, getAllHotels  } from "../controllers/hotel.js";
import Hotel  from "../models/hotel.js"
import {createError} from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

// router.get(`/`,Productcontroller.productcontroll)

//CREATE
router.post(`/`,verifyAdmin, createHotel);

//UPDATE  //PUT
router.put("/:id",verifyAdmin,updateHotel)



//DELETE
router.delete("/:id", verifyAdmin,  deleteHotel)

//GET
router.get("/find/:id",getHotel)

//GET ALL
// router.get("/",getHotels);
//router.get("/?limit=2&min=200&max=1500",getHotels); //to get any particular range hotels
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/city/:slug", getHotelsByCity)
router.get("/city", getAllHotels)

export default router;