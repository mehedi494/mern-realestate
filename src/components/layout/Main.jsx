import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer/Footer";
import Header from "../ui/Header/Header";


export default function Main(children) {
  return (
    <div>
      <Header></Header>
      <Outlet>{children}</Outlet>
      <Footer></Footer>
    </div>
  )
}
