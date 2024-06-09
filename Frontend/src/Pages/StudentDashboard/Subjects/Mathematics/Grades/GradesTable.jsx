import StudentLiteracyGradesName from "../../../../../Assets/StudentLiteracyGradesName.png";
import StudentLiteracyGradesDue from "../../../../../Assets/StudentLiteracyGradesDue.png";
import StudentLiteracyGradesScore from "../../../../../Assets/StudentLiteracyGradesScore.png";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useEffect, useState } from "react";

/* Utils */
import ExtractCourseNameFromUrl from "../../../../../Utils/ExtractCourseName";

export const GradesTable = () => {
    const url = window.location.href;
    // const parts = url.split("/");
    // let course = parts[4];
    // course = course.slice(0, 1).toUpperCase() + course.slice(1); // get course name and uppercase first letter
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
                console.log(json);
                setGrades(json);
            }
        };
        fetchGrades();
    }, []);

    return (
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
                                    <b>{item.totalGrade + "/" + item.marksPerQuestion.length}</b>
                                </span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};
