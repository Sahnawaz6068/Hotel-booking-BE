
import { Router } from "express";
import { HotelModel } from "../../models/HotelSchema.js";
import { StatusCodes } from "http-status-codes";
console.log(HotelModel);
const HotelRoutes=Router();
console.log("Reach2")
HotelRoutes.get("/test",(req,res)=>{
    res.send("Hello ji");
})

HotelRoutes.get("/test2",(req,res)=>{
    res.send("Hello ji125");
})

//Routes for Creating Hotel
HotelRoutes.post("/hotel",async (req,res)=>{
    const {hotelName,city,price,imageUrl,description}=req.body;

    try{
        const hotel=await HotelModel.create({
        hotelName,
        city,
        price:parseInt(price),
        imageUrl,
        description
    })
    res.status(StatusCodes.OK).json({
        msg:"New Hotel created",
        response:hotel
    })
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).json({
            error:err
        })
    }
})


export { HotelRoutes };


