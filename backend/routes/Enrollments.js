const router = require("express").Router();
const Enrollment = require("../models/enrollments");

// Create Enrollment -- http://localhost:8070/enrollments/add
router.post("/add", async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        await enrollment.save();
        res.status(201).json({ success: true, message: "Student enrolled successfully", enrollment,});
    } catch (err) {
        res.status(400).json({ success: false, message: err.message, });
    }
});

// Get All Enrollments -- http://localhost:8070/enrollments/
router.get("/", async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate("studentId").populate("courseId");
        res.json(enrollments);
    } catch (err) {
        res.status(500).json(err); 
    }
});

// Get Enrollment by ID -- http://localhost:8070/enrollments/dgdjhdgksdg12
router.get("/:id", async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate("studentId").populate("courseId");
        res.json(enrollment);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// Update Enrollment -- http://localhost:8070/enrollments/update/hbbdhdcggusgc78
router.put("/update/:id", async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true } );
        res.json({ success: true, message: "Enrollment updated successfully", enrollment, });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Enrollment -- http://localhost:8070/enrollments/delete/dvhvhvhvhhjas56
router.delete("/delete/:id", async (req, res) => {
    try {
        await Enrollment.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Enrollment deleted successfully", });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;