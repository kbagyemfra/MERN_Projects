import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TutoContext } from "../context/TutoContext";

const Tutorial = () => {
  const {
    currentTutorial,
    handleInputChange,
    updatePublished,
    deleteTutorial,
    updateTutorial,
    message,
    getTutorial,
  } = useContext(TutoContext);

  const { id } = useParams();

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  return (
    <>
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentTutorial.published ? (
              <Button variant="primary" onClick={() => updatePublished(false)}>
                UnPublish
              </Button>
            ) : (
              <Button variant="primary" onClick={() => updatePublished(true)}>
                Publish
              </Button>
            )}

            <Button variant="danger" onClick={deleteTutorial}>
              Delete
            </Button>
            <Button variant="success" onClick={updateTutorial}>
              Update
            </Button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Tutorial;
