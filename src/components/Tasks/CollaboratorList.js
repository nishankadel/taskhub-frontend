import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";
import Spinner from "../Spinner/Spinner";
import "./CollaboratorList.css";

const CollaboratorList = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/projects/list-collaborators/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setCollaborators(res.data.collaborators);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, userToken]);

  const handleDelete = (email) => {
    setLoading(true);
    axios
      .post(
        `${baseUrl}/projects/delete-collaborator`,
        { id, email },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
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
      })
      .finally(() => {
        setLoading(false);
      });
  };
console.log(collaborators);
  return (
    <>
      {loading && <Spinner />}
      <div className="dropdown">
        <button
          className="bg-yellow-500 text-gray-200 hover:bg-yellow-600 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium ml-5 hover:cursor-pointer"
        >
          Collaborators List
        </button>
        <div className="dropdown-content">
          <div className="flex justify-between mb-2 mt-2 mr-2">
            <p>Name</p>
            <p>Email</p>
            <p>Action</p>
          </div>
          {collaborators.map((collaborator) => (
            <div
              key={collaborator._id}
              className="flex justify-between mb-2 mt-2 mr-2"
            >
              <p>{collaborator.userId.fullName}</p>
              <p>{collaborator.userId.email}</p>
              <button
                className="bg-[#EC5252] text-gray-200 hover:bg-red-600 hover:text-white
                          px-3 py-2 rounded-sm text-sm font-medium ml-5 hover:cursor-pointer"
                type="button"
                onClick={() => {
                  handleDelete(collaborator.userId.email);
                }}
              >
                <i className="fa-solid fa-trash bg-red-600"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollaboratorList;
