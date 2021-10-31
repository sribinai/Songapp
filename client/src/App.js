import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import PlayerDashboard from "./pages/PlayerDashboard/PlayerDashboard";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./functionalities/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login-signup' component={LoginSignUp} />
        <ProtectedRoute exact path='/createRoom' component={CreateRoom} />
        <ProtectedRoute exact path='/joinRoom' component={JoinRoom} />
        <ProtectedRoute exact path='/dashboard' component={PlayerDashboard} />
        {/* <Route exact path='/dashboard' component={PlayerDashboard} /> */}
        <Route exact path='*' component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
