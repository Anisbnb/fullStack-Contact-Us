import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    company: String,
    message: { type: String, default: 'No message provided' },
    createdate: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'contacted', 'received', 'done'], default: 'new' },
    remarks: { type: String, default: 'No remarks' }
});

export default mongoose.model('Lead', leadSchema);