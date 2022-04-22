import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { Button } from "react-bootstrap";

const TutorialsList = () => {
  const {
    searchTitle,
    currentIndex,
    currentTutorial,
    tutorials,
    findByTitle,
    removeAllTutorials,
    setActiveTutorial,
    onChangeSearchTitle,
  } = useGlobalContext();

  if (currentTutorial) {
    console.log("currentTutorial: ", currentTutorial);
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>
        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <div>
              <label>
                <strong>ID:</strong>
              </label>
              {currentTutorial._id}
            </div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
            <Link
              to={`/tutorials/${currentTutorial._id}`}
              className="badge badge-warning"
            >
              <Button variant="warning">Edit</Button>
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
