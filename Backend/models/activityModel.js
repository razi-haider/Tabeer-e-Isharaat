const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// MCQ Model
const mcqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    marks : {
        type: Number,
        required: true
    }
}, { _id: false }); // Disable _id for mcqSchema

// Activity Model
const activitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

    category : {
        type: String,
        required: true
    },

    questions: [mcqSchema],
    dueDate : Date,
    show : Boolean //whether activity should appear on student screen or not
}, {timestamps : true});

// module.exports = { 
//     Activity: mongoose.model('Activity', activitySchema, 'Activity') 
// }

module.exports = {
    LitActivity: mongoose.model('LitActivity', activitySchema, 'Literacy Activities'),
    MathActivity: mongoose.model('MathActivity', activitySchema, 'Math Activities')
};


 