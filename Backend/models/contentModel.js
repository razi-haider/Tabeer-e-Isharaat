const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        type: String
        //required: true
    },
    marks : {
        type: Number,
        required: true
    }
}, { _id: false }); // Disable _id for mcqSchema


const categorySchema = new Schema({
    name: String,
    mcqs: [mcqSchema]
}, { _id: false });

const contentSchema = new Schema({
    name: String,
    category: [categorySchema]
})

// module.exports = {Content:mongoose.model('Content', contentSchema, 'Content'), mcqSchema : mcqSchema, categorySchema : categorySchema};

module.exports = {
    LitContent: mongoose.model('LitContent', contentSchema, 'Literacy Content'),
    MathContent: mongoose.model('MathContent', contentSchema, 'Math Content'),
    mcqSchema : mcqSchema, categorySchema : categorySchema
}; 