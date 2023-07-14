import mongoose from 'mongoose';

const ticketCollections = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
  });

export const ticketModel = mongoose.model(ticketCollections, ticketSchema);