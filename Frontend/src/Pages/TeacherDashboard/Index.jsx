import { StudentDashboardHeader } from "../../Components/StudentDashboardHeader";
import { LOCAL_ROUTES } from "../../Config/LocalRoutes";
import { TeacherDashboardContent } from "./TeacherDashboardContent";


export const TeacherDashboard = () => {
    return(
        <div className="doc_root">
            <StudentDashboardHeader DASHBOARD_LINK={LOCAL_ROUTES.TEACHER_DASHBOARD} />
            <TeacherDashboardContent />
        </div>
    );
}