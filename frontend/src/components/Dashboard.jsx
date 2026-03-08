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
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="stat-value">{data.totalLeads || 0}</div>
          <div className="stat-label">Total Leads</div>
          <div className="stat-description">All registered leads</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="stat-value">{data.visits || 0}</div>
          <div className="stat-label">Scheduled Visits</div>
          <div className="stat-description">Property viewings</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-value">{data.bookings || 0}</div>
          <div className="stat-label">Confirmed Bookings</div>
          <div className="stat-description">Successful conversions</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
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