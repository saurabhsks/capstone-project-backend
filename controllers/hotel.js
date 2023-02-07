
import Hotel from "../models/hotel.js";
import Room from "../models/Room.js";
//CREATE
export const createHotel= async(req,res,next)=>{
    try {
        console.log(req.body)
        const created = await Hotel.create(req.body);
        console.log(created)
        console.log("Created")
        res.status(201).json({
            success: true,
            msg: 'post added created'
        })
    }
    catch (error) {
        res.status(200).json({
            success: false,
            msg: `${error.message}`
        })
    }

}
//UPDATE
export const updateHotel=async (req,res,next)=>{
    try{
        const updatedHotel=await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true})
            res.status(200).json(updatedHotel);
    }catch (err){
        res.status(500).json(err);
    }
}
//DELETE
export const deleteHotel=async(req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
            res.status(200).json("Hotel has been deleted.");
    }catch (err){
        res.status(500).json(err);
    }
}

//GET
export const getHotel=async(req,res,next)=>{
    try {
        const hotel=await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
    } catch(err){
        res.status(500).json(err);
    }
    //     const data = await Hotel.find().exec()
    //     console.log(data)
    //     if (data.length != 0) {
    //         res.status(200).json({
    //             sucess: "true",
    //             data: data,
    //         })
    //     }
    //     else {
    //         res.status(201).json({
    //             sucess: "failed",
    //         })
    //     }
    // } catch (error) {
    //     res.status(400).json({
    //         success: false,
    //         msg: `${error.message}`
    //     })
    // }
};

//GET ALL
// export const getHotels = async (req, res, next) => {
//     const { min, max, ...others } = req.query;
//     // const { min, max, ...others } = req.body;
//     console.log(req.query)
//     try {
//     //   const hotels = await Hotel.find({                       //Some error
//     //     ...others,
//     //     cheapestPrice: { $gt: min | 1, $lt: max || 2000 },
//     //   }).limit(req.query.limit);

//       const hotels = await Hotel.find({cheapestPrice:100}).limit(req.query.limit);
//       res.status(200).json(hotels);
//     } catch (err) {
//         console.log(err)
//       next(err);
//     }
//   };

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(       //some error
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }

  };

// Find by City
export const getHotelsByCity = async (req, res, next) => {
  console.log("Inside  getHotelsByCity");
  try {
    const city = req.params.slug;
    const hotels = await Hotel.find({city: city})
    res.status(200).json({success:true,data:hotels})
  } catch (err) {
      console.log(err)
    next(err);
  }
};
export const getAllHotels = async (req, res, next) => {
  console.log("Inside  getHotelsByCity");
  try {
    
    const hotels = await Hotel.find({})
    res.status(200).json({success:true,data:hotels})
  } catch (err) {
      console.log(err)
    next(err);
  }
};
