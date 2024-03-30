const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articles");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(error => console.error("MongoDB connection error:", error));

// Routes
app.use("/api", authRoutes); // Authentication routes
app.use("/api/articles", articleRoutes); // Article routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
