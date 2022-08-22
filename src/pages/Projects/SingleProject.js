import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";
import ConfirmAction from "../../components/ConfirmAction/ConfirmAction";
import EditProject from "../../components/EditProject/EditProject";
import Spinner from "../../components/Spinner/Spinner";
import AddCollaborator from "../../components/Tasks/AddCollaborator";
import AddTask from "../../components/Tasks/AddTask";
import CollaboratorList from "../../components/Tasks/CollaboratorList";
import Tasks from "../../components/Tasks/Tasks";

const SingleProject = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const userProfile = JSON.parse(localStorage.getItem("TH:user-profile"));

  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/projects/single-project/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, userToken]);

  const handleDelete = (id) => {
    axios
      .post(
        `${baseUrl}/projects/delete-project`,
        { id },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/projects");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userToken === null) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <>
      {loading && <Spinner />}
      <main className=" container flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-row justify-between pr-5">
            <div>
              <h3 className="text-gray-700 text-3xl mb-2 font-bold">
                Manage {project.projectTitle}
              </h3>
              <h3 className="text-gray-500 text-xl ml-3 mb-2 font-medium">
                {project.projectDescription}.
              </h3>
            </div>
            <div>
              {project.userId === userProfile._id && (
                <div>
                  <EditProject project={project} />
                  <ConfirmAction
                    btnText={<i className="fa-solid fa-trash"></i>}
                    fn={() => {
                      handleDelete(project._id);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="mt-3">
            <h1 className="text-xl ml-6 mb-3 font-bold">
              {project.projectTitle} Tasks
            </h1>
            <div className="flex justify-between">
              <AddTask />
              {project.userId === userProfile._id && (
                <div>
                  <AddCollaborator />
                  <CollaboratorList />
                </div>
              )}
            </div>
            <hr />
            <Tasks project={project} />
          </div>

          <div className="mt-8"></div>
        </div>
      </main>
    </>
  );
};

export default SingleProject;
