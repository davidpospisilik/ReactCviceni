import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Contact from "./components/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
