import React from "react";

import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import imgbot from "../img/profile.png";

const Signup = () => {
  const { handleInputChange, saveSignUp, submitted } = useGlobalContext();

  return (
    <Container>
      <Row>
        <Col md={5} className="signup-bg"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          {" "}
          {submitted ? (
            <>
              <h2>You submitted succesfully</h2>
              {"  "}{" "}
              <Row md={1} style={{ position: "relative", left: "20px" }}>
                <a href="/chat">
                  <Button variant="success">Start Chatting</Button>
                </a>
              </Row>
            </>
          ) : (
            <>
              <Form
                style={{ width: "80%", maxWidth: 500 }}
                onSubmit={saveSignUp}
              >
                <h1 className="text-center">Create Account</h1>
                <div className="signup-profile-pic-container">
                  <img src={imgbot} alt="bot" className="signup-profile-pic" />
                  <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fas fa-plus-circle add-picture-icon"></i>
                  </label>
                </div>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter your name"
                    onChange={handleInputChange}
                    // value={e.target.name}
                    name="name"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleInputChange}
                    // value={email}
                    name="email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    // value={password}
                    name="password"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onSubmit={(e) => e.preventDefault()}
                >
                  Signup
                </Button>
                <div className="py-4">
                  <p className="text-center">
                    Already a Member with an Account ?{" "}
                    <Link to="/login">Login</Link>
                  </p>
                </div>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
