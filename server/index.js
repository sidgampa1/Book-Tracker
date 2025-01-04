require("dotenv").config();
app = require("api/server.js");

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});