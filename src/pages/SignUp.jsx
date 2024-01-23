import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { config } from "../config";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

export default function SignUp() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [password, setPassword] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState(null);
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(" ");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    const uri = `${config.api}/auth/sign-up`;
    console.log(uri);
    try {
      const res = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === false) {
        toast.error(data.errorMessage, {
          position: "bottom-right",
        });
        // toast.info("Info Notification !", );
        setError(data.errorMessage);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success(data.message);
      navigate("/sign-in")
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    // console.log(api);
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("⚠️ password not match");
    }
  }, [formData]);

  return (
    <div className=" p-3 max-w-xs sm:max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold p-3 text-slate-500 uppercase">
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleOnChange}
          type="text"
          placeholder="username"
          className="border p-3   rounded-lg outline-slate-400"
          required
          id="userName"
        />
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
        <input
          onChange={handleOnChange}
          type={show ? "text" : "password"}
          placeholder="confirm password"
          className="border p-3   rounded-lg outline-slate-400"
          id="confirmPassword"
        />

        {error && <p className="text-xs text-orange-800 ">{error}</p>}
        <p className="text-sm cursor-pointer" onClick={() => setShow(!show)}>
          {!show ? "show password" : "hide password"}
        </p>
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 rounded text-white hover:bg-slate-600  p-2 uppercase disabled:bg-opacity-80">
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex ">
        <p>have an account ?</p>
        <Link to="/sign-in" className="text-blue-700 ml-2">
          Sign in
        </Link>
      </div>
      <hr className=" border my-3" />
      <p className="-mt-6 text-center text-gray-700 ">or continue with</p>
      <div className="flex items-center justify-center mt-4  bg-lime-700 rounded  text-white hover:bg-lime-600 focus:bg-black  p-2">
        <FaGoogle />
        <p className="ml-5"> Google</p>
      </div>
      
    </div>
  );
}
