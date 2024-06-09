import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StudentDashboardHeader } from "../StudentDashboardHeader";
import './CreatedActivity.css';

export const CreatedActivity = ({ subject }) => {
    const navigateTo = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question index
    const [nextButtonText, setNextButtonText] = useState('Next');
    const location = useLocation();
    
    // Function to extract the question text from the question. 
    // Example: question = "what is the sign for <book.png>", question text = "what is the sign for"
    function extractQuestionText(question) {
        const textBeforeTag = question.substring(0, question.indexOf("<")).trim();
        return textBeforeTag;
    }

    // Function to extract url within <> tags in question
    // Example: question = "what is the sign for <mywebsite.com/book.png>", extracted url = "mywebsite.com/book.png"
    function extractUrlFromQuestion(question) {
        const regex = /<([^>]*)>/;  // Regular expression to match text inside angle brackets
        const matches = question.match(regex);
        const extractedString = matches ? matches[1] : null;
        return extractedString;
    }

    const handleNextButtonClick = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
        }
        if(currentQuestionIndex == questions.length - 2) {
            setNextButtonText('Publish'); // for proceeding to publish the activity
        }

        // publish the activity by calling the API
        if(nextButtonText=='Publish') {
            const activityName = location.state.activityName;
            const category = location.state.category;
            const course = subject;
            const dueDate =  location.state.dueDate;
            const show =  location.state.show;
            const data = { 
                name: activityName, 
                course: course,
                category: category,
                questions: questions,
                dueDate: dueDate,
                show: show
            };
            // console.log(data);
            const response = await fetch('http://localhost:4000/api/content/publishActivity', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            let json = await response.json();
            // Debugging
            if (!response.ok) {
                console.log(json.error);
            } else {
                if(window.confirm('Activity published!')) {
                    navigateTo('/TeacherDashboard/Literacy/');
                }
                //alert('Activity published!');
            }
        }
    };

    // for handling what happens when you click an option
    const handleOptionClick = () => {
        console.log("option selected");
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const words = location.state.words;
            const week = location.state.week;
            const category = location.state.category; 
            const data = {
                words: words,
                week: week, 
                categoryName: category 
            };
            const response = await fetch('http://localhost:4000/api/content/populateQuestions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            // Debugging
            if (!response.ok) {
                const errorJson = await response.json();
                console.log(errorJson.error);
            } else {
                const json = await response.json();
                if (json.length > 0) {
                    setQuestions(json);
                    //console.log(json);
                } else {
                    console.log("Empty response received");
                }
            }
        }

        fetchQuestions();
    }, []);

    return (
        <>
            <StudentDashboardHeader />
           <div className="activity-container">
                <div className="questions-container">
                    {questions.length > 0 && (
                        <div key={currentQuestionIndex}>
                            <div className="question-data">
                                <p style={{ color: "white" , fontSize: "30px", fontWeight: "bold"}}>
                                    {extractQuestionText(questions[currentQuestionIndex].question)}
                                </p>
                                {questions[currentQuestionIndex].question.endsWith('.mp4>') === true ? (
                                    <video src={extractUrlFromQuestion(questions[currentQuestionIndex].question)} controls></video>
                                ) : (
                                    <img src={extractUrlFromQuestion(questions[currentQuestionIndex].question)} alt="img" style={{ maxWidth: '100%', alignSelf: 'center' }} />
                                )}
                            </div>
                            <div className="options">
                                {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                   <li className="option" key={optionIndex} onClick={() => handleOptionClick(currentQuestionIndex, optionIndex)}>
                                        {option.endsWith('.mp4') ? (
                                             <video src={option} controls></video>
                                        ) : (
                                            <img src={option} alt={`Option ${optionIndex + 1}`} />
                                            )
                                        }
                                   </li>
                                ))}
                            </div>
                            <button className="next-button" onClick={handleNextButtonClick}>{nextButtonText}</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

