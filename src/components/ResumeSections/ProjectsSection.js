import Input from "./Input";


const ProjectsSection = ({
  projects,
  updateArrayField,
  addRow,
  addProjectKeyPoint,
  updateProjectKeyPoint,
}) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">Projects</h3>
    <div className="space-y-4">
      {projects.map((p, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
        >
          <Input
            label="Project Name"
            placeholder="Project title"
            value={p.name}
            required
            onChange={(e) =>
              updateArrayField("projects", i, "name", e.target.value)
            }
          />
          <Input
            label="Short Description"
            required
            placeholder="Brief description of your project"
            value={p.description}
            onChange={(e) =>
              updateArrayField("projects", i, "description", e.target.value)
            }
          />
          <Input
            label="Technologies (comma separated)"
            placeholder="React, Node.js, MongoDB"
            value={p.technologies}
            onChange={(e) =>
              updateArrayField("projects", i, "technologies", e.target.value)
            }
          />
          <Input
            label="Project Link"
            placeholder="https://github.com/username/project"
            value={p.link}
            onChange={(e) =>
              updateArrayField("projects", i, "link", e.target.value)
            }
          />

          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-1">
              Key Points
            </h4>
            <div className="space-y-2">
              {p.keyPoints.map((kp, kpi) => (
                <input
                  key={kpi}
                  placeholder="Achievement or highlight"
                  value={kp}
                  onChange={(e) =>
                    updateProjectKeyPoint(i, kpi, e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => addProjectKeyPoint(i)}
              className="mt-2 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              + Add Key Point
            </button>
          </div>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={() =>
        addRow("projects", {
          name: "",
          description: "",
          technologies: "",
          keyPoints: [""],
          link: "",
        })
      }
      className="mt-3 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      + Add Project
    </button>
  </section>
);
 export default ProjectsSection