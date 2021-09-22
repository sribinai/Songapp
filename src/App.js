import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import JoinRoom from "./pages/JoinRoom/JoinRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/createRoom'>
          <CreateRoom />
        </Route>
        <Route exact path='/joinRoom'>
          <JoinRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
