// // import * as React from 'react';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Box from '@mui/material/Box';
// // import Container from '@mui/material/Container';

// // export default function SimpleContainer() {
// //   return (
// //     <React.Fragment>
// //       <CssBaseline />
// //       <Container maxWidth="lg">
// //         <Box sx={{ bgcolor: 'black', height: '75vh' }} />
// //       </Container>
// //     </React.Fragment>
// //   );
// // }

// import * as React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import MediaCard from "./CardMedia"; // Assuming MediaCard is in the same directory
// import FloatingActionButton from "./FloatingActionButton";

// export default function SimpleContainer({ options }) {
//     return (
//         <React.Fragment>
//             <CssBaseline />
//             <Container maxWidth="lg">
//                 <Box sx={{ bgcolor: "black", height: "75vh", padding: "20px" }}>
//                     <Grid container spacing={3}>
//                         {options.map((option, index) =>
//                             !option.endsWith("mp4") ? (
//                                 <Grid item xs={12} md={6}>
//                                     <MediaCard src={option} />
//                                 </Grid>
//                             ) : null
//                         )}
//                     </Grid>
//                 </Box>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         right: 0,
//                         marginBottom: 2,
//                         marginRight: 2,
//                     }}
//                 >
//                     <FloatingActionButton forward={true} />
//                 </Box>
//             </Container>
//         </React.Fragment>
//     );
// }

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MediaCard from "./CardMedia"; // Assuming MediaCard is in the same directory
import FloatingActionButton from "./FloatingActionButton";

export default function SimpleContainer({ options }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ position: "relative", paddingBottom: "10px" }} // Adjust paddingBottom to accommodate button height
            >
                <Box sx={{ bgcolor: "black", height: "75vh", padding: "20px" }}>
                    <Grid container spacing={3}>
                        {options.map((option, index) =>
                            !option.endsWith("mp4") ? (
                                <Grid item xs={12} md={6} key={index}>
                                    <MediaCard src={option}/>
                                </Grid>
                            ) : null
                        )}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        marginBottom: 2,
                        marginRight: 2
                    }}
                >
                    <FloatingActionButton forward={true}/>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        marginBottom: 2,
                        marginLeft: 2
                    }}
                >
                    <FloatingActionButton forward={false}/>
                </Box>
            </Container>
        </React.Fragment>
    );
}
