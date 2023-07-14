import mongoose from 'mongoose';

const messageCollection = 'message';

const messagesSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user'
    // },
    user: String,
    message: String
})

// messagesSchema.pre("find", function(){
//     this.populate('userId');
// })

export const messageModel = mongoose.model(messageCollection, messagesSchema);