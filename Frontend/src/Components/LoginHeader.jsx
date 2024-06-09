import { Link } from "react-router-dom";
import HeaderLogo from "../Assets/HeaderLogo.png";
import { LOCAL_ROUTES } from "../Config/LocalRoutes";
import { useAuthContext } from "../hooks/useAuthContext";

export const LoginHeader = () => {
    const { user } = useAuthContext();
    //console.log("user inside studentdashboard ", user);
    return (
        <div className="LoginHeader">
            <div className="LoginHeaderBox">
                <Link to={LOCAL_ROUTES.HOME}>
                    <img src={HeaderLogo} alt={"DeafLMS"} />
                </Link>
            </div>
            {/* {user && (
                <div>
                    <h2>{user.email}</h2>
                </div>
            )} */}
        </div>
    );
};
