import React, { useState } from "react";
import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // Make the API call to signup using formData
      console.log(formData);
      const res = await axiosPrivate.post("auth/signup", formData);

      // Handle the success response from the server
      setSuccessMessage(res.data.message);
      setAuth({
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true,
      });
      console.log(res.data);
      if (!res.data.token || !res.data.user) {
        setError(error.response?.data?.message || "An error occurred");
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axiosPrivate.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      navigate("/");
    } catch (error) {
      // Handle the error response from the server
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <form className="rounded" onSubmit={handleSubmit}>
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                 text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                 text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                   text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                   text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-3xs [background:linear-gradient(97.51deg,_#27eecb,_#12d2d2)] 
                      shadow-[0px_7px_20px_rgba(30,_226,_206,_0.25)] flex flex-row py-4 px-8 items-center 
                      justify-center text-xl text-secondary-color  cursor-pointer w-full
                      rounded-lg"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}
    </form>
  );
};

export default SignupForm;
