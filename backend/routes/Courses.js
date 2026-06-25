const router = require("express").Router();
let Course = require("../models/courses");

//add a course -- http://localhost:8070/courses/add
router.route("/add").post((req,res) => {
    const {courseCode,courseName,duration,fee} = req.body;  //destructure

    const newCourse = new Course({
        courseCode,
        courseName,
        duration,
        fee
    })
        
    newCourse.save().then(()=> {
        res.json("New course added.")
    }).catch((err) =>{
        console.log(err)
    })

})

//get courses -- http://localhost:8070/courses/
router.route("/").get((req,res) => {

    Course.find().then((courses) => {
        res.json(courses);
    }).catch((err) => {
        console.log(err);
    })
})

//update a course -- http://localhost:8070/courses/update/ghj32gftredhhkjk
router.route("/update/:id").put(async(req,res)=>{
    const ID = req.params.id;
    const {courseCode,courseName,duration,fee} = req.body;
    const updateCourse ={
        courseCode,
        courseName,
        duration,
        fee
    }

    await Course.findByIdAndUpdate(ID,updateCourse).then((updateCourse)=>{
        res.status(200).send({status:'Course Updated',courses:updateCourse})
    }).catch((err)=>{
        res.status(500).send({status:'Error with updating',error:err.message})
    })
})

//delete a student -- http://localhost:8070/courses/delete/ghj32gftredhhkjk
router.route("/delete/:id").delete(async(req,res)=>{
    const ID = req.params.id;

    await Course.findByIdAndDelete(ID).then(()=>{
        res.status(200).send({status:'Course Deleted'})
    }).catch((err)=>{
        res.status(500).send({status:'Error with deleting',error:err.message})
    })
})

//get one student -- http://localhost:8070/students/get/ghj32gftredhhkjk
router.route("/get/:id").get(async(req,res)=> {

    const ID = req.params.id;

    await Course.findById(ID).then((course)=>{
        res.status(200).send({status:"Course Fetched",courses:course})
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