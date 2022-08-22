import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/taskhub.png";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";

const EmailVerification = () => {
  const userProfile = JSON.parse(localStorage.getItem("TH:user-profile"));
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerification = (e) => {
    e.preventDefault();
    if (otp) {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/verify-email`, {
          otp: otp,
          userId: userProfile._id,
        })
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            navigate("/auth/login");
          } else {
            toast.error(res.data.message);
            navigate("/auth/email-verification");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <div className="min-h-screen bg-indigo-400 flex justify-center items-center">
        <form
          onSubmit={handleVerification}
          className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20"
        >
          <div className="flex flex-col">
            <Link to="/">
              <img
                src={Logo}
                className="align-middle mx-auto"
                width="70px"
                height="70px"
                alt="logo"
                draggable="false"
              />
            </Link>
            <h1 className="text-3xl capitalize font-bold text-center mb-4 ">
              Verifiy Your Email
            </h1>
          </div>
          <div className="space-y-4">
            <input
              type="number"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 4 digits OTP"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              required
            />
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-indigo-500 rounded-2xl">
              {loading ? "Verifying..." : "Verify Email"}
            </button>
            <p className="mt-4 text-sm">
              Already Verified your email?
              <span className="underline cursor-pointer ml-2">
                <Link to="/auth/login">Login</Link>
              </span>
            </p>
          </div>
        </form>
        <div className="w-40 h-40 absolute bg-indigo-300 rounded-full top-16 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-indigo-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </>
  );
};

export default EmailVerification;
