
import AccountGirlImage from "../../Assets/LoginGirl.png"
import AccountHandSettingsImage from "../../Assets/AccountHandSettings.png"
import AccountArrowImage from "../../Assets/AccountArrow.png"
import { AccountForm } from "./AccountForm"
import { StudentDashboardHeader } from "../../Components/StudentDashboardHeader"

export const Account = () => {

    return (
        <div className="doc_root">
            <StudentDashboardHeader />
            <div className="LoginContent">


                <div className="AccountGirl">
                    <img src={AccountGirlImage} alt="" />
                </div>

                <div className="AccountHandSettings">
                    <img src={AccountHandSettingsImage} alt="" />
                </div>

                <div className="AccountArrow">
                    <img src={AccountArrowImage} alt="" />
                </div>

                <AccountForm />

            </div>
        </div>
    )

}