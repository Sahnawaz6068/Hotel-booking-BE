import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    },

    room: {
        type: String,
        required: true,
    },

    checkInDate: {
        type: Date,
        required: true,
    },

    checkOutDate: {
        type: Date,
        required: true,
    },

    numberOfGuests: {
        type: Number,
        required: true,
        min: 1, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model("Booking", BookingSchema);

export { Booking};