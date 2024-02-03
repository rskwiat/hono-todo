const db = require("../server/services/db.cjs");


beforeAll(() => {
  let sql = `CREATE TABLE test_db (
    id INTEGER PRIMARY KEY,
    name VARCHAR(150),
    completed BOOLEAN
  )`;

  db.run(sql, [], (err) => {
    if (err) return err.message;
  });
});

afterAll(() => {
  let sql = `DROP TABLE test_db`;
  db.run(sql ,[], (err) => {
    if (err) return err.message;
  });
})