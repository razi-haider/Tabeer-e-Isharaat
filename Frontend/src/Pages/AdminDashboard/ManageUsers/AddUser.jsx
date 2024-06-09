import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StudentDashboardHeader } from "../../../Components/StudentDashboardHeader";
import EmailImage from "../../../Assets/Email.png";
import passwordIcon from "../../../Assets/passwordIcon.png";
import ProfileImage from "../../../Assets/Profile.png";
import userTypeIcon from "../../../Assets/userTypeIcon.png";
import { useAuthContext } from "../../../hooks/useAuthContext";

export const AddUser = () => {
    const { user, type } = useAuthContext();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");

    const handleAddUser = async () => {
        try {
            // console.log({
            //     name, email, password, userType
            // })
            await fetch(`http://localhost:4000/api/users/createUser/${userType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer: ${user.token}`,
                },
                body: JSON.stringify({ 
                    name: name,
                    email: email,
                    password: password
                })
            });

            // Navigate back to view users
            // getUsers();
            viewUsers();
        } catch (error) {
            console.error("Error creating user:", error);
            // Handle error
        }
     };
    const viewUsers = () => {
        navigate("/admindashboard/users");
    };

    return (
        <>
            <div className="doc_root">
                <StudentDashboardHeader />

                <div className="EditDatasetView" style={{ marginTop: "117px" }}>
                    <div className="LoginFormInputs">
                        <div className="LoginFormInput">
                            <div className="LoginFormInputImage">
                                <img src={ProfileImage} alt="User Name" />
                            </div>
                            <input
                                type="text"
                                placeholder="Name"
                                // value={name}
                                onChange={(e) => setName(e.target.value)} // Update name state
                            />
                        </div>
                        <div className="LoginFormInput">
                            <div className="LoginFormInputImage">
                                <img src={EmailImage} alt="Email" />
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                            />
                        </div>
                        <div className="LoginFormInput">
                            <div className="LoginFormInputImage">
                                <img src={passwordIcon} alt="Password" />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                // value={email}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="LoginFormInput">
                            <div className="LoginFormInputImage">
                                <img src={userTypeIcon} alt="Type" />
                            </div>
                            <input
                                type="text"
                                placeholder="User Type"
                                // value={type}
                                onChange={(e) => setUserType(e.target.value)} // Update type state
                            />
                        </div>
                    </div>

                    <div className="DataSetOptions">
                        <button onClick={handleAddUser}>Add User</button>
                    </div>

                    <button className="EditDataSetViewDataset" onClick={viewUsers}>
                        View Users
                    </button>
                </div>
            </div>
        </>
    );
};
