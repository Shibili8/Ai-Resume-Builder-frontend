import Input from "./Input";


const CertificatesSection = ({ certificates, updateArrayField, addRow }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificates</h3>
    <div className="space-y-4">
      {certificates.map((c, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Title"
              placeholder="Certification Name"
              value={c.title}
              required
              onChange={(e) =>
                updateArrayField("certificates", i, "title", e.target.value)
              }
            />
            <Input
              label="Issued By"
              placeholder="Issuing Organization"
              value={c.issuedBy}
              required
              onChange={(e) =>
                updateArrayField("certificates", i, "issuedBy", e.target.value)
              }
            />
            <Input
              label="Issued On"
              placeholder="Month / Year"
              value={c.issuedOn}
              required
              onChange={(e) =>
                updateArrayField("certificates", i, "issuedOn", e.target.value)
              }
            />
            <Input
              label="Credential Link / ID"
              placeholder="Certificate URL or ID"
              value={c.credential}
              onChange={(e) =>
                updateArrayField(
                  "certificates",
                  i,
                  "credential",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={() =>
        addRow("certificates", {
          title: "",
          issuedBy: "",
          issuedOn: "",
          credential: "",
        })
      }
      className="mt-3 inline-flex items-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      + Add Certificate
    </button>
  </section>
);
export default CertificatesSection