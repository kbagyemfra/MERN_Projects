import React from "react";
import { useGlobalContext } from "../context/context";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddTutorial = () => {
  const { newTutorial, handleInputChange, tutorial, saveTutorial, submitted } =
    useGlobalContext();

  const navigate = () => {
    navigate("/tutorials");
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Button variant="success" onClick={newTutorial}>
            Add More
          </Button>{" "}
          <Button variant="info" onClick={navigate}>
            Home
          </Button>
        </div>
      ) : (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                placeholder="title"
                required
                value={tutorial.title}
                onChange={handleInputChange}
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                className="mb-4"
                type="text"
                required
                value={tutorial.description}
                onChange={handleInputChange}
                name="description"
              />
            </Form.Group>
          </Form>
          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
