import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

import PersonalDetailsSection from "./ResumeSections/PersonalDetailsSection";
import EducationSection from "./ResumeSections/EducationSection";
import ExperienceSection from "./ResumeSections/ExperienceSection";
import ProjectsSection from "./ResumeSections/ProjectsSection";
import SkillsSection from "./ResumeSections/SkillsSection";
import CertificatesSection from "./ResumeSections/CertificatesSection";
import AdditionalInfoSection from "./ResumeSections/AdditionalInfoSection";

import Navbar from "./Navbar";

const qualificationList = [
  "M.A (Master of Arts)",
  "M.Sc (Master of Science)",
  "M.Com (Master of Commerce)",
  "MBA (Master of Business Administration)",
  "MCA (Master of Computer Applications)",
  "M.Tech (Master of Technology)",
  "M.E (Master of Engineering)",
  "M.Ed (Master of Education)",
  "B.A (Bachelor of Arts)",
  "B.Sc (Bachelor of Science)",
  "B.Com (Bachelor of Commerce)",
  "BBA (Bachelor of Business Administration)",
  "BCA (Bachelor of Computer Applications)",
  "B.Tech (Bachelor of Technology)",
  "B.E (Bachelor of Engineering)",
  "B.Ed (Bachelor of Education)",
  "Diploma",
  "Higher Secondary (HSC)",
  "Secondary School (SSLC)",
  "Other",
];

const ResumeBuilder = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  emailId: "",
  linkedIn: "",
  portfolioLink: "",
  phoneNo: "",
  role: "",
  totalExperienceYear: "",
  city: "",
  state: "",
  pincode: "",

  education: [
    {
      institute: "",
      startYear: "",
      endYear: "",
      eduType: "",
      eduTypeOther: "",
      department: "",
      score: "",
      scoreType: "CGPA",
    },
  ],

  experience: [{ role: "", company: "", duration: "", activities: "" }],

  projects: [
    {
      name: "",
      description: "",
      technologies: "",
      keyPoints: [""],
      link: "",
    },
  ],

  certificates: [{ title: "", issuedBy: "", issuedOn: "", credential: "" }],

  skills: [""],

  highestEducation: "",
  highestEducationOther: "",

  languages: [{ language: "", read: false, write: false, speak: false }],

  nationality: "",
  availabilityType: "",
  noticePeriod: "",
  availableFromDate: "",
  additionalNotes: "",
});


  const [gensummary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasExperience, setHasExperience] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);
  const [hasCertificates, setHasCertificates] = useState(false);

  // ----------------------------------------------------------------
  // HELPERS
  // ----------------------------------------------------------------
  const setScalar = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const updateArrayField = (section, index, field, value) => {
  const copy = [...form[section]];

  // Case 1: Array of simple strings (e.g., skills)
  if (typeof copy[index] === "string" && field === null) {
    copy[index] = value;
    setForm({ ...form, [section]: copy });
    return;
  }

  // Case 2: Array of objects
  copy[index] = { ...copy[index], [field]: value };
  setForm({ ...form, [section]: copy });
};

const handleChange = (section, index, field, value) => {
  // Update scalar fields (highestEducation, highestEducationOther)
  if (index === null && field === null) {
    setForm((prev) => ({
      ...prev,
      [section]: value,
    }));
    return;
  }

  // Update array/object fields
  setForm((prev) => {
    const updated = [...prev[section]];
    updated[index] = { ...updated[index], [field]: value };
    return { ...prev, [section]: updated };
  });
};



  const addRow = (section, template) => {
    setForm((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };

  const addProjectKeyPoint = (projectIndex) => {
    const projects = [...form.projects];
    projects[projectIndex].keyPoints.push("");
    setForm({ ...form, projects });
  };

  const updateProjectKeyPoint = (projectIndex, kpIndex, value) => {
    const projects = [...form.projects];
    projects[projectIndex].keyPoints[kpIndex] = value;
    setForm({ ...form, projects });
  };

  // ----------------------------------------------------------------
  // AI SUMMARY
  // ----------------------------------------------------------------
  const buildPrompt = () => {
    const skillsText = form.skills.filter(Boolean).join(", ") || "N/A";
    return `
Write a professional resume summary for a ${form.role || "professional"} with ${
      form.totalExperienceYear || 0
    } year(s) of experience. If years of experience is 0, treat them as a fresher. Highlight these skills: ${skillsText}. Keep it concise (<= 100 words), ATS-friendly, and recruiter focused.
`.trim();
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const prompt = buildPrompt();
      const res = await api.post("/ai/generate", { prompt });
      const summary =
        res.data?.summary ?? res.data?.result ?? res.data?.data ?? "";
      setSummary(summary);
      return summary;
    } catch (err) {
      console.error("AI generation error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // PREVIEW HTML BUILDER (BACKEND PDF + FRONTEND PREVIEW)
  // ----------------------------------------------------------------
  const buildPreviewHtml = (resolvedSummary) => {
    const clean = (x) => (x && String(x).trim() ? String(x).trim() : "");

    // ---------------- EDUCATION -----------------
    const eduHtml = form.education
      .filter((e) => clean(e.institute))
      .map(
        (e) => `
      <div class="edu-item">
        <div class="row-space">
          <strong>${clean(e.institute)}</strong>
          <span>${clean(e.startYear)} - ${clean(e.endYear)}</span>
        </div>
        <div class="left-row muted">
          ${clean(e.eduType === "Other" ? e.eduTypeOther : e.eduType)}
          ${clean(e.department) ? ` — ${clean(e.department)}` : ""}
          ${clean(e.score) ? ` — ${clean(e.score)}` : ""}
        </div>
      </div>`
      )
      .join("");

    // ---------------- EXPERIENCE -----------------
    const expHtml = form.experience
      .filter((e) => clean(e.role) || clean(e.company))
      .map(
        (e) => `
      <div class="exp-item">
        <div class="row-space">
          <strong>${clean(e.role)}</strong>
          <span>${clean(e.duration)}</span>
        </div>
        <div class="left-row muted">${clean(e.company)}</div>
        ${clean(e.activities) ? `<div class="left-row">${clean(e.activities)}</div>` : ""}
      </div>`
      )
      .join("");

    // ---------------- PROJECTS -----------------
    const projectsHtml = form.projects
      .filter((p) => clean(p.name))
      .map(
        (p) => `
      <div class="proj-item">
        <div class="row-space">
          <strong>${clean(p.name)}</strong>
          <span>${
            clean(p.link)
              ? `<a href="${clean(p.link)}" target="_blank">${clean(p.link)}</a>`
              : ""
          }</span>
        </div>
        ${
          clean(p.description)
            ? `<div class="left-row muted">${clean(p.description)}</div>`
            : ""
        }
        ${
          p.keyPoints?.filter((kp) => clean(kp)).length
            ? `<ul class="kp-list left-row">
                ${p.keyPoints.filter(clean).map((kp) => `<li>${kp}</li>`).join("")}
               </ul>`
            : ""
        }
        ${
          clean(p.technologies)
            ? `<div class="left-row muted"><strong>Tech Used:</strong> ${clean(
                p.technologies
              )}</div>`
            : ""
        }
      </div>`
      )
      .join("");

    // ---------------- CERTIFICATES -----------------
    const certHtml = form.certificates
      .filter((c) => clean(c.title))
      .map(
        (c) => `
      <div class="cert-item">
        <div class="row-space" style="display:flex; justify-content:space-between;">
          <strong>${clean(c.title)}</strong>
          <span style="font-size:13px;color:#444;">${clean(c.issuedOn)}</span>
        </div>
        <div class="left-row muted">${clean(c.issuedBy)}</div>
        ${
          clean(c.credential)
            ? `<div class="left-row"><a href="${clean(
                c.credential
              )}" target="_blank">${clean(c.credential)}</a></div>`
            : ""
        }
      </div>`
      )
      .join("");

    // ---------------- SKILLS -----------------
    const skillsHtml = form.skills.filter(Boolean).length
      ? `<div class="skills-wrap">${form.skills
          .filter(Boolean)
          .map((s) => `<span class="skill-pill">${s}</span>`)
          .join(" ")}</div>`
      : "";

    // ---------------- LANGUAGES -----------------
    const languageHtml =
      form.languages.filter((l) => clean(l.language)).length > 0
        ? `
      <h3 style="font-weight:800;">Languages</h3><hr/>
      <div class="section-body">
        ${form.languages
          .filter((l) => clean(l.language))
          .map(
            (l) => `
          <div class="lang-item" style="margin-bottom:6px;">
            <strong>${l.language}</strong> — 
            ${l.read ? "Read, " : ""}
            ${l.write ? "Write, " : ""}
            ${l.speak ? "Speak" : ""}
          </div>`
          )
          .join("")}
      </div>`
        : "";

    // ---------------- NATIONALITY / AVAILABILITY / NOTES -----------------
    const addInfoHtml = `
      <h3 style="font-weight:800;">Additional Information</h3><hr/>
      <div class="section-body">
        ${form.nationality ? `<p><strong>Nationality:</strong> ${form.nationality}</p>` : ""}
        ${form.availabilityType ? `<p><strong>Availability:</strong> ${form.availabilityType}</p>` : ""}
        ${
          form.noticePeriod
            ? `<p><strong>Notice Period:</strong> ${form.noticePeriod}</p>`
            : ""
        }
        ${
          form.availableFromDate
            ? `<p><strong>Available From:</strong> ${form.availableFromDate}</p>`
            : ""
        }
        ${
          form.additionalNotes
            ? `<p><strong>Notes:</strong> ${form.additionalNotes}</p>`
            : ""
        }
      </div>
    `;

    return `
      <div class="preview-root">
        <h1 class="center">${clean(form.name)}</h1>
        <div class="center muted">${clean(form.role)}</div>

        <div class="contact center">
          ${clean(form.emailId)} | 
          ${clean(form.phoneNo)} | 
          ${clean(form.linkedIn)} | 
          ${clean(form.portfolioLink)}
        </div>

        ${
          resolvedSummary
            ? `<h3 style="font-weight:800;">Professional Summary</h3><hr/>
               <div class="section-body">${resolvedSummary}</div>`
            : ""
        }

        ${eduHtml ? `<h3 style="font-weight:800;">Education</h3><hr/><div class="section-body">${eduHtml}</div>` : ""}
        ${skillsHtml ? `<h3 style="font-weight:800;">Skills</h3><hr/><div class="section-body">${skillsHtml}</div>` : ""}
        ${expHtml ? `<h3 style="font-weight:800;">Experience</h3><hr/><div class="section-body">${expHtml}</div>` : ""}
        ${projectsHtml ? `<h3 style="font-weight:800;">Projects</h3><hr/><div class="section-body">${projectsHtml}</div>` : ""}
        ${certHtml ? `<h3 style="font-weight:800;">Certificates</h3><hr/><div class="section-body">${certHtml}</div>` : ""}

        ${languageHtml}
        ${addInfoHtml}
      </div>
    `;
  };

  const handlePreview = () => {
    if (!gensummary) return alert("Please generate a summary first!");
    const previewHtml = buildPreviewHtml(gensummary);
    navigate("/preview", { state: { form, gensummary, previewHtml } });
  };

  const validateRequiredFields = () => {
  const errors = [];

  // ---- PERSONAL DETAILS ----
  if (!form.name.trim()) errors.push("Full Name");
  if (!form.role.trim()) errors.push("Role / Title");
  if (!form.emailId.trim()) errors.push("Email ID");
  if (!form.phoneNo.trim()) errors.push("Phone Number");
  if (!form.city.trim()) errors.push("City");
  if (!form.state.trim()) errors.push("State");
  if (!form.pincode.trim()) errors.push("Pincode");

form.education.forEach((edu, i) => {
  const idx = i + 1; // For user-friendly message like Education #2

  if (!edu.institute.trim())
    errors.push(`Education #${idx} → Institute Name`);

  if (!edu.startYear.trim())
    errors.push(`Education #${idx} → Start Year`);

  if (!edu.endYear.trim())
    errors.push(`Education #${idx} → End Year`);

  if (!edu.eduType.trim())
    errors.push(`Education #${idx} → Education Type`);
  if (!edu.department.trim())
    errors.push(`Education #${idx} → Department`);
  if (!edu.score.trim())
    errors.push(`Education #${idx} → Score`);
});


  // ---- EXPERIENCE (If Enabled) ----
  if (hasExperience) {
    form.experience.forEach((exp, i) => {
      if (!exp.role.trim()) errors.push(`Experience #${i+1} → Role`);
      if (!exp.company.trim()) errors.push(`Experience #${i+1} → Company`);
      if (!exp.duration.trim()) errors.push(`Experience #${i+1} → Duration`);
    });
  }

  // ---- PROJECTS (If Enabled) ----
  if (hasProjects) {
    form.projects.forEach((p, i) => {
      if (!p.name.trim()) errors.push(`Project #${i+1} → Title`);
      if (!p.description.trim()) errors.push(`Project #${i+1} → Description`);
    });
  }

  // ---- CERTIFICATES (If Enabled) ----
  if (hasCertificates) {
    form.certificates.forEach((c, i) => {
      if (!c.title.trim()) errors.push(`Certificate #${i+1} → Title`);
      if (!c.issuedBy.trim()) errors.push(`Certificate #${i+1} → Issued By`);
      if (!c.issuedOn.trim()) errors.push(`Certificate #${i+1} → Issued On`);
    });
  }

  return errors;
};



  const saveResumeHandler = async () => {
  // Run validation
  const missing = validateRequiredFields();

  if (missing.length > 0) {
    alert(
      "Please fill all required fields:\n\n" +
      missing.map((m) => "• " + m).join("\n")
    );
    return; // STOP saving
  }

  try {
    setLoading(true);
    const res = await api.post("/portfolio", form);

    if (res.data?.success) alert("✅ Resume saved successfully!");
    else alert("❌ Save failed.");
  } catch (err) {
    console.error("SAVE ERROR:", err.response?.data || err.message);
    alert("❌ Error saving resume.");
  } finally {
    setLoading(false);
  }
};


  // ----------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto my-8 px-4">
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 md:p-8">
          <header className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                AI Resume Builder
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill your details, generate an AI summary, preview & export.
              </p>
            </div>
          </header>

          {/* Sections */}
          <PersonalDetailsSection form={form} setScalar={setScalar} />

            <EducationSection
              form={form}
              handleChange={handleChange}
              addField={addRow}
              qualificationList={qualificationList}
            />


          <SkillsSection
            skills={form.skills}
            updateArrayField={updateArrayField}
            addRow={addRow}
          />

          {/* EXPERIENCE QUESTION */}
          <div className="mb-4">
            <label className="font-medium text-gray-800">Do you have any work experience?</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm"
              value={hasExperience ? "yes" : "no"}
              onChange={(e) => setHasExperience(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {hasExperience && (
            <ExperienceSection
              experience={form.experience}
              updateArrayField={updateArrayField}
              addRow={addRow}
            />
          )}

          {/* PROJECTS QUESTION */}
          <div className="mb-4">
            <label className="font-medium text-gray-800">Do you have any projects?</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm"
              value={hasProjects ? "yes" : "no"}
              onChange={(e) => setHasProjects(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {hasProjects && (
            <ProjectsSection
              projects={form.projects}
              updateArrayField={updateArrayField}
              addRow={addRow}
              addProjectKeyPoint={addProjectKeyPoint}
              updateProjectKeyPoint={updateProjectKeyPoint}
            />
          )}


          {/* CERTIFICATES QUESTION */}
          <div className="mb-4">
            <label className="font-medium text-gray-800">Do you have any certificates?</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm"
              value={hasCertificates ? "yes" : "no"}
              onChange={(e) => setHasCertificates(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {hasCertificates && (
            <CertificatesSection
              certificates={form.certificates}
              updateArrayField={updateArrayField}
              addRow={addRow}
            />
          )}

          <AdditionalInfoSection
            form={form}
            updateArrayField={updateArrayField}
            addRow={addRow}
            setScalar={setScalar}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              disabled={loading}
              onClick={saveResumeHandler}
            >
              💾 Save Resume
            </button>

            {/* Summary Generation */}
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                disabled={loading}
                onClick={async () => {
                  try {
                    setSummaryLoading(true);
                    const summary = await generateSummary();
                    setSummary(summary.replace(/\*/g, ""));
                  } catch (err) {
                    alert("Summary generation failed.");
                  } finally {
                    setSummaryLoading(false);
                  }
                }}
              >
                {gensummary ? "Generate Another Summary" : "Generate Summary"}
              </button>

              <p className="text-xs text-gray-500 h-4">
                {summaryLoading ? "Generating summary..." : ""}
              </p>

              {gensummary && (
                <div className="w-full mt-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                  {gensummary}
                </div>
              )}
            </div>

            <button
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
              disabled={!gensummary}
              onClick={handlePreview}
            >
              👁️ Preview Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
