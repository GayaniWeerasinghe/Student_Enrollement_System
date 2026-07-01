import React, {useState, useEffect} from "react";
import axios from "axios";

function EditBatch({show, onClose, getBatches, id}) {

    const [batchId,setBatchId] = useState("");
    const [batchName,setBatchName] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const data = {
        batchId: batchId,
        batchName: batchName,
        startDate: startDate,
        endDate: endDate
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().split("T")[0];
    };

    function loadBatch() {
       axios.get(`http://localhost:8070/batches/get/${id}`).then((res) =>{
            setBatchId(res.data.batches.batchId);
            setBatchName(res.data.batches.batchName);
            setStartDate(formatDate(res.data.batches.startDate));
            setEndDate(formatDate(res.data.batches.endDate));
        }).catch((err) =>{
            alert(err);
        })
    }

    useEffect(() => {
        if(id){
            loadBatch();
        }
    }, [id]);

    function onSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:8070/batches/update/${id}`,data)
          .then((res) => {
            console.log(res.data);
            alert("Batch updated successfully");
            getBatches();
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
                                Update Batch
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
                                        value={batchId}
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
                                        value={batchName}
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
                                        value={startDate}
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
                                        value={endDate}
                                        onChange={(e) =>{
                                            setEndDate(e.target.value);
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

export default EditBatch;