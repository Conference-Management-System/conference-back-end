const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    
},{
    timestamps:true,
});

const Speaker = mongoose.model('Speaker', speakerSchema);

module.exports = Speaker;