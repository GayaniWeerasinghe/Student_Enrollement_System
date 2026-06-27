import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent({show, onClose, getStudents}) {

    const [studentId,setStudentId] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");

    function saveStudent(e){
        e.preventDefault();

        const newStudent = {
            studentId,
            name,
            email,
            phone,
            courses:[]
        }

        axios.post('http://localhost:8070/students/add',newStudent).then(() =>{
            alert('Student Registered Successfully');
            getStudents();
            onClose();
        }).catch((err) =>{
            alert(err);
        })
    }

    if (!show) {
        return null;
    }

    return (
        <form onSubmit={saveStudent}>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Register Student
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
                                        onChange={(e) =>{
                                            setPhone(e.target.value);
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

export default AddStudent;