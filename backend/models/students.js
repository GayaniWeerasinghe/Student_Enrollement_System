const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    courses: {
        type: [String],
        default: []
    }
})

const Student = mongoose.model("Student",studentSchema); //create a collection
module.exports = Student;