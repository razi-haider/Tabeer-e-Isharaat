// import { useEffect, useState } from "react";
// import lightBulb from "../../../../../Assets/lightbulb.svg";
// import MathsActivitiesContent1 from "../../../../../Assets/MathsActivitiesBoy.png";
// import { ActivitiesWrapper } from "./ActivitiesWrapper";
// import { GenerateActivity } from "./GenerateActivity";
// //import { ActivityTemplate1 } from "../../../../../Components/Templates/MCQTemplate";
// import TextCard from "../../../../../Components/MUIBasicCard";

// export const MathematicsActivitiesContent = ({ dataToParent }) => {
//   const [isGenerateActivity, setIsGenerateActivity] = useState(false);
//   const [isAvailableActivity, setIsAvailableActivity] = useState(false);
//   const [activity, setReceivedActivity] = useState([]);
//   const [showCard, setShowCard] = useState(false); // State to control card visibility

//   // gets the activity when it is clicked from Activities/Activity.jsx
//   const receivedData = (data) => {
//     setReceivedActivity(data);
//     setIsAvailableActivity(true); // Set isAvailableActivity to true when activity is received
//     dataToParent(true);
//   }

//   // debugging
//   // useEffect(() => {
//   //   console.log(activity);
//   // }, [activity]);

//   const handleLightbulbClick = () => {
//     setShowCard(!showCard);
//   };

//   return (
//     <>
//       {!isGenerateActivity && !isAvailableActivity ? (
//         <>
//         <div className="helpIconContainer" onClick={handleLightbulbClick}>
//           <img
//             className="lightAnimation"
//             src={lightBulb}
//             alt=""
//           />
//           <h1 className="bounceAnimation">Help</h1>
//         </div>
//         <div className="cardContainer">
//           {showCard && <TextCard />}
//         </div>
//           <div className="MathematicsHomeContent">
//             <ActivitiesWrapper dataFromWrapper={receivedData}/>

//             <button
//               onClick={(e) => setIsGenerateActivity(true)}
//               className="GenerateActivityButton"
//             >
//               Generate Activity
//             </button>
//           </div>

//           <img
//             src={MathsActivitiesContent1}
//             className="MathsActivitiesImage1"
//           />
//         </>
//       ) : isGenerateActivity ? (
//         <GenerateActivity subject={"Mathematics"}/>
//       ) : (
//         null
//         // <ActivityTemplate1 
//         //   activity={activity}
//         //   isStudent={false}
//         // />
//       )}
//     </>
//   );
// };

import React, { useState } from "react";
import MathsActivitiesContent1 from "../../../../../Assets/MathsActivitiesBoy.png";
import { ActivitiesWrapper } from "./ActivitiesWrapper";
import lightBulb from "../../../../../Assets/lightbulb.svg";
import TextCard from "../../../../../Components/MUIBasicCard";
import { GenerateActivity } from "../../Mathematics/Activities/GenerateActivity";
// import "./Index.css";

export const MathematicsActivitiesContent = () => {
  const [isGenerateActivity, setIsGenerateActivity] = useState(false);
  const [showCard, setShowCard] = useState(false); // State to control card visibility

  const handleLightbulbClick = () => {
    setShowCard(!showCard);
  };

  return (
    <>
      <div className="container">
        {!isGenerateActivity ? (
          <>
            <div className="helpIconContainer" onClick={handleLightbulbClick}>
              <img className="lightAnimation" src={lightBulb} alt="" />
              <h1 className="bounceAnimation">Help</h1>
            </div>
            <div className="cardContainer">{showCard && <TextCard />}</div>
            <div className="MathematicsHomeContent">
              <ActivitiesWrapper />
              <button
                onClick={(e) => setIsGenerateActivity(true)}
                className="GenerateActivityButton"
              >
                Generate Activity
              </button>
            </div>
            <img
              src={MathsActivitiesContent1}
              className="MathsActivitiesImage1"
            />
          </>
        ) : (
          <GenerateActivity subject={"Mathematics"} />
        )}
      </div>
    </>
  );
};
