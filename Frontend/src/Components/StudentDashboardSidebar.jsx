import { Link } from "react-router-dom"

import SidebarCollapse from "../Assets/SidebarCollapse.png"
import { useEffect, useState } from "react"

export const StudentDashboardSidebar = ({ dashboardLinks, dashboardName,  isActivityTemplate }) => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    // useEffect(() => {

    //     const sidebarElement = document.getElementById("StudentDashboardSidebar")

    //     if (window.innerWidth < 768) {
    //         setIsSidebarCollapsed(true)
    //         sidebarElement.style.display = "none"
    //         document.getElementsByClassName("StudentDashboardSidebarCollapse")[0].style.left = "0"
    //         document.getElementsByClassName("MathematicsHomeContent")[0].style.padding = "0rem"
    //     }

    //     window.addEventListener("resize", () => {
    //         if (window.innerWidth < 768) {
    //             setIsSidebarCollapsed(true)
    //             document.getElementById("StudentDashboardSidebar").style.display = "none"
    //             document.getElementsByClassName("StudentDashboardSidebarCollapse")[0].style.left = "0"
    //             document.getElementsByClassName("MathematicsHomeContent")[0].style.padding = "0rem"
    //         }else{
    //             setIsSidebarCollapsed(false)
    //             document.getElementById("StudentDashboardSidebar").style.display = "block"
    //             document.getElementsByClassName("StudentDashboardSidebarCollapse")[0].style.left = "13rem"
    //             document.getElementsByClassName("MathematicsHomeContent")[0].style.padding = "0rem 0rem 0rem 15rem"
    //         }
    //     })

    // }, [])
    useEffect(() => {
        const sidebarElement = document.getElementById("StudentDashboardSidebar");
    
        const resizeHandler = () => {
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true);
                if (sidebarElement) {
                    sidebarElement.style.display = "none";
                }
                const sidebarCollapseElement = document.getElementsByClassName("StudentDashboardSidebarCollapse")[0];
                if (sidebarCollapseElement) {
                    sidebarCollapseElement.style.left = "0";
                }
                const mathContentElement = document.getElementsByClassName("MathematicsHomeContent")[0];
                if (mathContentElement) {
                    mathContentElement.style.padding = "0rem";
                }
            } else {
                setIsSidebarCollapsed(false);
                if (sidebarElement) {
                    sidebarElement.style.display = "block";
                }
                const sidebarCollapseElement = document.getElementsByClassName("StudentDashboardSidebarCollapse")[0];
                if (sidebarCollapseElement) {
                    sidebarCollapseElement.style.left = "13rem";
                }
                const mathContentElement = document.getElementsByClassName("MathematicsHomeContent")[0];
                if (mathContentElement) {
                    mathContentElement.style.padding = "0rem 0rem 0rem 15rem";
                }
            }
        };
    
        // Call the resize handler initially
        resizeHandler();
    
        // Add event listener
        window.addEventListener("resize", resizeHandler);
    
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    

    return (
        <>
        <div className="StudentDashboardSidebar" id="StudentDashboardSidebar">
            <h1>{dashboardName}</h1>
            {dashboardLinks.map((item, index) =>
                <div key={index} >
                    
                    <Link className="StudentDashboardSidebarLink" to={item.LocalRouteLink}>
                        <img src={location.pathname === item.LocalRouteLink ||(isActivityTemplate && item.LinkName === "Activities") ? item.LinkImageActive : item.LinkImageDark} alt={item.LinkName} />
                    {item.LinkName}</Link>
                </div>
            )}

        </div>
            <img src={SidebarCollapse} className="StudentDashboardSidebarCollapse"
            // onClick={e => {
            //     if (isSidebarCollapsed) {
            //         setIsSidebarCollapsed(false)
            //         document.getElementById("StudentDashboardSidebar").style.display = "block"
            //         document.getElementsByClassName("StudentDashboardSidebarCollapse")[0].style.left = "13rem"
                    
            //         document.getElementsByClassName("MathematicsHomeContent")[0].style.padding = "0rem 0rem 0rem 15rem"
            //         return
            //     }
            //     setIsSidebarCollapsed(true)
            //     document.getElementById("StudentDashboardSidebar").style.display = "none"
            //     document.getElementsByClassName("StudentDashboardSidebarCollapse")[0].style.left = "0"
            //     document.getElementsByClassName("MathematicsHomeContent")[0].style.padding = "0rem"
            // }}
            onClick={e => {
                const sidebarElement = document.getElementById("StudentDashboardSidebar");
                const sidebarCollapseElement = document.getElementsByClassName("StudentDashboardSidebarCollapse")[0];
                const mathContentElement = document.getElementsByClassName("MathematicsHomeContent")[0];
                
                if (isSidebarCollapsed) {
                    setIsSidebarCollapsed(false);
                    if (sidebarElement) sidebarElement.style.display = "block";
                    if (sidebarCollapseElement) sidebarCollapseElement.style.left = "13rem";
                    if (mathContentElement) mathContentElement.style.padding = "0rem 0rem 0rem 15rem";
                } else {
                    setIsSidebarCollapsed(true);
                    if (sidebarElement) sidebarElement.style.display = "none";
                    if (sidebarCollapseElement) sidebarCollapseElement.style.left = "0";
                    if (mathContentElement) mathContentElement.style.padding = "0rem";
                }
            }}
            />
        </>
    )

}