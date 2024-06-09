// import { useState } from "react";

// export const EditDataset = ({ selectedWord, onViewWords, getWords }) => {
//     const [name, setName] = useState(selectedWord.name);
//     const [picture, setPicture] = useState(selectedWord.image);
//     const [category, setCategory] = useState(selectedWord.category);
//     const [signvideo, setSignVideo] = useState(selectedWord.signvideo);
//     const [gallaudetFont, setGallaudetFont] = useState(
//         selectedWord.gallaudetfont
//     );

//     return (
//         <div className="EditDatasetView">
//             <div className="EditDataSetInputs">
//             <span
//                         style={{
//                             fontSize: "1.6rem",
//                             marginLeft: "40px"
//                         }}
//                     >Word:</span>
//             <div className="LoginFormInput" style={{width: "200px", height: "50px"}}>
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>
                
//                 <div className="EditDataSetInput">
//                     <span>Category:</span>
//                     <label htmlFor="word">{category}</label>
//                     <input
//                         type="text"
//                         id="category"
//                         style={{ visibility: "hidden" }}
//                         onChange={(e) => {
//                             setCategory(e.target.value);
//                         }}
//                     />
//                 </div>
//                 <div className="EditDataSetInput">
//                     <span>Image:</span>
//                     <label htmlFor="image">{picture}</label>
//                     <input
//                         type="text"
//                         id="image"
//                         style={{ visibility: "hidden" }}
//                         onChange={(e) => {
//                             setPicture(e.target.value);
//                         }}
//                     />
//                 </div>
//                 <div className="EditDataSetInput">
//                     <span>Sign GIF:</span>
//                     <label htmlFor="word">{signvideo}</label>
//                     <input
//                         type="text"
//                         id="signvideo"
//                         style={{ visibility: "hidden" }}
//                         onChange={(e) => {
//                             setSignVideo(e.target.value);
//                         }}
//                     />
//                 </div>
//                 <div className="EditDataSetInput">
//                     <span>Gallaudet Font:</span>
//                     <label htmlFor="word">{gallaudetFont}</label>
//                     <input
//                         type="text"
//                         id="gallaudetfont"
//                         style={{ visibility: "hidden" }}
//                         onChange={(e) => {
//                             setGallaudetFont(e.target.value);
//                         }}
//                     />
//                 </div>
                
//             </div>

//             <div className="DataSetOptions">
//                 <button>Update</button>
//                 <button>Delete</button>
//             </div>

//             <button className="EditDataSetViewDataset" onClick={onViewWords}>
//                 View Dataset
//             </button>
//         </div>
//     );
// };


import { useState } from "react";
import "./EditDataset.css"; // Import CSS for styling

export const EditDataset = ({ selectedWord, onViewWords, getWords }) => {
    const [name, setName] = useState(selectedWord.name);
    const [picture, setPicture] = useState(selectedWord.image);
    const [category, setCategory] = useState(selectedWord.category);
    const [signvideo, setSignVideo] = useState(selectedWord.signvideo);
    const [gallaudetFont, setGallaudetFont] = useState(selectedWord.gallaudetfont);

    return (
        <div className="EditDatasetView">
            <div className="EditDataSetInputs">
                <div className="EditDataSetRow">
                    <div className="EditDataSetLabel">WORD:</div>
                    <input
                        type="text"
                        className="EditDataSetInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="EditDataSetRow">
                    <div className="EditDataSetLabel">CATEGORY:</div>
                    <input
                        type="text"
                        className="EditDataSetInput"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="EditDataSetRow">
                    <div className="EditDataSetLabel">IMAGE:</div>
                    <input
                        type="text"
                        className="EditDataSetInput"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div>
                <div className="EditDataSetRow">
                    <div className="EditDataSetLabel">SIGN GIF:</div>
                    <input
                        type="text"
                        className="EditDataSetInput"
                        value={signvideo}
                        onChange={(e) => setSignVideo(e.target.value)}
                    />
                </div>
                <div className="EditDataSetRow">
                    <div className="EditDataSetLabel">GALLAUDET FONT:</div>
                    <input
                        type="text"
                        className="EditDataSetInput"
                        value={gallaudetFont}
                        onChange={(e) => setGallaudetFont(e.target.value)}
                    />
                </div>
            </div>

            <div className="DataSetOptions">
                <button>Update</button>
                <button>Delete</button>
            </div>

            <button className="EditDataSetViewDataset" onClick={onViewWords}>
                View Dataset
            </button>
        </div>
    );
};
