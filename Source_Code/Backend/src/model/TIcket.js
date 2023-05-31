import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Ticket = new Schema({
    movieShowtime: {
        type: Schema.Types.ObjectId,
        ref: 'MovieShowtime',
        required: true
    },
    seatCode: { type: String },
    row: { type: Number, required: true },
    column: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'available' }
});

Ticket.pre('save', function(next) {
    this.seatCode = `R${this.row + 1}.${this.column}`;
    next();
});



export default mongoose.model('Ticket', Ticket);