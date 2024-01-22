import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
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
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline hover:underline">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:underline">About</li>
            </Link>
            <Link to="/sign-in">
              <li className=" sm:inline hover:underline">Sign in</li>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
}
