import React, {useState, useEffect} from "react";
import axios from "axios";

function EditCourse({show, onClose, getCourses, id}) {

    const [courseCode,setCourseCode] = useState("");
    const [courseName,setCourseName] = useState("");
    const [duration,setDuration] = useState("");
    const [fee,setFee] = useState("");

    const data = {
        courseCode: courseCode,
        courseName: courseName,
        duration: duration,
        fee: fee
    }

    function loadCourse() {
       axios.get(`http://localhost:8070/courses/get/${id}`).then((res) =>{
            setCourseCode(res.data.courses.courseCode);
            setCourseName(res.data.courses.courseName);
            setDuration(res.data.courses.duration);
            setFee(res.data.courses.fee);
        }).catch((err) =>{
            alert(err);
        })
    }

    useEffect(() => {
        if(id){
            loadCourse();
        }
    }, [id]);

    function onSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:8070/courses/update/${id}`,data)
          .then((res) => {
            console.log(res.data);
            alert("Course updated successfully");
            getCourses();
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
                                Update Course
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
                                        value={courseCode}
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
                                        value={courseName}
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
                                        value={duration}
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
                                        value={fee}
                                        onChange={(e) =>{
                                            setFee(e.target.value);
                                        }}
                                    />
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

export default EditCourse;