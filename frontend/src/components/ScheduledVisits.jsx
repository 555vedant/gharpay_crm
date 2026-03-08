import { useEffect, useState } from "react";
import api from "../api";

export default function ScheduledVisits() {
  const [visits, setVisits] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [visitsRes, leadsRes] = await Promise.all([
        api.get("/visits"),
        api.get("/leads")
      ]);
      setVisits(visitsRes.data);
      setLeads(leadsRes.data);
    } catch (error) {
      console.error("Error loading visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLeadDetails = (leadId) => {
    return leads.find(l => l.id === leadId) || {};
  };

  const getOutcomeColor = (outcome) => {
    const colors = {
      "Scheduled": "#0891b2",
      "Completed": "#059669",
      "Cancelled": "#dc2626",
      "Rescheduled": "#d97706"
    };
    return colors[outcome] || "#64748b";
  };

  if (loading) {
    return (
      <div className="visits-container">
        <div className="loading">Loading scheduled visits...</div>
      </div>
    );
  }

  return (
    <div className="visits-container">
      <h2 className="section-title">Scheduled Property Visits</h2>
      <p className="section-subtitle">View all upcoming and past property visits</p>

      {visits.length === 0 ? (
        <div className="empty-state">
          <p>No visits scheduled yet. Schedule your first property visit!</p>
        </div>
      ) : (
        <div className="visits-grid">
          {visits.map((visit) => {
            const lead = getLeadDetails(visit.leadId);
            return (
              <div key={visit.id} className="visit-card">
                <div className="visit-property">{visit.property}</div>
                
                <div className="visit-detail">
                  <strong>Lead:</strong> {lead.name || "Unknown"}
                </div>
                
                <div className="visit-detail">
                  <strong>Phone:</strong> {lead.phone || "N/A"}
                </div>
                
                <div className="visit-detail">
                  <strong>Date & Time:</strong> {visit.date}
                </div>
                
                <div className="visit-detail">
                  <strong>Agent:</strong> {lead.agent || "Not Assigned"}
                </div>
                
                <div 
                  className="outcome-badge" 
                  style={{ backgroundColor: getOutcomeColor(visit.outcome) }}
                >
                  {visit.outcome}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
