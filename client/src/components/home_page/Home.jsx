import React, { useState } from "react";
import "@/assets/styles/Home.css";
import SlideShow from "./SlideShow";
import LeftPane from "./LeftPane";
import "boxicons";

function Home() {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  return (
    <>
      <div className="home-container">
        <h1>Welcome to Sneaker Bestie</h1>
        <p>Navigate the menu to explore features</p>
        <button
          className="open-pane-button"
          onClick={() => setIsPaneOpen(true)}
        >
          <box-icon name="menu" size="lg"></box-icon>
        </button>
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
