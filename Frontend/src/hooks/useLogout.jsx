import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { user, type } = useAuthContext();
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');
        user({type: 'LOGOUT'});
    }
    return {logout};
}