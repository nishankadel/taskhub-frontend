import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../baseUrl";
import { parseJwt } from "../../utils/parseJwt";
import Spinner from "../../components/Spinner/Spinner";
import EmptyData from "../../components/EmptyData/EmptyData";
import moment from "moment";
import HomeShowCase from "../../components/HomeShowCase/HomeShowCase";

const Home = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const navigate = useNavigate();
  const [totalProject, setTotalProject] = useState(0);
  const [yourProject, setYourProject] = useState(0);
  const [collaborationProject, setCollaborationProject] = useState(0);
  const [projects, setPtojects] = useState([]);
  const [yourProjects, setYourProjects] = useState([]);
  const [collaborationProjects, setCollaborationProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [id, setId] = useState("");

  useEffect(() => {
    if (userToken) {
      setLoading(true);
      axios
        .post(
          `${baseUrl}/normal/dashboard`,
          { id: parseJwt(userToken).id },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          setTotalProject(res.data.totalProject);
          setYourProject(res.data.yourProject);
          setYourProjects(res.data.yourProjects);
          setCollaborationProject(res.data.collaborationProject);
          setCollaborationProjects(res.data.collaborationProjects);
          setPtojects(res.data.projects);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userToken]);

  return (
    <>
      {loading && <Spinner />}
      <main className=" container flex-1 overflow-x-hidden overflow-y-auto">
        {userToken === null ? (
          <div>
            <div className="max-w-lg mx-auto my-10 mt-20 bg-white p-8 rounded-xl shadow shadow-slate-300">
              <h1 className="text-4xl font-medium">
                Please login to access the dashboard.
              </h1>

              <form action="" className="my-10">
                <div className="flex flex-col space-y-5">
                  <button
                    onClick={() => {
                      navigate("/auth/login");
                    }}
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Login</span>
                  </button>
                </div>
              </form>
            </div>
            <HomeShowCase />
          </div>
        ) : (
          <div className="container mx-auto px-6 py-3">
            <h3 className="text-gray-700 text-3xl font-bold">Dashboard</h3>
            <hr />
            <div className="mt-3">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-7 mb-10 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-indigo-500">
                    <div className="p-3">
                      <i className="fa-solid fa-bars-progress h-8 w-8 text-white text-3xl"></i>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-white">
                        {totalProject}
                      </h4>
                      <div className="text-white">Total Projects</div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6 mb-10 px-7 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md  bg-green-500">
                    <div className="p-3">
                      <i className="fa-solid fa-diagram-project h-8 w-8 text-white text-3xl"></i>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-white">
                        {" "}
                        {yourProject}
                      </h4>
                      <div className="text-white">Your Projects</div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6 px-6 mb-10 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md  bg-orange-500">
                    <div className="p-3">
                      <i className="fa-solid fa-people-group h-8 w-8 text-white text-3xl"></i>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-white">
                        {collaborationProject}
                      </h4>
                      <div className="text-white">Collaboration Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-gray-700 text-3xl font-bold">
                All Recent Projects
              </h3>
              <hr />

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
            </div>{" "}
            <div className="mt-3">
              <h3 className="text-gray-700 text-3xl font-bold">My Projects</h3>
              <hr />

              {yourProjects.length <= 0 ? (
                <EmptyData message="Oops! No data found." />
              ) : (
                <div className="flex flex-wrap items-center">
                  {yourProjects.map((project) => (
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
            </div>
            <div className="mt-3">
              <h3 className="text-gray-700 text-3xl font-bold">
                Collaboration Projects
              </h3>
              <hr />

              {collaborationProjects.length <= 0 ? (
                <EmptyData message="Oops! No data found." />
              ) : (
                <div className="flex flex-wrap items-center">
                  {collaborationProjects.map((project) => (
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
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
