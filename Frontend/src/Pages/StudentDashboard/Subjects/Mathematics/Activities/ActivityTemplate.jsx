import { useEffect, useState } from "react";
import ActivityQuestionImage from "../../../../../Assets/ActivityImageTemp2.png";
import AnswerImage1 from "../../../../../Assets/ActivityOptionImageTemp3.png";
import AnswerImage2 from "../../../../../Assets/ActivityOptionImageTemp4.png";

import ActivityTemplateClock from "../../../../../Assets/ActivityTemplateClock.png";

//import { ActivityTemplate1 } from "../../../../../Components/Templates/ActivityTemplate1";

export const ActivityTemplate = () => {
    const [timerValue, setTimerValue] = useState(0);

    const activityDetails = {
        ActivityTemplateId: 1,
        ActivityDescription: "SELECT NUMBER WHICH MATCHES THE SIGN",
        ActivityTimeStart: new Date(),
        ActivityTimeEnd: "Feb 05, 2024 08:37:25",
        ActivityDurationInMinutes: 15,
        ActivityQuestionImage: ActivityQuestionImage,
        ActivityAnswersImage: [
            {
                AnswerImage: AnswerImage1,
                AnswerId: 1,
            },
            {
                AnswerImage: AnswerImage2,
                AnswerId: 2,
            },
        ],
    };

    const activityTemplates = [
        {
            ActivityTemplateId: 1,
            TemplateComponent: <ActivityTemplate1 activityData={activityDetails} />,
        },
    ];

    const calculateTimer = (endDate) => {
        // Set the date we're counting down to
        var countDownDate = new Date(endDate).getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            setTimerValue(hours + "h " + minutes + "m " + seconds + "s ");

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                setTimerValue("TIMES UP!");
            }
        }, 1000);
    };

    useEffect(() => {
        calculateTimer(activityDetails.ActivityTimeEnd);
    }, []);

    return (
        <div className="MathematicsHomeContent">
            <div className="ActivityHeader">
                <div className="ActivityHeaderText">
                    {activityDetails.ActivityDescription}
                </div>
                <div className="ActivityTimer">
                    {timerValue} &nbsp;
                    <img src={ActivityTemplateClock} />
                </div>
            </div>

            {
                activityTemplates.find((item) =>
                        item.ActivityTemplateId === activityDetails.ActivityTemplateId
                )?.TemplateComponent
            }
        </div>
    );
};
