
import StudentLiteracyGradesName from "../../../../../Assets/StudentLiteracyGradesName.png"
import StudentLiteracyGradesScore from "../../../../../Assets/StudentLiteracyGradesScore.png"
import TeacherLiteracyPeoplePercentage from "../../../../../Assets/TeacherLiteracyPeoplePercentage.png"
import StudentImage from "../../../../../Assets/Profile.png"

export const PeopleTable = () => {


    const studentGrades = [
        {
            "StudentName": "Student A",
            "StudentPercentage": 83.4,
            "StudentGrade": "A+"
        },
        {
            "StudentName": "Student B",
            "StudentPercentage": 75.5,
            "StudentGrade": "A"
        },
        {
            "StudentName": "Student C",
            "StudentPercentage": 60.5,
            "StudentGrade": "B"
        }

    ]

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
                            <img src={TeacherLiteracyPeoplePercentage} />
                            PERCENTAGE
                        </span>
                    </th>
                    <th>
                        <span className="CustomHeader">
                            <img src={StudentLiteracyGradesScore} />
                            GRADES
                        </span>
                    </th>


                </tr>
            </thead>

            <tbody>

                {studentGrades.map((item, index) =>
                    <tr key={index}>
                        <td>
                            <span>
                                <b>{item.StudentName}</b>
                            </span>
                        </td>
                        <td>
                            <span>
                                <b>{item.StudentPercentage}%</b>
                            </span>
                        </td>
                        <td>
                            <span>
                                <b>{item.StudentGrade}</b>
                            </span>
                        </td>

                    </tr>

                )}

            </tbody>

        </table>
    )

}