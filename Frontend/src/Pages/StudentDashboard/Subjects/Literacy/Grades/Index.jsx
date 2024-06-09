import StudentLiteracyGradesLine from "../../../../../Assets/StudentLiteracyGradesLine.png";
// import { GradesTable } from './GradesTable';
import StudentLiteracyGradesName from "../../../../../Assets/StudentLiteracyGradesName.png";
import StudentLiteracyGradesDue from "../../../../../Assets/StudentLiteracyGradesDue.png";
import StudentLiteracyGradesScore from "../../../../../Assets/StudentLiteracyGradesScore.png";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useEffect, useState } from "react";

/* Utils */
import ExtractCourseNameFromUrl from "../../../../../Utils/ExtractCourseName";


export const LiteracyGradesContent = () => {
    const url = window.location.href;
    const course = ExtractCourseNameFromUrl(url);
    const { user, type } = useAuthContext();
    const [grades, setGrades] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            const response = await fetch(
                `http://localhost:4000/api/grades/getCourseGradesForStudent/${course}/${user.email}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer: ${user.token}`,
                    },
                }
            );
            let json = await response.json();
            // Debugging
            if (!response.ok) {
                console.log(json.error);
            } else {
                //console.log(json);
                //console.log(json);
                setGrades(json);
            }
        };
        fetchGrades();
    }, []);

    // Function to map overall grade to letter grade
function mapToLetterGrade(grade) {
    if (grade >= 90) return 'A';
    else if (grade >= 80) return 'B';
    else if (grade >= 70) return 'C';
    else if (grade >= 60) return 'D';
    else return 'F';
  }

    function totalGrade(grades) {
        // Calculate total number of questions answered
        const totalQuestions = grades.reduce(
            (total, activity) => total + activity.marksPerQuestion.length,
            0
        );

        // Calculate overall grade
        let overallGrade =
            grades.reduce((total, activity) => total + activity.totalGrade, 0) /
            totalQuestions;
        overallGrade = overallGrade * 100;
        return {numericalGrade: overallGrade.toFixed(1), letterGrade: mapToLetterGrade(overallGrade)};
    }

    return (
        <div className="MathematicsHomeContent">
            <div className="LiteracyGrades">
                {/* Table */}
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span className="CustomHeader">
                                    <img src={StudentLiteracyGradesName} />
                                    NAME
                                </span>
                            </th>
                            <th>
                                <span className="CustomHeader">
                                    <img src={StudentLiteracyGradesDue} />
                                    DUE DATE
                                </span>
                            </th>
                            <th>
                                <span className="CustomHeader">
                                    <img src={StudentLiteracyGradesScore} />
                                    GRADE
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {grades &&
                            grades.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <span style={{ fontWeight: 600 }}>{item.activityName}</span>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600 }}>
                                            {"2021-09-30 08:00:00 AM"}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600 }}>
                                            {/* <b>{item.totalGrade + "/" + item.marksPerQuestion.length}</b> */}
                                            <b>
                                                {(item.totalGrade / item.marksPerQuestion.length) *
                                                    100 +
                                                    "%"}
                                            </b>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Line */}
                <img
                    src={StudentLiteracyGradesLine}
                    className="LiteracyGradeImageLine"
                />

                {/* Final Grade */}
                <div className="LiteracyGradeFinalGrade">
                    <span>TOTAL</span>
                    <span>{grades ? totalGrade(grades).numericalGrade : "N/A"}</span>
                    <span>{grades && totalGrade(grades).letterGrade}</span>
                </div>
            </div>
        </div>
    );
};
