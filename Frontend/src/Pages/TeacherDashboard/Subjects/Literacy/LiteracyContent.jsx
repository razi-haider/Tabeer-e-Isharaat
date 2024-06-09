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

import { LiteracyHomeContent } from "./Home/Index";
import { LiteracyActivitiesContent } from "./Activities/Index";
import { useParams } from "react-router-dom";
import { LiteracyGradesContent } from "./Grades/Index";
import { LiteracyPeopleContent } from "./People/Index";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { motion } from "framer-motion";

export const LiteracyContent = () => {
    const { activityId } = 1;
    const isActitivyTemplate = activityId ? true : false;
    const [activityDoing, setIsActivityDoing] = useState(false);
    const { user, type } = useAuthContext();

    const dashboardLinks = [
        {
            LinkName: "Home",
            LocalRouteLink: "/teacherdashboard/literacy",
            LinkImageActive: SidebarHomeBright,
            LinkImageDark: SidebarHomeDark,
            Component: <LiteracyHomeContent user="Teacher" />,
        },
        {
            LinkName: "Activities",
            LocalRouteLink: "/teacherdashboard/literacy/activities",
            LinkImageActive: SidebarActivitiesBright,
            LinkImageDark: SidebarActivitiesDark,
            Component: <LiteracyActivitiesContent />,
        },
        {
            LinkName: "Grades",
            LocalRouteLink: "/teacherdashboard/literacy/grades",
            LinkImageActive: SidebarGradesBright,
            LinkImageDark: SidebarGradesDark,
            Component: <LiteracyGradesContent />,
        },
        {
            LinkName: "Students",
            LocalRouteLink: "/teacherdashboard/literacy/people",
            LinkImageActive: SidebarPeopleBright,
            LinkImageDark: SidebarPeopleDark,
            Component: <LiteracyPeopleContent />,
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

                {activityId && (
                    <LiteracyActivitiesContent isActivityTemplate={isActitivyTemplate} />
                )}
            </div>
        </>
    );
};
