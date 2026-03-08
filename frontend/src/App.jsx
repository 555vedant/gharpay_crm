import { useState } from "react";
import Dashboard from "./components/Dashboard";
import LeadForm from "./components/LeadForm";
import Pipeline from "./components/Pipeline";
import Leaderboard from "./components/Leaderboard";
import VisitScheduler from "./components/VisitScheduler";
import ScheduledVisits from "./components/ScheduledVisits";
import "./AppStyles.css";

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
          <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Dashboard
        </button>
        <button
          className={`nav-button ${currentView === "leads" ? "active" : ""}`}
          onClick={() => setCurrentView("leads")}
        >
          <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Create Lead
        </button>
        <button
          className={`nav-button ${currentView === "visits" ? "active" : ""}`}
          onClick={() => setCurrentView("visits")}
        >
          <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule Visit
        </button>
        <button
          className={`nav-button ${currentView === "scheduled" ? "active" : ""}`}
          onClick={() => setCurrentView("scheduled")}
        >
          <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Scheduled Visits
        </button>
        <button
          className={`nav-button ${currentView === "pipeline" ? "active" : ""}`}
          onClick={() => setCurrentView("pipeline")}
        >
          <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Pipeline
        </button>
        <button
          className={`nav-button ${currentView === "leaderboard" ? "active" : ""}`}
          onClick={() => setCurrentView("leaderboard")}
        >
          <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Leaderboard
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