import React, { useState, createContext, useEffect } from "react";
import TutorialService from "../http-common";
import { useGlobalContext } from "./context";
import { useParams, useNavigate } from "react-router-dom";

export const TutoContext = createContext();

const TutoContextProvider = ({ children }) => {
  const { id } = useParams();
  var navigate = useNavigate();

  const { initialTutorialState } = useGlobalContext();

  const [message, setMessage] = useState("");
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);

  const getTutorial = async (id) => {
    setCurrentTutorial(null);

    try {
      const response = await TutorialService.get(id);
      console.log(response);
      setCurrentTutorial(response.data.tutorial);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = async (status) => {
    var data = {
      id: currentTutorial._id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    console.log(data);

    try {
      const response = await TutorialService.update(currentTutorial._id, data);
      setCurrentTutorial({ ...currentTutorial, published: status });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTutorial = async () => {
    try {
      const response = await TutorialService.update(
        currentTutorial._id,
        currentTutorial
      );
      console.log(response.data);
      setMessage("The tutorial has been updated");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTutorial = async () => {
    try {
      const response = await TutorialService.remove(currentTutorial._id);
      console.log(response.data);
      navigate("/tutorials");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TutoContext.Provider
      value={{
        deleteTutorial,
        updateTutorial,
        updatePublished,
        handleInputChange,
        getTutorial,
        message,
        setMessage,
        currentTutorial,
        setCurrentTutorial,
      }}
    >
      {children}
    </TutoContext.Provider>
  );
};

export default TutoContextProvider;
