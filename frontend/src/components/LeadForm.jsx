import { useState } from "react";
import api from "../api";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("Website");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/leads", {
        name,
        phone,
        email,
        source
      });

      alert("✅ Lead created successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setSource("Website");
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("❌ Failed to create lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="section-title">Create New Lead</h2>
      <p className="section-subtitle">Add a new prospect to your pipeline</p>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="form-hint">Text: Enter customer's full name</span>
        </div>

        <div className="form-group">
          <label className="form-label">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            className="form-input"
            placeholder="e.g., +91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <span className="form-hint">Phone: 10-digit mobile number with country code</span>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="e.g., john.smith@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="form-hint">Email: Valid email format (optional)</span>
        </div>

        <div className="form-group">
          <label className="form-label">Lead Source</label>
          <select
            className="form-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="Website">Website</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Phone Call">Phone Call</option>
          </select>
          <span className="form-hint">Dropdown: Select where this lead came from</span>
        </div>

        <button
          className="submit-button"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Creating..." : "➕ Create Lead"}
        </button>
      </div>
    </div>
  );
}