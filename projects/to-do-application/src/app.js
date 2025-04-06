const express = require("express");
const todoRoutes = require("./routes/todo.routes");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

module.exports = app;
