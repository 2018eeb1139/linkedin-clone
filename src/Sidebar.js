import React from "react";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://thumbs.dreamstime.com/b/modern-computer-programming-code-screen-showing-random-scripts-113805394.jpg"
          alt=""
        />
        <Avatar className="sidebar__avatar" src={user.photoUrl}>
          {user.email[0].toUpperCase()}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who Viewed you</p>
          <p className="sidebar__statNumber">124</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on posts</p>
          <p className="sidebar__statNumber">3489</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recents</p>
        {recentItem("Coding")}
        {recentItem("Development")}
        {recentItem("Cloud & Devops")}
        {recentItem("Engineering")}
        {recentItem("Design")}
      </div>
    </div>
  );
};

export default Sidebar;
