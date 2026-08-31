import express from 'express'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import studentRoutes from './routes/student.routes.js'
import teacherRoutes from './routes/teacher.routes.js'
import classRoutes from './routes/class.routes.js'
import attendanceRoutes from './routes/attendance.routes.js'
import testRoutes from './routes/test.routes.js'
import resultRoutes from './routes/result.routes.js'
import activityRoutes from './routes/activity.routes.js'
import cookieParser from "cookie-parser";
import { errorHandler } from './middleware/error.middleware.js'



const app=express();

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth",authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/students',studentRoutes)
app.use('/api/teachers',teacherRoutes)
app.use('/api/classes',classRoutes)
app.use('/api/attendance',attendanceRoutes)
app.use('/api/tests',testRoutes)
app.use('/api/results',resultRoutes)
app.use('/api/activities',activityRoutes)

// MUST BE LAST
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;