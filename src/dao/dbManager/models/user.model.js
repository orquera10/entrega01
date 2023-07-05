import mongoose from 'mongoose';


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'carts'
    }
});

userSchema.pre("findOne", function(){
    this.populate('cart')
})

export const userModel = mongoose.model(userCollection, userSchema);