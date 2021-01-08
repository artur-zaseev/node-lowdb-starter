// https://www.youtube.com/watch?v=SY1RtzoR42g

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { nanoid } = require("nanoid");

const PORT = 3000;

const db = lowDb(new FileSync("./database/db.json"));
db.defaults({ users: [] }).write();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  const data = db.get("users").value();
  return res.json(data);
});

app.post("/users", (req, res) => {
  const note = req.body;

  db.get("users")
    .push({
      id: nanoid(),
      ...note,
    })
    .write();

  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
