import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
// import PlayerDashboard from "./pages/PlayerDashboard/PlayerDashboard";
import JoinRoom from "./pages/JoinRoom/JoinRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route exact path='/Home' component={HomePage} />
        <Route exact path='/createRoom' component={CreateRoom} />
        <Route exact path='/joinRoom' component={JoinRoom} />
        {/* <Route exact path='/joinRoom' component={PlayerDashboard} /> */}
      </Switch>
    </Router>
  );
}

export default App;
