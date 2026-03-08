const express = require("express");
const router = express.Router();

const db = require("../database");
const leaderboard = require("../services/performanceService");

router.get("/dashboard",(req,res)=>{

res.json({

totalLeads:db.leads.length,
visits:db.visits.length,
bookings:db.leads.filter(l=>l.status==="Booked").length

});

});

router.get("/leaderboard",(req,res)=>{
res.json(leaderboard());
});

module.exports = router;