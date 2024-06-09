import EmailImage from "../../Assets/Email.png"
import PasswordImage from "../../Assets/Password.png"
import ProfileImage from "../../Assets/Profile.png"
import AccountImage from "../../Assets/AccountPicture.png"
import LogoutImage from "../../Assets/Logout.png"
import { useLogout } from "../../hooks/useLogout"

export const AccountForm = () => {
    const { logout } = useLogout();
    const handleClick = () => {
        logout();
    }
    return (

        <form className="AccountForm" action="">

            <div className="LoginFormInputs">
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={AccountImage} alt="Upload photo" />
                    </div>
                    <label htmlFor="AccountImage" id="AccountImageText">Upload Picture</label>
                    <input id="AccountImage" type="file" placeholder="Upload Picture"  style={{visibility: "hidden"}} />
                </div>
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={ProfileImage} alt="Name" />
                    </div>
                    <input type="text" placeholder="Name" />
                </div>
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={EmailImage} alt="Email" />
                    </div>
                    <input type="email" placeholder="Username" />
                </div>
                <div className="LoginFormInput" id="noInputPaddingAccount">
                    <div className="LoginFormInputImage">
                        <img src={PasswordImage} alt="Password" />
                    </div>
                    <input type="submit" value="Change Password" />
                </div>

                <div className="LoginFormInput" id="noInputPaddingAccount">
                    <div className="LoginFormInputImage">
                        <img src={LogoutImage} alt="Logout" />
                    </div>
                    <input type="submit" value="Logout" onClick={handleClick} />
                </div>

                
            </div>

        </form>

    )

}