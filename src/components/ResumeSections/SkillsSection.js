const SkillsSection = ({ skills, updateArrayField, addRow }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>

    <div className="space-y-2">
      {skills.map((s, i) => (
        <input
          key={i}
          placeholder="Skill"
          value={s}
          required
          onChange={(e) =>
            updateArrayField("skills", i, null, e.target.value)
          }
          className="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      ))}
    </div>

    <button
      type="button"
      onClick={() => addRow("skills", "")}
      className="mt-3 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      + Add Skill
    </button>
  </section>
);

export default SkillsSection;
