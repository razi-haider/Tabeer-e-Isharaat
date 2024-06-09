const express = require("express");
const {
    getGradesByCourse,
    getCourseGradesForStudent,
    deleteGradeForStudent,
    getGradesByStudent,
    publishGradeForStudent,
} = require("../controllers/gradeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
// call the reqiureAuth middleware and protect all below API routes unless authentication process is executed
router.use(requireAuth);

router.get("/getGradesByCourse", getGradesByCourse);
router.get("/getCourseGradesForStudent/:course/:email", getCourseGradesForStudent);
router.post("/getGradesByStudent", getGradesByStudent);
router.post("/deleteGradeForStudent", deleteGradeForStudent);
router.post("/publishGradeForStudent", publishGradeForStudent);
// router.post('/publishActivity', publishActivity);
// router.post('/deleteQuestion', deleteQuestion);

module.exports = router;
