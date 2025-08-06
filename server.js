require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const apiRoutes = require("./api-routes/index");

const cors = require("cors");

// ✅ Enable CORS
server.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you are using cookies/auth
  })
);

server.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
})();

server.use("/api", apiRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
