const db = require("../database");

let current = 0;

function assignAgent(){

const agent = db.agents[current];

agent.assigned++;

current = (current + 1) % db.agents.length;

return agent;

}

module.exports = assignAgent;