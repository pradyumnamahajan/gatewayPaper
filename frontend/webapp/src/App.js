import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Verify from "./Pages/Verify";
import AccessGranted from "./Pages/AccessGranted";
import AccessDenied from "./Pages/AccessDenied";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Verify} />
          <Route exact path="/accessGranted" component={AccessGranted} />
          <Route exact path="/accessDenied" component={AccessDenied} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
