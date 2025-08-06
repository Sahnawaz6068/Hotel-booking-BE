import mongoose from "mongoose";

const HotelSchema= new mongoose.Schema({
    hotelName:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
        maxlength:100,
    },
    city:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
        maxlength:50,
    },
    price:{
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type: String, required: true
    }
})


const HotelModel=mongoose.model("Hotel",HotelSchema);

export {HotelModel};