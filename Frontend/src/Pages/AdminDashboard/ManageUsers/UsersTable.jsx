import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditUser } from "./EditUser";
import { useAuthContext } from "../../../hooks/useAuthContext";

export const UsersTable = () => {
    const navigate = useNavigate();
    const { user, type } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch(
            `http://localhost:4000/api/users`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer: ${user.token}`,
                },
            }
        );

        let json = await response.json();
        if (!response.ok) {
            console.log(json.error);
        } else {
            // console.log(json);
            setUsers(json);
        }
    };

    const handleViewUsers = () => {
        setSelectedUser(null);
    };

    const handleAddUserButton = () => {
        navigate("/admindashboard/adduser");
    }

    return (
        <>
            {!selectedUser ? (
                <div className="UsersTableMain">
                    <h1>Manage Users</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span>NAME</span>
                                </th>
                                <th>
                                    <span>EMAIL</span>
                                </th>
                                <th>
                                    <span>TYPE</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users && users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setSelectedUser(user)}
                                            title="Click to edit user"
                                        >
                                            <span>{user.name}</span>
                                        </td>
                                        <td>
                                            <span>{user.email}</span>
                                        </td>
                                        <td>
                                            <span>{user.type}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <button style={{ cursor: "pointer" }} onClick={handleAddUserButton} >Add User</button>
                
                </div>
            ) : (
                <EditUser
                    selectedUser={selectedUser}
                    onViewUsers={handleViewUsers}
                    getUsers={fetchUsers}
                />
            )}
        </>
    );
};
