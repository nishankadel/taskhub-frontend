import axios from "axios";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";
import { parseJwt } from "../../utils/parseJwt";
import Spinner from "../Spinner/Spinner";

const CreateProjects = ({ user }) => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [showModal, setShowModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = parseJwt(userToken);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseUrl}/projects/create-project`,
        { id, projectTitle, projectDescription },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/projects");
          window.location.reload();
        } else {
          toast.error(res.data.message);
          navigate("/projects");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setShowModal(false);
  };

  return (
    <>
      {loading && <Spinner />}
      <button
        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Project
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Create Project
                  </h3>

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}

                <form onSubmit={handleUpdate}>
                  <div className="mb-4 md:mr-2 md:mb-0 ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Project Title
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight focus:outline-green-500 border-green-300 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      name="projectTitle"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0 ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Project Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 text-sm leading-tight focus:outline-green-500 border-green-300 text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      required
                      rows="3"
                    ></textarea>
                  </div>

                  {/*body*/}
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateProjects;
