// import { useEffect, useState } from "react";
// import { Activity } from "./Activity";
// import ExtractCourseNameFromUrl from "../../../../../Utils/ExtractCourseName";

// export const ActivitiesWrapper = ({ dataFromWrapper }) => {
//     const url = window.location.href;
//     const course = ExtractCourseNameFromUrl(url);
//     const [activities, setActivities] = useState([]);
//     useEffect(() => {
//       const fetchActivities = async () => {
//         const response = await fetch(`http://localhost:4000/api/activity/getActivities/${course}`); 
//         let json = await response.json();
//         // Debugging
//         if (!response.ok) {
//             console.log(json.error);
//         } else {
//             //console.log(json);
//             setActivities(json); // set the activities state to the json response received
//         }
//       }
//       fetchActivities();
//     }, []);

//     return (
//         <div className="ActivitiesWrapper">
//             <div className="StudentDashboardSubjects">
//                 {activities.map((activity, index) => (
//                     <Activity
//                         key={index}
//                         activity={activity}
//                         sendActivityToWrapper={dataFromWrapper}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityLock from "../../../../../Assets/Password.png";
import ActivityImage from "../../../../../Assets/ActivityImage.png";
import ExtractCourseNameFromUrl from "../../../../../Utils/ExtractCourseName";

export const ActivitiesWrapper = () => {
    const url = window.location.href;
    const course = ExtractCourseNameFromUrl(url);
    const [activities, setActivities] = useState([]);
    const navigateTo = useNavigate();
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch(
                `http://localhost:4000/api/activity/getActivities/${course}`
            );
            let json = await response.json();
            // Debugging
            if (!response.ok) {
                console.log(json.error);
            } else {
                //console.log(json);
                setActivities(json); // set the activities state to the json response received
            }
        };
        fetchActivities();
    }, []);

    function Activity({ name, show }) {
        const handleActivityClick = () => {
            let url = window.location.href;
            url = url.substring(url.indexOf("5173") + "5173".length) + "/" + name;
            navigateTo(url);
        };

        return (
            <div
                className={`StudentDashboardSubject ${show ? "" : "ActivityLocked"}`}
                onClick={handleActivityClick}
            >
                {!show && (
                    <img
                        src={ActivityLock}
                        className="ActivityLockedImage"
                        alt="Activity Locked"
                    />
                )}
                <img src={ActivityImage} alt={name} />
                <span className="sparklingLightAnimation">{name}</span>
            </div>
        );
    }

    return (
        <div className="ActivitiesWrapper">
            <div className="StudentDashboardSubjects">
                {activities.map((activity, index) =>
                    <Activity key={index} name={activity.name} show={activity.show} />
                )}
            </div>
        </div>
    );
};
