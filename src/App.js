// src/App.js

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Pages/Form";
import "bootstrap/dist/css/bootstrap.css";
import List from "./Pages/List";
import View from "./Pages/View";
import Login from "./Pages/Login/login";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/form"
          element={isLoggedIn ? <Form /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/Form" element={<Form />} />
        <Route path="/Form/:id" element={<Form />} />
        <Route path="/list" element={<List />} />
        <Route path="/view" element={<View />} />
        <Route path="/View/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
