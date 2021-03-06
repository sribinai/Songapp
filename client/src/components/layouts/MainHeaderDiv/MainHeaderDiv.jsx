import React, { forwardRef, useState, useEffect } from "react";
import logo from "../../../images/PMPL-LOGO.png";
import {Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./main-header.styles.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AvatarIcon from "../../../components/AvatarIcon/AvatarIcon";
import axios from "axios";
import { DATA_URL } from "../../..";
import { useCookies } from "react-cookie";

const MainHeaderDiv = (
  { title, routeName, redirectPromt, promptMessage, userInfo },
  ref
) => {
  const history = useHistory();
  const [cookie, removeCookie] = useCookies(["playlist_token"]);
  const promptCall = (path) => {
    Swal.fire({
      title: promptMessage,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const redirectHome = () => {
    if (redirectPromt) {
      promptCall("/");
    } else {
      history.push("/");
    }
  };

  const redirectPage = () => {
    if (redirectPromt) {
      promptCall(routeName);
    } else {
      history.push(routeName);
    }
  };

  // logout user api call
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${DATA_URL}/playlist/api/user/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log('logout');
        removeCookie("playlist_token");
        history.push({
          pathname: "/",
          search: "?logout=success",
          state: {
            message: "You have successfully logged out of your account.",
          }
        })
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have successfully logged out of your account.",
        });
        
        return;
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message
        });
      } else {
        // console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong."
        });
      }
      return;
    }
  };


  return (
    <div ref={ref} className='main-header'>
      <div>
        <img
          src={logo}
          alt='Logo'
          className='logo-image'
          style={{ cursor: "pointer" }}
          onClick={redirectHome}
        />
      </div>

      <div className='username'>
        {userInfo && (
          <>
            <AvatarIcon
              imageUrl='https://robohash.org/34?set=set2'
              AvatarWidth='30'
            />

            <Dropdown className='d-inline mx-2'>
              <Dropdown.Toggle
                className='text-dark'
                as='span'
                id='dropdown-autoclose-true'
              >
                <em>
                  <i>{userInfo.user_name}</i>
                </em>
              </Dropdown.Toggle>

              <Dropdown.Menu>
              
                <Dropdown.Item as={Link} to='/userSettings'>User Settings</Dropdown.Item>
                <Dropdown.Item href='#'>User Rooms</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}

        <span onClick={redirectPage} style={{ cursor: "pointer" }}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default forwardRef(MainHeaderDiv);
