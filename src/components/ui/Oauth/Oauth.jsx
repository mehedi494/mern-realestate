import { FaGoogle } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../firebase/firebase.config";
import { config } from "../../../config";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../../../redux/user/userSlice";
import { useNavigate,useLocation } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  
  const handleGoogle = async () => {
    try {
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      console.log("firebase", result.user);
      const res = await fetch(`${config.api}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        }),
      });
      const data = await res.json();

      dispatch(signInSuccess(data));
      navigate(from,{replace:true});
    } catch (error) {
      console.log("could not sign in with google", error);
      dispatch(signInFailure());
    }
  };
  return (
    <div>
      <hr className=" border my-3" />
      <p className="-mt-6 text-center text-gray-700 ">or continue with</p>
      <button
        onClick={handleGoogle}  
        className="flex items-center justify-center mt-4 w-full  bg-green-700 rounded  text-white hover:opacity-80 focus:bg-black  p-2">
        <FaGoogle className="text-" />
        <p className="ml-5 "> Google</p>
      </button>
    </div>
  );
}
