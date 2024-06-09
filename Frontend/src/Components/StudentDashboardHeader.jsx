import { Link } from "react-router-dom";
import HeaderLogo from "../Assets/HeaderLogo.png";
import { LOCAL_ROUTES } from "../Config/LocalRoutes";
import StudentDashboardImage from "../Assets/StudentDashboard.png";
import StudentDashboardAccountImage from "../Assets/StudentDashboardAccount.png";
import { useAuthContext } from "../hooks/useAuthContext";

export const StudentDashboardHeader = () => {
  const { user, type } = useAuthContext();
  return (
    <div className="StudentDashboardHeader">
      <div className="LoginHeaderBox">
        <Link to={
          user ? (
            type === 'Student' ? ("/studentdashboard") : (
              type === 'Teacher' ? ("/teacherdashboard") : ("/")
            )
          ) : (
            "/"
          )
        }>
          <img src={HeaderLogo} alt={"DeafLMS"} />
        </Link>
      </div>

      <div className="StudentDashboardHeaderLinks">
        <div className="StudentDashboardHeaderLink">
        <Link to={
          user ? (
            type === 'Student' ? ("/studentdashboard") : (
              type === 'Teacher' ? ("/teacherdashboard") : ("/")
            )
          ) : (
            "/"
          )
        }>
            <img src={StudentDashboardImage} alt="" />
            Dashboard
          </Link>
        </div>

        <div className="StudentDashboardHeaderLink">
          <Link to={
            user ? ("/account") : ("/")
            }
          >
            <img src={StudentDashboardAccountImage} alt="" />
            Account
          </Link>
        </div>
      </div>
    </div>
  );
};
