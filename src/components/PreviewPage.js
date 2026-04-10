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
      onClick={exportPDF}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      {pdfLoading
        ? "Exporting..."
        : "📄 Export PDF"}
    </button>

  </div>

</div>


{/* ================= HEADER ================= */}

<div
  style={{
    textAlign: "center",
    marginBottom: "20px"
  }}
>

  <h1
    style={{
      margin: 0,
      fontWeight:"600",
      fontSize:"20px",
      color:"#1d59b5"
    }}
  >
    {form.name}
  </h1>

  <h3 style={{ margin: 0 }}>
    {form.role}
  </h3>

  <p
    style={{
      marginTop:"10px",
      fontSize:"14px"
    }}
  >
    {form.city},
    {form.state},
    {form.pincode}
    {" | "}
    {form.emailId}
    {" | "}
    {form.phoneNo}
    {" | "}
    {form.linkedIn}
    {" | "}
    {form.portfolioLink}
  </p>

</div>


{/* ================= SUMMARY ================= */}

{gensummary && (

<>
  <h2
    style={{
      fontWeight:"600",
      color:"#1d59b5",
      fontSize:"16px"
    }}
  >
    SUMMARY
  </h2>

  <hr
    style={{
      border:"1px solid",
      marginBottom:"10px"
    }}
  />

  <p>{gensummary}</p>
</>

)}


{/* ================= EDUCATION ================= */}

{form.education?.length > 0 && (

<>
  <h2
    style={{
      fontWeight:"600",
      color:"#1d59b5",
      fontSize:"16px"
    }}
  >
    EDUCATION
  </h2>

  <hr
    style={{
      border:"1px solid",
      marginBottom:"10px"
    }}
  />

  {form.education.map(
    (edu,index)=>(
      <div
        key={index}
        style={{
          marginBottom:"12px"
        }}
      >

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            fontWeight:600
          }}
        >

          <span>
            {edu.institute}
          </span>

          <span>
            {edu.startYear}
            {" - "}
            {edu.endYear}
          </span>

        </div>

        <div style={{
            display:"flex",
            justifyContent:"space-between",
            fontWeight:600
          }}>
         <div>
          {edu.eduType}
          {" "}
          {edu.department}

          </div>

        {/* ✅ CGPA Display */}
          <div>
        {edu.score && (

          <div>

            {edu.scoreType}: {edu.score}

          </div>

        )}
        </div>
        </div>

      </div>
    )
  )}

</>

)}


{/* ================= SKILLS ================= */}

{form.skills?.length > 0 && (

<>
  <h2
    style={{
      fontWeight:"600",
      color:"#1d59b5",
      fontSize:"16px"
    }}
  >
    SKILLS
  </h2>

  <hr
    style={{
      border:"1px solid",
      marginBottom:"10px"
    }}
  />

  <p>
    {form.skills.join(", ")}
  </p>

</>

)}

</div>

);
}
