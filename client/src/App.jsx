import "./assets/styles/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import SneakersList from "./components/SneakersList";
import Signup from "./components/SignUp";
import Home from "./components/home_page/Home";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/sneakers">Sneakers List</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sneakers" element={<SneakersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
