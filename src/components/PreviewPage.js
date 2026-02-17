import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pdfLoading, setPdfloading] = useState(false)

  if (!state) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No data received</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const { form, gensummary } = state;

  // ----------------- Export PDF -----------------
const exportPDF = async () => {
  try {
    setPdfloading(true);

    const response = await axios.post(
      "https://ai-resume-builder-backend-u4v2.onrender.com/pdf/export",
      { form, gensummary },
      { responseType: "arraybuffer" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${form.name || "resume"}.pdf`;
    link.click();

    window.URL.revokeObjectURL(url);
    setPdfloading(false);

  } catch (err) {
    setPdfloading(false);
    console.error("Export error:", err);
    alert("PDF Export failed. Check console for details.");
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
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
        fontFamily: "Arial",
      }}
    >
      {/* ----------------- Buttons ----------------- */}
      <div className="flex justify-between mb-6 items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-300"
        >
          ⬅ Back
        </button>

        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {pdfLoading ? "Exporting PDF..." : "📄 Export PDF"}
        </button>
      </div>


      {/* ===================== HEADER ===================== */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: 0, fontWeight:"600", fontSize:"20px", color: "#1d59b5" }}>{form.name}</h1>
        <h3 style={{ margin: 0, fontWeight: 500 }}>{form.role}</h3>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          {form.city},{form.state},{form.pincode} | {form.emailId} | {form.phoneNo} | {form.linkedIn} | {form.portfolioLink}
        </p>
      </div>

      {/* ===================== SUMMARY ===================== */}
      <h2 style={{fontWeight: "600", color:"#1d59b5", fontSize:"16px"}}>SUMMARY</h2>
      <hr style={{border: "1px solid", marginBottom:"10px"}}/>
      <p>{gensummary}</p>


      {/* ===================== EXPERIENCE ===================== */}
      {form.experience.role===""? (
        <>
          <h2 style={{fontWeight: "600",color:"#1d59b5", fontSize:"16px"}}>EXPERIENCE</h2>
          <hr style={{border: "1px solid", marginBottom:"10px"}}/>
          {form.experience?.map((exp, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                <span>{exp.role}</span>
                <span>{exp.duration} Year</span>
              </div>
              <div>{exp.company}</div>
              {exp.activities && <p>{exp.activities}</p>}
            </div>
          ))}
        </>
      ): null}
      

      {/* ===================== PROJECTS ===================== */}
      {form.projects.title===""? (
        <>
        <h2 style={{fontWeight: "600",color:"#1d59b5", fontSize:"16px"}}>PROJECTS</h2>
        <hr style={{border: "1px solid", marginBottom:"10px"}}/>
        {form.projects?.map((p, index) => (
          <div key={index} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
              <span>{p.name}</span>
              {p.link && <a href={p.link} style={{color: "blue"}}>Live Demo</a>}
            </div>
            <p>{p.description}</p>

            {p.keyPoints?.filter(Boolean).length > 0 && (
              <ul style={{ marginLeft: "20px" }}>
                {p.keyPoints.map((kp, i) => kp && <li key={i}>{kp}</li>)}
              </ul>
            )}

            {p.technologies && (
              <p>
                <strong style={{fontWeight:"540"}}>Tech Used:</strong> {p.technologies}
              </p>
            )}
          </div>
        ))}
        </>
      ): null}
      


      {/* ===================== EDUCATION ===================== */}
      <h2 style={{fontWeight: "600",color:"#1d59b5", fontSize:"16px"}}>EDUCATION</h2>
      <hr style={{border: "1px solid", marginBottom:"10px"}}/>
      {form.education?.map((edu, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
            <span style={{fontWeight: "600", color:"#2B2B2B"}}>{edu.institute}</span>
            <span>{edu.startYear} - {edu.endYear}</span>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <span>{edu.eduType}</span>
            <span>{edu.department}.</span>
            <span>{edu.scoreType}:</span>
            <span>{edu.score}</span>
            
          </div>
        </div>
      ))}

      {/* ===================== SKILLS ===================== */}
      {form.skills[0] !== "" ? (
        <>
          <h2 style={{fontWeight: "600",color:"#1d59b5", fontSize:"16px"}}>SKILLS</h2>
          <hr style={{border: "1px solid", marginBottom:"10px"}}/>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {form.skills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "14px"
                }}
              >
                {idx===form.skills.length-1?`${skill}`: `${skill}, `}
              </span>
            ))}
          </div>
        </>
      ): null}

      
      {/* ===================== CERTIFICATES ===================== */}
      {form.certificates.title===""? (
        <>
          <h2 style={{fontWeight: "600",color:"#1d59b5", fontSize:"16px"}}>CERTIFICATES</h2>
          <hr style={{border: "1px solid", marginBottom:"10px"}}/>
          {form.certificates?.map((c, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                <strong>{c.title}</strong>
                <span>{c.issuedOn}</span>
              </div>
              
              <p>Issued By: {c.issuedBy}</p>
              {c.credential && <p>Credential: {c.credential}</p>}
            </div>
          ))}
        </>
      ):null}
      

      {/* ===================== ADDITIONAL INFORMATION ===================== */}
{(form.additionalLanguages?.length > 0 ||
  form.nationality ||
  form.availabilityType) && (
  <>
    <h2 style={{ fontWeight: "600", color:"#1d59b5", fontSize: "16px" }}>
      ADDITIONAL INFORMATION
    </h2>
    <hr style={{ border: "1px solid", marginBottom: "10px" }} />

    {/* ---------- Languages ---------- */}
    {form.languages?.filter(l => l.language.trim()).length > 0 && (
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          alignItems: "flex-start",
          fontSize: "14px",
          lineHeight: "20px"
        }}
      >
        {/* Label */}
        <strong style={{ marginRight: "6px", whiteSpace: "nowrap" }}>
          Languages:
        </strong>

        {/* List */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: "4px 6px"
          }}
        >
          {form.languages
            .filter((l) => l.language.trim())
            .map((lang, idx, arr) => {
              const levels = [];
              if (lang.read) levels.push("Read");
              if (lang.write) levels.push("Write");
              if (lang.speak) levels.push("Speak");

              return (
                <span key={idx} style={{fontSize:"16px"}}>
                  {lang.language}
                  {levels.length > 0
                    ? ` (${levels.join(", ")})`
                    : " (Not specified)"}
                  {idx !== arr.length - 1 ? "," : ""}
                </span>
              );
            })}
        </div>
      </div>
    )}

    {/* ---------- Nationality ---------- */}
    {form.nationality && (
      <div style={{ marginBottom: "10px" }}>
        <strong style={{ fontSize: "15px" }}>Nationality:</strong>{" "}
        <span>{form.nationality}</span>
      </div>
    )}

    {/* ---------- Availability ---------- */}
    {form.availabilityType && (
      <div style={{ marginBottom: "10px" }}>
        <strong style={{ fontSize: "15px" }}>Availability:</strong>{" "}
        {form.availabilityType === "Notice Period" && form.noticePeriod && (
          <span>Notice Period for {form.noticePeriod}</span>
        )}

        {form.availabilityType === "Available From" &&
          form.availableFromDate && (
            <span>Available from {form.availableFromDate}</span>
          )}

        {form.availabilityType !== "Notice Period" &&
          form.availabilityType !== "Available From" && (
            <span>{form.availabilityType}</span>
          )}
      </div>
    )}
  </>
)}

    </div>
  );
}
