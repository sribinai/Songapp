import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import PlayerDashboard from "./pages/PlayerDashboard/PlayerDashboard";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/createRoom' component={CreateRoom} />
        <Route exact path='/joinRoom' component={JoinRoom} />
        <Route exact path='/dashboard' component={PlayerDashboard} />
        <Route exact path='*' component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
