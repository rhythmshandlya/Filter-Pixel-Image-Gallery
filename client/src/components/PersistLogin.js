import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const verifyStorage = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      setIsLoading(false);
      if (!token || !user) {
        navigate("/login");
        return false;
      }
      setAuth({
        user,
        token,
        isAuthenticated: true,
      });
      return true;
    };
    auth?.isAuthenticated ? setIsLoading(false) : verifyStorage();
  }, []);

  return <>{isLoading ? <div>loading..</div> : <Outlet />}</>;
};

export default PersistLogin;
