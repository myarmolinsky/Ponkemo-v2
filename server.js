const express = require("express");
const app = express();
const connectDB = require("./config/db");
const db = connectDB();

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
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
