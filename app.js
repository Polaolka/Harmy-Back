const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
// const swaggerAutogen = require('swagger-autogen')();

const typesOfDonatsRouter = require("./routes/api/typesOfDonats");
const authRouter = require("./routes/api/auth");
const adminRouter = require("./routes/api/admin");
const unitRouter = require("./routes/api/unit");
const requestRouter = require("./routes/api/request");
// const recipesRouter = require("./routes/api/recipes");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cookieParser());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use("/auth", authRouter);
app.use("/typesOfDonats", typesOfDonatsRouter);
app.use("/units", unitRouter);
app.use("/admin", adminRouter);
app.use("/requests", requestRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
