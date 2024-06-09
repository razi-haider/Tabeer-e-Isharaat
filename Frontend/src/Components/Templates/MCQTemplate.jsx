import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AnimatePresence, motion } from "framer-motion"; // Import motion components from Framer Motion
import Confetti from "react-confetti";

/* Countdown Timer Component */
import React from "react";

/* Circular Progress Component */
import CircularProgressDeterminate from "../MUIComponents/CircularProgressDeterminate";

/* Model Dialog */
import LayoutModalDialog from "../Modal/Modal";

/* Correct Answer Avatars */
import BoyThumbsUp from "../../Assets/Avatars/Boy- thumbs up (zoomed).PNG";
import GirlThumbsUp from "../../Assets/Avatars/Girl- thumbs up (zoomed).PNG";

/* Wrong Answer Avatars */
import BoyThinking from "../../Assets/Avatars/Boy- thinking (zoomed).PNG";
import GirlThinking from "../../Assets/Avatars/Girl- thinking (zoomed).PNG";
import BoyThumbsDown from "../../Assets/Avatars/Boy- thumbs down (zoomed).PNG";
import GirlThumbsDown from "../../Assets/Avatars/Girl- thumbs down (zoomed).PNG";

/* MUI Components */
import ExitConfirmationDialog from "../MUIComponents/ExitConfirmationDialog";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MediaCard from "../MUIComponents/CardMedia"; // Assuming MediaCard is in the same directory
import FloatingActionButton from "../MUIComponents/FloatingActionButton";
import { useNavigate, useParams } from "react-router-dom";

export const MCQTemplate = ({
  questionType,
  questionText,
  questionUrl,
  options,
  answer,
  handleOption
}) => {
  const url = window.location.href;
  const parts = url.split("/");
  let course = parts[4];
  course = course.slice(0, 1).toUpperCase() + course.slice(1); // get course name and uppercase first letter

  const { name: activityName } = useParams();
  const { user, type } = useAuthContext();
  const navigate = useNavigate();

  const [key, setKey] = useState(0); // Add state for key to re-mount a component 

  const [score, setScore] = useState(0); // Keep track of the activity score of student
  const [marksPerQuestion, setMarksPerQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question index
  const [activityFinished, setActivityFinished] = useState(false);

  // const [showConfetti, setShowConfetti] = useState(false); // State to control visibility of Confetti
  // const [showCorrectAvatar, setShowCorrectAvatar] = useState(""); // State to control correct avatar animation
  // const [showWrongAvatar, setShowWrongAvatar] = useState(false); // State to control wrong answer avatar animation

  // // Arrays for storing avatar images
  // const correctAnswerAvatars = [BoyThumbsUp, GirlThumbsUp];
  // const wrongAnswerAvatars = [
  //   BoyThinking,
  //   GirlThinking,
  //   BoyThumbsDown,
  //   GirlThumbsDown,
  // ];


  // const handleExitClick = async () => {
  //   const url = window.location.pathname;
  //   const parts = url.split("/");
  //   const path = "/" + parts[1] + "/" + parts[2];
  //   if (type === "student") {
  //     let studentId, activityId;

  //     // get the studentId
  //     const studentResponse = await fetch(
  //       `http://localhost:4000/api/users/getUser/${user.email}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer: ${user.token}`,
  //         },
  //       }
  //     );
  //     let studentJson = await studentResponse.json();
  //     if (!studentResponse.ok) {
  //       console.log(studentJson.error);
  //     } else {
  //       studentId = studentJson;
  //     }

  //     // get the activityId
  //     const activityResponse = await fetch(
  //       `http://localhost:4000/api/activity/getActivityId/${course}/${activityName}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer: ${user.token}`,
  //         },
  //       }
  //     );
  //     let activityJson = await activityResponse.json();
  //     if (!activityResponse.ok) {
  //       console.log(activityJson.error);
  //     } else {
  //       activityId = activityJson;
  //       //console.log(`activityId: ${activityJson}`);
  //     }

  //     // publish the grade

  //     const data = {
  //       course: course,
  //       activityId: activityId.toString(),
  //       studentId: studentId.toString(),
  //       totalGrade: score,
  //       marksPerQuestion: marksPerQuestion,
  //       activityName: activityName,
  //     };
  //     console.log(data);

  //     const publishResponse = await fetch(
  //       `http://localhost:4000/api/grades/publishGradeForStudent`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer: ${user.token}`,
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     let publishJson = await publishResponse.json();
  //     if (!publishResponse.ok) {
  //       console.log(publishJson.error);
  //     } else {
  //       navigate(path); // navigate back to the course dashboard
  //     }
  //   } else {
  //     // if user type is teacher then directly navigate back to course dashboard without publishing any grade
  //     navigate(path);
  //   }
  // };

  // Handle student's clicked option
  const handleMCQOptionClick = (option) => {
    // const questionMark = activity.questions[currentQuestionIndex].marks; // Get the current question mark
    // let newMarksPerQuestion = [...marksPerQuestion]; // Create a copy of the marksPerQuestion array
    if (answer == option) {
      // console.log("correct");
      //newMarksPerQuestion.push(1);
      //setScore(score + questionMark);
      handleOption(true);

      // setShowConfetti(true); // Set showConfetti state to true if answer is correct
      // setTimeout(() => {
      //   // reset the Confetti state to false after 5 secs
      //   setShowConfetti(false);
      // }, 5000);

      // const randomIndex = Math.floor(
      //   Math.random() * correctAnswerAvatars.length
      // );
      // setShowCorrectAvatar(correctAnswerAvatars[randomIndex]); // Select a random correct avatar
      // setTimeout(() => {
      //   setShowCorrectAvatar("");
      // }, 5000);
    } else {
      //newMarksPerQuestion.push(0);
      handleOption(false);
      // const randomIndex = Math.floor(Math.random() * wrongAnswerAvatars.length);
      // setShowWrongAvatar(wrongAnswerAvatars[randomIndex]); // Select a random correct avatar
      // setTimeout(() => {
      //   setShowWrongAvatar("");
      // }, 5000);
    }
    setKey(key + 1);

    //setMarksPerQuestion(newMarksPerQuestion); // update the marksPerQuestion array

    //
    // if (currentQuestionIndex == activity.questions.length - 1) {
    //   setTimeout(() => {
    //     setActivityFinished(true);
    //   }, 4000);
    // }
  };

  return (
    <>
      <Box sx={{ bgcolor: "black", height: "86vh", padding: "20px" }}>
        <Typography
          variant="h4"
          component="div"
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: 580,
          }}
          fontFamily="Century Gothic"
        >
          {questionText}
        </Typography>
        <Grid container justifyContent="center" sx={{ marginTop: "10px", marginBottom: "60px" }}>
          <Grid item lg={2.5}>
            <MediaCard
              src={questionUrl}
              questionType={questionType}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            position: "absolute",
            top: 80,
            right: 80,
          }}
        >
          <CircularProgressDeterminate key={key} />
        </Box>
        <Divider
          sx={{
            bgcolor: "gray",
            height: "1px", // Change thickness here
            margin: "30px", // Adjust margin as needed
          }}
          variant="middle"
          component="li"
        />
        <Grid
          container
          justifyContent="center"
          rowSpacing={1}
          columnSpacing={4}
          sx={{ marginTop: "50px" }}
        >
          {options.map(
            (option, index) => (
              <Grid item lg={2.5} key={index}>
                <MediaCard src={option} handleOptionClick={handleMCQOptionClick} questionType={questionType} />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </>
  );
};
