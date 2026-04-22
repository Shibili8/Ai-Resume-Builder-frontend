import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import api from "../api"; // ✅ Import directly

export default function Dashboard() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPortfolios = async () => {

      try {
        console.log("Component Reached")
        const res =
          await api.get("/portfolio");

        console.log(
          "API RESPONSE:",
          res.data
        );

        setData(res.data || []);

      } catch (err) {

        console.error(
          "FETCH ERROR:",
          err.response?.data || err.message
        );

        setError(true);

      } finally {

        setLoading(false);

      }

    };

    fetchPortfolios();

  }, []);

  if (error)

    return (

      <>
        <Navbar />

        <p className="text-center text-red-600 mt-10">
          Error loading portfolio
        </p>

      </>

    );

  if (loading)

    return (

      <>
        <Navbar />

    <div className="flex items-center justify-center min-h-screen">

      <div className="text-center">

        {/* Spinner */}

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

        {/* Text */}

        <h2 className="text-xl font-semibold text-gray-700">
          Preparing your resume...
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Please wait while we load your data
        </p>

      </div>

    </div>

      </>

    );

    const handlePreview = (id) => {
  navigate(`/preview/${id}`);
};

const handleEdit = (id) => {
  navigate(`/builder/${id}`);
};

const handleDelete = async (id) => {

  if (!window.confirm("Delete this resume?"))
    return;

  try {

    await api.delete(`/portfolio/${id}`);

    setData(
      data.filter((p) => p._id !== id)
    );

  } catch (err) {

    console.error(err);

    alert("Delete failed");

  }

};

  return (

    <>

      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <h2 className="text-3xl font-bold mb-6">
          Your Resumes
        </h2>

        {data.length === 0 ? (

          <p className="text-gray-500">
            No resumes created yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.map((p)=>(

          <div
          key={p._id}
          className="glass-card p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition cursor-pointer"
          onClick={()=>handlePreview(p._id)}
          >

          <h3 className="text-lg font-bold text-blue-700">
          {p.name || "Untitled Resume"}
          </h3>

          <p className="text-gray-500 mt-2 text-sm">
          📅 Created:
          {" "}
          {p.createdAt
          ? new Date(p.createdAt).toLocaleDateString()
          : "N/A"}
          </p>

          <div className="flex gap-2 mt-4">

          <button
          onClick={(e)=>{
          e.stopPropagation();
          handleEdit(p._id);
          }}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
          >
          Edit
          </button>

          <button
          onClick={(e)=>{
          e.stopPropagation();
          handleDelete(p._id);
          }}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
          >
          Delete
          </button>

          </div>

          </div>

          ))}

          </div>

        )}

      </div>

    </>

  );

}