import { FaSearch } from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png"
export default function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
const handleSubmit =(e)=>{
  e.preventDefault()
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("searchTerm", searchTerm);
  const searchQuery = urlParams.toString();
navigate(`/search?${searchQuery}`,)
}

useEffect(()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("searchTerm");
  if(searchTerm){
    setSearchTerm(searchTerm)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[location.search])

  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl m-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <img className="inline w-10 mr-1" src={logo} alt="logo"/>
              <span className="text-slate-500">Real</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>

          <form onSubmit={handleSubmit} className="bg-slate-100 p-2 rounded-lg flex items-center">
            <input
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          <button>  <FaSearch /></button>
          </form>
          <ul className="flex gap-4 items-center">
            <Link to="/">
              <li className="hidden sm:inline hover:underline">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:underline">About</li>
            </Link>
            {currentUser ? (
              <Link to="/profile">
                <div>
                  {" "}
                  <img
                    className="  rounded-full w-10 h-10  object-cover border-2 border-orange-300  p-1"
                    src={currentUser?.avatar}
                    alt=""
                  />
                </div>
              </Link>
            ) : (
              <Link to="/sign-in">
                <li className=" sm:inline hover:underline">Sign in</li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
