import { StudentDashboardHeader } from "../../../Components/StudentDashboardHeader";
import { UsersTable } from "./UsersTable";

export const ManageUsers = () => {
    return (
        <div className="doc_root">
            <StudentDashboardHeader />

            <div className="LoginContent">
                <UsersTable />
            </div>
        </div>
    );
};
