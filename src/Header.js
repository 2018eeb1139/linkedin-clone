import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/userSlice";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
          alt=""
        />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption title="Home" Icon={HomeIcon} />
        <HeaderOption title="My Network" Icon={SupervisorAccountIcon} />
        <HeaderOption title="Jobs" Icon={BusinessCenterIcon} />
        <HeaderOption title="Messaging" Icon={ChatIcon} />
        <HeaderOption title="Notification" Icon={NotificationsIcon} />
        <HeaderOption title="Me" avatar="true" onClick={logoutOfApp} />
      </div>
    </div>
  );
};

export default Header;
