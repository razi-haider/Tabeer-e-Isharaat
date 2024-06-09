const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    image: {
        type: String,
        required: true
    },
    signvideo: {
        type: String,
        required: true
    },
    gallaudetfont: {
        type: String,
        required: true
    },
    // word category 
    category: {
        type: String,
        required: true
    }
})

// 3rd param of mongoose.model indicates which collection the model will go into mongodb atlas
module.exports = {
    LitWord: mongoose.model('LitWord', wordSchema, 'Literacy'),
    MathWord: mongoose.model('MathWord', wordSchema, 'Mathematics')
};

// module.exports = mongoose.model('Word', wordSchema, 'Words');
