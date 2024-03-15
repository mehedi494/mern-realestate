import { Outlet } from "react-router-dom";

import Header from "../ui/Header/Header";
import Footer from "../ui/Footer/Footer";


export default function Main(children) {
  return (
    <div>
      <Header></Header>
      <Outlet>{children}</Outlet>
    <Footer/>
    </div>
  )
}
