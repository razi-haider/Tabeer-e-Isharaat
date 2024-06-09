import { StudentDashboardHeader } from "../../../Components/StudentDashboardHeader"
import { DatasetTable } from "./DatasetTable"

export const ManageDataset = () => {

    return(

        <div className="doc_root">
            <StudentDashboardHeader />

            <div className="LoginContent">

                <DatasetTable />

            </div>

        </div>

    )

}