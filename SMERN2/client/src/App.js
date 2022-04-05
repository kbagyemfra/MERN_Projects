import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, Route, Switch } from "react-router-dom";

import addTutorial from "./components/addTutorial";
import tutorial from "./components/tutorial";
import tutorialList from "./components/tutorialList";

// WOW

class App extends Component {
  render() {
    return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">ghbKoder</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add One
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={tutorialList} />
          <Route exact path="/add" component={addTutorial} />
          <Route exact path="/tutorials/:id" component={tutorial} />
        </Switch>
      </div>
    </div>
    )
  }
}

export default App;
