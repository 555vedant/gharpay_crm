const db = require("../database");

function checkInactiveLeads(){

const now = Date.now();

db.leads.forEach(lead=>{

const diff = now - lead.lastActivity;

if(diff > 86400000 && !lead.reminded){

console.log("Reminder: Follow up with",lead.name);

lead.reminded = true;

}

});

}

setInterval(checkInactiveLeads,60000);