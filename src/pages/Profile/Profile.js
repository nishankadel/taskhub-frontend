import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../../baseUrl";
import Spinner from "../../components/Spinner/Spinner";
import EditProfile from "../../components/EditProfile/EditProfile";
import { parseJwt } from "../../utils/parseJwt";

const Profile = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const { id } = parseJwt(userToken);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/profile/me/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.data.success === true) {
          setUser(res.data.user);
        } else {
          toast.error(res.data.message);
          navigate("/user/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userToken, navigate, id]);

  if (userToken === null) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      {loading && <Spinner />}
      <div className="font-sans mt-20 flex flex-row justify-center items-center">
        <div className="card w-96 mx-auto bg-gray-300 rounded  shadow-xl hover:shadow">
          <img
            className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
            src={user.avatar}
            alt=""
          />
          <div className="text-center mt-2 text-3xl font-medium">
            {user.fullName}
          </div>
          <div className="text-center mt-2 font-light text-sm">
            {user.email}
          </div>
          <div className="text-center font-normal text-lg">
            {user.phoneNumber}
          </div>
          <div className="px-6 text-center mt-2 font-light text-sm">
            <p>{user.jobTitle}</p>
          </div>
          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <span className="font-bold"> {user.company}</span>
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <span className="font-bold"> {user.location}</span>
            </div>
          </div>
          <div className="flex p-4 text-white text-xl cursor-pointer hover:bg-indigo-700 justify-center rounded-lg bg-indigo-600">
            <EditProfile user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
