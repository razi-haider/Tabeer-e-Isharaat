import { useEffect, useState, useRef } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { StudentDashboardHeader } from "../../../../../Components/StudentDashboardHeader";

/* MUI Components */
import DropDown from "../../../../../Components/MUIComponents/DropDown";
import MultilineTextField from "../../../../../Components/MUIComponents/MultilineTextField";
import CustomDatePicker from "../../../../../Components/MUIComponents/DatePicker";
import Alert from "@mui/material/Alert";

/* Utils */
import ExtractCourseNameFromUrl from "../../../../../Utils/ExtractCourseName";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export const GenerateActivity = ({ subject }) => {
  const url = window.location.href;
  const course = ExtractCourseNameFromUrl(url);

  const navigateTo = useNavigate();
  const activityNameRef = useRef(null); // to get activity name

  const [textBox, setTextBox] = useState(""); // for updating words text box
  const [weeks, setWeeks] = useState([]);

  const [categories, setCategories] = useState([]);
  const [disableCategoryDropDown, setDisableCategoryDropDown] = useState(true);

  const [words, setWords] = useState([]);
  const [disableWordsDropDown, setDisableWordsDropDown] = useState(true);

  const [selectedDate, setSelectedDate] = useState(); // State to store date selected from DatePicker
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [WordsDropDownError, setWordsDropDownError] = useState(false);
  // const [selectedWords, setSelectedWords] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchWeeks = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/content/getWeeks"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weeks");
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching weeks:", error);
      return [];
    }
  };

  // Function to fetch categories by week
  const fetchCategoriesByWeek = async (week) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/content/getCategoriesByWeek/${course}/${week}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  // Function to fetch words by category
  const fetchWordsByCategory = async (category) => {
    try {
      //const data = { course: subject, category: category };
      const response = await fetch(
        `http://localhost:4000/api/words/getWordsByCategory/${course}/${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const json = await response.json();
      //console.log(json);
      return json;
    } catch (error) {
      console.error("Error fetching words:", error);
      return [];
    }
  };

  const publishActivity = async (activity) => {
    const activityName = activityNameRef.current.value;
    const data = {
      name: activityName,
      course: course,
      category: selectedCategory,
      questions: activity,
      dueDate: selectedDate,
      show: true,
    };
    const response = await fetch(
      "http://localhost:4000/api/content/publishActivity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let json = await response.json();
    // Debugging
    if (!response.ok) {
      console.log(json.error);
    } else {
      //alert('Activity published!');
      if (window.confirm("Activity published!")) {
        navigateTo(`/TeacherDashboard/${course}/`);
    }
  }
};

  // upon clicking generate button, send the words to the createdActivity.jsx page
  const generate = async () => {
    let show = true;

    const selectedWords = textBox.split("\n").slice(0, -1);
    // console.log(selectedWords);
    const data = {
      course: course,
      words: selectedWords,
      week: selectedWeek,
      categoryName: selectedCategory,
    };

    const response = await fetch(
      "http://localhost:4000/api/content/populateQuestions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Debugging
    if (!response.ok) {
      const errorJson = await response.json();
      console.log(errorJson.error);
    } else {
      const json = await response.json();
      if (json.length > 0) {
        //console.log(json);
        await publishActivity(json);
        //return json;
      } else {
        console.log("Empty response received");
      }
    }

    //console.log(`activity name: ${activityName}\nweek: ${selectedWeek}\n category: ${selectedCategory}\nwords: ${textBox.split("\n")}\n dueDate: ${selectedDate}`);
    // if (
    //   !activityName ||
    //   selectedOption == "Select Week" ||
    //   secondSelectedOption == "Select Category" ||
    //   selectedWords == "Select Words"
    // ) {
    //   alert("Please enter all details");
    // } else {
    //   navigateTo("/teacherDashboard/literacy/activities/CreatedActivity", {
    //     state: {
    //       activityName: activityName,
    //       category: secondSelectedOption,
    //       words: selectedWords,
    //       week: selectedOption,
    //       show: show,
    //       dueDate: dueDate,
    //     },
    //   });
    // }
  };

  const handleWeekDropDown = async (option) => {
    // Get categories based on user's chosen week option
    const fetchedCategories = await fetchCategoriesByWeek(option);
    setCategories(fetchedCategories); // set the categories in drop down list
    setDisableCategoryDropDown(false);
    setSelectedWeek(option);
  };

  const handleCategoryDropDown = async (option) => {
    // Get words based on user's chosen category option
    const fetchedWords = await fetchWordsByCategory(option);
    setWords(fetchedWords); // set the categories in drop down list
    setDisableWordsDropDown(false);
    setSelectedCategory(option);
  };

  let lst = [];
  const handleWordDropDown = (option) => {
    if (!textBox.includes(option)) {
      lst.push(option);
      let txt = textBox;
      txt += option + "\n";
      setTextBox(txt);
    } else {
      setWordsDropDownError(true);

      // Schedule resetting wordsDropDownError back to false after 3 seconds
      setTimeout(() => {
        setWordsDropDownError(false);
      }, 3000); // Adjust the duration (in milliseconds) as needed
    }
  };

  // For rendering only "once", when the screen loads
  useEffect(() => {
    const fetchData = async () => {
      const fetchedWeeks = await fetchWeeks();
      setWeeks(fetchedWeeks); // populate the weeks in the week dropdown
    };
    fetchData();
  }, []);

  return (
    <>
      <StudentDashboardHeader />
      <div className="activityContainer">
        <div className="blueBox">
          <div className="activityNameTextBox">
            <input
              ref={activityNameRef}
              type="text"
              placeholder="Enter Activity Name.."
            />
          </div>
          <div className="blackBox">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="instruction glow">Step 1:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px",
                }}
              >
                <DropDown
                  defaultLabel="Week"
                  options={weeks}
                  value={weeks[0]}
                  handleOptionChange={handleWeekDropDown}
                  disabled={false}
                ></DropDown>{" "}
              </div>
              {/* <div className="instruction glow">Step 2:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px",
                }}
              >
                {" "}
                <DropDown defaultLabel="Activity Type"></DropDown>
              </div> */}

              <div className="instruction glow">Step 2:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px",
                }}
              >
                {" "}
                <DropDown
                  defaultLabel="Category"
                  options={categories}
                  value={"None"}
                  handleOptionChange={handleCategoryDropDown}
                  disabled={disableCategoryDropDown}
                ></DropDown>{" "}
              </div>

              <div className="instruction glow">Step 3:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px",
                }}
              >
                <DropDown
                  defaultLabel="Words"
                  options={words}
                  value={"None"}
                  handleOptionChange={handleWordDropDown}
                  disabled={disableWordsDropDown}
                ></DropDown>
              </div>
              {WordsDropDownError && (
                <Alert variant="filled" severity="error">
                  {"Word already selected!"}
                </Alert>
              )}
            </div>
            <CustomDatePicker onDateChange={handleDateChange} />
            <div
              style={{
                marginLeft: "700px",
                width: "100px",
                marginBottom: "30px",
              }}
            >
              <MultilineTextField text={textBox} />
            </div>
          </div>
          <button className="generateButton" onClick={() => generate()}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
};
