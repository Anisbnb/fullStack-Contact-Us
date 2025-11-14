import { status } from "express/lib/response";

const mongoose = require('mongoose');

const adminSchema = {
    id: Number,
    
    email: String,
    password: String,
    role: { type: String, enum: ['superadmin'], default: 'admin' },
};

module.exports = mongoose.model('Admin', adminSchema);