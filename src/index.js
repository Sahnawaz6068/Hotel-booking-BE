import express from "express";
import { config } from "dotenv";
import { connectionDB } from "./utils/db.js";

import {HotelRoutes} from './routes/v1/HotelRoutes.js';
import { UserRoutes } from "./routes/v1/UserRoutes.js";

const app = express();
app.use(express.json());

config({ path: "./.env" });
const PORT = process.env.PORT;
const DB_URL=process.env.DB_URL;

console.log("Reach1");
//Route Setup
app.use("/api/v1",HotelRoutes);
app.use("/api/v1",UserRoutes);


async function startApp(){
    try{
        await connectionDB(DB_URL);
        console.log("db is connected")
        app.listen(PORT,()=>{
            console.log(`App is listening on port: ${PORT}`)
        });
    }catch(err){
        console.error(err.message)

        console.log("something wrong happen")
    }
    
} 

startApp();