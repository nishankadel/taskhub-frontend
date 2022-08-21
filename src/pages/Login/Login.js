import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/taskhub.png";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("TH:user-token"));
    if (isAuth && isAuth !== null) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.success === true) {
            localStorage.setItem(
              "TH:user-token",
              JSON.stringify(res.data.token)
            );
            localStorage.setItem(
              "TH:user-profile",
              JSON.stringify(res.data.user)
            );
            toast.success(res.data.message);
            navigate("/");
          } else {
            toast.error(res.data.message);
            navigate("/auth/login");
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
          onSubmit={handleLogin}
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
              Login to your account
            </h1>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              required
            />
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-indigo-500 rounded-2xl">
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-4 text-sm">
              Don't have an account yet?
              <span className="underline cursor-pointer ml-2">
                <Link to="/auth/register">Register</Link>
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

export default Login;
