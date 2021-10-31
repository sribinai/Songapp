import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { DATA_URL } from "../index";
import { useCookies } from "react-cookie";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [cookies, setCookie] = useCookies(["playlist_token"]);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log(`playlist-Token: ${cookies.playlist_token}`);
  // console.log("this", isAuthenticated);

  // On mount check if the token data exists in DB
  useEffect(() => {
    console.log("on mount");
  }, []);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login-signup",
              state: { signup: false },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
