import React, {useState, useEffect} from "react";
import axios from 'axios';

function Enrollment() {

    const [batches, setBatches] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        getBatches();
        getCourses();
        getStudents();
    }, []);

    const getCourses = () => {
        axios.get('http://localhost:8070/courses/')
             .then((res) => setCourses(res.data))
             .catch((err) => alert(err));
    };

    const getBatches = () => {
        axios.get('http://localhost:8070/batches/')
             .then((res) => setBatches(res.data))
             .catch((err) => alert(err));
    };

    const getStudents = () => {
        axios.get('http://localhost:8070/students/')
             .then((res) => setStudents(res.data))
             .catch((err) => alert(err));
    };

    const handleEnroll = async () => {
        if (!selectedCourse) {
            alert("Please select a course");
            return;
        }
        if (selectedStudents.length === 0) {
            alert("Please select at least one student");
            return;
        }

        try {
            for (const studentId of selectedStudents) {
                const student = students.find(
                    (s) => s._id === studentId
                );

                // Update student's courses array
                await axios.put(
                    `http://localhost:8070/students/update/${studentId}`,
                    {
                        course: courses.find(c => c._id === selectedCourse).courseName
                    }
                );
                // Create enrollment record
                await axios.post(
                    "http://localhost:8070/enrollments/add",
                    {
                        studentId: studentId,
                        courseId: selectedCourse,
                        batch: selectedBatch
                    }
                );
            }
            alert("Students enrolled successfully");
        } catch (err) {
            console.error(err.response?.data || err);
            alert(err.response?.data?.message || "Enrollment failed.");
        }
    };

    return(
        <div className="page-wrapper">
            <h2 className="mb-3">Enroll Students</h2>
            <div className="enrollment-container">
                <select className="form-select" value={selectedCourse}
                    onChange={(e) => setSelectedBatch(e.target.value)}>
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                        <option
                            key={batch._id}
                            value={batch._id}
                        >
                            {batch.batchName}
                        </option>
                    ))}
                </select>
                <br/>
                <select className="form-select" value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option
                            key={course._id}
                            value={course._id}
                        >
                            {course.courseName}
                        </option>
                    ))}
                </select>
                <br/>
                <div className="table-responsive">
                    <p style={{fontSize: "13px"}} className="text-danger">(Select students who want to enroll into selected course)</p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedStudents([
                                                        ...selectedStudents,
                                                        student._id,
                                                    ]);
                                                } else {
                                                    setSelectedStudents(
                                                        selectedStudents.filter(
                                                            (id) => id !== student._id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-end mt-1">
                    <button className="btn theme-btn" onClick={handleEnroll}>Enroll</button>
                </div>
            </div>
            <h3 className="mt-3">Enrolled Students</h3>

        </div>
    )
}

export default Enrollment;
