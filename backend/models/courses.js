const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseCode:{
        type: String,
        required: true,
        unique: true
    },
    courseName:{
        type: String,
        required: true
    },
    duration:{
        type:String,
        required:true
    },
    fee:{
        type:Number,
        required:true 
    }
})

const Course = mongoose.model("Course",courseSchema); //create a collection
module.exports = Course;