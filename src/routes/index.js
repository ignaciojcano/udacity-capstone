const express = require("express");
const todos = require("./todos");

const router = express.Router();

router.use("/todos", todos);
router.get("/", (req, res) => {
  res.json(["Hi"]);
});

module.exports = router;
