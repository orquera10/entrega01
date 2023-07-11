import { messageModel } from "../dbManager/models/message.model.js";

export default class Message {
    constructor() {
        console.log('Working messages with DB in mongoDB');
    }
    getMessages = async () => {
        const messages = await messageModel.find().lean();
        return messages;
    }

    addMessages = async (message) => {
        const result = await messageModel.create(message);
        return result;
    }
}