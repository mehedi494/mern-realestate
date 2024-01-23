import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import {Link} from "react-router-dom"

export default function SignUp() {
  const [show,setShow] = useState(false)
  // const toggleShow=()=>{
  //   setShow(!show)
  // }
    return (
    <div className=" p-3 max-w-xs sm:max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold p-3 text-slate-500 uppercase">Sign up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3   rounded-lg"
          required
          id="username"
        />
        <input
          type="email"
          required
          placeholder="email"
          className="border p-3   rounded-lg"
          id="email"
        />
        <input
          type={show?"text":"password"}
          placeholder="password"
          className="border p-3   rounded-lg"
          id="password"
        />
        <input
          type={show?"text":"password"}
          placeholder="confirm password"
          className="border p-3   rounded-lg"
          id="password"
        />
        <p className="text-sm cursor-pointer" onClick={()=>setShow(!show)}>{!show?"show password":"hide password"}</p>
        <button type="submit" className="bg-slate-700 rounded text-white hover:bg-slate-600 focus:bg-black  p-2 uppercase" >Sign up</button>
      </form>
      <div className="flex ">
      <p>have an account ?</p>
      <Link to="/sign-in" className="text-blue-700 ml-2">Sign in</Link>
      </div>
      <hr className=" border my-3" />
      <p className="-mt-6 text-center text-gray-700 ">or continue with</p>
      <div  className="flex items-center justify-center mt-4  bg-lime-700 rounded  text-white hover:bg-lime-600 focus:bg-black  p-2">
      <FaGoogle /><p  className="ml-5">  continue with Google</p>
      </div>

    </div>
  );
}
