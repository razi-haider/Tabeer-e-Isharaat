import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//     switch (action.type) {
//         case "LOGIN":
//             return { user: action.payload };
//         case "LOGOUT":
//             return { user: null };
//         default:
//             return state;
//     }
// };
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload, type: action.payload.type }; // store the user type (student or teacher)
        case "LOGOUT":
            return { user: null, type: null };
        default:
            return state;
    }
};


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    // When the component renders, do the following ONCE only 
    // Following code is catering the case when page is refreshed then to do what
    useEffect(() => {
        // Get user from local storage (see from inspecting browser)
        const user = JSON.parse(localStorage.getItem('user'));

        // Update the auth context if user is not null
        if(user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, [])

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
