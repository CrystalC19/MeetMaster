// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true }, // Added address
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;

