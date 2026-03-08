import { useState } from "react";
import Dashboard from "./components/Dashboard";
import LeadForm from "./components/LeadForm";
import Pipeline from "./components/Pipeline";
import Leaderboard from "./components/Leaderboard";
import VisitScheduler from "./components/VisitScheduler";
import ScheduledVisits from "./components/ScheduledVisits";
import "./App.css";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "leads":
        return <LeadForm />;
      case "visits":
        return <VisitScheduler />;
      case "scheduled":
        return <ScheduledVisits />;
      case "pipeline":
        return <Pipeline />;
      case "leaderboard":
        return <Leaderboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Gharpayy CRM</h1>
        <p className="app-subtitle">Real Estate Lead Management System</p>
      </header>

      <nav className="navigation">
        <button
          className={`nav-button ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => setCurrentView("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-button ${currentView === "leads" ? "active" : ""}`}
          onClick={() => setCurrentView("leads")}
        >
          ➕ Create Lead
        </button>
        <button
          className={`nav-button ${currentView === "visits" ? "active" : ""}`}
          onClick={() => setCurrentView("visits")}
        >
          📅 Schedule Visit
        </button>
        <button
          className={`nav-button ${currentView === "scheduled" ? "active" : ""}`}
          onClick={() => setCurrentView("scheduled")}
        >
          🏠 Scheduled Visits
        </button>
        <button
          className={`nav-button ${currentView === "pipeline" ? "active" : ""}`}
          onClick={() => setCurrentView("pipeline")}
        >
          🔄 Pipeline
        </button>
        <button
          className={`nav-button ${currentView === "leaderboard" ? "active" : ""}`}
          onClick={() => setCurrentView("leaderboard")}
        >
          🏆 Leaderboard
        </button>
      </nav>

      <main className="main-content">
        {renderView()}
      </main>

      <footer className="app-footer">
        <p>© 2026 Gharpayy CRM. All rights reserved.</p>
      </footer>
    </div>
  );
}