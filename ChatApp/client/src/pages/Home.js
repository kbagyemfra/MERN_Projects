import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <>
      <Row>
        <Col
          md={6}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <div>
            <Col md={9}>
              <h1
                style={{
                  position: "relative",
                  left: "10%",
                  color: "#ff4411",
                  fontSize: "48px",
                  fontFamily: "Signika",
                  sansSerif: true,
                  paddingBottom: "10px",
                }}
              >
                Share the world with your friends and family
              </h1>
            </Col>
            <p
              style={{
                position: "relative",
                left: "10%",
                sansSerif: true,
                paddingBottom: "10px",
              }}
            >
              Message App that lets you connect with the world
            </p>
            <LinkContainer
              to="/chat"
              style={{
                position: "relative",
                left: "25%",
                paddingBottom: "10px",
              }}
            >
              <Button variant="success">
                Get Started<i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={6} className="home-bg"></Col>
      </Row>
    </>
  );
};

export default Home;
