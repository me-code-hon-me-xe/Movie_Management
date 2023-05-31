import mongoose from 'mongoose';

export default async function connect() {
    try {
        // await mongoose.connect('mongodb://mongo:t7Bt1eUd5BMnMRdRXlXG@containers-us-west-54.railway.app:7575');
        await mongoose.connect('mongodb://localhost:27017/cts');
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}


