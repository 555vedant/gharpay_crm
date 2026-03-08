import { useEffect, useState } from "react";
import api from "../api";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/analytics/leaderboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading leaderboard:", err);
        setLoading(false);
      });
  }, []);

  const getMedalIcon = (index) => {
    const medals = ["🥇", "🥈", "🥉"];
    return medals[index] || "🏅";
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h2 className="section-title">Agent Leaderboard</h2>
      <p className="section-subtitle">Top performing sales agents</p>

      <div className="leaderboard-grid">
        {data.map((agent, index) => (
          <div key={agent.id} className="leaderboard-card">
            <div className="agent-rank">
              <span className="medal">{getMedalIcon(index)}</span>
              <span className="rank-number">#{index + 1}</span>
            </div>
            <div className="agent-details">
              <h3 className="agent-name">{agent.name}</h3>
              <div className="agent-stats">
                <span className="stat-number">{agent.assigned}</span>
                <span className="stat-text">Leads Assigned</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}