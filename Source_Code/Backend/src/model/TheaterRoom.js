import mongoose from 'mongoose';
import MovieScreenTime from './MovieShowtime.js';

const Schema = mongoose.Schema;

const theaterRoom = new Schema({
    name: { type: String, required: true },
    rowNum: { type: Number, required: true },
    seatNumPerRow: { type: Number, required: true },
    image: { type: String }
});

theaterRoom.pre('deleteOne', async function (next) {
    try {
        // remove all the moviescreenTime associated with the theaterRoom
        await MovieScreenTime.deleteMany({ movieId: this._id })
        next()
    } catch (error) {
        next(error)
    }
})
export default mongoose.model('TheaterRoom', theaterRoom, "theater_rooms");