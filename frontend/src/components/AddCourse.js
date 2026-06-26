import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCourse({show, onClose, getCourses}) {

    const [courseCode,setCourseCode] = useState("");
    const [courseName,setCourseName] = useState("");
    const [duration,setDuration] = useState("");
    const [fee,setFee] = useState("");

    function saveCourse(e){
        e.preventDefault();

        const newCourse = {
            courseCode,
            courseName,
            duration,
            fee
        }

        axios.post('http://localhost:8070/courses/add',newCourse).then(() =>{
            alert('Course Added Successfully');
            getCourses();
            onClose();
        }).catch((err) =>{
            alert(err);
        })
    }

    if (!show) {
        return null;
    }

    return (
        <form onSubmit={saveCourse}>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Add Course
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
                                        Course Code
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="courseCode"
                                        onChange={(e) =>{
                                            setCourseCode(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Course Name
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="courseName"
                                        onChange={(e) =>{
                                            setCourseName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Duration
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="duration"
                                        onChange={(e) =>{
                                            setDuration(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Course Fee
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="number"
                                        id="fee"
                                        onChange={(e) =>{
                                            setFee(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button className="btn theme-btn"
                                type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </form>
    )
}

export default AddCourse;