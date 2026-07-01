import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBatch({show, onClose, getBatches}) {

    const [batchId,setBatchId] = useState("");
    const [batchName,setBatchName] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    function saveBatch(e){
        e.preventDefault();

        const newBatch = {
            batchId,
            batchName,
            startDate,
            endDate
        }

        axios.post('http://localhost:8070/batches/add',newBatch).then(() =>{
            alert('Batch Added Successfully');
            getBatches();
            onClose();
        }).catch((err) =>{
            alert(err);
        })
    }

    if (!show) {
        return null;
    }

    return (
        <form onSubmit={saveBatch}>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Add Batch
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
                                        Batch ID
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="batchId"
                                        onChange={(e) =>{
                                            setBatchId(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Batch Name
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="batchName"
                                        onChange={(e) =>{
                                            setBatchName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Start Date
                                    </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="startDate"
                                        onChange={(e) =>{
                                            setStartDate(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        End Date
                                    </label>
                                    <input 
                                        className="form-control"
                                        type="date"
                                        id="endDate"
                                        onChange={(e) =>{
                                            setEndDate(e.target.value);
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

export default AddBatch;