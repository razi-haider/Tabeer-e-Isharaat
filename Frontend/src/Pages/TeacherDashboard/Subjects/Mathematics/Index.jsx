import { StudentDashboardHeader } from "../../../../Components/StudentDashboardHeader";
import { LOCAL_ROUTES } from "../../../../Config/LocalRoutes";
import { MathematicsContent } from "./MathematicsContent";

export const MathematicsTeacherDasboard = () => {
    return (
        <>
            <StudentDashboardHeader DASHBOARD_LINK={LOCAL_ROUTES.TEACHER_DASHBOARD} />
            <MathematicsContent />
        </>
    );
};
