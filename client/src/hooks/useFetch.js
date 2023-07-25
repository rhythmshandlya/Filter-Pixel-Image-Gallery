import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axiosPrivate.get(url);
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
