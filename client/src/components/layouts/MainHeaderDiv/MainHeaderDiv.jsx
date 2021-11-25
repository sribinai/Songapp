import React from "react";
import logo from "../../../images/PMPL-LOGO.png";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./main-header.styles.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AvatarIcon from "../../../components/AvatarIcon/AvatarIcon";

const MainHeaderDiv = ({
  title,
  routeName,
  redirectPromt,
  promptMessage,
  userInfo,
}) => {
  const history = useHistory();
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

  return (
    <div className='main-header'>
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
                <Dropdown.Item href='#'>User Settings</Dropdown.Item>
                <Dropdown.Item href='#'>Logout</Dropdown.Item>
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

export default MainHeaderDiv;
