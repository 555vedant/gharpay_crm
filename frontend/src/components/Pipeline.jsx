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
                  <p className="lead-phone">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '16px', height: '16px', display: 'inline-block', marginBottom: '-2px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {' '}{l.phone}
                  </p>
                  {l.email && <p className="lead-phone">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '16px', height: '16px', display: 'inline-block', marginBottom: '-2px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {' '}{l.email}
                  </p>}
                  <p className="lead-phone">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '16px', height: '16px', display: 'inline-block', marginBottom: '-2px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {' '}Source: {l.source || "Direct"}
                  </p>
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
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '18px', height: '18px', display: 'inline-block', marginBottom: '-3px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {' '}Contacted
                </button>
                <button
                  className="action-button action-visit"
                  onClick={() => move(l.id, "Visit Scheduled")}
                  disabled={l.status === "Visit Scheduled"}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '18px', height: '18px', display: 'inline-block', marginBottom: '-3px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0  00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {' '}Visit
                </button>
                <button
                  className="action-button action-booked"
                  onClick={() => move(l.id, "Booked")}
                  disabled={l.status === "Booked"}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '18px', height: '18px', display: 'inline-block', marginBottom: '-3px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {' '}Booked
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}