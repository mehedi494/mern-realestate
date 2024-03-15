import { Link } from "react-router-dom";
import love from "../../../assets/loveanimation.gif";

export default function Footer() {
  return (
    <div className="text-center font-semibold text-sm text-gray-500 ">
      <code>
        This website made by {/* ❤️ */}{" "}
        <img className="w-6 inline-block" src={love} alt="" />{" "}
        <Link
          to="https://github.com/mehedi494"
          target="_blank"
          className=" hover:underline text-green-700 uppercase">
          Mehedi hasan munna 🧑‍💻
        </Link>
      </code>
    </div>
  );
}
/*  */
