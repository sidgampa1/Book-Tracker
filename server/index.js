require("dotenv").config();
app = require("./api/server.js");

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});