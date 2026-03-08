import { useState } from "react";
import api from "../api";

export default function VisitScheduler() {
  const [leadId, setLeadId] = useState("");
  const [property, setProperty] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const schedule = async () => {
    if (!leadId.trim() || !property.trim() || !date || !time) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/visits", {
        leadId: parseInt(leadId),
        property,
        date: `${date} ${time}`
      });

      alert("✅ Visit scheduled successfully!");
      setLeadId("");
      setProperty("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error scheduling visit:", error);
      alert("❌ Failed to schedule visit. Make sure Lead ID exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="section-title">Schedule Property Visit</h2>
      <p className="section-subtitle">Book a property viewing for your lead</p>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">
            Lead ID <span className="required">*</span>
          </label>
          <input
            type="number"
            className="form-input"
            placeholder="e.g., 1705234567890"
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            required
          />
          <span className="form-hint">Number: Enter the unique Lead ID from pipeline</span>
        </div>

        <div className="form-group">
          <label className="form-label">
            Property Address <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., 123 Palm Street, Sector 45, Gurgaon"
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            required
          />
          <span className="form-hint">Text: Full property address with location</span>
        </div>

        <div className="form-group">
          <label className="form-label">
            Visit Date <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <span className="form-hint">Date: Select visit date (MM/DD/YYYY)</span>
        </div>

        <div className="form-group">
          <label className="form-label">
            Visit Time <span className="required">*</span>
          </label>
          <input
            type="time"
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <span className="form-hint">Time: Select visit time (HH:MM format)</span>
        </div>

        <button
          className="submit-button"
          onClick={schedule}
          disabled={loading}
        >
          {loading ? "Scheduling..." : "📅 Schedule Visit"}
        </button>
      </div>
    </div>
  );
}