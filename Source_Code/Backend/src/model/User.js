
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const User = new Schema({
    firstname: { type: String, required: true, unique: false, maxLength: 255, minLength: 2 },
    lastname: { type: String, required: [true], unique: false, maxLength: 255, minLength: 2 },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: [true, "Enter password"],
        maxLength: [255, "max 255 character long"],
        minLength: [5, "minium 5 character long"]
    },
    role: { type: String, require: true, default: "STAFF", enum: ['ADMIN', "STAFF"] },
    avatar: { type: String },
    coverImage: { type: String },
    joinedDate: { type: Date },
    phoneNumber: { type: String },
    bio: { type: String }


});


User.pre('save', async function (next) {
    const user = this

    // Check if the user is newly created (isNew flag is true)
    if (user.isNew) {
        try {

            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            user.avatar = `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=${generateRandomHexColor()}`;
            user.coverImage = `https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNpbmVtYXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60`;
            user.joinedDate = new Date();
            next();
        } catch (error) {
            next(error);
        }
    } else {
        // Skip the middleware for subsequent saves
        next();
    }
});

User.statics.login = async function (email, password) {

    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            throw Error('incorrect username or password');
        }
    }
    throw new Error("incorrect username or password");
}

function generateRandomHexColor() {
    const hexDigits = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        // Get a random index between 0 and 15 to pick a hex digit
        const randomIndex = Math.floor(Math.random() * 16);
        // Append the randomly picked hex digit to the color string
        color += hexDigits[randomIndex];
    }

    return color;
}


export default mongoose.model('User', User);