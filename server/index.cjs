const express = require("express");
const routes = require("./api/routes.cjs");

const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    "success": "true"
  });
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`api is running on http://localhost:${PORT}`);
});