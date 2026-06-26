import React, { useState, useEffect} from "react";
import axios from 'axios';
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import { useParams } from "react-router-dom";

function AllCourses() {

    const [courses,setCourses] = useState([]);
    const [selectedId,setSelectedId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        axios.get('http://localhost:8070/courses/')
             .then((res) => setCourses(res.data))
             .catch((err) => alert(err));
    };

    function courseDelete(id){
        const confirm_delete = window.confirm(
            "Are you sure you want to remove this course?"
        );
        if(!confirm_delete){
            return;
        }
        axios.delete(`http://localhost:8070/courses/delete/${id}`)
        .then(() => {
            alert("Course deleted successfully");
            getCourses();
        })
        .catch((err) => {
            alert(err);
        });
    }

    return (
        <div>
            <div className="mt-2" style={{marginLeft:"270px", padding:"20px"}}>
                <h2>Courses</h2>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Course Duration</th>
                            <th>Course Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course._id}>
                                <td>{index+1}</td>
                                <td>{course.courseCode}</td>
                                <td>{course.courseName}</td>
                                <td>{course.duration}</td>
                                <td>{course.fee}</td>
                                <td>
                                    <i style={{color:'#374151', cursor: 'pointer'}} className="fa-solid fa-pen-to-square" onClick={() => {
                                            setSelectedId(course._id);
                                            setShowUpdateModal(true);
                                    }}></i>&nbsp;&nbsp;&nbsp;
                                    <i style={{color:'#374151', cursor: 'pointer'}} className="fa-solid fa-trash" onClick={() => courseDelete(course._id)}></i>
                                </td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
                <div className="text-end mt-1">
                <button className="btn theme-btn" onClick={() => setShowModal(true)}><i className="fa-sharp fa-solid fa-plus"></i>&nbsp;Add Course</button>
                </div>
            </div>
            <AddCourse
                show={showModal}
                onClose={() => setShowModal(false)}
                getCourses={getCourses}
            />
            <EditCourse
                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                getCourses={getCourses}
                id = {selectedId}
            />
        </div>
    )
}

export default AllCourses;