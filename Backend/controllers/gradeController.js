const { LitActivity, MathActivity } = require("../models/activityModel");
const { LitGrades, MathGrades } = require("../models/gradeModel"); // get the activity Schema
const { Users, Teacher, Student } = require("../models/userModel");
const mongoose = require("mongoose");

// function to retrieve grades for all students in a course
const getGradesByCourse = async (req, res) => {
    const { course } = req.body;

    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({ error: "No such course exists!" });
    }
    try {
        let grades;
        if (course == "Mathematics") {
            grades = await MathGrades.find();
            if (grades.length == 0) {
                return res
                    .status(404)
                    .json({ error: "No grades found in specified course!" });
            }
        } else if (course == "Literacy") {
            grades = await LitGrades.find();
            if (grades.length == 0) {
                return res
                    .status(404)
                    .json({ error: "No grades found in specified course!" });
            }
        }

        res.status(200).json(grades);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCourseGradesForStudent = async (req, res) => {
    const { course, email } = req.params;
    try {
        const studentId = await Users.find({email: email}).select('_id');
        if(!studentId) {
            return res.status(404).json({ error: "No student found with specificed email!" });
        }
        let grades;
        if (course == "Mathematics") {
            grades = await MathGrades.find({studentId: studentId});
            if (!grades) {
                return res.status(404).json({ error: "No grade found!" });
            }
        } else if (course == "Literacy") {
            grades = await LitGrades.find({studentId: studentId}).select(['activityName', 'marksPerQuestion', 'totalGrade']);
            if (!grades) {
                return res.status(404).json({ error: "No grade found!" });
            }
        }

        // Return the found grade
        return res.status(200).json(grades);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// function to retrieve grade of a student in an activity in a course
const getGradesByStudent = async (req, res) => {
    const { course, activityId, studentId } = req.body;

    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({ error: "No such course exists!" });
    }

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return res.status(404).json({ error: "invalid activity id" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(404).json({ error: "invalid student id" });
    }

    try {
        // find activity by id
        let grade;
        let activity;
        if (course == "Mathematics") {
            activity = await MathActivity.findOne({ _id: activityId });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }
            grade = await MathGrades.findOne({
                activityId: activityId,
                studentId: studentId,
            });
            if (!grade) {
                return res.status(404).json({ error: "No grade found!" });
            }
        } else if (course == "Literacy") {
            activity = await LitActivity.findOne({ _id: activityId });
            if (!activity) {
                console.log("entered");
                return res.status(404).json({ error: "No such activity found!" });
            }
            grade = await LitGrades.findOne({
                activityId: activityId,
                studentId: studentId,
            });
            if (!grade) {
                console.log("entered2");
                return res.status(404).json({ error: "No grade found!" });
            }
        }

        // Return the found grade
        res.status(200).json(grade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// function to delete grade of a student in an activity in a course
const deleteGradeForStudent = async (req, res) => {
    const { course, activityId, studentId } = req.body;

    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({ error: "No such course exists!" });
    }

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return res.status(404).json({ error: "invalid activity id" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(404).json({ error: "invalid student id" });
    }

    try {
        // find activity by id
        let grade;
        let activity;
        if (course == "Mathematics") {
            activity = await MathActivity.findOne({ activityId: activityId });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }
            grade = await MathGrades.findOneAndDelete({
                activityId: activityId,
                studentId: studentId,
            });
            if (!grade) {
                return res.status(404).json({ error: "No grade found!" });
            }
        } else if (course == "Literacy") {
            activity = await LitActivity.findOne({ activityId: activityId });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }
            grade = await litGrades.findOneAndDelete({
                activityId: activityId,
                studentId: studentId,
            });
            if (!grade) {
                return res.status(404).json({ error: "No grade found!" });
            }
        }

        // Return the found grade
        res.status(200).json({ message: "Grade deleted successfully!", grade });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// function to update grade of a student in an activity in a course
const updateGradeForStudent = async (req, res) => {
    const { course, activityId, studentId } = req.body;

    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({ error: "No such course exists!" });
    }

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return res.status(404).json({ error: "invalid activity id" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(404).json({ error: "invalid student id" });
    }

    try {
        // find activity by id
        let grade;
        let activity;
        if (course == "Mathematics") {
            activity = await MathActivity.findOne({ activityId: activityId });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }
            grade = await MathGrades.findOneAndUpdate({
                activityId: activityId,
                studentId: studentId,
            });
            if (!grade) {
                return res.status(404).json({ error: "No grade found!" });
            }
        } else if (course == "Literacy") {
            activity = await LitActivity.findOne({ activityId: activityId });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }
            grade = await litGrades.findOneAndUpdate({
                activityId: activityId,
                studentId: studentId,
            });
            if (!grade) {
                return res.status(404).json({ error: "No grade found!" });
            }
        }

        // Return the found grade
        res.status(200).json({ message: "Grade updated successfully!", grade });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// function to publish grade for a student for an activity in a course
// const publishGradeForStudent = async (req, res) => {
//     const {
//         course,
//         activityId,
//         studentId,
//         totalGrade,
//         marksPerQuestion,
//         activityName,
//     } = req.body;

//     // validate ID
//     if (!mongoose.Types.ObjectId.isValid(activityId)) {
//         return res.status(404).json({ error: "invalid activity id" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(studentId)) {
//         return res.status(404).json({ error: "invalid student id" });
//     }

//     try {
//         let activity;
//         let student;
//         let grade;
//         if (course == "Mathematics") {
//             activity = await MathActivity.findOne({ _id: activityId });
//             if (!activity) {
//                 return res.status(404).json({ error: "No such activity found!" });
//             }

//             student = await Users.findOne({ _id: studentId });
//             if (!student) {
//                 return res.status(404).json({ error: "No such student exists!" });
//             }

//             grade = await MathGrades.create({
//                 studentId: studentId,
//                 activityId: activityId,
//                 activityName: activityName,
//                 marksPerQuestion: marksPerQuestion,
//                 totalGrade: totalGrade,
//             });
//         } else if (course == "Literacy") {
//             activity = await LitActivity.findOne({ _id: activityId });
//             if (!activity) {
//                 return res.status(404).json({ error: "No such activity found!" });
//             }

//             student = await Users.findOne({ _id: studentId });
//             if (!student) {
//                 return res.status(404).json({ error: "No such student exists!" });
//             }

//             grade = await LitGrades.create({
//                 studentId: studentId,
//                 activityId: activityId,
//                 activityName: activityName,
//                 marksPerQuestion: marksPerQuestion,
//                 totalGrade: totalGrade,
//             });
//         }

//         res.status(200).json({ grade });
//     } catch (error) {
//         // Handle errors
//         res.status(400).json({ error: error.message });
//     }
// };

const publishGradeForStudent = async (req, res) => {
    const {
        course,
        activityName,
        studentEmail,
        totalGrade,
        marksPerQuestion,
    } = req.body;

    try {
        let activity;
        let student;
        let grade;
        if (course == "Mathematics") {
            activity = await MathActivity.findOne({ name: activityName });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }

            student = await Users.findOne({ email: studentEmail });
            if (!student) {
                return res.status(404).json({ error: "No such student exists!" });
            }

            grade = await MathGrades.create({
                studentId: student._id,
                activityId: activity._id,
                activityName: activityName,
                marksPerQuestion: marksPerQuestion,
                totalGrade: totalGrade,
            });
        } else if (course == "Literacy") {
            activity = await LitActivity.findOne({ name: activityName });
            if (!activity) {
                return res.status(404).json({ error: "No such activity found!" });
            }

            student = await Users.findOne({ email: studentEmail });
            if (!student) {
                return res.status(404).json({ error: "No such student exists!" });
            }

            grade = await LitGrades.create({
                studentId: student._id,
                activityId: activity._id,
                activityName: activityName,
                marksPerQuestion: marksPerQuestion,
                totalGrade: totalGrade,
            });
        }

        res.status(200).json({ grade });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getGradesByCourse,
    getCourseGradesForStudent,
    deleteGradeForStudent,
    updateGradeForStudent,
    publishGradeForStudent,
    getGradesByStudent,
};
