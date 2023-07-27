import React from "react";
import "../assets/styles/Home.css";
import SlideShow from "./SlideShow";

function Home() {
  return (
    <>
      <div className="home-container">
        <h1>Welcome to our website</h1>
        <p>Navigate to Signup or Sneakers List from the navigation above</p>
      </div>
      <div className="slideshow-container">
        <SlideShow />
      </div>
    </>
  );
}

export default Home;
