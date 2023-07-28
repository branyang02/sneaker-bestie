import React from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Sidebar from "./SideBar";

const LeftPane = ({ isOpen, onClose }) => {
  return (
    <div>
      <SlidingPane
        closeIcon={<div>Some div containing custom close icon.</div>}
        isOpen={isOpen}
        title="Hey, it is optional pane title.  I can be React component too."
        from="left"
        width="200px"
        onRequestClose={onClose}
      >
        <Sidebar />
        <div>And I am pane content on left.</div>
      </SlidingPane>
    </div>
  );
};

export default LeftPane;
