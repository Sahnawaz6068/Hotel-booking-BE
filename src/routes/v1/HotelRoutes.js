import { Router } from "express";

const HotelRoutes=Router();
console.log("Reach2")
HotelRoutes.get("/test",(req,res)=>{
    res.send("Hello ji");
})

HotelRoutes.get("/test2",(req,res)=>{
    res.send("Hello ji125");
})

//Routes for Creating Hotel
HotelRoutes.post("/hotel",(req,res)=>{
    
})


export { HotelRoutes };


