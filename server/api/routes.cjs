const express = require("express");
const router = express.Router();
const config = require("../config.cjs");
const db = require("../services/db.cjs");

router.get("/tasks", (req, res) => {
  let page = req.query.page || 1;
  const offset = (page - 1) * config.listPerPage;
  const sql = `SELECT * FROM todo LIMIT ?, ?`;

  try {
    db.all(sql, [offset, config.listPerPage], (err, rows) => {  
      if (err) return res.json({ status: 300, success: false, error: err.message });
    
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: "No task found"});
      }

      return res.json({
        status: 200,
        data: rows,
        success: true,
        meta: { page }
      });
   });
  } catch (err) {
    res.json({ status: 300, success: false, error: err.message });
  }
});

router.post("/tasks", (req, res) => {
  const sql = `INSERT INTO todo(name, completed) VALUES(?, ?)`;
  try {
    const { name, completed } = req.body;
    db.run(sql, [name, completed], (err) => {  
      if (err) return res.json({ status: 300, success: false, error: err.message });
    });
    return res.json({
      status: 200,
      success: true,
    });
  } catch (err) {
    res.json({ status: 300, success: false, error: err.message });
  }
});

router.get("/tasks/:id", (req, res) => {
  const sql = `SELECT * FROM todo WHERE todo.id = ${req.params.id}`;
  try {
    db.all(sql, [], (err, rows) => {  
      if (err) return res.json({ status: 300, success: false, error: err.message });
    
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: "No task found"});
      }

      return res.json({
        status: 200,
        data: rows,
        success: true,
      });
    });
    
  } catch (err) {
    res.json({ status: 300, success: false, error: err.message });
  }
});

router.delete("/tasks/:id", (req, res) => {
  const sql = `DELETE FROM todo WHERE todo.id = ${req.params.id}`;
  try {
    db.all(sql, [], (err) => {  
      if (err) return res.json({ status: 300, success: false, error: err.message });
    });
    return res.json({
      status: 200,
      success: true,
    });
  } catch (err) {
    res.json({ status: 300, success: false, error: err.message });
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const sql = `UPDATE todo SET name = ?, completed = ? WHERE todo.id = ${req.params.id}`;
  try {
    db.all(sql, [req.body.name, req.body.completed], (err) => {  
      if (err) return res.json({ status: 300, success: false, error: err.message });

      return res.json({
        status: 200,
        success: true,
      });
    });
  } catch(err) {
    console.error("err", err);
  }
});

module.exports = router;