import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Welcome from "./components/welcome/welcome";
import Clock from "./components/clock/clock";
import Contact from "./components/contact/contact";
import Navigation from "./components/navigation/navigation";

class App extends Component {
  render() {
    return (
      <div>
        {/* render the Navigation component */}
        <Navigation />
        <Route
          exact
          path="/"
          render={(props) => <Welcome {...props} name="Lorne" />}
        />

        <Route
          path="/welcome/:name"
          render={(props) => <Welcome name={props.match.params.name} />}
        />

        <Route path="/clock" component={Clock} />
        <Route path="/contact" component={Contact} />
      </div>
    );
  }
}
export default App;
