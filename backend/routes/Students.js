const router = require("express").Router();
let Student = require("../models/students");

//add task -- http://localhost:8070/students/add
router.route("/add").post((req,res) => {
    const {studentId,name,email,phone} = req.body;  //destructure

    const newStudent = new Student({
        studentId,
        name,
        email,
        phone,
        courses:[]
    })
        
    newStudent.save().then(()=> {
        res.json("New student registered.")
    }).catch((err) =>{
        console.log(err)
    })

})

//get students -- http://localhost:8070/students/
router.route("/").get((req,res) => {

    Student.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        console.log(err);
    })
})

//update a student -- http://localhost:8070/students/update/ghj32gftredhhkjk
router.route("/update/:id").put(async(req,res)=>{
    try {
        const ID = req.params.id;
        const student = await Student.findById(ID);
        if(!student){
            return res.status(404).send({
                status:"Student not found"
            });
        }
        const {studentId,name,email,phone,course} = req.body;
        // update only if data exists
        if(studentId){
            student.studentId = studentId;
        }
        if(name){
            student.name = name;
        }
        if(email){
            student.email = email;
        }
        if(phone){
            student.phone = phone;
        }

        // add course if not already exists
        if(course && !student.courses.includes(course)){
            student.courses.push(course);
        }
        await student.save();
        res.status(200).send({
            status:"Student Updated",
            students:student
        });
    } catch(err){
        res.status(500).send({
            status:"Error with updating",
            error:err.message
        });
    }
});

//delete a student -- http://localhost:8070/students/delete/ghj32gftredhhkjk
router.route("/delete/:id").delete(async(req,res)=>{
    const ID = req.params.id;

    await Student.findByIdAndDelete(ID).then(()=>{
        res.status(200).send({status:'Student Deleted'})
    }).catch((err)=>{
        res.status(500).send({status:'Error with deleting',error:err.message})
    })
})

//get one student -- http://localhost:8070/students/get/ghj32gftredhhkjk
router.route("/get/:id").get(async(req,res)=> {

    const ID = req.params.id;

    await Student.findById(ID).then((student)=>{
        res.status(200).send({status:"Student Fetched",students:student})
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