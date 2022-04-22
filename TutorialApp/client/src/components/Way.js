import React from "react";
import { Routes, Route } from "react-router-dom";
import AddTutorial from "./AddTutorial";
import TutorialsList from "./TutorialsList";
import Tutorial from "./Tutorial";

const Way = () => {
  return (
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<TutorialsList />} />
        <Route path="/tutorials" element={<TutorialsList />} />
        <Route path="/add" element={<AddTutorial />} />

        <Route path="/tutorials/:id" element={<Tutorial />} />
      </Routes>
    </div>
  );
};

export default Way;
