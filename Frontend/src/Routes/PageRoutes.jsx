import { useState, useEffect } from 'react';
import { createBrowserRouter } from "react-router-dom";
import { LOCAL_ROUTES } from "../Config/LocalRoutes";
import { Login } from "../Pages/Login/Index";
import { StudentDashboard } from "../Pages/StudentDashboard/Index";
import { Account } from "../Pages/Account/Account";
import { Mathematics } from "../Pages/StudentDashboard/Subjects/Mathematics/Index";
import { Literacy } from "../Pages/StudentDashboard/Subjects/Literacy/Index";
import { TeacherDashboard } from "../Pages/TeacherDashboard/Index";
import { LiteracyTeacherDasboard } from "../Pages/TeacherDashboard/Subjects/Literacy/Index";
import { MathematicsTeacherDasboard } from "../Pages/TeacherDashboard/Subjects/Mathematics/Index";
import { CreatedActivity } from "../Components/CreatedActivity/CreatedActivity";
import { AdminDashboard } from "../Pages/AdminDashboard/Index";
import { ManageUsers } from "../Pages/AdminDashboard/ManageUsers/Index";
import { ManageDataset } from "../Pages/AdminDashboard/ManageDataset/Index";
import { useAuthContext } from "../hooks/useAuthContext";
import PrivateRoute from "./PrivateRoute";
import LoginPrivateRoute from "./LoginPrivateRoute";

let globalUserType = null;
const LoginRouteHandler = () => {
    const { user, type } = useAuthContext();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        if (user && type) {
            setUserType(type);
        }
    }, [user, type]);

    if (user) {
        console.log("user exists in context");
        if (userType === "student") {
            globalUserType = userType;
            return <StudentDashboard />;
        }
        else if (userType === "teacher") {
            globalUserType = userType;
            return <TeacherDashboard />;
        }
    } else {
        console.log("no user in context");
        return <Login />
    }
};


// Create a BrowserRouter with specified routes
const router = createBrowserRouter([
    {
        //Route for the login page
        path:  globalUserType ? 
        (globalUserType === 'student' ? LOCAL_ROUTES.STUDENT_DASHBOARD : 
            (globalUserType === 'teacher' ? LOCAL_ROUTES.TEACHER_DASHBOARD : LOCAL_ROUTES.LOGIN)) : 
        LOCAL_ROUTES.LOGIN,
        element: <LoginRouteHandler/>
    },
    {
        // Route for the student dashboard page
        path: LOCAL_ROUTES.STUDENT_DASHBOARD,
        element: <PrivateRoute Component={StudentDashboard}/>,
    },
    {
        // Route for the account
        path: LOCAL_ROUTES.ACCOUNT,
        element: <Account />,
    },
    {
        // Route for student maths dashboard
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_MATHS,
        element: <Mathematics />,
    },

    {
        // Route for student maths dashboard home
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_MATHS,
        element: <Mathematics />,
    },
    {
        // Route for student maths dashboard activities
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_MATHS_ACTIVITES,
        element: <Mathematics />,
    },
    {
        // Route for student maths dashboard grades
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_MATHS_GRADES,
        element: <Mathematics />,
    },
    {
        // Route for student maths dashboard activity template
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_MATHS_ACTIVITES + ":activityId",
        element: <Mathematics />,
    },
    {
        // Route for student literacy dashboard
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_LITERACY,
        element: <Literacy />,
    },

    {
        // Route for student literacy dashboard home
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_LITERACY,
        element: <Literacy />,
    },
    {
        // Route for student literacy dashboard activities
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_LITERACY_ACTIVITES,
        element: <Literacy />,
    },
    {
        // Route for student literacy dashboard grades
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_LITERACY_GRADES,
        element: <Literacy />,
    },
    {
        // Route for student literacy dashboard activity template
        path: LOCAL_ROUTES.STUDENT_DASHBOARD_LITERACY_ACTIVITES + ":activityId",
        element: <Literacy />,
    },

    // Teacher dashboard routes

    {
        // Route for the teacher dashboard page
        path: LOCAL_ROUTES.TEACHER_DASHBOARD,
        element: <TeacherDashboard />,
    },
    {
        // Route for teacher maths dashboard
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS,
        element: <MathematicsTeacherDasboard />,
    },

    {
        // Route for teacher maths dashboard home
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS,
        element: <MathematicsTeacherDasboard />,
    },
    {
        // Route for TEACHER maths dashboard activities
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_ACTIVITES,
        element: <MathematicsTeacherDasboard />,
    },
    {
        // Route for TEACHER maths dashboard grades
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_GRADES,
        element: <MathematicsTeacherDasboard />,
    },
    {
        // Route for teacher maths dashboard people
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_PEOPLE,
        element: <MathematicsTeacherDasboard />,
    },
    {
        // Route for TEACHER maths dashboard activity template
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHS_ACTIVITES + ":activityId",
        element: <MathematicsTeacherDasboard />,
    },
    {
        // Route for teacher literacy dashboard
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY,
        element: <LiteracyTeacherDasboard />,
    },

    {
        // Route for teacher literacy dashboard home
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY,
        element: <LiteracyTeacherDasboard />,
    },
    {
        // Route for teacher literacy dashboard activities
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY_ACTIVITES,
        element: <LiteracyTeacherDasboard />,
    },
    {
        // Route for teacher literacy dashboard grades
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY_GRADES,
        element: <LiteracyTeacherDasboard />,
    },
    {
        // Route for teacher literacy dashboard people
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY_PEOPLE,
        element: <LiteracyTeacherDasboard />,
    },
    {
        // Route for the teacher for seeing a published activity
        path:
            LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY_ACTIVITES + "go/" + ":activityId",
        element: <LiteracyTeacherDasboard />,
    },
    {
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_MATHEMATICS_CREATED_ACTIVITY,
        element: <CreatedActivity />,
    },
    {
        path: LOCAL_ROUTES.TEACHER_DASHBOARD_LITERACY_CREATED_ACTIVITY,
        element: <CreatedActivity subject="Literacy" />,
    },

    // ADMIN DASHBOARD ROUTES
    {
        path: LOCAL_ROUTES.ADMIN_DASHBOARD,
        element: <AdminDashboard />,
    },
    {
        path: LOCAL_ROUTES.ADMIN_DASHBOARD_USERS,
        element: <ManageUsers />,
    },
    {
        path: LOCAL_ROUTES.ADMIN_DASHBOARD_DATASET,
        element: <ManageDataset />,
    },
]);

// Export the configured router for use in the application
export default router;
