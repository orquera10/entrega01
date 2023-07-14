import { ticketsModel } from "../dbManager/models/tickets.model.js";

export default class Tickets {
    constructor() {
        console.log('Working ticket with DB in mongoDB');
    }
    createTicket = async (ticket) => {
        const result = await ticketsModel.create(ticket);
        return result;
    }
}
