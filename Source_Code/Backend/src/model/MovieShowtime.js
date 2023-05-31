import mongoose from "mongoose";
import showtimeSpot from "../enum/ShowtimeSpot.js";
import Ticket from './Ticket.js'

const Schema = mongoose.Schema;

const MovieShowtime = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theaterRoom: {
        type: Schema.Types.ObjectId,
        ref: 'TheaterRoom',
        required: true
    },
    showtimeSpot: {
        type: String,
        required: true,
        enum: ['10-12', '12-14', '14-16', '16-18', '18-20', '20-22'] 
        // for example, 10-12 means the showtime is from 10am to 12pm
    },
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    priceRates: {
        type: [Object]
    },
    showtimeDate: { type: Date, required: true }
})

MovieShowtime.pre('deleteOne', async function (next) {
    try {
        // remove all the tickets associated with the movieScreenTime
        await Ticket.deleteMany({ movieShowtime: this._id })
        next()
    } catch (error) {
        next(error)
    }
})
export default mongoose.model('MovieShowtime', MovieShowtime, "movie_showtimes")