import mongoose from 'mongoose';

const messageCollection = 'message';

const messagesSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: false
    },
    message: String
})

export const messageModel = mongoose.model(messageCollection, messagesSchema);