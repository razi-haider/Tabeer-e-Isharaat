import React, { useState } from 'react';
import ActivityImage from "../../../../../Assets/TeacherDashboardActivity.png";
import RainbowColors from "../../../../../Assets/rainbow-colors.png";
import AccountPicture from "../../../../../Assets/AccountPicture.png";
import Classroom from "../../../../../Assets/classroom.png";

export const Activity = ({ activity, sendActivityToWrapper }) => {

    const handleActivityClick = () => {
        sendActivityToWrapper(activity);
    };


    return (

        <div className={"StudentDashboardSubject"} onClick={handleActivityClick}>
            {(activity.name.includes("Colors")) ? 
                <img src={RainbowColors} alt={activity.name} /> :
                (activity.name.includes("Classroom")) ? 
                    <img src={Classroom} alt={activity.name} /> : 
                    <img src={AccountPicture} alt={activity.name} />
            }
            <span className="sparklingLightAnimation">{activity.name}</span>
        </div>
    );
};
