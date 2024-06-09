import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('AuthContext must be used inside an AuthContext Provider');
    }
    return context;
}