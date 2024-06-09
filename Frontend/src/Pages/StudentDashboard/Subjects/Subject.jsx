import { Link } from "react-router-dom"
import { useAuthContext } from "../../../hooks/useAuthContext"

export const Subject = ({ subjectName, subjectImage }) => {
    const { user, type } = useAuthContext();
    return (
        <div className="StudentDashboardSubject">
            <Link 
                to={user ? (`/studentdashboard/${subjectName.toLowerCase()}`) : ("/login")} 
            >
                <img src={subjectImage} alt={subjectName} />
                <span>{subjectName}</span>
            </Link>
        </div>
    )

}