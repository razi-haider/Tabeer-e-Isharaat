import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import EmailImage from "../../../Assets/Email.png";
import PasswordImage from "../../../Assets/Password.png";
import ProfileImage from "../../../Assets/Profile.png";
import AccountImage from "../../../Assets/AccountPicture.png";
import LogoutImage from "../../../Assets/Logout.png";
import userTypeIcon from "../../../Assets/userTypeIcon.png";
import { useAuthContext } from "../../../hooks/useAuthContext";

export const EditUser = ({ selectedUser, onViewUsers, getUsers }) => {
    const { user, type } = useAuthContext();
    const navigate = useNavigate();
    const [name, setName] = useState(selectedUser.name);
    const [email, setEmail] = useState(selectedUser.email);
    const [userType, setUserType] = useState(selectedUser.type);

    // console.log(user);

    const handleUpdateUser = async () => {
        try {
            const updatedUserData = {
                name: name,
                email: email,
                type: userType
            };
            console.log(updatedUserData);

            // Make PATCH request to updateUser API endpoint
            await fetch(`http://localhost:4000/api/users/updateUser/${selectedUser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer: ${user.token}`,
                },
                body: JSON.stringify({ 
                    name: name,
                    email: email,
                    type: userType
                })
            });

            // Navigate back to view users
            getUsers();
            onViewUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            // Handle error
        }
    };

    const handleDeleteUser = async () => {
        try {
            await fetch(`http://localhost:4000/api/users/deleteUser/${selectedUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer: ${user.token}`,
                }
            });

            // Navigate back to view users
            getUsers();
            onViewUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="EditDatasetView">
            <div className="LoginFormInputs">
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={AccountImage} alt="Upload photo" />
                    </div>
                    <label htmlFor="AccountImage" id="AccountImageText">
                        Upload Picture
                    </label>
                    <input
                        id="AccountImage"
                        type="file"
                        placeholder="Upload Picture"
                        style={{ visibility: "hidden" }}
                    />
                </div>
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={ProfileImage} alt="User Name" />
                    </div>
                    <input
                        type="text"
                        placeholder="User Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state
                    />
                </div>
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={EmailImage} alt="Email" />
                    </div>
                    <input
                        type="email"
                        placeholder="User Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                </div>
                <div className="LoginFormInput">
                    <div className="LoginFormInputImage">
                        <img src={userTypeIcon} alt="Type" />
                    </div>
                    <input
                        type="text"
                        placeholder="User Type"
                        value={type}
                        onChange={(e) => setUserType(e.target.value)} // Update type state
                    />
                </div>
            </div>

            <div className="DataSetOptions">
                <button onClick={handleUpdateUser}>Update</button>
                <button onClick={handleDeleteUser}>Delete</button>
            </div>

            <button
                className="EditDataSetViewDataset"
                onClick={onViewUsers}
            >
                View Users
            </button>
        </div>
    );
};
