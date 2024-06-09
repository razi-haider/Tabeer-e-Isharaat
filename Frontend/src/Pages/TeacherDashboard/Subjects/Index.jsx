import StudentDashboardMathematicsImage from "../../../Assets/StudentDashboardMaths.png";
import StudentDashboardLiteracyImage from "../../../Assets/StudentDashboardLiteracy.png";
import { Subject } from "./Subject";
import { LOCAL_ROUTES } from "../../../Config/LocalRoutes";

export const Subjects = () => {
    const subjects = [
        {
            SubjectName: "Mathematics",
            SubjectImage: StudentDashboardMathematicsImage,
            LocalRouteLink: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS,
        },
        {
            SubjectName: "Literacy",
            SubjectImage: StudentDashboardLiteracyImage,
            LocalRouteLink: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY,
        },
    ];

    return (
        <div className="StudentDashboardSubjects">
            {subjects.map((item, index) => (
                <Subject
                    key={index}
                    subjectName={item.SubjectName}
                    subjectImage={item.SubjectImage}
                    localRouteLink={item.LocalRouteLink}
                />
            ))}
        </div>
    );
};
