import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Way from "./Way";
import "bootstrap/dist/css/bootstrap.min.css";
import TutoContextProvider from "../context/TutoContext";

const Navy = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/tutorials"> bezKoder</Navbar.Brand>
          <Nav className="me-auto">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <TutoContextProvider>
        <Way />
      </TutoContextProvider>
    </>
  );
};

export default Navy;
