import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl m-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Real</span>
              <span className="text-slate-700">EState</span>
            </h1>
          </Link>

          <form className="bg-slate-100 p-2 rounded-lg flex items-center">
            <input
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              type="text"
              placeholder="Search..."
            />
            <FaSearch />
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
                    className="max-w-11  rounded-full max-h-auto object-cover border-2 border-orange-300  p-1"
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
