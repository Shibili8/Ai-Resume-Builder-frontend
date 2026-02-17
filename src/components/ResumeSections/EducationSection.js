import Input from "./Input";


const EducationSection = ({
  form,
  handleChange,
  addField,
  qualificationList,
}) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>

    {/* Highest Qualification */}
    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Highest Qualification
      </label>
      <select
        value={form.highestEducation || ""}
        onChange={(e) => {
          const value = e.target.value;
          handleChange("highestEducation", null, null, value);
          if (value !== "Other") {
            handleChange("highestEducationOther", null, null, "");
          }
        }}
        className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Highest Qualification</option>
        {qualificationList.map((q, i) => (
          <option key={i} value={q}>
            {q}
          </option>
        ))}
      </select>

      {form.highestEducation === "Other" && (
        <input
          type="text"
          placeholder="Enter your qualification"
          className="mt-2 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={form.highestEducationOther || ""}
          onChange={(e) =>
            handleChange("highestEducationOther", null, null, e.target.value)
          }
        />
      )}
    </div>

    {/* Education entries */}
    <div className="space-y-4">
      {form.education.map((edu, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Institute Name"
              placeholder="College / School Name, City"
              value={edu.institute}
              onChange={(e) =>
                handleChange("education", idx, "institute", e.target.value)
              }
              required
            />
            <Input
              label="Start Year"
              placeholder="2019"
              value={edu.startYear}
              onChange={(e) =>
                handleChange("education", idx, "startYear", e.target.value)
              }
              required
            />
            <Input
              label="End Year"
              placeholder="2023"
              value={edu.endYear}
              onChange={(e) =>
                handleChange("education", idx, "endYear", e.target.value)
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={edu.eduType}
                
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange("education", idx, "eduType", value);
                  if (value !== "Other") {
                    handleChange("education", idx, "eduTypeOther", "");
                  }
                }}
              >
                <option value="">Select</option>
                {qualificationList.map((q, i) => (
                  <option key={i} value={q}>
                    {q}
                  </option>
                ))}
              </select>

              {edu.eduType === "Other" && (
                <input
                  placeholder="Enter Education Type"
                  value={edu.eduTypeOther}
                  required
                  onChange={(e) =>
                    handleChange(
                      "education",
                      idx,
                      "eduTypeOther",
                      e.target.value
                    )
                  }
                  className="mt-2 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>

            <Input
              label="Department / Stream"
              placeholder="Computer Science, Commerce, etc."
              value={edu.department}
              onChange={(e) =>
                handleChange("education", idx, "department", e.target.value)
              }
            />

            <div>
              <Input
                label="Score"
                required
                placeholder="CGPA / Percentage"
                value={edu.score}
                onChange={(e) =>
                  handleChange("education", idx, "score", e.target.value)
                }
              />
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-700">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name={`scoreType-${idx}`}
                    value="CGPA"
                    checked={edu.scoreType === "CGPA"}
                    onChange={(e) =>
                      handleChange(
                        "education",
                        idx,
                        "scoreType",
                        e.target.value
                      )
                    }
                    className="h-3 w-3 text-blue-600 border-gray-300"
                  />
                  <span>CGPA</span>
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name={`scoreType-${idx}`}
                    value="Percentage"
                    checked={edu.scoreType === "Percentage"}
                    onChange={(e) =>
                      handleChange(
                        "education",
                        idx,
                        "scoreType",
                        e.target.value
                      )
                    }
                    className="h-3 w-3 text-blue-600 border-gray-300"
                  />
                  <span>Percentage</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={() =>
        addField("education", {
          institute: "",
          startYear: "",
          endYear: "",
          eduType: "",
          eduTypeOther: "",
          department: "",
          score: "",
          scoreType: "CGPA",
        })
      }
      className="mt-3 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      + Add Education Entry
    </button>
  </section>
);
export default EducationSection