import React, { useState } from "react";
import "@/assets/styles/Home.css";
import SlideShow from "./SlideShow";
import LeftPane from "./LeftPane";
import "boxicons";

import Banner from "./Banner";

function Home() {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  return (
    <>
      <div className="home-container">
        <Banner setIsPaneOpen={setIsPaneOpen} isPaneOpen={isPaneOpen} />
      </div>
      <div className="left-pane-button">
        <LeftPane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)} />
      </div>
      <div className="introduction-container">
        <h2>Welcome to our Personal Sneaker Recommendation System</h2>
        <p>
          We understand that finding the perfect sneakers that match your style
          can be challenging. That's why we've developed a personal sneaker
          recommendation system. It learns your preferences based on the
          sneakers you interact with, then curates a list of sneakers that you
          might love. Start exploring now and find your perfect fit!
        </p>
      </div>
      <div className="slideshow-container">
        <SlideShow />
      </div>
    </>
  );
}

export default Home;
