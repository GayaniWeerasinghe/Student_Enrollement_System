const express = require("express");
const mongoose = require("mongoose"); 
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const dns = require("dns");
const app = express (); 
require("dotenv").config();
dns.setDefaultResultOrder("ipv4first");

// Declare port
const PORT = process.env.PORT || 8070

app.use(cors()); 
app.use(bodyParser.json()); 

// Mongodb connection

app.listen(PORT, () => { 
    console.log(`Server is running on ${PORT}`);
});

// Creating student routes
const studentRoute = require('./routes/Students');
app.use("/students", studentRoute);
// Creating auth routes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
// Creating course routes
const courseRouter = require("./routes/Courses");
app.use("/courses", courseRouter);
// Creating enrollments router
const enrollmentRouter = require("./routes/Enrollments");
app.use("/enrollments", enrollmentRouter);
// Creating batch router
const batchRouter = require("./routes/Batches");
app.use("/batches", batchRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

