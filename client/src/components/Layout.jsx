import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/navbar";
import useAuth from "../hooks/useAuth";

export default function Layout() {
  // Get the current pathname from the location object
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="site-wrapper">
      <Navbar isLoginPage={isLoginPage} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
