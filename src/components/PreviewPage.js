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

  const [form, setForm] =
    useState(state?.form || null);

  const [gensummary, setSummary] =
    useState(state?.gensummary || "");

  const [pdfLoading,
    setPdfloading
  ] = useState(false);



/* ================= LOAD DATA ================= */

useEffect(() => {

  if (!form && id) {

    const fetchResume =
      async () => {

        try {

          const res =
            await api.get(`/portfolio/${id}`);

          setForm(res.data);

          setSummary(
            res.data.summary || ""
          );

        } catch (err) {

          console.error(err);

          alert("Failed to load resume");

        }

      };

    fetchResume();

  }

}, [id]);



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



/* ================= SECTION CHECKERS ================= */

const hasExperience =
  form.experience?.some(
    e => e.role || e.company
  );

const hasProjects =
  form.projects?.some(
    p => p.name
  );

const hasCertificates =
  form.certificates?.some(
    c => c.title
  );

const hasSkills =
  form.skills?.some(
    s => s
  );

const hasLanguages =
  form.languages?.some(
    l => l.language
  );

const hasAdditional =
  hasLanguages ||
  form.nationality ||
  form.availabilityType;



/* ================= EXPORT PDF ================= */

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

  } catch (err) {

    console.error(err);
    alert("PDF Export failed");

  } finally {

    setPdfloading(false);

  }

};



/* ================= PERSONAL INFO ================= */

const personalInfo = [

  `${form.city || ""}${
    form.state ? ", " + form.state : ""
  }${
    form.pincode ? ", " + form.pincode : ""
  }`,

  form.emailId,
  form.phoneNo,
  form.linkedIn,
  form.portfolioLink

].filter(Boolean).join(" | ");



/* ================= RETURN ================= */

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

{/* ================= BUTTON ================= */}

<div className="flex justify-between mb-6">

<button
  onClick={() =>
    navigate("/dashboard")
  }
  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
>
⬅ Back
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



{/* ================= HEADER ================= */}

<div style={{
textAlign:"center",
marginBottom:"20px"
}}>

<h1 style={{
margin:0,
fontWeight:"600",
fontSize:"20px",
color:"#1d59b5"
}}>
{form.name}
</h1>

<h3>{form.role}</h3>

<p style={{
fontSize:"14px"
}}>
{personalInfo}
</p>

</div>



{/* ================= SUMMARY ================= */}

{gensummary && (

<>

<h2 style={{
fontWeight:"600",
color:"#1d59b5",
fontSize:"16px"
}}>
SUMMARY
</h2>

<hr/>

<p>{gensummary}</p>

</>

)}



{/* ================= EXPERIENCE ================= */}

{hasExperience && (

<>

<h2>EXPERIENCE</h2>
<hr/>

{form.experience
.filter(e => e.role || e.company)
.map((e,i)=>(
<div key={i}>

<strong>
{e.role}
</strong>

<span style={{
float:"right"
}}>
{e.duration} Year
</span>

<div>
{e.company}
</div>

{e.activities &&
<p>{e.activities}</p>}

</div>
))}

</>

)}



{/* ================= SKILLS ================= */}

{hasSkills && (

<>

<h2>SKILLS</h2>
<hr/>

<p>
{form.skills
.filter(Boolean)
.join(", ")}
</p>

</>

)}



{/* ================= EDUCATION ================= */}

{form.education?.length > 0 && (

<>

<h2>EDUCATION</h2>
<hr/>

{form.education.map((e,i)=>(
<div key={i}>

<strong>
{e.institute}
</strong>

<span style={{
float:"right"
}}>
{e.startYear}
{" - "}
{e.endYear}
</span>

<div>

{e.eduType}

{e.department &&
` — ${e.department}`}

{e.score &&
` — ${e.scoreType}: ${e.score}`}

</div>

</div>
))}

</>

)}



{/* ================= PROJECTS ================= */}

{hasProjects && (

<>

<h2>PROJECTS</h2>
<hr/>

{form.projects
.filter(p => p.name)
.map((p,i)=>(
<div key={i}>

<strong>
{p.name}
</strong>

{p.description &&
<p>{p.description}</p>}

{p.technologies &&
<p>
<strong>Tech Used:</strong>
{" "}
{p.technologies}
</p>}

</div>
))}

</>

)}



{/* ================= CERTIFICATES ================= */}

{hasCertificates && (

<>

<h2>CERTIFICATES</h2>
<hr/>

{form.certificates
.filter(c => c.title)
.map((c,i)=>(
<div key={i}>

<strong>
{c.title}
</strong>

<span style={{
float:"right"
}}>
{c.issuedOn}
</span>

<div>
{c.issuedBy}
</div>

</div>
))}

</>

)}



{/* ================= ADDITIONAL ================= */}

{hasAdditional && (

<>

<h2>ADDITIONAL INFORMATION</h2>
<hr/>

{hasLanguages && (

<div>

<strong>Languages:</strong>{" "}

{form.languages
.filter(l => l.language)
.map(l => {

const levels=[];

if(l.read) levels.push("Read");
if(l.write) levels.push("Write");
if(l.speak) levels.push("Speak");

return `${l.language} (${levels.join(", ")})`;

})
.join(", ")}

</div>

)}

{form.nationality &&
<div>
<strong>Nationality:</strong>
{" "}
{form.nationality}
</div>}

{form.availabilityType &&
<div>
<strong>Availability:</strong>
{" "}
{form.availabilityType}
</div>}

</>

)}

</div>

);

}