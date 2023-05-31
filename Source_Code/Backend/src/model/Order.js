import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    food: {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Food',
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
    },
    drink: {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Drink',
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
    },
    ticket: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
})

Order.pre('save', async function (next) {
    const foodPrice = (this.food.item.price || 0) * this.food.quantity;
    const drinkPrice = (this.drink.item.price || 0) * this.drink.quantity;
    const ticket = await this.populate('ticket').execPopulate();
    const ticketPrice = ticket.ticket.price || 0;
    this.totalPrice = foodPrice + drinkPrice + ticketPrice;
    next();
})


export default mongoose.model('Order', orderSchema);