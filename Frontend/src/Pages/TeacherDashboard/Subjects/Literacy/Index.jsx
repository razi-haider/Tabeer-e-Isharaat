import { StudentDashboardHeader } from "../../../../Components/StudentDashboardHeader"
import { LOCAL_ROUTES } from "../../../../Config/LocalRoutes"
import { LiteracyContent } from "./LiteracyContent"


export const LiteracyTeacherDasboard = () => {

    return (
        <>
            <StudentDashboardHeader DASHBOARD_LINK={LOCAL_ROUTES.TEACHER_DASHBOARD} />
            <LiteracyContent />
        </>
    )

}