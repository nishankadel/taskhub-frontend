import axios from "axios";
import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import baseUrl from "../../baseUrl";
import { parseJwt } from "../../utils/parseJwt";
import Spinner from "../Spinner/Spinner";
import EmptyData from "../EmptyData/EmptyData";
import moment from "moment";
import { toast } from "react-toastify";

const ListProjects = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { id } = parseJwt(userToken);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/projects/all-projects/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userToken, id]);
  
  if (userToken === null) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <>
      {loading && <Spinner />}
      {projects.length <= 0 ? (
        <EmptyData message="Oops! No data found." />
      ) : (
        <div className="flex flex-wrap items-center">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col gap-4 items-center justify-center ml-7 mr-7 mb-7  bg-white"
            >
              <Link
                to={`/projects/single-project/${project._id}`}
                className=" border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-300"
              >
                <div className="grid grid-cols-6 p-5 gap-y-2">
                  <div className="col-span-5 md:col-span-4 ml-4">
                    <p className="text-gray-600 font-bold">
                      {project.projectTitle}
                    </p>

                    <p className="text-gray-400">
                      {project.projectDescription.substring(0, 19)} ....
                    </p>

                    <p className="text-gray-400">
                      {moment(project.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListProjects;
