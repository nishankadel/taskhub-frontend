import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";

const ChangeTaskStatus = ({ taskId }) => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [showModal, setShowModal] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    if (taskStatus === "") {
      toast.error("Please select a status.");
    } else {
      axios
        .post(
          `${baseUrl}/projects/change-task-status`,
          { id, taskId, taskStatus },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            navigate(`/projects/single-project/${id}`);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setShowModal(false);
  };
  return (
    <>
      <button
        className="bg-green-500 text-gray-200 hover:bg-green-600 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium ml-5 hover:cursor-pointer"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-chart-area"></i>
      </button>
      {showModal ? (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <form onSubmit={handleChange}>
            <div className="bg-white px-16 py-14 rounded-md text-center">
              <h1 className="text-xl mb-4 font-bold text-slate-500">
                Do you Want To Change Status
              </h1>

              <div className="max-w-lg mx-auto">
                <div className="flex items-center mb-4">
                  <input
                    id="To-Do"
                    type="radio"
                    name="taskStatus"
                    value="To-Do"
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="To-Do"
                    aria-describedby="To-Do"
                  />
                  <label
                    htmlFor="To-Do"
                    className="text-sm font-medium text-gray-900 ml-2 block"
                  >
                    To-Do
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="In-Progress"
                    type="radio"
                    name="taskStatus"
                    value="In-Progress"
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="In-Progress"
                    aria-describedby="In-Progress"
                  />
                  <label
                    htmlFor="country-option-2"
                    className="text-sm font-medium text-gray-900 ml-2 block"
                  >
                    In-Progress
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="Completed"
                    type="radio"
                    name="taskStatus"
                    value="Completed"
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="Completed"
                    aria-describedby="Completed"
                  />
                  <label
                    htmlFor="country-option-3"
                    className="text-sm font-medium text-gray-900 ml-2 block"
                  >
                    Completed
                  </label>
                </div>
              </div>

              <button
                className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              >
                Ok
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default ChangeTaskStatus;
