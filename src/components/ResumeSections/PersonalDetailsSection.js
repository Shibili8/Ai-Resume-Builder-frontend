import Input from "./Input";

const PersonalDetailsSection = ({ form, setScalar }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
      Personal Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

      <Input
        label="Full Name"
        placeholder="John Doe"
        value={form.name}
        onChange={(e) => setScalar("name", e.target.value)}
        required
      />

      <Input
        label="Role / Title"
        placeholder="Job Role"
        value={form.role}
        onChange={(e) => setScalar("role", e.target.value)}
        required
      />

      <Input
        label="Email ID"
        placeholder="you@example.com"
        value={form.emailId}
        onChange={(e) => setScalar("emailId", e.target.value)}
        required
      />

      <Input
        label="Phone Number"
        placeholder="+91 1234567890"
        value={form.phoneNo}
        onChange={(e) => setScalar("phoneNo", e.target.value)}
        required
      />

      {/* City */}
      <Input
        label="City"
        placeholder="City"
        value={form.city}
        onChange={(e) => setScalar("city", e.target.value)}
        required
      />

      {/* State */}
      <Input
        label="State"
        placeholder="State"
        value={form.state}
        onChange={(e) => setScalar("state", e.target.value)}
        required
      />

      {/* Pincode */}
      <Input
        label="Pincode"
        placeholder="600001"
        value={form.pincode}
        onChange={(e) => setScalar("pincode", e.target.value)}
        required
      />

      <Input
        label="LinkedIn URL"
        placeholder="https://linkedin.com/in/username"
        value={form.linkedIn}
        onChange={(e) => setScalar("linkedIn", e.target.value)}
      />

      <Input
        label="Portfolio Link"
        placeholder="https://your-portfolio.com"
        value={form.portfolioLink}
        onChange={(e) => setScalar("portfolioLink", e.target.value)}
      />

      <Input
        label="Total Experience (Years)"
        type="number"
        placeholder="0"
        value={form.totalExperienceYear}
        onChange={(e) =>
          setScalar("totalExperienceYear", Number(e.target.value))
        }
        required
      />
    </div>
  </section>
);

export default PersonalDetailsSection;
