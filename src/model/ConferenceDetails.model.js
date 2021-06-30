const mongoose = require('mongoose');

const confrenceDetailsSchema = new mongoose.Schema({
    conferenceName:{type:String, require:true},
    venue:{type:String, require:true},
    startDate:{type:Date, require:true},
    description:{type:String, require:true}
    
},{
    timestamps:true,
});

const ConferenceDetail = mongoose.model('ConferenceDetail', confrenceDetailsSchema);

module.exports = ConferenceDetail;