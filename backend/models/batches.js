const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    batchId:{
        type: String,
        required: true,
        unique: true
    },
    batchName:{
        type: String,
        required: true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true 
    }
})

const Batch = mongoose.model("Batch",batchSchema); //create a collection
module.exports = Batch;