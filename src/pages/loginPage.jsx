import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../helpers/loader/loader";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const formValidation = () => {
    let isValid = true;
    if (!userName) {
      toast.warn("User name is required");
      isValid = false;
    }

    if (!userPassword) {
      toast.warn("User password is required");
      isValid = false;
    }

    return isValid;
  };

  const submitUserLogin = async (e) => {
    e.preventDefault();

    try {
      //check Validations
      if (formValidation()) {
        setLoader(true);
        const reqBody = {
          username: userName,
          password: userPassword,
        };
        const response = await axios.post(
          "https://dummyjson.com/auth/login",
          reqBody
        );
        //if userName & userPassword are correct redirect to home page
        if (response) {
          navigate("/home", { state: { userData: response.data } });
        }
      }
    } catch (err) {
      //if userName & userPassword are not correct
      toast.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className=" uppercase mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              UserName
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={submitUserLogin}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register Now
          </a>
        </p>
      </div>
      <ToastContainer />
      {loader && <Loader />}
    </div>
  );
};

export default LoginPage;
