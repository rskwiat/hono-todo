const path = require("path");
const sqlite = require("better-sqlite3");
const db = new sqlite(path.resolve("todos.db"), {
  fileMustExist: true 
});

function query (sql, params) {
  return db.prepare(sql).all(params);
}

function run (sql, params) {
  return db.prepare(sql).run(params);
}


module.exports = {
  query,
  run,
};
