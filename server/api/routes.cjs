const express = require("express");
const router = express.Router();
const tasks = require('../services/tasks.cjs');


router.get("/tasks", async (req, res) => {
  res.json(tasks.getTasks(req.query.page));
});

router.post("/tasks", async (req, res) => {
  res.json(tasks.createTask(req.body));
});

router.get("/tasks/:id", (req, res) => {
  res.json(tasks.getTask(req.params.id));
});

router.delete("/tasks/:id", (req, res) => {
  res.json(tasks.deleteTask(req.params.id));
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    //modify status or completed status based on body

    // res.json(tasks.updateTaskStatus(req.body.completed, req.params.id));
    res.json(tasks.updateTaskName(req.body, req.params.id));
  } catch(err) {
    console.error("err", err);
  }
});

module.exports = router;