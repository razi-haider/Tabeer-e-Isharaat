import { useEffect, useState } from "react";
import BallGradFont from "../../../Assets/BallGradFont.png";
import CatGradFont from "../../../Assets/CatGradFont.png";
import { EditDataset } from "./EditDataset";

export const DatasetTable = () => {
    const [words, setWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState();

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        const response = await fetch(`http://localhost:4000/api/words`);

        let json = await response.json();
        if (!response.ok) {
            console.log(json.error);
        } else {
            console.log(json);
            setWords(json);
        }
    };

    const handleViewWords = () => {
        setSelectedWord(null);
    }

    return (
        <>
            {!selectedWord ? (
                <div className="UsersTableMain">
                    <h1>Manage Dataset</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span>WORD</span>
                                </th>
                                <th>
                                    <span>CATEGORY</span>
                                </th>
                                <th>
                                    <span>IMAGE</span>
                                </th>
                                <th>
                                    <span>SIGN VIDEO</span>
                                </th>
                                <th>
                                    <span>GALLAUDET FONT</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {words && words.map((word, index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setSelectedWord(word)}
                                            title="Click to edit word"
                                        >
                                            <span>{word.name}</span>
                                        </td>
                                        <td>
                                            <span>{word.category}</span>
                                        </td>
                                        <td>
                                            <span className="UsersTableMainImageDiv">
                                                <img
                                                    className="UsersTableMainImage"
                                                    src={word.image}
                                                />
                                            </span>
                                        </td>
                                        <td>
                                            <span className="UsersTableMainImageDiv">
                                                <img
                                                    className="UsersTableMainImage"
                                                    src={word.signvideo}
                                                />
                                            </span>
                                        </td>
                                        <td>
                                            <span className="UsersTableMainImageDiv">
                                                <img
                                                    className="UsersTableMainImage"
                                                    src={word.gallaudetfont}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <button>Add Word</button>
                </div>
            ) : (
                <EditDataset
                selectedWord={selectedWord}
                onViewWords={handleViewWords}
                getWords={fetchWords}
            />
            )}
        </>
    );
};
