import { LOCAL_ROUTES } from "../../Config/LocalRoutes"

import ManageUsers from "../../Assets/ManageUsers.png"
import ManageDataset from "../../Assets/ManageDataset.png"
import { Link } from "react-router-dom"

export const AdminDashboardContent = () => {

    const adminOptions = [
        {
            Name: "Manage Users",
            Link: LOCAL_ROUTES.ADMIN_DASHBOARD_USERS,
            Image: ManageUsers
        },
        {
            Name: "Manage Dataset",
            Link: LOCAL_ROUTES.ADMIN_DASHBOARD_DATASET,
            Image: ManageDataset
        }
    ]

    return (

        <div className="LoginContent">

            <div className="AdminDashboardOptions">
                {adminOptions.map((option, index) => {
                    return (
                        <div key={index} className="AdminDashboardOption">
                            <Link to={option.Link}>
                                <img src={option.Image} alt={option.Name} />
                                <h3>{option.Name}</h3>
                            </Link>
                        </div>
                    )
                })}
            </div>

        </div>

    )

}