const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3333;

const corsOptions = {
  origin: true, // or ["http://localhost:5173, "https://example.com"]
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // enable set cookie
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "internal server error." });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
