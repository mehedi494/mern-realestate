import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Oauth from "../components/ui/Oauth/Oauth";
import { config } from "../config";
import {
  signInFailure,
  signInSuccess,
  signinStart,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const uri = `${config.api}/auth/sign-in`;
      const res = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message, {
          position: "bottom-right",
        });
        // toast.info("Info Notification !", );
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      toast("Sign in Successfully");
      console.log(from);
      navigate(from,{replace:true});
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-xs sm:max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold p-3 text-slate-500 uppercase">
        Sign IN
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleOnChange}
          type="email"
          required
          placeholder="email"
          className="border p-3   rounded-lg outline-slate-400"
          id="email"
        />
        <input
          onChange={handleOnChange}
          type={show ? "text" : "password"}
          placeholder="password"
          className="border p-3   rounded-lg outline-slate-400"
          id="password"
        />

        <p className="text-sm cursor-pointer" onClick={() => setShow(!show)}>
          {!show ? "show password" : "hide password"}
        </p>
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 rounded text-white hover:bg-slate-600  p-2 uppercase disabled:bg-opacity-80">
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex ">
        <p>Dont have an account ?</p>
        <Link to="/sign-up" className="text-blue-700 ml-2">
          Sign up
        </Link>
      </div>
      {/* error message component */}
      {error && <p className="text-sm text-orange-800 m-2 ">{error}</p>}
      <Oauth></Oauth>
    </div>
  );
}
