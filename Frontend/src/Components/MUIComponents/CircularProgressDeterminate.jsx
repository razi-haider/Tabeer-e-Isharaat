// reference: https://mui.com/joy-ui/react-circular-progress/
import CircularProgress from "@mui/joy/CircularProgress";
import { useEffect, useState } from "react";

export default function CircularProgressDeterminate() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 60000; // 60 seconds in milliseconds
    const increment = 0.2; // Adjust increment for smoother transition

    const interval = duration / (100 / increment);
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      determinate
      value={progress}
      thickness={10}
      sx={{ "--CircularProgress-size": "80px" }}
    />
  );
}
