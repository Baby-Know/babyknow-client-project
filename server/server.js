const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const cohortRouter = require("./routes/cohort.router");
const unitRouter = require("./routes/unit.router");
const lessonRouter = require('./routes/lesson.router');
const newRegistrantsRouter = require("./routes/newRegistrants.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/cohort", cohortRouter);
app.use("/api/unit", unitRouter);
app.use("/api/lesson", lessonRouter);
app.use("/api/newRegistrants", newRegistrantsRouter);


// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
