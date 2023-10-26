//? IMPORT -> REQUIRE
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug");
const cors = require("cors");
const usersRouter = require("./routes/api/usersRoute");
const companiesRouter = require("./routes/api/companiesRoute");
const jobsRouter = require("./routes/api/jobsRoute");
// const interviewsRouter = require("./routes/api/interviewsRoute");
// const offersRouter = require("./routes/api/offersRoute");


//? APP
const app = express();

//? MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(require("./config/checkToken"));
app.use(cors());

//? ROUTES - Put API routes here, before the "catch all" route
app.use("/api/users", usersRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/jobs", jobsRouter);
// app.use("/api/interviews", interviewsRouter);
// app.use("/api/offers", offersRouter);

//! A single "catch all" route is required to serve the index.html when any non-AJAX "API" request is received by the Express app:
//! just a precursor to react router
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//? LISTEN
const port = process.env.PORT || 3000;

app.listen(port, function () {
	debug(`Express app running on port ${port}`);
});
