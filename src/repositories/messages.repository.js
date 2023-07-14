import { Messages } from '../dao/factory.js'

export default class MessagesRepository {
    constructor() {
        this.dao = Messages;
    }

    getMessages = async () => {
        const result = await this.dao.getMessages();
        return result;
    }

    addMessages = async (message) => {
        const result = await this.dao.addMessages(message);
        return result;
    }
}