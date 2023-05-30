import React from "react";
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Widgets = () => {
  const newArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newArticle(
        "React Top Notch",
        "The Most awaited Series is back with some more projects"
      )}
      {newArticle(
        "Frontend Technologies",
        "React, Next JS, Typescript, HTML, CSS, Javascript, Django"
      )}
      {newArticle(
        "Backend Technologies",
        "Spring boot, Java, Node JS, Python, Ruby with Rails, Golang"
      )}
      {newArticle(
        "Developers Corner",
        "To get the most demanding techs you have to learn new things in a good way."
      )}
      {newArticle(
        "Cloud Technologies",
        "The more is the data the more we have to use Cloud computing."
      )}
    </div>
  );
};

export default Widgets;
