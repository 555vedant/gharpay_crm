const db = require("../database");

function leaderboard(){

return db.agents.sort((a,b)=>b.assigned-a.assigned);

}

module.exports = leaderboard;