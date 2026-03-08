const express = require("express");
const router = express.Router();

const db = require("../database");

router.post("/",(req,res)=>{
  try {
    const {leadId,property,date}=req.body;

    // Validate input
    if (!leadId || !property || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert leadId to number for proper comparison
    const numericLeadId = parseInt(leadId);

    // Find the lead
    const lead = db.leads.find(l => l.id === numericLeadId);
    
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // Create visit object
    const visit = {
      id: Date.now(),
      leadId: numericLeadId,
      property,
      date,
      outcome: "Scheduled"
    };

    // Add visit to database
    db.visits.push(visit);

    // Update lead timeline
    if (!lead.timeline) {
      lead.timeline = [];
    }
    lead.timeline.push(`Visit Scheduled for ${property} on ${date}`);

    // Update lead status if it's still new
    if (lead.status === "New") {
      lead.status = "Visit Scheduled";
    }

    res.json(visit);
  } catch (error) {
    console.error("Error scheduling visit:", error);
    res.status(500).json({ error: "Failed to schedule visit" });
  }
});

// Get all visits
router.get("/", (req, res) => {
  res.json(db.visits);
});

module.exports = router;