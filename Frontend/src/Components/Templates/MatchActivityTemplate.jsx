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
import ItemContainer from "../MUIComponents/ItemContainer";
import { useNavigate, useParams } from "react-router-dom";

export const MatchActivityTemplate = ({
    questionType,
    questionText,
    questionUrl,
    options,
    answer,
    handleOption,
}) => {
    //console.log(options)
    //console.log(questionText, questionUrl);
    const url = window.location.href;
    const parts = url.split("/");
    let course = parts[4];
    course = course.slice(0, 1).toUpperCase() + course.slice(1); // get course name and uppercase first letter

    const { name: activityName } = useParams();
    const { user, type } = useAuthContext();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question index

    const handleOptionClick = (option) => {
        if (option == parseInt(answer)) {
            handleOption(true);
        } else {
            handleOption(false);
        }
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
                <Grid container justifyContent="center" sx={{ marginTop: "10px" }}>
                    <Grid item lg={2.5}>
                        <MediaCard
                            src={questionUrl}
                            // handleOption={handleOptionClick}
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
                    <CircularProgressDeterminate key={currentQuestionIndex} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        position: "absolute",
                        top: 40, // Adjust the top value to move it up
                        right: 1080,
                    }}
                >
                    <ItemContainer
                        quantity={parseInt(options[0])}
                        item={options[4]}
                        handleContainerClick={handleOptionClick}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        position: "absolute",
                        top: 320, // Adjust the top value to move it further down
                        right: 1080,
                    }}
                >
                    <ItemContainer
                        quantity={parseInt(options[1])}
                        item={options[4]}
                        handleContainerClick={handleOptionClick}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        position: "absolute",
                        top: 370, // Adjust the top value to move it further down
                        right: 60,
                    }}
                >
                    <ItemContainer
                        quantity={parseInt(options[2])}
                        item={options[4]}
                        handleContainerClick={handleOptionClick}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        position: "absolute",
                        top: 10, // Adjust the top value to move it further down
                        right: 60,
                    }}
                >
                    <ItemContainer
                        quantity={parseInt(options[3])}
                        item={options[4]}
                        handleContainerClick={handleOptionClick}
                    />
                </Box>
            </Box>
        </>
    );
};
