import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Welcome from "./components/welcome/welcome";
import Clock from "./components/clock/clock";
import Contact from "./components/contact/contact";
import Navigation from "./components/navigation/navigation";
import Nomatch from "./components/nomatch/nomatch";

class App extends Component {
  render() {
    return (
      // div was here
      <div>
       
       <Navigation />
        <Switch>
      
          <Route
            exact
            path="/"
            render={(props) => <Welcome {...props} name="Lorne" />}
          >
            <Welcome name="Lorne" />
          </Route>

          <Route
            path="/welcome/:name"
            render={(props) => <Welcome name={props.match.params.name} />}
          ></Route>

          <Route path="/clock" component={Clock}>
            <Clock />
          </Route>
          <Route path="/contact" component={Contact}>
            <Contact />
          </Route>

          <Route path="/nomatch" component={Nomatch}>
            <Nomatch />
          </Route>
          <Redirect to="/nomatch" />
        </Switch>
      </div>
    );
  }
}
export default App;
