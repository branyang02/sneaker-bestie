import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/home_page/SideBar";

const SidebarLayout = () => {
  return (
    <div
      style={{
        padding: "50px 0px 0px 370px",
      }}
    >
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
