import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ForwardIcon from "@mui/icons-material/Forward";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function FloatingActionButton({ forward, handleClick }) {
    return (
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                sx={{ fontSize: "16px" }}
                onClick={handleClick}
            >
                {forward ? (
                    <>
                        Next
                        <ArrowForwardIcon sx={{ ml: 1 }} />
                    </>
                ) : (
                    <>
                        <ArrowBackIcon sx={{ mr: 1 }} />
                        Back
                    </>
                )}
            </Fab>
        </Box>
    );
}
