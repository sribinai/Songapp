import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import axios from "axios";
import { DATA_URL } from "../index";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["playlist_token"]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount check if the token data exists in DB
  useEffect(() => {
    if (!userInfo) {
      checkValidToken();
    }
  }, [userInfo]);
  // // API call to check if the token available is valid
  const checkValidToken = async () => {
    try {
      const response = await axios.get(
        `${DATA_URL}/playlist/api/user/get-data`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setUserInfo(response.data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
      setIsLoaded(true);
    }
  };

  if (!isLoaded) {
    return <p>Loading....</p>;
  } else if (isLoaded === true && userInfo === null) {
    return (
      <Redirect
        to={{
          pathname: "/login-signup",
          search: "?user=unauthorized",
          state: { signup: false },
        }}
      />
    );
  } else {
    return (
      <Route
        {...restOfProps}
        render={(props) => <Component {...props} {...userInfo} />}
      />
    );
  }
}

export default ProtectedRoute;
