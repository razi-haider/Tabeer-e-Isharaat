import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function MediaCard({ src, handleOptionClick, questionType }) {
  // Determine the maxHeight based on the questionType
  let maxHeight;
  let mediaStyle;
  
  if (questionType === "MCQ") {
    maxHeight = 200;
    // mediaStyle = { minHeight: 200,  maxHeight: maxHeight, minWidth: 100, width: "auto" };
    mediaStyle = {maxHeight: maxHeight, minWidth: 100, width: "auto" };
  } else if (questionType === "Match") {
    maxHeight = 300;
    mediaStyle = { maxWidth: "100%", maxHeight: maxHeight };
  } else {
    maxHeight = 150; // Default height for other types
    mediaStyle = { maxHeight: maxHeight, width: "auto" };
  }

  const handleClick = () => {
    handleOptionClick(src);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "black",
        border: "2px solid #e0e0e0",
        borderRadius: "10px",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            height="auto"
            style={mediaStyle}
            image={src}
            alt=""
            controls
          />
        </div>
      </CardActionArea>
    </Card>
  );
}




// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea } from "@mui/material";

// export default function MediaCard({ src, handleOptionClick, questionType }) {
//   const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

//   // Calculate width and height based on aspect ratio and maximum allowed dimensions
//   const calculateDimensions = () => {
//     const containerWidth = document.getElementById("card-container")?.clientWidth || 345; // Get the width of the card container, default to 345 if not found
//     const maxHeight = (() => {
//       if (questionType === "MCQ") return 200;
//       if (questionType === "Match") return 300;
//       return 150; // Default height for other types
//     })(); // Determine maximum height based on question type

//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const aspectRatio = img.width / img.height;
//       let width = containerWidth;
//       let height = containerWidth / aspectRatio;

//       if (height > maxHeight) {
//         height = maxHeight;
//         width = maxHeight * aspectRatio;
//       }

//       setDimensions({ width, height });
//     };
//   };

//   React.useEffect(() => {
//     calculateDimensions();
//     window.addEventListener("resize", calculateDimensions); // Recalculate dimensions on window resize
//     return () => window.removeEventListener("resize", calculateDimensions); // Cleanup resize event listener
//   }, [src, questionType]); // Recalculate dimensions when src or questionType changes

//   const handleClick = () => {
//     handleOptionClick(src);
//   };

//   return (
//     <div id="card-container" style={{ maxWidth: "100%", overflow: "hidden" }}> {/* Add style for maxWidth and overflow */}
//       <Card
//         sx={{
//           backgroundColor: "black",
//           border: "2px solid #e0e0e0",
//           borderRadius: "10px",
//           width: "100%" // Set card width to 100% to match container width
//         }}
//       >
//         <CardActionArea onClick={handleClick}>
//           <CardMedia
//             component="img"
//             style={{ width: "100%", height: "auto", maxHeight: dimensions.height }}
//             image={src}
//             alt=""
//           />
//         </CardActionArea>
//       </Card>
//     </div>
//   );
// }




