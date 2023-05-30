import React, { useState, useEffect } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const register = (e) => {
    if (!name) {
      return alert("Please enter full name!");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
          //   email: email,
        }).then(() => {
          dispatch(
            login({
              email: auth.currentUser.email,
              uid: auth.currentUser.uid,
              displayName: name,
              photoUrl: photoUrl,
            })
          );
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        dispatch(
          login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            photoUrl: userCredential.user.photoURL,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div className="login">
      <img
        src="https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo.png"
        alt=""
      />
      <form>
        <input
          type="text"
          vaule={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
        />
        <input
          type="text"
          vaule={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Profile Pic URL (optional)"
        />
        <input
          type="text"
          vaule={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          vaule={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a Member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
};

export default Login;
