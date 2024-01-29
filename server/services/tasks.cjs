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

function createTask (task) {
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

function getTask (id) {
  const data = db.query(`SELECT * FROM todo WHERE todo.id = ${id}` , []);
  return {
    data,
  }
}

function deleteTask (id) {
  const data = db.run(`DELETE FROM todo WHERE todo.id = ${id}` , []);
  let message = "There was an error deleting the task";
  if (data.changes) {
    message ="Task Removed"
  }
  return {
    message,
  }
}

function updateTaskStatus(body, id) {
  const data = db.run(`
    UPDATE todo
    SET
      completed = ?
    WHERE
      todo.id = ${id}`, [body]);

  let message = "error"
  if (data.changes) {
    message = "Task updated"
  }
  return {
    message
  }
}


function updateTaskName(body, id) {
  const data = db.run(`
    UPDATE todo
    SET
      name = ?
    WHERE
      todo.id = ${id}`, [body.name]);

  let message = "error"
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
  updateTaskStatus,
  updateTaskName,
  deleteTask,
}