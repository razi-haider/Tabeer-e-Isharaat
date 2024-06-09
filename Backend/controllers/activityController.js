const { LitActivity, MathActivity } = require('../models/activityModel'); // get the activity Schema
const mongoose = require('mongoose');

const getActivities = async (req, res) => {
    const { course } = req.params;
    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({error : "No such course exists!"});
    }
    try {
        let activities;
        if (course == "Literacy") {
            activities = await LitActivity.find();
            if (!activities) {
                return res.status(404).json({ error: 'Activity not found in specified course!' });
            }
        } else if (course == "Mathematics") {
            activities = await MathActivity.find();
            if (!activities) {
                return res.status(404).json({ error: 'Activity not found in specified course!' });
            }
        }
        return res.status(200).json(activities);
    } catch(error) {
        return res.status(400).json({error: error.message});
    }
}

const getActivityId = async (req, res) => {
    const { course, name } = req.params;
    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({error : "No such course exists!"});
    }

    try {
        // Find activity by name in the database
        let activity;
        if (course == "Mathematics") {
            activity = await MathActivity.findOne({ name });
            if (!activity) {
                return res.status(404).json({ error: 'Activity not found in specified course!' });
            }
        }

        else if (course == "Literacy") {
            activity = await LitActivity.findOne({ name });
            if (!activity) {
                return res.status(404).json({ error: 'Activity not found in specified course!' });
            }
        }
        // Return the found activityId
        res.status(200).json(activity._id);
    } 
    catch(error) {
        res.status(400).json({error: error.message});
    }
}

const getOneActivity = async (req, res) => {
    let { course, name } = req.params; // get word name from URL

    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({error : "No such course exists!"});
    }

    try {
        // Decode back the activity name to handle special characters and remove %'s
        
        name = decodeURIComponent(name);
        console.log(name);
        // Find activity by name in the database
        let activity;
        if (course == "Mathematics") {
            activity = await MathActivity.findOne({ name });
            console.log(activity);
            if (!activity) {
                return res.status(404).json({ error: 'Activity not found in specified course!' });
            }
        }

        else if (course == "Literacy") {
            activity = await LitActivity.findOne({ name });
            if (!activity) {
                return res.status(404).json({ error: 'Activity not found in specified course!' });
            }
        }
        // Return the found activity
        res.status(200).json(activity);
    } 
    catch(error) {
        res.status(400).json({error: error.message});
    }
}

const deleteActivity = async (req, res) => {
    const { course, id } = req.params;
    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({error : "No such course exists!"});
    }
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ error: "Invalid ID" });
       }
       // Find activity by name in the database
       let findActivity; let deletedActivity;
       if (course == "Mathematics") {
           findActivity = await MathActivity.findOne({ _id: id });

           // Check if activity exists
           if (!findActivity) {
               return res.status(404).json({ error: "No such activity exists!" });
           }
           deletedActivity = await MathActivity.findOneAndDelete({ _id: id });
       }

       else if (course == "Literacy") {
           findActivity = await LitActivity.findOne({ _id: id });

           // Check if activity exists
           if (!findActivity) {
               return res.status(404).json({ error: "No such activity exists!" });
           }
           deletedActivity = await LitActivity.findOneAndDelete({ _id: id });
       }
       
       res.status(200).json({ message: 'Activity deleted successfully!', deletedActivity });
   } catch (error) {
       // Handle errors
       res.status(400).json({ error: error.message });
   }

}

const getActivitiesByCategory = async (req, res) => {
    const { course, category } = req.body;
    if (course != "Mathematics" && course != "Literacy") {
        return res.status(404).json({error : "No such course exists!"});
    }
    try {
        let activities;
        if (course == "Mathematics") {
             // Find activities by category in the database
            activities = await MathActivity.find({ category: category });
            if (!activities) {
                return res.status(404).json({ error: 'No activities found in specified category!' });
            }
        }
        else if (course == "Literacy") {
            // Find activities by category in the database
           activities = await LitActivity.find({ category: category });
           if (!activities) {
               return res.status(404).json({ error: 'No activities found in specified category!' });
           }
       }
      
        // Return the found activities
        res.status(200).json({ message: 'Following activities are found', activities });
    }
    catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }

} 


module.exports = { 
    getActivities,
    getActivityId,
    getOneActivity,
    deleteActivity, 
    getActivitiesByCategory
} 
