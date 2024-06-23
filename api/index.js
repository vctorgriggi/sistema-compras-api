const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3333;

const corsOptions = {
  origin: true, // or ["http://localhost:5173, "https://example.com"]
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // enable set cookie
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new Error("Route not found.");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    error: {
      message: err.message || "Internal Server Error.",
    },
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
