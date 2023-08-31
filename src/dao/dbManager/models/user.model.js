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
        enum: ['ADMIN', 'USER', 'PREMIUM'],
        required: true,
        default: 'USER'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    documents: [
        {
            name: {
                type: String
            },
            reference: {
                type: String
            }
        }
    ],
    last_connection: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("findOne", function () {
    this.populate('cart')
})

export const userModel = mongoose.model(userCollection, userSchema);