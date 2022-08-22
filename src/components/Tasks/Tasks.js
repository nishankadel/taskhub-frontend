import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";
import ChangeTaskStatus from "../ChangeTaskStatus/ChangeTaskStatus";
import ConfirmAction from "../ConfirmAction/ConfirmAction";
import EditTask from "../EditTask/EditTask";
import Spinner from "../Spinner/Spinner";

const Tasks = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [loading, setLoading] = useState(false);
  const [projectTasks, setProjectTasks] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/projects/single-project/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setProjectTasks(res.data.project.projectTask);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, userToken]);

  const handleDelete = (taskId) => {
    axios
      .post(
        `${baseUrl}/projects/delete-task`,
        { id, taskId: taskId },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setProjectTasks(projectTasks.filter((task) => task.id !== taskId));
          navigate(`/projects/single-project/${id}`);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {loading && <Spinner />}
      <div className="flex  border-2 border-green-400 rounded-lg text-center ml-5">
        <div className="w-1/2  border-2  border-green-400">
          <h1 className="text-2xl font-bold pb-2 mt-2 ">To-Do</h1>
          <hr className="border-2 border-gray-400" />

          <div className="flex flex-wrap justify-center items-center">
            {projectTasks.map(
              (task) =>
                task.taskStatus === "To-Do" && (
                  <div
                    key={task._id}
                    className="flex flex-col gap-4 items-center justify-center ml-7 mr-7 mb-7  bg-gray-200"
                  >
                    <div className=" border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-300">
                      <div className="grid grid-cols-6 p-5 gap-y-2">
                        <div className="col-span-5 md:col-span-4 ml-4">
                          <p className="text-gray-600 font-bold">
                            {task.taskName}
                          </p>

                          <div className="flex mt-2">
                            <div className="cursor-pointer text-gray-400 mr-2">
                              <ConfirmAction
                                btnText={<i className="fa-solid fa-trash"></i>}
                                fn={() => {
                                  handleDelete(task._id);
                                }}
                              />
                            </div>
                            <div className="cursor-pointer text-gray-400 mr-2">
                              <ChangeTaskStatus taskId={task._id} />
                            </div>
                            <div className="cursor-pointer text-gray-400">
                              <EditTask
                                projectTaskName={task.taskName}
                                projectTaskId={task._id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="w-1/2  border-2  border-green-400">
          <h1 className="text-2xl font-bold pb-2 mt-2 ">In-Progress</h1>
          <hr className="border-2 border-gray-400" />

          <div className="flex flex-wrap justify-center items-center">
            {projectTasks.map(
              (task) =>
                task.taskStatus === "In-Progress" && (
                  <div
                    key={task._id}
                    className="flex flex-col gap-4 items-center justify-center ml-7 mr-7 mb-7  bg-gray-200"
                  >
                    <div className=" border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-300">
                      <div className="grid grid-cols-6 p-5 gap-y-2">
                        <div className="col-span-5 md:col-span-4 ml-4">
                          <p className="text-gray-600 font-bold">
                            {task.taskName}
                          </p>

                          <div className="flex mt-2">
                            <div className="cursor-pointer text-gray-400 mr-2">
                              <ConfirmAction
                                btnText={<i className="fa-solid fa-trash"></i>}
                                fn={() => {
                                  handleDelete(task._id);
                                }}
                              />
                            </div>
                            <div className="cursor-pointer text-gray-400 mr-2">
                              <ChangeTaskStatus taskId={task._id} />
                            </div>
                            <div className="cursor-pointer text-gray-400">
                              <EditTask
                                projectTaskName={task.taskName}
                                projectTaskId={task._id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="w-1/2  border-2 border-b-4 border-green-400">
          <h1 className="text-2xl font-bold pb-2 mt-2 ">Completed</h1>
          <hr className="border-2 border-gray-400" />

          <div className="flex flex-wrap justify-center items-center">
            {projectTasks.map(
              (task) =>
                task.taskStatus === "Completed" && (
                  <div
                    key={task._id}
                    className="flex flex-col gap-4 items-center justify-center ml-7 mr-7 mb-7  bg-gray-200"
                  >
                    <div className=" border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-300">
                      <div className="grid grid-cols-6 p-5 gap-y-2">
                        <div className="col-span-5 md:col-span-4 ml-4">
                          <p className="text-gray-600 font-bold">
                            {task.taskName}
                          </p>

                          <div className="flex mt-2">
                            <div className="cursor-pointer text-gray-400 mr-2">
                              <ConfirmAction
                                btnText={<i className="fa-solid fa-trash"></i>}
                                fn={() => {
                                  handleDelete(task._id);
                                }}
                              />
                            </div>
                            <div className="cursor-pointer text-gray-400 mr-2">
                              <ChangeTaskStatus taskId={task._id} />
                            </div>
                            <div className="cursor-pointer text-gray-400">
                              <EditTask
                                projectTaskName={task.taskName}
                                projectTaskId={task._id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
