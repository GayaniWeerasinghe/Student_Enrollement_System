import React, { useState, useEffect} from "react";
import axios from 'axios';
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import { useParams } from "react-router-dom";

function AllStudents() {

    const [students,setStudents] = useState([]);
    const [selectedId,setSelectedId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = () => {
        axios.get('http://localhost:8070/students/')
             .then((res) => setStudents(res.data))
             .catch((err) => alert(err));
    };

    function studentDelete(id){
        const confirm_delete = window.confirm(
            "Are you sure you want to remove this student?"
        );
        if(!confirm_delete){
            return;
        }
        axios.delete(`http://localhost:8070/students/delete/${id}`)
        .then(() => {
            alert("Student deleted successfully");
            getStudents();
        })
        .catch((err) => {
            alert(err);
        });
    }

    return (
        <div>
            <div className="mt-2" style={{marginLeft:"270px", padding:"20px"}}>
                <h2>Registered Students</h2>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Course</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id}>
                                <td>{index+1}</td>
                                <td>{student.studentId}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>
                                    {student.courses && student.courses.length > 0 ? (
                                        student.courses.map((course, index) => (
                                            <span
                                                key={index}
                                                className="badge bg-success me-1"
                                            >
                                                {course}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-muted">
                                            No enrolled courses
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <i style={{color:'#374151', cursor: 'pointer'}} className="fa-solid fa-pen-to-square" onClick={() => {
                                            setSelectedId(student._id);
                                            setShowUpdateModal(true);
                                    }}></i>&nbsp;&nbsp;&nbsp;
                                    <i style={{color:'#374151', cursor: 'pointer'}} className="fa-solid fa-trash" onClick={() => studentDelete(student._id)}></i>
                                </td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
                <div className="text-end mt-1">
                    <button className="btn theme-btn" onClick={() => setShowModal(true)}><i className="fa-sharp fa-solid fa-plus"></i>&nbsp;Register Student</button>
                </div>
            </div>
            <AddStudent
                show={showModal}
                onClose={() => setShowModal(false)}
                getStudents={getStudents}
            />
            <EditStudent
                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                getStudents={getStudents}
                id = {selectedId}
            />
        </div>
    )
}

export default AllStudents;