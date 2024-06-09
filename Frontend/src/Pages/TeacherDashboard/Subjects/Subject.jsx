import { Link } from "react-router-dom"

export const Subject = ({ subjectName, subjectImage, localRouteLink }) => {

    return (
        <div className="StudentDashboardSubject">
            <Link to={localRouteLink} className="">
                <img src={subjectImage} alt={subjectName} />
                <span>{subjectName}</span>
            </Link>
        </div>
    )

}