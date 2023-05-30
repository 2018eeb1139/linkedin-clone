import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "./Post";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import FlipMove from "react-flip-move";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebase";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      name: user?.name,
      description: user?.email,
      message: input,
      photoUrl: user?.photoUrl,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              type="text"
              placeholder="Start a post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" onClick={sendPost}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photos" color="#378FE9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#5F9B41" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C37D16" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write Article"
            color="#E16745"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            message={message}
            description={description}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
