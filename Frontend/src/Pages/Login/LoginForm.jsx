import { useState } from "react";
import EmailImage from "../../Assets/Email.png";
import PasswordImage from "../../Assets/Password.png";
import { useLogin } from "../../hooks/useLogin";
import Alert from "@mui/material/Alert";
import { useAuthContext } from "../../hooks/useAuthContext";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin(); // Custom Login hook
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };
    return (
        <form className="LoginForm" onSubmit={handleSubmit}>
            <div className="LoginFormHeader">LOGIN</div>

            <div className="LoginFormInputs">
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={EmailImage} alt="Email" />
                    </div>
                    <input
                        id="emailInput"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={PasswordImage} alt="Password" />
                    </div>
                    <input
                        id="passswordInput"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <input  type="submit" value="Login" disabled={isLoading} className="sparklingLightAnimation"/>
                {error && 
                    <Alert
                        variant="filled" 
                        severity="error">{error}
                    </Alert>}
            </div>

            <div className="LoginForgetPassword">
                <div className="ForgetPasswordLine"></div>
                <div className="ForgetPasswordText">Forgot Password?</div>
                <div className="ForgetPasswordLine"></div>
            </div>
        </form>
    );
};
