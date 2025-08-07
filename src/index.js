import express from "express";
import { config } from "dotenv";
import { connectionDB } from "./utils/db.js";
import cors from "cors"; 

import { HotelRoutes } from './routes/v1/HotelRoutes.js';
import { UserRoutes } from "./routes/v1/UserRoutes.js";
import { bookRoom } from "./routes/v1/bookRoom.js";
import { main } from "./ai.js";
import { StatusCodes } from "http-status-codes";

const app = express();


app.use(cors({
  origin: "http://localhost:5173/", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

config({ path: "./.env" });

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

console.log("Reach1");

// Routes
app.use("/api/v1", HotelRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", bookRoom);

//ai routes
app.post("/api/ai", async (req,res)=>{
  const text=req.body.prompt;
  try{
    const response=await main(text);
      res.status(StatusCodes.OK).json({
        response:response
    })
  }catch(err){
    res.status(StatusCodes.BAD_REQUEST).json({
      error:err.message
    })
  }
})

async function startApp() {
  try {
    await connectionDB(DB_URL);
    console.log("db is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    console.log("something wrong happen");
  }
}

startApp();
