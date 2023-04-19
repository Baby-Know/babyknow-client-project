const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

// initializing socket.io for Express
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "*"
    }
});

const rooms = [];

io.on("connection", (socket) => {
  console.log('Socket.io is active.')

  // create a room
  socket.on('create', (room) => {
    rooms.push(room)
    socket.emit('updateRooms', rooms, socket.room)
    console.log('rooms', rooms)
  });

  socket.on("send_message", (room) => {
    socket.to(room).emit("send_message", socket.id, message);
  })
  
});

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require("./routes/user.router");
const cohortRouter = require("./routes/cohort.router");
const unitRouter = require("./routes/unit.router");
const lessonRouter = require("./routes/lesson.router");
const newRegistrantsRouter = require("./routes/newRegistrants.router");
const studentsRouter = require("./routes/students.router");
const contentRouter = require("./routes/content.router");
const teacherRouter = require("./routes/teachers.router");
const messageRouter = require("./routes/message.router");
const userContentRouter = require('./routes/userContent.router');
const progressRouter = require("./routes/progress.router")

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
app.use("/api/students", studentsRouter);
app.use("/api/content", contentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/message", messageRouter);
app.use('/api/user-content', userContentRouter);
app.use('/api/progress', progressRouter);

// Serve static files
app.use(express.static('build'));

/** Listen * */
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
