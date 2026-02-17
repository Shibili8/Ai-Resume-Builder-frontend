import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/ResumeBuilder";
import PreviewPage from "./components/PreviewPage";
import api from "./api";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onSuccess={() => {}} />} />
        <Route path="/login" element={<Login onSuccess={() => {}} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/dashboard" element={<Dashboard api={api} />} />
        <Route path="/preview" element={<PreviewPage />}/>
      </Routes>
    </BrowserRouter>
  );
}
