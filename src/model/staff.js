const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    
},{
    timestamps:true,
});

const Staff = mongoose.model('Staff', StaffSchema);

module.exports = Staff;