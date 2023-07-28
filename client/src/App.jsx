import "./assets/styles/App.css";
import "boxicons/css/boxicons.min.css";
import "@/assets/styles/app.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SidebarLayout from "@/components/home_page/SideBarLayout";
import Home from "@/components/home_page/Home";

const Hi = () => <div>Hi</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route index element={<Home />} />
            <Route path="/started" element={<Hi />} />
            <Route path="/calendar" element={<Hi />} />
            <Route path="/user" element={<Hi />} />
            <Route path="/order" element={<Hi />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
