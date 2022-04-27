import React, { useState, useContext, createContext } from "react";
import postService from "../http-common";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initSignupState = {
    id: null,
    name: "",
    email: "",
    password: "",
  };

  const initLoginState = {
    id: null,
    email: "",
    password: "",
  };

  const [signup, setSignup] = useState(initSignupState);
  const [login, setLogin] = useState(initLoginState);
  const [submitted, setSubmitted] = useState(false);
  // const [errors, setError] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
    // console.log(e.target.value);
  };

  const saveSignUp = async (e) => {
    e.preventDefault();
    console.log(signup);

    var data = {
      name: signup.name,
      email: signup.email,
      password: signup.password,
    };

    console.log(data);
    try {
      const sign = await postService.postSignUp(data);
      setSubmitted(true);
      console.log(sign);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    // console.log(e.target);
    // console.log(login);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(login);

    var data = {
      email: login.email,
      password: login.password,
    };

    try {
      const res = await postService.postLogin(data);
      console.log(res.data.user);

      if (res.data.user) {
        window.location.assign("/");
      }
    } catch (error) {
      console.log("This is the major Error: ", error.response.data.error);
    }
  };

  // const handleError = (e) => {
  //   console.log(error);
  // }

  return (
    <AppContext.Provider
      value={{
        handleInputChange,
        saveSignUp,
        submitted,
        setSubmitted,
        handleLoginInputChange,
        loginUser,
        login,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
