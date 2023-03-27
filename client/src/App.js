import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Lectures from "scenes/lectures";
import Courses from "scenes/courses";
import Users from "scenes/users";
import CourseDetails from "scenes/coursedetails";
import Assignments from "scenes/assignments";
import AddAssignment from "scenes/addAssignment";
import Enrollments from "scenes/enrollments";
import Login from "scenes/login";
import Admin from "scenes/admin";
import RequireAuth from "./components/RequireAuth";
import AddCourse from "scenes/addCourse";
import AddUser from "scenes/addUser";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Layout /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />} >
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/courses" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lectures" element={<Lectures />} />
                <Route path="/lecture" element={<Lectures />} /> // route for lecture details
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/add" element={<AddCourse />} />
                <Route path="/enrollments" element={<Enrollments />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/coursedetails" element={<CourseDetails />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/assignments/add" element={<AddAssignment />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
