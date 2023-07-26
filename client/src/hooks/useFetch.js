import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

// Set default headers for all Axios requests

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axiosPrivate.get(url, {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        setError(error.message || "Something Went Wrong!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
