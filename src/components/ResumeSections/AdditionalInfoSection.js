import React from "react";

const AdditionalInfoSection = ({ form, updateArrayField, addRow, setScalar }) => {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Additional Information
      </h3>

      {/* ---------------------- LANGUAGES ---------------------- */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>

        {form.languages.map((lang, i) => (
          <div key={i} className="border rounded-md p-3 mb-3 bg-white">
            <input
              placeholder="Language (e.g., English)"
              value={lang.language}
              onChange={(e) =>
                updateArrayField("languages", i, "language", e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm w-full mb-3"
            />

            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={lang.read || false}
                  onChange={(e) =>
                    updateArrayField("languages", i, "read", e.target.checked)
                  }
                />
                Read
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={lang.write || false}
                  onChange={(e) =>
                    updateArrayField("languages", i, "write", e.target.checked)
                  }
                />
                Write
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={lang.speak || false}
                  onChange={(e) =>
                    updateArrayField("languages", i, "speak", e.target.checked)
                  }
                />
                Speak
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addRow("languages", {
              language: "",
              read: false,
              write: false,
              speak: false,
            })
          }
          className="mt-3 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          + Add Language
        </button>
      </div>

      {/* ---------------------- NATIONALITY ---------------------- */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Nationality</h4>

        <input
          placeholder="Your Nationality"
          value={form.nationality}
          onChange={(e) => setScalar("nationality", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full"
        />
      </div>

      {/* ---------------------- AVAILABILITY ---------------------- */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Availability</h4>

        <select
          value={form.availabilityType}
          onChange={(e) => setScalar("availabilityType", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full mb-3"
        >
          <option value="">Select Availability</option>
          <option value="Immediate Joiner">Immediate Joiner</option>
          <option value="Notice Period">Notice Period</option>
          <option value="Available From">Available From (Select Date)</option>
          <option value="Currently Employed">Currently Employed</option>
          <option value="Actively Looking">Actively Looking for Job</option>
          <option value="Open to Opportunities">Open to Opportunities</option>
        </select>

        {/* Notice Period Input */}
        {form.availabilityType === "Notice Period" && (
          <input
            placeholder="Notice Period (e.g., 15 Days, 30 Days, 2 Months)"
            value={form.noticePeriod || ""}
            onChange={(e) => setScalar("noticePeriod", e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-full mb-3"
          />
        )}

        {/* Available From Date */}
        {form.availabilityType === "Available From" && (
          <input
            type="date"
            value={form.availableFromDate || ""}
            onChange={(e) => setScalar("availableFromDate", e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-full mb-3"
          />
        )}
      </div>

      {/* ---------------------- OTHER NOTES ---------------------- */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Other Additional Information</h4>

        <textarea
          placeholder="Any additional details (optional)"
          value={form.additionalNotes}
          onChange={(e) => setScalar("additionalNotes", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full h-24"
        />
      </div>
    </section>
  );
};

export default AdditionalInfoSection;
