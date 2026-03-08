const express = require("express");
const router = express.Router();

const db = require("../database");
const assignAgent = require("../services/assignmentService");

router.post("/",(req,res)=>{
  try {
    const {name,phone,email,source}=req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    const agent = assignAgent();

    const lead = {
      id:Date.now(),
      name,
      phone,
      email: email || "",
      source: source || "Unknown",
      status:"New",
      agent:agent.name,
      createdAt:Date.now(),
      lastActivity:Date.now(),
      timeline:["Lead Created"]
    };

    db.leads.push(lead);

    res.json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.get("/",(req,res)=>{
  res.json(db.leads);
});

router.patch("/:id",(req,res)=>{
  try {
    const leadId = parseInt(req.params.id);
    const lead = db.leads.find(l=>l.id===leadId);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    lead.status=req.body.status;
    lead.lastActivity=Date.now();
    lead.timeline.push(`Status changed to ${req.body.status}`);

    res.json(lead);
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ error: "Failed to update lead" });
  }
});

module.exports = router;