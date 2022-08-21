import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import Logo from "../../assets/taskhub.png";
import "./Dashboard.css";

const Dashboard = ({ AnotherComponent }) => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const userProfile = JSON.parse(localStorage.getItem("TH:user-profile"));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("TH:user-token");
    localStorage.removeItem("TH:user-profile");
    toast.success("You have been logged out successfully.");
    navigate("/auth/login");
  };
  return (
    <>
      <div className="flex bg-gray-700">
        <div className="md:flex w-2/5 md:w-1/6 h-screen bg-gray-700 hidden">
          <div className="mx-auto px-5 py-4">
            <h1 className="mb-5 ml-3 cursor-pointer duration-150">
              <img
                src={Logo}
                width="70px"
                alt="Logo"
                className="logo-picture"
                draggable="false"
              />
            </h1>
            <hr />
            <ul className="py-5">
              {userToken === null ? (
                <Link to="/">
                  <li className="flex space-x-2 mt-6 cursor-pointer text-gray-200 hover:text-[#EC5252] duration-150">
                    <i className="fa-solid fa-house-user"></i>
                    <span className="font-semibold">Dashboard</span>
                  </li>
                </Link>
              ) : (
                <div>
                  <Link to="/">
                    <li className="flex space-x-2 mt-6 cursor-pointer text-gray-200 hover:text-[#EC5252] duration-150">
                      <i className="fa-solid fa-house-user"></i>
                      <span className="font-semibold">Dashboard</span>
                    </li>
                  </Link>
                  <Link to="/projects">
                    <li className="flex space-x-2 mt-6 cursor-pointer text-gray-200 hover:text-[#EC5252] duration-150">
                      <i className="fa-solid fa-book-open-reader"></i>
                      <span className="font-semibold">Projects</span>
                    </li>
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
        <main className="min-h-screen w-full bg-white border-l">
          <nav className="flex items-center justify-between px-10 bg-gray-600 rounded-sm py-3 border-b">
            <div className="flex items-center bg-gray-600 px-4 py-2 rounded-lg space-x-3 w-96"></div>
            {userToken === null ? (
              <div className="flex items-center space-x-4">
                <button
                  className=" bg-indigo-600 hover:bg-indigo-500 text-gray-200 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium ml-5 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  <i className="fa-solid fa-right-to-bracket mr-1"></i> Login
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/user/profile">
                  <img
                    src={userProfile.avatar}
                    className="mr-2"
                    width="30px"
                    alt="avatar"
                  />
                </Link>

                <button
                  className="bg-[#EC5252] text-gray-200 hover:bg-red-600 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium ml-5 hover:cursor-pointer"
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                >
                  <i className="fa-solid mr-1 fa-power-off rotate-180"></i>
                  Logout
                </button>
              </div>
            )}
          </nav>
          <div className="container">{AnotherComponent}</div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
