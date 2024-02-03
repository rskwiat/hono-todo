const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const Database = path.resolve("todos.db");

const db = new sqlite3.Database(Database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
});

module.exports = db;
