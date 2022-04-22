import React, { useState, useContext, createContext, useEffect } from "react";
import TutorialService from "../http-common";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ADDING TUTORIAL STARTS

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTutorial({ ...tutorial, [name]: value });
  };
  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
    };
    TutorialService.create(data)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  // ADDING TUTORIAL ENDS

  // GETTING TUTORIAL STARTS

  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  useEffect(() => {
    retrieveTutorials();
  }, []);
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveTutorials = () => {
    TutorialService.getAll()
      .then((response) => {
        console.log(response.data.tutorials);
        setTutorials(response.data.tutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };
  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };
  const removeAllTutorials = () => {
    TutorialService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    TutorialService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data.tutorials);
        console.log(response.data.tutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // GETTING TUTORIAL ENDS

  return (
    <AppContext.Provider
      value={{
        // ADDING TUTORIAL
        handleInputChange,
        tutorial,
        setTutorial,
        submitted,
        setSubmitted,
        newTutorial,
        saveTutorial,
        // GETTING TUTORIAL
        searchTitle,
        setSearchTitle,
        currentIndex,
        setCurrentIndex,
        currentTutorial,
        setCurrentTutorial,
        tutorials,
        setTutorials,
        findByTitle,
        removeAllTutorials,
        setActiveTutorial,
        refreshList,
        retrieveTutorials,
        onChangeSearchTitle,
        initialTutorialState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
