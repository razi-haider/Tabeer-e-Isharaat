const express = require("express");
const {
    getWeeks,
    getCategoriesByWeek,
    getActivityTypes,
    createQuestion,
    deleteQuestion,
    populateQuestions,
    publishActivity,
} = require("../controllers/contentController");

const router = express.Router();

router.get("/getWeeks", getWeeks);
router.get("/getCategoriesByWeek/:course/:week", getCategoriesByWeek);
router.get("/getActivityTypes/:course", getActivityTypes);
router.post("/createQuestion", createQuestion);
router.post("/populateQuestions", populateQuestions);
router.post("/publishActivity", publishActivity);
router.post("/deleteQuestion", deleteQuestion);

module.exports = router;
