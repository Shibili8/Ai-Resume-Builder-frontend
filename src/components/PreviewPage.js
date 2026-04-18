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



/* ================= LOAD DATA ================= */

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



/* ================= PDF EXPORT ================= */

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



/* ================= HTML BUILDER (SAME AS PDF) ================= */

const buildPreviewHtml = () => {

  const safe = (v) =>
    v ? String(v) : "";

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



return `

<style>

body {
font-family: Arial;
padding: 40px;
}

h1 {
font-size: 20px;
font-weight: 600;
color: #1d59b5;
}

h2 {
font-size: 15px;
font-weight: 700;
margin-top: 20px;
}

p, span, div {
font-size: 12px;
}

hr {
border: 1px solid #000;
margin: 6px 0 10px;
}

.flex-between {
display: flex;
justify-content: space-between;
}

</style>

<div>

<!-- HEADER -->

<div style="text-align:center; margin-bottom:20px;">

<h1>
${safe(form.name)}
</h1>

<div>
${safe(form.role)}
</div>

<div>

${safe(form.city)}, 
${safe(form.state)}, 
${safe(form.pincode)}

${form.emailId ? ` | ${safe(form.emailId)}` : ""}
${form.phoneNo ? ` | ${safe(form.phoneNo)}` : ""}
${form.linkedIn ? ` | ${safe(form.linkedIn)}` : ""}
${form.portfolioLink ? ` | ${safe(form.portfolioLink)}` : ""}

</div>

</div>


<!-- SUMMARY -->

${gensummary ? `

<h2>SUMMARY</h2>
<hr/>

<p>${gensummary}</p>

` : ""}


<!-- EXPERIENCE -->

${hasExperience ? `

<h2>EXPERIENCE</h2>
<hr/>

${form.experience
.filter(e => e.role || e.company)
.map(e => `

<div style="margin-bottom:10px;">

<div class="flex-between">

<strong>${safe(e.role)}</strong>

<span>${safe(e.duration)} Year</span>

</div>

<div>
${safe(e.company)}
</div>

${e.activities ? `<p>${safe(e.activities)}</p>` : ""}

</div>

`).join("")}

` : ""}


<!-- SKILLS -->

${hasSkills ? `

<h2>SKILLS</h2>
<hr/>

<div>

${form.skills.filter(Boolean).join(", ")}

</div>

` : ""}


<!-- EDUCATION -->

<h2>EDUCATION</h2>
<hr/>

${form.education.map(e => `

<div style="margin-bottom:10px;">

<div class="flex-between">

<strong>${safe(e.institute)}</strong>

<span>

${safe(e.startYear)}
-
${safe(e.endYear)}

</span>

</div>

<div>

${safe(e.eduType)}

${e.department ? ` — ${safe(e.department)}` : ""}

${e.score ? ` — ${safe(e.scoreType)}: ${safe(e.score)}` : ""}

</div>

</div>

`).join("")}


<!-- PROJECTS -->

${hasProjects ? `

<h2>PROJECTS</h2>
<hr/>

${form.projects
.filter(p => p.name)
.map(p => `

<div style="margin-bottom:10px;">

<strong>${safe(p.name)}</strong>

${p.description ? `<p>${safe(p.description)}</p>` : ""}

${p.technologies ? `<p><strong>Tech Used:</strong> ${safe(p.technologies)}</p>` : ""}

</div>

`).join("")}

` : ""}


<!-- CERTIFICATES -->

${hasCertificates ? `

<h2>CERTIFICATES</h2>
<hr/>

${form.certificates
.filter(c => c.title)
.map(c => `

<div style="margin-bottom:10px;">

<strong>${safe(c.title)}</strong>

<span style="float:right">

${safe(c.issuedOn)}

</span>

<div>

${safe(c.issuedBy)}

</div>

</div>

`).join("")}

` : ""}


<!-- ADDITIONAL -->

${hasAdditional ? `

<h2>ADDITIONAL INFORMATION</h2>
<hr/>

${hasLanguages ? `

<div>

<strong>Languages:</strong>

${form.languages
.filter(l => l.language)
.map(l => {

const levels=[];

if(l.read) levels.push("Read");
if(l.write) levels.push("Write");
if(l.speak) levels.push("Speak");

return `${safe(l.language)} (${levels.join(", ")})`;

}).join(", ")}

</div>

` : ""}

${form.nationality ? `<div><strong>Nationality:</strong> ${safe(form.nationality)}</div>` : ""}

${form.availabilityType ? `<div><strong>Availability:</strong> ${safe(form.availabilityType)}</div>` : ""}

` : ""}

</div>

`;

};



/* ================= RENDER ================= */

return (

<div>

{/* Buttons */}

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



{/* Resume Preview */}

<div

style={{
width: "794px",
minHeight: "1123px",
margin: "20px auto",
background: "white",
boxShadow:
"0 0 10px rgba(0,0,0,0.15)"
}}

dangerouslySetInnerHTML={{
__html: buildPreviewHtml()
}}

/>

</div>

);

}