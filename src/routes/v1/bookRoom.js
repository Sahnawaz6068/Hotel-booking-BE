import { response, Router } from "express";
import { Booking } from "../../models/BookingSchema.js";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const bookRoom = Router();

bookRoom.post("/bookRoom",authMiddleware, async (req, res) => {
  const { hotel, checkInDate, checkOutDate, numberOfGuests, room } = req.body;
  const userId = req.user.id;
  console.log(userId);
  
  try {
    const booking = await Booking.create({
      hotel,
      user: userId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      room,
    });
    res.status(StatusCodes.OK).json({
      msg: "You booked the room",
      response: booking,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export { bookRoom };
