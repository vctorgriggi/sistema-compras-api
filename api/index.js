const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3333;

const corsOptions = {
  origin: true, // ou ["http://localhost:5173", "https://example.com"]
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("tiny"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", routes);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  } else if (error.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      message: "Invalid file type. Only JPEG and PNG are allowed.",
    });
  } else {
    console.error(error.stack);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
