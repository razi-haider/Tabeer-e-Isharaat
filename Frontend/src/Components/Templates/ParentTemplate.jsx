import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion"; // Import motion components from Framer Motion
import { useNavigate, useParams } from "react-router-dom";
import ExtractCourseNameFromUrl from "../../Utils/ExtractCourseName";

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

/* Activity Type Templates */
import { MCQTemplate } from "./MCQTemplate";
import { MatchActivityTemplate } from "./MatchActivityTemplate";

export const ParentTemplate = () => {
    const course = ExtractCourseNameFromUrl(window.location.href);

    const { name: activityName } = useParams();
    const { user, type } = useAuthContext();
    const navigate = useNavigate();

    const [activity, setActivity] = useState(null);
    const [score, setScore] = useState(0); // Keep track of the activity score of student
    const [marksPerQuestion, setMarksPerQuestion] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question index
    const [activityFinished, setActivityFinished] = useState(false);

    const [showConfetti, setShowConfetti] = useState(false); // State to control visibility of Confetti
    const [showCorrectAvatar, setShowCorrectAvatar] = useState(""); // State to control correct avatar animation
    const [showWrongAvatar, setShowWrongAvatar] = useState(false); // State to control wrong answer avatar animation

    // Arrays for storing avatar images
    const correctAnswerAvatars = [BoyThumbsUp, GirlThumbsUp];
    const wrongAnswerAvatars = [
        BoyThinking,
        GirlThinking,
        BoyThumbsDown,
        GirlThumbsDown,
    ];

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch(
                `http://localhost:4000/api/activity/getOneActivity/${course}/${activityName}`
            );
            let json = await response.json();
            // Debugging
            if (!response.ok) {
                console.log(json.error);
            } else {
                //console.log(json);
                setActivity(json); // set the activity state to the json response received
            }
        };
        fetchActivities();
    }, []);

    // Function to extract the question text from the question.
    // Example: question = "what is the sign for <book.png>", question text = "what is the sign for"
    function extractQuestionText(question) {
        const textBeforeTag = question.substring(0, question.indexOf("<")).trim();
        return textBeforeTag;
    }

    // Function to extract url within <> tags in question
    // Example: question = "what is the sign for <mywebsite.com/book.png>", extracted url = "mywebsite.com/book.png"
    function extractUrlFromQuestion(question) {
        const regex = /<([^>]*)>/; // Regular expression to match text inside angle brackets
        const matches = question.match(regex);
        const extractedString = matches ? matches[1] : null;
        return extractedString;
    }

    const handleOptionClick = (correct) => {
        const questionMark = activity.questions[currentQuestionIndex].marks; // Get the current question mark
        let newMarksPerQuestion = [...marksPerQuestion]; // Create a copy of the marksPerQuestion array
        if (correct) {
            newMarksPerQuestion.push(1);
            setScore(score + questionMark);
            setShowConfetti(true); // Set showConfetti state to true if answer is correct
            setTimeout(() => {
                // reset the Confetti state to false after 5 secs
                setShowConfetti(false);
            }, 5000);

            const randomIndex = Math.floor(
                Math.random() * correctAnswerAvatars.length
            );
            setShowCorrectAvatar(correctAnswerAvatars[randomIndex]); // Select a random correct avatar
            setTimeout(() => {
                setShowCorrectAvatar("");
            }, 5000);
        } else {
            newMarksPerQuestion.push(0);
            const randomIndex = Math.floor(Math.random() * wrongAnswerAvatars.length);
            setShowWrongAvatar(wrongAnswerAvatars[randomIndex]); // Select a random correct avatar
            setTimeout(() => {
                setShowWrongAvatar("");
            }, 5000);
        }
        setMarksPerQuestion(newMarksPerQuestion); // update the marksPerQuestion array

        //
        if (currentQuestionIndex == activity.questions.length - 1) {
            setTimeout(() => {
                setActivityFinished(true);
            }, 3000);
        }
    };

    const fetchStudentId = async () => {
        try {
            const studentResponse = await fetch(
                `http://localhost:4000/api/users/getUser/${user.email}`,
                {
                    headers: {
                        Authorization: `Bearer: ${user.token}`,
                    },
                }
            );
            if (!studentResponse.ok) {
                throw new Error("Failed to fetch student data");
            }
            const studentJson = await studentResponse.json();
            return studentJson; // student ID is available in the response
        } catch (error) {
            console.error("Error fetching student data:", error);
            return null;
        }
    };

    const fetchActivityId = async () => {
        try {
            const activityResponse = await fetch(
                `http://localhost:4000/api/activity/getActivityId/${course}/${activityName}`,
                {
                    headers: {
                        Authorization: `Bearer: ${user.token}`,
                    },
                }
            );
            if (!activityResponse.ok) {
                throw new Error("Failed to fetch activity data");
            }
            const activityJson = await activityResponse.json();
            return activityJson; // activity ID is available in the response
        } catch (error) {
            console.error("Error fetching activity data:", error);
            return null;
        }
    };

    const handleExitClick = async () => {
        const url = window.location.pathname;
        const parts = url.split("/");
        const path = "/" + parts[1] + "/" + parts[2];
        navigate(path);
        // if (type === "Student") {
        //     const studentId = await fetchStudentId();
        //     const activityId = await fetchActivityId();
        //     if (studentId && activityId) {
        //         const data = {
        //             course: course,
        //             activityId: activityId.toString(),
        //             studentId: studentId.toString(),
        //             totalGrade: score,
        //             marksPerQuestion: marksPerQuestion,
        //             activityName: activityName,
        //         }
        //         // const data = {
        //         //     course: course,
        //         //     activityName: 
        //         //     studentId: studentId.toString(),
        //         //     totalGrade: score,
        //         //     marksPerQuestion: marksPerQuestion,
        //         //     activityName: activityName,
        //         // };
        //         try {
        //             const publishResponse = await fetch(
        //                 `http://localhost:4000/api/grades/publishGradeForStudent`,
        //                 {
        //                     method: "POST",
        //                     headers: {
        //                         "Content-Type": "application/json",
        //                         Authorization: `Bearer: ${user.token}`,
        //                     },
        //                     body: JSON.stringify(data),
        //                 }
        //             );
        //             if (!publishResponse.ok) {
        //                 throw new Error("Failed to publish grade");
        //             }
        //             navigate(path); // Navigate back to the course dashboard after publishing grade
        //         } catch (error) {
        //             console.error("Error publishing grade:", error);
        //         }
        //     } else {
        //         console.error("Failed to fetch necessary data");
        //     }
        // } else {
        //     // If user type is teacher, navigate back to course dashboard without publishing any grade
        //     navigate(path);
        // }
    };

    // const handleExitClick = async () => {
    //     const url = window.location.pathname;
    //     const parts = url.split("/");
    //     const path = "/" + parts[1] + "/" + parts[2];
    //     if (type === "Student") {
    //         try {
    //             // Fetching student data
    //             const studentResponse = await fetch(
    //                 `http://localhost:4000/api/users/getUser/${user.email}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer: ${user.token}`,
    //                     },
    //                 }
    //             );
    //             if (!studentResponse.ok) {
    //                 throw new Error("Failed to fetch student data");
    //             }
    //             const studentJson = await studentResponse.json();
    //             const studentId = studentJson; // Assuming student ID is available in the response

    //             // Fetching activity ID
    //             const activityResponse = await fetch(
    //                 `http://localhost:4000/api/activity/getActivityId/${course}/${activityName}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer: ${user.token}`,
    //                     },
    //                 }
    //             );
    //             if (!activityResponse.ok) {
    //                 throw new Error("Failed to fetch activity data");
    //             }
    //             const activityJson = await activityResponse.json();
    //             const activityId = activityJson; // Assuming activity ID is available in the response

    //             // Publishing the grade
    //             const data = {
    //                 course: course,
    //                 activityId: activityId.toString(),
    //                 studentId: studentId.toString(),
    //                 totalGrade: score,
    //                 marksPerQuestion: marksPerQuestion,
    //                 activityName: activityName,
    //             };
    //             const publishResponse = await fetch(
    //                 `http://localhost:4000/api/grades/publishGradeForStudent`,
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer: ${user.token}`,
    //                     },
    //                     body: JSON.stringify(data),
    //                 }
    //             );
    //             if (!publishResponse.ok) {
    //                 throw new Error("Failed to publish grade");
    //             }
    //             navigate(path); // Navigate back to the course dashboard after publishing grade
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     } else {
    //         // If user type is teacher, navigate back to course dashboard without publishing any grade
    //         navigate(path);
    //     }
    // };

    // const handleExitClick = async () => {
    //     const url = window.location.pathname;
    //     const parts = url.split("/");
    //     const path = "/" + parts[1] + "/" + parts[2];
    //     if (type === "Student") {
    //         let studentId, activityId;
    //         //console.log(`user email: ${user.email}`);
    //         //console.log(`user: ${user}`);
    //         // get the studentId
    //         const studentResponse = await fetch(
    //             `http://localhost:4000/api/users/getUser/${user.email}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer: ${user.token}`,
    //                 },
    //             }
    //         );
    //         let studentJson = await studentResponse.json();
    //         if (!studentResponse.ok) {
    //             console.log(studentJson.error);
    //         } else {
    //             studentId = studentJson;
    //         }

    //         // get the activityId
    //         const activityResponse = await fetch(
    //             `http://localhost:4000/api/activity/getActivityId/${course}/${activityName}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer: ${user.token}`,
    //                 },
    //             }
    //         );
    //         let activityJson = await activityResponse.json();
    //         if (!activityResponse.ok) {
    //             console.log(activityJson.error);
    //         } else {
    //             activityId = activityJson;
    //             //console.log(`activityId: ${activityJson}`);
    //         }

    //         // publish the grade

    //         const data = {
    //             course: course,
    //             activityId: activityId.toString(),
    //             studentId: studentId.toString(),
    //             totalGrade: score,
    //             marksPerQuestion: marksPerQuestion,
    //             activityName: activityName,
    //         };
    //         //console.log(data);

    //         const publishResponse = await fetch(
    //             `http://localhost:4000/api/grades/publishGradeForStudent`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer: ${user.token}`,
    //                 },
    //                 body: JSON.stringify(data),
    //             }
    //         );
    //         let publishJson = await publishResponse.json();
    //         if (!publishResponse.ok) {
    //             console.log(publishJson.error);
    //         } else {
    //             navigate(path); // navigate back to the course dashboard
    //         }
    //     } else {
    //         // if user type is teacher then directly navigate back to course dashboard without publishing any grade
    //         navigate(path);
    //     }
    // };

    const handleNextButtonClick = () => {
        if (currentQuestionIndex < activity.questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
        }
    };
    const handleBackButtonClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1); // Move to the previous question
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: "#333",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div style={{ position: "absolute", top: 15, right: 50 }}>
                    <ExitConfirmationDialog handleYesClick={handleExitClick} />
                </div>
                {showConfetti && <Confetti recycle={false} />}

                {activity ? (
                    <React.Fragment>
                        <CssBaseline />
                        <Container
                            maxWidth="xl"
                            sx={{
                                position: "relative",
                                marginTop: "50px",
                            }}
                        >
                            {activity.questions[currentQuestionIndex].type === "MCQ" && (
                                <MCQTemplate
                                    questionType={"MCQ"}
                                    questionText={extractQuestionText(
                                        activity.questions[currentQuestionIndex].question
                                    )}
                                    questionUrl={extractUrlFromQuestion(
                                        activity.questions[currentQuestionIndex].question
                                    )}
                                    options={activity.questions[currentQuestionIndex].options}
                                    answer={activity.questions[currentQuestionIndex].answer}
                                    handleOption={handleOptionClick}
                                />
                            )}

                            {activity.questions[currentQuestionIndex].type === "Match" && (
                                <MatchActivityTemplate
                                    questionType={"Match"}
                                    questionText={extractQuestionText(
                                        activity.questions[currentQuestionIndex].question
                                    )}
                                    questionUrl={extractUrlFromQuestion(
                                        activity.questions[currentQuestionIndex].question
                                    )}
                                    options={activity.questions[currentQuestionIndex].options}
                                    answer={activity.questions[currentQuestionIndex].answer}
                                    handleOption={handleOptionClick}
                                />
                            )}

                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    marginBottom: 2,
                                    marginRight: 2,
                                }}
                            >
                                <FloatingActionButton
                                    forward={true}
                                    handleClick={handleNextButtonClick}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    marginBottom: 2,
                                    marginLeft: 2,
                                }}
                            >
                                <FloatingActionButton
                                    forward={false}
                                    handleClick={handleBackButtonClick}
                                />
                            </Box>
                        </Container>
                    </React.Fragment>
                ) : (
                    <h1>Loading...</h1>
                )}
                {activityFinished && (
                    <LayoutModalDialog
                        grade={[score, activity.questions.length]}
                        onClose={handleExitClick}
                    />
                )}
                {showCorrectAvatar && (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 900 },
                            visible: { opacity: 1, y: -1 },
                        }}
                        initial="hidden"
                        animate="visible"
                        style={{
                            position: "absolute",
                            textAlign: "center",
                            height: "100vh", // Limit the container's height to the viewport height
                            overflow: "hidden", // Hide overflow content
                            zIndex: 9999, // Ensure the avatar is above other elements
                        }}
                    >
                        <img
                            src={showCorrectAvatar}
                            alt="correct answer avatar"
                            style={{
                                width: "50%",
                                height: "auto",
                                margin: "0 auto", // Center horizontally
                            }}
                        />
                    </motion.div>
                )}
                {showWrongAvatar && (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 900 },
                            visible: { opacity: 1, y: -1 },
                        }}
                        initial="hidden"
                        animate="visible"
                        style={{
                            position: "absolute",
                            textAlign: "center",
                            height: "100vh", // Limit the container's height to the viewport height
                            overflow: "hidden", // Hide overflow content
                            zIndex: 9999, // Ensure the avatar is above other elements
                        }}
                    >
                        <img
                            src={showWrongAvatar}
                            alt="wrong answer avatar"
                            style={{
                                width: "50%",
                                height: "auto",
                                margin: "0 auto", // Center horizontally
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </>
    );
};
