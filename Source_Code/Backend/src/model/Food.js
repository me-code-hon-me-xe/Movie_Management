import mongoose from 'mongoose';


const Schema = mongoose.Schema

const Food = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
})

export default mongoose.model('Food', Food)