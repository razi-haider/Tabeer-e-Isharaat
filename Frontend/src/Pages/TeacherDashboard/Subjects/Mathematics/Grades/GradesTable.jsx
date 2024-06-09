
import StudentLiteracyGradesName from "../../../../../Assets/StudentLiteracyGradesName.png"
import StudentImage from "../../../../../Assets/Profile.png"

export const GradesTable = () => {

    const activitesList = [
        {
            "ActivityName": "Vowels",
            "ActivityID": 13
        },
        {
            "ActivityName": "Alphabets",
            "ActivityID": 14
        },
        {
            "ActivityName": "Algebra",
            "ActivityID": 15
        }
    ]

    const activitiesGrades = [
        {
            "StudentName": "Student A",
            "AcitiviesGradesList": [
                {"AcitivyID": 13, "ObtainedMarks": 7.5, "TotalMarks": 10},
                {"AcitivyID": 14, "ObtainedMarks": 3, "TotalMarks": 10},
                {"AcitivyID": 15, "ObtainedMarks": "-", "TotalMarks": 10}
            ]
        },
        {
            "StudentName": "Student B",
            "AcitiviesGradesList": [
                {"AcitivyID": 13, "ObtainedMarks": 9, "TotalMarks": 10},
                {"AcitivyID": 14, "ObtainedMarks": "-", "TotalMarks": 10},
                {"AcitivyID": 15, "ObtainedMarks": 6, "TotalMarks": 10}
            ]
        },
        {
            "StudentName": "Student C",
            "AcitiviesGradesList": [
                {"AcitivyID": 13, "ObtainedMarks": 10, "TotalMarks": 10},
                {"AcitivyID": 14, "ObtainedMarks": 5, "TotalMarks": 10},
                {"AcitivyID": 15, "ObtainedMarks": "-", "TotalMarks": 10}
            ]
        }
        
    ]

    return (
        <table>

            <thead>
                <tr>
                    <th></th>
                    {activitesList.map((item, index) => <th key={index}>
                        <span className="CustomHeader">
                            <img src={StudentLiteracyGradesName} />
                            {item.ActivityName}
                        </span>
                    </th>)}
                    
                    
                </tr>
            </thead>

            <tbody>

                {activitiesGrades.map((item, index) =>
                    <tr key={index}>
                        <th>
                            <span  className="CustomHeader">
                                <img src={StudentImage} />

                                {item.StudentName}
                            </span>
                        </th>
                        {activitesList.map((activity, index) => <td key={index}>
                            <span>
                                {item.AcitiviesGradesList.filter(item => item.AcitivyID == activity.ActivityID).length != 0 ? <b>{item.AcitiviesGradesList.filter(item => item.AcitivyID == activity.ActivityID)[0]?.ObtainedMarks}/{item.AcitiviesGradesList.filter(item => item.AcitivyID == activity.ActivityID)[0]?.TotalMarks}</b> : <b>-</b>}
                            </span>
                        </td>
                        )}
                        
                    </tr>

                )}

            </tbody>

        </table>
    )

}