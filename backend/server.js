const express = require("express");
const cors = require("cors");

const leads = require("./routes/leads");
const visits = require("./routes/visits");
const analytics = require("./routes/analytics");
const integrations = require("./routes/integrations");
const whatsapp = require("./routes/whatsapp");

require("./services/reminderService");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/leads",leads);
app.use("/visits",visits);
app.use("/analytics",analytics);
app.use("/integrations",integrations);
app.use("/whatsapp",whatsapp);

app.listen(5000,()=>{
console.log("CRM running on port 5000");
});