import { useEffect, useState } from "react";
import api from "../api";

export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const move = async (id, status) => {
    try {
      await api.patch(`/leads/${id}`, { status });
      load();
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Failed to update lead status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "New": "#3b82f6",
      "Contacted": "#8b5cf6",
      "Visit Scheduled": "#f59e0b",
      "Booked": "#10b981",
      "Lost": "#ef4444"
    };
    return colors[status] || "#6b7280";
  };

  if (loading) {
    return (
      <div className="pipeline-container">
        <div className="loading">Loading pipeline...</div>
      </div>
    );
  }

  return (
    <div className="pipeline-container">
      <h2 className="section-title">Sales Pipeline</h2>
      <p className="section-subtitle">Manage and track your leads through the sales funnel</p>

      {leads.length === 0 ? (
        <div className="empty-state">
          <p>No leads found. Create your first lead to get started!</p>
        </div>
      ) : (
        <div className="pipeline-grid">
          {leads.map((l) => (
            <div key={l.id} className="pipeline-card">
              <div className="pipeline-header">
                <div className="lead-info">
                  <h3 className="lead-name">{l.name}</h3>
                  <p className="lead-phone">📱 {l.phone}</p>
                  {l.email && <p className="lead-phone">✉️ {l.email}</p>}
                  <p className="lead-phone">📍 Source: {l.source || "Direct"}</p>
                  <p className="lead-id">ID: {l.id}</p>
                </div>
                <div 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(l.status) }}
                >
                  {l.status}
                </div>
              </div>

              <div className="pipeline-actions">
                <button
                  className="action-button action-contacted"
                  onClick={() => move(l.id, "Contacted")}
                  disabled={l.status === "Contacted"}
                >
                  📞 Contacted
                </button>
                <button
                  className="action-button action-visit"
                  onClick={() => move(l.id, "Visit Scheduled")}
                  disabled={l.status === "Visit Scheduled"}
                >
                  📅 Visit
                </button>
                <button
                  className="action-button action-booked"
                  onClick={() => move(l.id, "Booked")}
                  disabled={l.status === "Booked"}
                >
                  ✅ Booked
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}