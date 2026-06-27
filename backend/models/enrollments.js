const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({ 
    studentId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", 
        required: true, 
    }, 
    courseId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }, 
    batch: { 
        type: String,
        trim: true,
    }, 
    enrolledDate: { 
        type: Date,
        default: Date.now,
    }, 
    status: { 
        type: String,
        enum: ["Active", "Completed", "Cancelled"],
        default: "Active",
    }, 
}, { timestamps: true, });

// Prevent duplicate enrollments
enrollmentSchema.index( 
    { studentId: 1, courseId: 1, batch: 1 },
    { unique: true } );

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment