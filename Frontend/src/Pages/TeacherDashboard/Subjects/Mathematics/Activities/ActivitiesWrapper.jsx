import { useEffect, useState } from "react";
import { Activity } from "./Activity";
import ExtractCourseNameFromUrl from "../../../../../Utils/ExtractCourseName";

export const ActivitiesWrapper = ({ dataFromWrapper }) => {
    const url = window.location.href;
    const course = ExtractCourseNameFromUrl(url);
    const [activities, setActivities] = useState([]);
    useEffect(() => {
      const fetchActivities = async () => {
        const response = await fetch(`http://localhost:4000/api/activity/getActivities/${course}`); 
        let json = await response.json();
        // Debugging
        if (!response.ok) {
            console.log(json.error);
        } else {
            //console.log(json);
            setActivities(json); // set the activities state to the json response received
        }
      }
      fetchActivities();
    }, []);

    return (
        <div className="ActivitiesWrapper">
            <div className="StudentDashboardSubjects">
                {activities.map((activity, index) => (
                    <Activity
                        key={index}
                        activity={activity}
                        sendActivityToWrapper={dataFromWrapper}
                    />
                ))}
            </div>
        </div>
    );
};
