import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Projects from "./pages/Projects/Projects.js";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import SingleProject from "./pages/Projects/SingleProject";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import ProjectLog from "./pages/Projects/ProjectLog";

const App = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
        <Routes>
          <Route element={<ProtectedRoute adminToken={userToken} />}>
            <Route
              path="/projects"
              element={<Dashboard AnotherComponent={<Projects />} />}
            />
            <Route
              path="/projects/report/:id"
              element={<Dashboard AnotherComponent={<ProjectLog />} />}
            />
            <Route
              path="/projects/single-project/:id"
              element={<Dashboard AnotherComponent={<SingleProject />} />}
            />
            <Route
              path="/user/profile"
              element={<Dashboard AnotherComponent={<Profile />} />}
            />
          </Route>
          <Route path="/" element={<Dashboard AnotherComponent={<Home />} />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/auth/email-verification"
            element={<EmailVerification />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
