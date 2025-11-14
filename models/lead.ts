import { status } from "express/lib/response";

const mongoose = require('mongoose');

const leadSchema = {
    id: Number,
    name: String,
    email: String,
    company: String,
    message:{ type: String, default: 'No message provided' },
    createdate: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'contacted', 'recieved', 'done'], default: 'new' },
    remarks: { type: String, default: 'No remarks' }
};

module.exports = mongoose.model('Lead', leadSchema);