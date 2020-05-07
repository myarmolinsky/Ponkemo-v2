const express = require("express");
const app = express();
const connectDB = require("./config/db");
const db = connectDB();
const Pokemon = require("./models/Pokemon");
const config = require("config");
const dex = require("./dex.json");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/pokemon", require("./routes/api/pokemon"));

app.get("/", async (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
