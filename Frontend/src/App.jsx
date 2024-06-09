import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./Styles/Global.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { Login } from "./Pages/Login/Index";
import { Account } from "./Pages/Account/Account";

/* Student */
import { StudentDashboard } from "./Pages/StudentDashboard/Index";
import { TeacherDashboard } from "./Pages/TeacherDashboard/Index";
import { Literacy } from "./Pages/StudentDashboard/Subjects/Literacy/Index";
import { Mathematics } from "./Pages/StudentDashboard/Subjects/Mathematics/Index";

/* Teacher */
import { LiteracyTeacherDasboard } from "./Pages/TeacherDashboard/Subjects/Literacy/Index";
import { MathematicsTeacherDasboard } from "./Pages/TeacherDashboard/Subjects/Mathematics/Index";
import { CreatedActivity } from "./Components/CreatedActivity/CreatedActivity";
import { ParentTemplate } from "./Components/Templates/ParentTemplate";

/* Admin */
import { AdminDashboard } from "./Pages/AdminDashboard/Index";
import { ManageUsers } from "./Pages/AdminDashboard/ManageUsers/Index";
import { ManageDataset } from "./Pages/AdminDashboard/ManageDataset/Index";
import { AddUser } from "./Pages/AdminDashboard/ManageUsers/AddUser";

function App() {
  const { user, type } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admindashboard"
          element={user ? <AdminDashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admindashboard/users"
          element={user ? <ManageUsers /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admindashboard/dataset"
          element={user ? <ManageDataset /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admindashboard/adduser"
          element={user ? <AddUser /> : <Navigate to="/" replace />}
        />
        {/* Admin Routes */}

        <Route
          path="/teacherdashboard/literacy"
          element={
            user ? <LiteracyTeacherDasboard /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : type === "Student" ? (
              <Navigate to="/studentdashboard" replace />
            ) : type === "Teacher" ? (
              <Navigate to="/teacherdashboard" replace />
            ) : type === "Admin" ? (
              <Navigate to="/admindashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/studentdashboard"
          element={
            user ? (
              type === "Student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/teacherdashboard"
          element={
            user ? (
              type === "Teacher" ? (
                <TeacherDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/" replace />}
        />

        <Route
          path="/studentdashboard/mathematics"
          element={user ? <Mathematics /> : <Navigate to="/" replace />}
        />
        <Route
          path="/studentdashboard/mathematics/activities"
          element={user ? <Mathematics /> : <Navigate to="/" replace />}
        />
        <Route
          path="/studentdashboard/mathematics/grades"
          element={user ? <Mathematics /> : <Navigate to="/" replace />}
        />

        <Route
          path="/studentdashboard/literacy"
          element={user ? <Literacy /> : <Navigate to="/" replace />}
        />
        <Route
          path="/studentdashboard/literacy/activities"
          element={user ? <Literacy /> : <Navigate to="/" replace />}
        />
        <Route
          path="/studentdashboard/literacy/grades"
          element={user ? <Literacy /> : <Navigate to="/" replace />}
        />

        <Route
          path="/teacherdashboard/literacy"
          element={
            user ? <LiteracyTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/literacy/activities"
          element={
            user ? <LiteracyTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/literacy/grades"
          element={
            user ? <LiteracyTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/literacy/people"
          element={
            user ? <LiteracyTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/literacy/activities/CreatedActivity"
          element={
            user ? (
              <CreatedActivity subject={"Literacy"} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Teacher Math Dashboard Routes */}
        <Route
          path="/teacherdashboard/mathematics"
          element={
            user ? <MathematicsTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/mathematics/activities"
          element={
            user ? <MathematicsTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/mathematics/grades"
          element={
            user ? <MathematicsTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/teacherdashboard/mathematics/people"
          element={
            user ? <MathematicsTeacherDasboard /> : <Navigate to="/" replace />
          }
        />
        {/* */}

        <Route
          path="/studentdashboard/literacy/activities/:name"
          element={user ? <ParentTemplate /> : <Navigate to="/" replace />}
        />
        <Route
          path="/studentdashboard/mathematics/activities/:name"
          element={user ? <ParentTemplate /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import {
// 	Route,
// 	Routes,
// 	BrowserRouter,
// 	RouterProvider,
// 	Navigate,
// } from "react-router-dom";
// import router from "./Routes/PageRoutes";
// import "./Styles/Global.css";

// function App() {
// 	return (
// 		<RouterProvider router={router} />
// 	)
// }

// export default App;
