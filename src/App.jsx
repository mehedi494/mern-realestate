import { RouterProvider } from "react-router-dom";
import routes from "./components/routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {/* *   Two way of routing declare */}
      {/*way 1. */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter> */}
      {/* way 2. */}
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
