import { StudentDashboardSidebar } from "../../../../Components/StudentDashboardSidebar";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import SidebarHomeBright from "../../../../Assets/SidebarHomeBright.png";
import SidebarHomeDark from "../../../../Assets/SidebarHomeDark.png";
import SidebarActivitiesBright from "../../../../Assets/SidebarActivitiesBright.png";
import SidebarActivitiesDark from "../../../../Assets/SidebarActivitiesDark.png";
import SidebarGradesBright from "../../../../Assets/SidebarGradesBright.png";
import SidebarGradesDark from "../../../../Assets/SidebarGradesDark.png";

import { MathematicsHomeContent } from "./Home/Index";
import { MathematicsActivitiesContent } from "./Activities/Index";
import { MathematicsGradesContent } from "./Grades/Index";
import "./MathematicsContent.css";

export const MathematicsContent = () => {
    const { activityId } = 1;
    const isActitivyTemplate = activityId ? true : false;
    const { user, type } = useAuthContext();
    const dashboardLinks = [
        {
            LinkName: "Home",
            LocalRouteLink: "/studentdashboard/mathematics",
            LinkImageActive: SidebarHomeBright,
            LinkImageDark: SidebarHomeDark,
            Component: <MathematicsHomeContent user="Student" />,
        },
        {
            LinkName: "Activities",
            LocalRouteLink: "/studentdashboard/mathematics/activities",
            LinkImageActive: SidebarActivitiesBright,
            LinkImageDark: SidebarActivitiesDark,
            Component: <MathematicsActivitiesContent />,
        },
        {
            LinkName: "Grades",
            LocalRouteLink: "/studentdashboard/mathematics/grades",
            LinkImageActive: SidebarGradesBright,
            LinkImageDark: SidebarGradesDark,
            Component: <MathematicsGradesContent />,
        },
    ];

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         if (user) {
    //             const response = await fetch(
    //                 `http://localhost:4000/api/users/getUser/${user.email}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer: ${user.token}`,
    //                     },
    //                 }
    //             );
    //             const json = await response.json();
    //             if (response.ok) {
    //                 setUserName(json.name);
    //             } else console.log(json);
    //         }
    //     };
    //     fetchUser();
    // }, []);
    return (
        <>
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
            </div>
        </>
    );
};
