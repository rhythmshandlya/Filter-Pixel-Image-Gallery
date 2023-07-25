import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosPrivate from "../api/axios";

const verifyGoogleAuth = async (auth, setAuth) => {};

const verifyStorage = async (auth, setAuth, navigate) => {
  return true;
};

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      if (auth?.viaGoogle) {
        await verifyGoogleAuth(auth, setAuth);
      } else if (!auth?.isAuthenticated) {
        await verifyStorage(auth, setAuth, navigate);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [auth, setAuth, navigate]);

  return <>{isLoading ? <div>loading..</div> : <Outlet />}</>;
};

export default PersistLogin;
