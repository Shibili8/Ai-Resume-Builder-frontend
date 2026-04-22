import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
    <Navbar/>
    
    
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">

        <h1 className="text-4xl font-bold text-blue-700">
        Build Your Professional Resume with AI
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="glass-card p-8 rounded-2xl shadow-lg w-80">

            <h2 className="text-xl font-semibold mb-2">
            📄 Create Resume
            </h2>

            <p className="text-gray-600 mb-4">
            Generate a smart AI-powered resume.
            </p>

            <button
            className="btn-primary text-white px-5 py-2 rounded-xl"
            onClick={()=>navigate("/builder")}
            >
            Create Resume
            </button>

          </div>

          <div className="glass-card p-8 rounded-2xl shadow-lg w-80">

            <h2 className="text-xl font-semibold mb-2">
            📊 Dashboard
            </h2>

            <p className="text-gray-600 mb-4">
            Manage and edit your saved resumes.
            </p>

            <button
            className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-xl"
            onClick={()=>navigate("/dashboard")}
            >
            Open Dashboard
            </button>

          </div>

        </div>

      </div>
    
    </>
  );
}
