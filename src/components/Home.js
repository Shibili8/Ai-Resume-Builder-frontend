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
    
    
      <div className="min-w-3xl flex flex-col min-h-screen items-center justify-center mx-auto space-y-6">
        <div className="bg-white w-1/2 h-1/3  p-6 rounded-xl shadow-md hover:bg-blue-100">
          <h2 className="text-xl font-bold">Create Resume</h2>
          <p className="text-gray-600">Generate your AI-powered resume.</p>
          <button
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/builder")}
          >
            Create Resume
          </button>
        </div>

        <div className="bg-white w-1/2 h-1/3 p-6 rounded-xl shadow-md hover:bg-blue-100">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-gray-600">View your saved resumes.</p>
          <button
            className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    
    </>
  );
}
