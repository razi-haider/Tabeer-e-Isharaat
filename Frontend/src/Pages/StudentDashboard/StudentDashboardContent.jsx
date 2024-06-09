import StudentDashboardGirlBulbImage from "../../Assets/StudentDashboardGirlBulb.png";
import StudentDashboardArrowTopImage from "../../Assets/StudentDashboardContent1.png";
import StudentDashboardArrowDownImage from "../../Assets/StudentDashboardContent2.png";
import StudentDashboardBoyImage from "../../Assets/StudentDashboardBoy.png";
import { Subjects } from "./Subjects/Index";

export const StudentDashboardContent = () => {
    return (
        <div className="LoginContent">
            <div className="StudentDashboardGirlBulb">
                <img src={StudentDashboardGirlBulbImage} alt="" />
            </div>

            <div className="StudentDashboardArrowTop">
                <img src={StudentDashboardArrowTopImage} alt="" />
            </div>

            <div className="StudentDashboardArrowDown">
                <img src={StudentDashboardArrowDownImage} alt="" />
            </div>

            <div className="StudentDashboardBoy">
                <img src={StudentDashboardBoyImage} alt="" />
            </div>

            <Subjects />
        </div>
    );
};
