import { StudentDashboardHeader } from "../../Components/StudentDashboardHeader";
import { LOCAL_ROUTES } from "../../Config/LocalRoutes";
import { StudentDashboardContent } from "./StudentDashboardContent";


export const StudentDashboard = () => {

    return(
        <div className="doc_root">
            <StudentDashboardHeader />
            <StudentDashboardContent />
        </div>
    );

}