import React from "react";

const Banner = ({ setIsPaneOpen, isPaneOpen }) => {
  return (
    <div>
      <h1>Welcome to Sneaker Bestie</h1>
      <p>Navigate the menu to explore features</p>
      <button className="open-pane-button" onClick={() => setIsPaneOpen(true)}>
        <box-icon name="menu" size="lg"></box-icon>
      </button>
    </div>
  );
};

export default Banner;
