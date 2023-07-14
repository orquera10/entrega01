import { Tickets } from '../dao/factory.js'

export default class TicketsRepository {
    constructor() {
        this.dao = Tickets;
    }
    createTicket = async (ticket) => {
        const result = await this.dao.createTicket(ticket);
        return result;
    }
    
}