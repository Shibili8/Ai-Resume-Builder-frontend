import React, { useState, useEffect } from "react";

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

import axios from "axios";
import api from "../api";

export default function PreviewPage() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const { id } = useParams();

  const [form, setForm] = useState(
    state?.form || null
  );

  const [gensummary, setSummary] =
    useState(
      state?.gensummary || ""
    );

  const [pdfLoading,
    setPdfloading
  ] = useState(false);



  // 🚀 Load data if opened from Dashboard

  useEffect(() => {

    if (!form && id) {

      const fetchResume =
        async () => {

          try {

            const res =
              await api.get(
                `/portfolio/${id}`
              );

            setForm(res.data);

            setSummary(
              res.data.summary || ""
            );

          } catch (err) {

            console.error(err);

            alert(
              "Failed to load resume"
            );

          }

        };

      fetchResume();

    }

  }, [id]);



  // If still no data

  if (!form) {

    return (

      <div style={{ padding: 40 }}>

        <h2>No data received</h2>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Go Back
        </button>

      </div>

    );

  }



  // ================= PDF EXPORT =================

  const exportPDF = async () => {

    try {

      setPdfloading(true);

      const response =
        await axios.post(

          "https://ai-resume-builder-backend-u4v2.onrender.com/pdf/export",

          { form, gensummary },

          { responseType: "arraybuffer" }

        );

      const blob =
        new Blob(
          [response.data],
          { type: "application/pdf" }
        );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${form.name || "resume"}.pdf`;

      link.click();

      window.URL.revokeObjectURL(url);

      setPdfloading(false);

    } catch (err) {

      setPdfloading(false);

      console.error(err);

      alert(
        "PDF Export failed"
      );

    }

  };



  // 🚀 EDIT FUNCTION

  const handleEdit = () => {

    navigate(`/builder/${form._id}`);

  };



  // 🚀 DELETE FUNCTION

  const handleDelete =
    async () => {

      if (!window.confirm(
        "Delete this resume?"
      )) return;

      try {

        await api.delete(
          `/portfolio/${form._id}`
        );

        alert(
          "Resume deleted"
        );

        navigate(
          "/dashboard"
        );

      } catch (err) {

        console.error(err);

        alert(
          "Delete failed"
        );

      }

    };



  return (

    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        margin: "20px auto",
        padding: "40px",
        background: "white",
        boxShadow:
          "0 0 10px rgba(0,0,0,0.15)",
        fontFamily: "Arial",
      }}
    >


{/* ================= BUTTON BAR ================= */}

      <div className="flex justify-between mb-6 items-center">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          ⬅ Back
        </button>


        <div className="flex gap-3">

          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            ✏ Edit
          </button>


          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            🗑 Delete
          </button>


          <button
            onClick={exportPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {pdfLoading
              ? "Exporting..."
              : "📄 Export PDF"}
          </button>

        </div>

      </div>



{/* ================= EXISTING RESUME UI ================= */}

{/* KEEP YOUR EXISTING UI BELOW THIS — NO CHANGE NEEDED */}

      {/* Your existing resume layout stays exactly the same */}
