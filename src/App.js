import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Widgets from "./Widgets";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            name: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
