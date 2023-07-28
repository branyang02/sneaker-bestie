import React, { useState } from "react";
import "@/assets/styles/Home.css";
import LeftPane from "@/components/home_page/LeftPane";
import "boxicons";

import Banner from "@/components/home_page/Banner";
import Login from "@/components/user/login";
import Signup from "@/components/user/signup";

function UserLayout() {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  return (
    <>
      <div className="home-container">
        <Banner setIsPaneOpen={setIsPaneOpen} isPaneOpen={isPaneOpen} />
      </div>
      <div className="left-pane-button">
        <LeftPane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)} />
      </div>
      <div className="auth-container">
        <div className="login">
          <Login />
        </div>
        <div className="signup">
          <Signup />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
