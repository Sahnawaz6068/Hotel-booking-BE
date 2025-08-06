
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models/userSchema.js";
import bcrypt from 'bcrypt';
import { userDataValidation } from "../../utils/userValidation.js";

const UserRoutes=Router();

//Routes for Creating User
UserRoutes.post("/user",userDataValidation,async (req,res)=>{
    const {name,email,password}=req.body;
    
    const hashPassword=await bcrypt.hash(password, 10);
    console.log(hashPassword);
    try{
        const user=await User.create({
            name,
            email,
            password:hashPassword
    })
    res.status(StatusCodes.OK).json({
        msg:"New User created",
        response:user
    })
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).json({
            error:err.message
        })
    }
})

export { UserRoutes };


