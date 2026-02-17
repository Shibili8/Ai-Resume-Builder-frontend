import Input from "./Input";


const ExperienceSection = ({ experience, updateArrayField, addRow }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
    <div className="space-y-4">
      {experience.map((ex, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Role"
              placeholder="Software Engineer"
              value={ex.role}
              required
              onChange={(e) =>
                updateArrayField("experience", i, "role", e.target.value)
              }
            />
            <Input
              label="Company"
              placeholder="Company Name"
              value={ex.company}
              required
              onChange={(e) =>
                updateArrayField("experience", i, "company", e.target.value)
              }
            />
            <Input
              label="Duration"
              placeholder="in Years"
              value={ex.duration}
              required
              onChange={(e) =>
                updateArrayField("experience", i, "duration", e.target.value)
              }
            />
            <Input
              label="Responsibilities / Highlights"
              placeholder="Short description of your work"
              value={ex.activities}
              onChange={(e) =>
                updateArrayField("experience", i, "activities", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={() =>
        addRow("experience", {
          role: "",
          company: "",
          duration: "",
          activities: "",
        })
      }
      className="mt-3 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      + Add Experience
    </button>
  </section>
);
export default ExperienceSection