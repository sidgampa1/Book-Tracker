const cors = require('cors')
const books = require("./routes.js");
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/books", books);
app.use("*", (req, res) => {
    res.status(404).json({error: "Not Found"}) 
});

module.exports= app;

