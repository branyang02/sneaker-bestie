import React, { useState } from "react";
import "@/assets/styles/Home.css";
import SlideShow from "./SlideShow";
import LeftPane from "./LeftPane";

function Home() {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  return (
    <>
      <div className="home-container">
        <h1>Welcome to Sneaker Bestie</h1>
        <p>Navigate to Signup or Sneakers List from the navigation above</p>
        <button onClick={() => setIsPaneOpen(true)}>Open Pane</button>
      </div>
      <div className="slideshow-container">
        <SlideShow />
      </div>
      <div className="left-pane-button">
        <LeftPane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)} />
      </div>
    </>
  );
}

export default Home;
