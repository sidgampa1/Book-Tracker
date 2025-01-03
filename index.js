require("dotenv").config();
app = require("server/server.js");

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});