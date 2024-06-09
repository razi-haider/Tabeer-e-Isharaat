const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const gradeSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId, // Reference to the Student model
        required: true
    },
    activityId: {
        type: Schema.Types.ObjectId, // Reference to the MCQ model
        required: true
    },
    activityName: {
        type: String,
        required: true
    },
    marksPerQuestion : [Number],
    totalGrade: {
        type: Number,
        required: true
    }
});


// module.exports = mongoose.model('Grades', gradeSchema, 'Grades');

module.exports = {
    LitGrades: mongoose.model('LitGrades', gradeSchema, 'Literacy Grades'),
    MathGrades: mongoose.model('MathGrades', gradeSchema, 'Math Grades')
};
