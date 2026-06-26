import React, {useState, useEffect} from "react";
import axios from "axios";

function EditStudent({show, onClose, getStudents, id}) {

    const [studentId,setStudentId] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [course,setCourse] = useState("");
    const [batch,setBatch] = useState("");
    const [courses, setCourses] = useState([]);

    useEffect(() => {
            getCourses();
        }, []);
    
    const getCourses = () => {
        axios.get('http://localhost:8070/courses/')
                .then((res) => setCourses(res.data))
                .catch((err) => alert(err));
    };

    const data = {
        studentId: studentId,
        name: name,
        email: email,
        phone: phone,
        course: course,
        batch: batch
    }

    function loadStudent() {
       axios.get(`http://localhost:8070/students/get/${id}`).then((res) =>{
            setStudentId(res.data.students.studentId);
            setName(res.data.students.name);
            setEmail(res.data.students.email);
            setPhone(res.data.students.phone);
            setCourse(res.data.students.course);
            setBatch(res.data.students.batch);
            console.log(res.data);
            
        }).catch((err) =>{
            alert(err);
        })
    }

    useEffect(() => {
        if(id){
            loadStudent();
        }
    }, [id]);

    function onSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:8070/students/update/${id}`,data)
          .then((res) => {
            console.log(res.data);
            alert("Student updated successfully");
            getStudents();
            onClose();
          })
          .catch((err) => {
            alert(err);
          });
    };

    if (!show) {
        return null;
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Update Student
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Student ID
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="studentId"
                                        value={studentId}
                                        onChange={(e) =>{
                                            setStudentId(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Name
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>{
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>{
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Phone
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) =>{
                                            setPhone(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Course
                                    </label>
                                    <select className="form-select"
                                        id="course"
                                        value={course}
                                        onChange={(e) =>{
                                            setCourse(e.target.value);
                                        }}>
                                        <option>Select Course</option>
                                        {courses.map((course) => (
                                            <option>{course.courseName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Batch
                                    </label>
                                    <select className="form-select"
                                        id="batch"
                                        value={batch}
                                        onChange={(e) =>{
                                            setBatch(e.target.value);
                                        }}>
                                        <option>Select Batch</option>
                                        <option>2026 A</option>
                                        <option>2026 B</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                            <button className="btn theme-btn" type="submit">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </form>
    )
}

export default EditStudent;