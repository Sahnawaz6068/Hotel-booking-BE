import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, "../../.env") });

console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(" Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Authentication invalid: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, name: decoded.name }; 
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Authentication invalid: Token is not valid",
    });
  }
};
