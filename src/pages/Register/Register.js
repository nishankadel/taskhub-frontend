import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/taskhub.png";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      fullName &&
      email &&
      phoneNumber &&
      jobTitle &&
      company &&
      location &&
      password
    ) {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/register`, {
          fullName,
          email,
          phoneNumber,
          jobTitle,
          company,
          location,
          password,
        })
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);

            localStorage.setItem(
              "TH:user-profile",
              JSON.stringify(res.data.user)
            );

            navigate("/auth/email-verification");
          } else {
            toast.error(res.data.message);
            navigate("/auth/register");
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
          autoComplete="off"
          onSubmit={handleRegister}
          className="py-4 px-12 bg-white rounded-2xl shadow-xl z-20"
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
            <h1 className="text-3xl capitalize font-bold text-center ">
              Register to your account
            </h1>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />{" "}
            <input
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />{" "}
            <input
              type="text"
              name="jobTitle"
              value={jobTitle}
              required
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />{" "}
            <input
              type="text"
              name="company"
              value={company}
              required
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />{" "}
            <input
              type="text"
              name="location"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Company Location"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-indigo-500 rounded-2xl">
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="mt-4 text-sm">
              Already have an account?
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

export default Register;
