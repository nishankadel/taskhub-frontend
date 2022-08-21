import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateProjects from "../../components/CreateProjects/CreateProjects";
import ListProjects from "../../components/ListProjects/ListProjects";
const Projects = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  if (userToken === null) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <>
      <main className=" container flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-3">
          <h3 className="text-gray-700 text-3xl mb-2 font-bold">
            Manage Projects
          </h3>
          <CreateProjects />
          <hr />
          <div className="mt-3">
            <h1 className="text-xl ml-6 mb-3 font-bold">All Projects</h1>

            <ListProjects />
          </div>

          <div className="mt-8"></div>
        </div>
      </main>
    </>
  );
};

export default Projects;
