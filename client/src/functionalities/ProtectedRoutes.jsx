import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import axios from "axios";
import { DATA_URL } from "../index";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["playlist_token"]);
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" ? true : false;

  // On mount check if the token data exists in DB
  // useEffect(() => {
  //   // console.log("on mount");
  //   checkValidToken();
  // }, []);
  // // API call to check if the token available is valid
  // const checkValidToken = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${DATA_URL}/playlist/api/user/get-data`
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //     console.log(err.response);
  //     // if (err.response.data.message) {
  //     //   // Redirect to login page
  //     //   history.push({
  //     //     pathname: "/login-signup",
  //     //     search: "?user=unathorized",
  //     //     state: { message: err.response.data.message },
  //     //   });
  //     // } else {
  //     //   history.push({
  //     //     pathname: "/login-signup",
  //     //     search: "?access=error",
  //     //     state: { message: "Unexpected error." },
  //     //   });
  //     // }
  //   }
  // };

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
