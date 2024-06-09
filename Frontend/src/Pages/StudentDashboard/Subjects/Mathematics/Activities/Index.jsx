import React, { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import CircularProgress from "../../../../../Components/CircularProgress/CircularProgress";
import MathsActivitiesContent1 from "../../../../../Assets/MathsActivitiesBoy.png";
import { ActivitiesWrapper } from "./ActivitiesWrapper";
//import { ActivityTemplate1 } from "../../../../../Components/Templates/MCQTemplate";
import lightBulb from "../../../../../Assets/lightbulb.svg";
import TextCard from "../../../../../Components/MUIBasicCard";
import "./Index.css";

export const MathematicsActivitiesContent = () => {
  const [showCard, setShowCard] = useState(false); // State to control card visibility

  const handleLightbulbClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="container">
      <div className="helpIconContainer" onClick={handleLightbulbClick}>
        <img className="lightAnimation" src={lightBulb} alt="" />
        <h1 className="bounceAnimation">Help</h1>
      </div>
      <div className="cardContainer">{showCard && <TextCard />}</div>
      <>
        <div className="MathematicsHomeContent">
          <ActivitiesWrapper />
        </div>
        <img src={MathsActivitiesContent1} className="MathsActivitiesImage1" />
      </>
    </div>
  );
};
