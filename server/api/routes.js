const controller = require("./controller.js");
const express = require("express");

const router = express.Router();

router.post("/addBook", controller.addBook);
router.get("/getBook", controller.getBook);
router.get("/getUserBooks", controller.getUserBooks);
router.delete("/deleteBook", controller.deleteBook);

module.exports = router;