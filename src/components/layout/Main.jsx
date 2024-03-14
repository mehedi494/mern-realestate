import { Outlet } from "react-router-dom";

import Header from "../ui/Header/Header";


export default function Main(children) {
  return (
    <div>
      <Header></Header>
      <Outlet>{children}</Outlet>
    
    </div>
  )
}
