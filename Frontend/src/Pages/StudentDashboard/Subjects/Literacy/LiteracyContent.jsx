import { StudentDashboardSidebar } from "../../../../Components/StudentDashboardSidebar";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import SidebarHomeBright from "../../../../Assets/SidebarHomeBright.png";
import SidebarHomeDark from "../../../../Assets/SidebarHomeDark.png";
import SidebarActivitiesBright from "../../../../Assets/SidebarActivitiesBright.png";
import SidebarActivitiesDark from "../../../../Assets/SidebarActivitiesDark.png";
import SidebarGradesBright from "../../../../Assets/SidebarGradesBright.png";
import SidebarGradesDark from "../../../../Assets/SidebarGradesDark.png";

import { LiteracyHomeContent } from "./Home/Index";
import { LiteracyActivitiesContent } from "./Activities/Index";
import { LiteracyGradesContent } from "./Grades/Index";
import "./LiteracyContent.css";

export const LiteracyContent = () => {
    const { activityId } = 1;
    const isActitivyTemplate = activityId ? true : false;
    const { user, type } = useAuthContext();
    const dashboardLinks = [
        {
            LinkName: "Home",
            LocalRouteLink: "/studentdashboard/literacy",
            LinkImageActive: SidebarHomeBright,
            LinkImageDark: SidebarHomeDark,
            Component: <LiteracyHomeContent user="Student" />,
        },
        {
            LinkName: "Activities",
            LocalRouteLink: "/studentdashboard/literacy/activities",
            LinkImageActive: SidebarActivitiesBright,
            LinkImageDark: SidebarActivitiesDark,
            Component: <LiteracyActivitiesContent />,
        },
        {
            LinkName: "Grades",
            LocalRouteLink: "/studentdashboard/literacy/grades",
            LinkImageActive: SidebarGradesBright,
            LinkImageDark: SidebarGradesDark,
            Component: <LiteracyGradesContent />,
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
                    dashboardName={"LITERACY"}
                    dashboardLinks={dashboardLinks}
                />

                {
                    dashboardLinks.find(
                        (item) => item.LocalRouteLink === window.location.pathname
                    )?.Component
                }

                {/* {activityId && (
                    <LiteracyActivitiesContent />
                )} */}
            </div>
        </>
    );
};
