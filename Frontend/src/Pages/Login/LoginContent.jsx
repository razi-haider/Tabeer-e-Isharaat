import { LoginForm } from "./LoginForm"
import LoginGirl from "../../Assets/LoginGirl.png"
import LoginContent1 from "../../Assets/LoginContent1.png"
import LoginContent2 from "../../Assets/LoginContent2.png"


export const LoginContent = () => {

    return (
        <div className="LoginContent">
            <div className="LoginGirlFormBehind">
                <div className="LoginDiv">
                    <LoginForm />
                    <div className="LoginGirlImage">
                        <img src={LoginGirl} alt="" />
                    </div>
                </div>
                
            </div>

            <div className="BagsImage">
                <img src={LoginContent1} alt="" />
            </div>

            <div className="HandsImage">
                <img src={LoginContent2} alt="" />
            </div>

        </div>
    )

}