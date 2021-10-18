import React from "react";
import "./App.css";
import { Button } from "antd";
import Home from "./screens/Home";
import Routes from "./routes";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
