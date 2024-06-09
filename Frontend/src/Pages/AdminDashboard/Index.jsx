import { StudentDashboardHeader } from "../../Components/StudentDashboardHeader"
import { StudentDashboard } from "../StudentDashboard/Index"
import { AdminDashboardContent } from "./AdminDashboardContent"


export const AdminDashboard = () => {

    return(
        <div className="doc_root">
            <StudentDashboardHeader  />
            <AdminDashboardContent />
        </div>
    )

}