const router = require("express").Router();
let Batch = require("../models/batches");

//add a batch -- http://localhost:8070/batches/add
router.route("/add").post((req,res) => {
    const {batchId,batchName,startDate,endDate} = req.body;  //destructure

    const newBatch = new Batch({
        batchId,
        batchName,
        startDate,
        endDate
    })
        
    newBatch.save().then(()=> {
        res.json("New batch added.")
    }).catch((err) =>{
        console.log(err)
    })

})

//get batches -- http://localhost:8070/batches/
router.route("/").get((req,res) => {

    Batch.find().then((batches) => {
        res.json(batches);
    }).catch((err) => {
        console.log(err);
    })
})

//update a batch -- http://localhost:8070/batches/update/ghj32gftredhhkjk
router.route("/update/:id").put(async(req,res)=>{
    const ID = req.params.id;
    const {batchId,batchName,startDate,endDate} = req.body;
    const updateBatch ={
        batchId,
        batchName,
        StartDate,
        endDate
    }

    await Batch.findByIdAndUpdate(ID,updateBatch).then((updateBatch)=>{
        res.status(200).send({status:'Batch Updated',batches:updateBatch})
    }).catch((err)=>{
        res.status(500).send({status:'Error with updating',error:err.message})
    })
})

//delete a batch -- http://localhost:8070/batches/delete/ghj32gftredhhkjk
router.route("/delete/:id").delete(async(req,res)=>{
    const ID = req.params.id;

    await Batch.findByIdAndDelete(ID).then(()=>{
        res.status(200).send({status:'Batch Deleted'})
    }).catch((err)=>{
        res.status(500).send({status:'Error with deleting',error:err.message})
    })
})

//get one batch -- http://localhost:8070/batches/get/ghj32gftredhhkjk
router.route("/get/:id").get(async(req,res)=> {

    const ID = req.params.id;

    await Batch.findById(ID).then((batch)=>{
        res.status(200).send({status:"Batch Fetched",batches:batch})
    }).catch((err)=>{
        res.status(500).send({status:'Error with fetching',err:err.message})
    })
})

// // Get incomplete tasks -- http://localhost:8070/todo/status/incomplete
// router.route("/status/incomplete").get((req, res) => {
//     Task.find({ status: "Incomplete" })
//         .then((tasks) => {
//             res.json(tasks);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error with fetching incomplete tasks", error: err.message });
//         });
// });

// // Get complete tasks -- http://localhost:8070/todo/status/complete
// router.route("/status/complete").get((req, res) => {
//     Task.find({ status: "Completed" })
//         .then((tasks) => {
//             res.json(tasks);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error with fetching complete tasks", error: err.message });
//         });
// });
module.exports = router;