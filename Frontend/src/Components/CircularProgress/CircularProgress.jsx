import * as React from "react";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";

export default function CircularProgressCountUp({ grade }) {
    const { value: progress, reset } = useCountUp({
        isCounting: true,
        duration: 1,
        start: 0,
        end: (grade[0] / grade[1]) * 100, // scale the grade
    });
    return (
        <CircularProgress
            sx={{ '--CircularProgress-size': '100px' }}
            color="success"
            thickness={10}
            determinate
            value={parseFloat(parseFloat(progress).toFixed(1))}
        >
            <Typography fontSize={24}>{parseFloat(parseFloat(progress).toFixed(1))}%</Typography>
        </CircularProgress>
    );
}
