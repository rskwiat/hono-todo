const db = require("./db.cjs");
const config = require("../config.cjs");

function getTasks (page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM todo LIMIT ?, ?`, [offset, config.listPerPage]);
  const meta = { page };

  return {
    data,
    meta
  };
}

function createTask(task) {
  const { name, completed } = task;
  const result = db.run("INSERT INTO todo (name, completed) VALUES (@name, @completed)", { name, completed });

  let message = "error"
  if (result.changes) {
    message = "Task created successfully"
  }
  return {
    message
  }
}

function getTask(id) {
  const data = db.query(`SELECT * FROM todo WHERE todo.id = ${id}` , []);
  return {
    data,
  }
}

function deleteTask(id) {
  const data = db.run(`DELETE FROM todo WHERE todo.id = ${id}` , []);
  let message = "There was an error deleting the task";
  if (data.changes) {
    message ="Task Removed"
  }
  return {
    message,
    data,
  }
}

function updateTask(body, id) {
  // validation to checck if name and body exist

  const data = db.run(`
      UPDATE todo
      SET
        name = ?,
        completed = ?
      WHERE
        todo.id = ${id}`, [body.name, body.completed]);    

  let message = "An error occured"
  if (data.changes) {
    message = "Task updated"
  }
  return {
    message
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
}