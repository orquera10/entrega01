import { messageModel } from "../models/messages.js";

export default class Message {
    constructor() {
        console.log('Working messages with DB in mongoDB');
    }
    getMessages = async () => {
        const messages = await messageModel.find().lean();
        return messages;
    }

    addMessages = async (data) => {
        const result = await messageModel.create(data);
        return result;
    }
}