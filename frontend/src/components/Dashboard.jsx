import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/analytics/dashboard")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading dashboard:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Dashboard Overview</h2>
      <p className="section-subtitle">Real-time analytics and metrics</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{data.totalLeads || 0}</div>
          <div className="stat-label">Total Leads</div>
          <div className="stat-description">All registered leads</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-value">{data.visits || 0}</div>
          <div className="stat-label">Scheduled Visits</div>
          <div className="stat-description">Property viewings</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{data.bookings || 0}</div>
          <div className="stat-label">Confirmed Bookings</div>
          <div className="stat-description">Successful conversions</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">
            {data.totalLeads > 0 
              ? ((data.bookings / data.totalLeads) * 100).toFixed(1) 
              : 0}%
          </div>
          <div className="stat-label">Conversion Rate</div>
          <div className="stat-description">Leads to bookings</div>
        </div>
      </div>


    </div>
  );
}