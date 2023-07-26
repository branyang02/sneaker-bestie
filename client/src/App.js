import "./assets/styles/App.css";
import React from "react";

import SneakersList from "./components/SneakersList";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <h1>Sneakers</h1>
      <Signup />
      <Login />
      <SneakersList />
    </div>
  );
}

export default App;
