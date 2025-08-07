import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, "../../../.env") });

import { signInDataValidation, userDataValidation} from "../../utils/userValidation.js";

console.log( 
  process.env.JWT_SECRET +
    "........................................................................."
);
const UserRoutes = Router();

//Routes for Creating User
UserRoutes.post("/signup", userDataValidation, async (req, res) => {
  const { name, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(StatusCodes.OK).json({
      msg: "New User created",
      response: user,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message,
    });
  }
});

//Login Route
UserRoutes.post("/signin", signInDataValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    //Store token in Cookies
      res.cookie("token", token);
      
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export { UserRoutes };
