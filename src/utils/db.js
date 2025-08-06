import mongoose from "mongoose";
export const connectionDB= async (DB_URL)=>{
    try{
        await mongoose.connect(DB_URL);
    }catch(err){
        console.log("lol Got ERROR")
        console.error(err)
    }
}