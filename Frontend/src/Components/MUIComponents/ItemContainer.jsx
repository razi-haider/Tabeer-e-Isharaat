// import * as React from "react";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import Button from "@mui/material/Button";

// export default function ItemContainer({ quantity, item, handleContainerClick }) {
//     //console.log(quantity, item);
//     const handleClick = () => {
//         handleContainerClick(parseInt(quantity)); // send data to parent component
//     };
//     return (
//         <>
//             <Button
//                 sx={{
//                     border: "2px solid blue", // Add border style
//                     borderRadius: "2px",
//                     p: 0,
//                 }}
//                 onClick={handleClick}
//             >
//                 <ImageList
//                     sx={{ bgcolor: "#202020", width: "100%", maxWidth: 400, height: 170 }}
//                     cols={4}
//                     rowHeight={164}
//                 >
//                     {Array.from({ length: quantity }).map((_, index) => (
//                         <ImageListItem key={index} sx={{display: 'flex', justifyContent: 'center'}}>
//                             <img
//                                 srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                                 src={`${item}?w=164&h=164&fit=crop&auto=format`}
//                                 alt={"item-image"}
//                                 loading="lazy"
//                                 style={{
//                                     maxWidth: "100%",
//                                     maxHeight: "100%",
//                                     objectFit: "contain",
//                                 }}
//                             />
//                         </ImageListItem>
//                     ))}
//                 </ImageList>
//             </Button>
//         </>
//     );
// }

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";

export default function ItemContainer({ quantity, item, handleContainerClick }) {
    const handleClick = () => {
        handleContainerClick(parseInt(quantity)); // send data to parent component
    };

    // Calculate the number of rows based on the quantity of items
    const rows = Math.ceil(quantity / 4); // Assuming each row contains 4 items

    return (
        <>
            <Button
                sx={{
                    border: "2px solid blue", // Add border style
                    borderRadius: "2px",
                    p: 0,
                }}
                onClick={handleClick}
            >
                <ImageList
                    sx={{ 
                        bgcolor: "#202020", 
                        width: "100%", 
                        maxWidth: 400, 
                        height: rows * 100 - (rows - 1), // Adjusting the height of the container dynamically
                    }}
                    cols={4}
                    rowHeight={100} // Adjust row height
                >
                    {Array.from({ length: quantity }).map((_, index) => (
                        <ImageListItem key={index} sx={{display: 'flex', justifyContent: 'center'}}>
                            <img
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                alt={"item-image"}
                                loading="lazy"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Button>
        </>
    );
}

