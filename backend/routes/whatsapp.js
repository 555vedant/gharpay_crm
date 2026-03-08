const express = require("express");
const router = express.Router();

const db = require("../database");
const assignAgent = require("../services/assignmentService");

router.post("/webhook",(req,res)=>{

const {name,phone,message}=req.body;

const agent = assignAgent();

const lead={

id:Date.now(),
name,
phone,
source:"WhatsApp",
status:"New Lead",
agent:agent.name,
timeline:[`WhatsApp message: ${message}`]

};

db.leads.push(lead);

res.json({message:"Lead created from WhatsApp"});

});

module.exports = router;