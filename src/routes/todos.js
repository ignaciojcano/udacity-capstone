const express = require("express");
const Todo = require("../models/todo");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await Todo.find());
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { text } = req.body;
  try {
    res.json(
      await Todo.create({
        text
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    res.json(
      await Todo.findOne({
        _id: id
      })
    );
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { text, complete } = req.body;
  try {
    res.json(
      await Todo.findOneAndUpdate(
        {
          _id: id
        },
        {
          text,
          complete
        },
        {
          new: true
        }
      )
    );
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    res.json(
      await Todo.findOneAndDelete({
        _id: id
      })
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
