const express = require("express");
const {
    getActivities,
    getActivityId,
    getOneActivity,
    deleteActivity,
    getActivitiesByCategory,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/getActivities/:course", getActivities);
router.get("/getActivityId/:course/:name", getActivityId);
router.get("/getOneActivity/:course/:name", getOneActivity);
router.get("/getActivitiesByCategory", getActivitiesByCategory);
router.post("/deleteActivity/:course/:id", deleteActivity);

module.exports = router;
