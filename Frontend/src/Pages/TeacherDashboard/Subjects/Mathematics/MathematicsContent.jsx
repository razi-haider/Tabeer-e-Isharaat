import { StudentDashboardSidebar } from "../../../../Components/StudentDashboardSidebar";
import { LOCAL_ROUTES } from "../../../../Config/LocalRoutes";

import SidebarHomeBright from "../../../../Assets/SidebarHomeBright.png";
import SidebarHomeDark from "../../../../Assets/SidebarHomeDark.png";
import SidebarActivitiesBright from "../../../../Assets/SidebarActivitiesBright.png";
import SidebarActivitiesDark from "../../../../Assets/SidebarActivitiesDark.png";
import SidebarGradesBright from "../../../../Assets/SidebarGradesBright.png";
import SidebarGradesDark from "../../../../Assets/SidebarGradesDark.png";

import SidebarPeopleBright from "../../../../Assets/SidebarPeopleBright.png";
import SidebarPeopleDark from "../../../../Assets/SidebarPeopleDark.png";

import { MathematicsHomeContent } from "./Home/Index";
import { MathematicsActivitiesContent } from "./Activities/Index";
import { useParams } from "react-router-dom";
import { MathematicsGradesContent } from "./Grades/Index";
import { MathematicsPeopleContent } from "./People/Index";

export const MathematicsContent = () => {
    const { activityId } = useParams();
    const isActitivyTemplate = activityId ? true : false;

    const dashboardLinks = [
        {
            LinkName: "Home",
            LocalRouteLink: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS,
            LinkImageActive: SidebarHomeBright,
            LinkImageDark: SidebarHomeDark,
            Component: <MathematicsHomeContent />,
        },
        {
            LinkName: "Activities",
            LocalRouteLink: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_ACTIVITES,
            LinkImageActive: SidebarActivitiesBright,
            LinkImageDark: SidebarActivitiesDark,
            Component: <MathematicsActivitiesContent />,
        },
        {
            LinkName: "Grades",
            LocalRouteLink: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_GRADES,
            LinkImageActive: SidebarGradesBright,
            LinkImageDark: SidebarGradesDark,
            Component: <MathematicsGradesContent />,
        },
        {
            LinkName: "Students",
            LocalRouteLink: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_PEOPLE,
            LinkImageActive: SidebarPeopleBright,
            LinkImageDark: SidebarPeopleDark,
            Component: <MathematicsPeopleContent />,
        },
    ];

    return (
        <div className="LoginContent">
            <StudentDashboardSidebar
                isActivityTemplate={isActitivyTemplate}
                dashboardName={"MATHEMATICS"}
                dashboardLinks={dashboardLinks}
            />

            {
                dashboardLinks.find(
                    (item) => item.LocalRouteLink === window.location.pathname
                )?.Component
            }

            {activityId && (
                <MathematicsActivitiesContent isActivityTemplate={isActitivyTemplate} />
            )}
        </div>
    );
};
