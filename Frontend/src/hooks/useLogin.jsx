import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { LOCAL_ROUTES } from "../Config/LocalRoutes";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();
        if(!response.ok) {
            setIsLoading(true);
            setError(json.error);
        }
        
        // if(response.ok) {
        //     // save the user to local storage (can see this using browser 'inspect')
        //     localStorage.setItem('user', JSON.stringify(json));

        //     // update the auth context
        //     dispatch({ type: 'LOGIN', payload: json });
            
        //     setIsLoading(false);

        //     // Check user type and redirect accordingly
        //     if (json.type === 'student') {
        //         navigate(LOCAL_ROUTES.STUDENT_DASHBOARD);
        //     } else if (json.type === 'teacher') {
        //         navigate(LOCAL_ROUTES.TEACHER_DASHBOARD);
        //     }
        // }
        
        if(response.ok) {
            // save the user to local storage (can see this using browser 'inspect')
            localStorage.setItem('user', JSON.stringify(json));
        
            // update the auth context
            dispatch({ type: 'LOGIN', payload: { user: json, type: json.type } });
            
            setIsLoading(false);
        
            // Check user type and redirect accordingly
            if (json.type === 'Student') {
                navigate(LOCAL_ROUTES.STUDENT_DASHBOARD);
            } else if (json.type === 'Teacher') {
                navigate(LOCAL_ROUTES.TEACHER_DASHBOARD);
            } else if (json.type === 'Admin') {
                navigate(LOCAL_ROUTES.ADMIN_DASHBOARD); 
            }
        }
        
    }
    return { login, isLoading, error }
}