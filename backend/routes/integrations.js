const express = require("express");
const router = express.Router();

const db = require("../database");
const assignAgent = require("../services/assignmentService");

function createLead(name,phone,source){

const agent = assignAgent();

const lead = {

id:Date.now(),
name,
phone,
source,
status:"New Lead",
agent:agent.name,
createdAt:Date.now(),
lastActivity:Date.now(),
timeline:[`Lead captured from ${source}`]

};

db.leads.push(lead);

return lead;

}

router.post("/tally",(req,res)=>{
const lead=createLead(req.body.name,req.body.phone,"Tally");
res.json(lead);
});

router.post("/google-form",(req,res)=>{
const lead=createLead(req.body.name,req.body.phone,"Google Form");
res.json(lead);
});

router.post("/calendly",(req,res)=>{

const lead=createLead(req.body.name,req.body.phone,"Calendly");

db.visits.push({

id:Date.now(),
leadId:lead.id,
property:"Auto Assigned",
date:req.body.date

});

res.json(lead);

});

module.exports = router;