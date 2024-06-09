import StudentDashboardMathematicsImage from "../../../Assets/StudentDashboardMaths.png";
import StudentDashboardLiteracyImage from "../../../Assets/StudentDashboardLiteracy.png";
import { Subject } from "./Subject";
import { LOCAL_ROUTES } from "../../../Config/LocalRoutes";

export const Subjects = () => {
  const subjects = [
    {
      SubjectName: "Mathematics",
      SubjectImage: StudentDashboardMathematicsImage
    },
    {
      SubjectName: "Literacy",
      SubjectImage: StudentDashboardLiteracyImage
    }
  ];

  return (
    <div className="StudentDashboardSubjects">
      {subjects.map((item, index) => (
        <Subject
          key={index}
          subjectName={item.SubjectName}
          subjectImage={item.SubjectImage}
        />
      ))}
    </div>
  );
};
