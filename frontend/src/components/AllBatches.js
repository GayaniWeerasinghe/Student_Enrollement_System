import React, { useState, useEffect} from "react";
import axios from 'axios';
import AddBatch from "./AddBatch";
import EditBatch from "./EditBatch";
import { useParams } from "react-router-dom";

function AllBatches() {

    const [batches,setBatches] = useState([]);
    const [selectedId,setSelectedId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        getBatches();
    }, []);

    const getBatches = () => {
        axios.get('http://localhost:8070/batches/')
             .then((res) => setBatches(res.data))
             .catch((err) => alert(err));
    };

    function batchDelete(id){
        const confirm_delete = window.confirm(
            "Are you sure you want to remove this batch?"
        );
        if(!confirm_delete){
            return;
        }
        axios.delete(`http://localhost:8070/batches/delete/${id}`)
        .then(() => {
            alert("Batch deleted successfully");
            getBatches();
        })
        .catch((err) => {
            alert(err);
        });
    }

    return (
        <div>
            <div className="mt-2" style={{marginLeft:"270px", padding:"20px"}}>
                <h2>Batches</h2>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Batch ID</th>
                            <th>Batch Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches.map((batch, index) => (
                            <tr key={batch._id}>
                                <td>{index+1}</td>
                                <td>{batch.batchId}</td>
                                <td>{batch.batchName}</td>
                                <td>{batch.startDate}</td>
                                <td>{batch.endDate}</td>
                                <td>
                                    <i style={{color:'#374151', cursor: 'pointer'}} className="fa-solid fa-pen-to-square" onClick={() => {
                                            setSelectedId(batch._id);
                                            setShowUpdateModal(true);
                                    }}></i>&nbsp;&nbsp;&nbsp;
                                    <i style={{color:'#374151', cursor: 'pointer'}} className="fa-solid fa-trash" onClick={() => batchDelete(batch._id)}></i>
                                </td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
                <div className="text-end mt-1">
                <button className="btn theme-btn" onClick={() => setShowModal(true)}><i className="fa-sharp fa-solid fa-plus"></i>&nbsp;Add Batch</button>
                </div>
            </div>
            <AddBatch
                show={showModal}
                onClose={() => setShowModal(false)}
                getBatches={getBatches}
            />
            <EditBatch
                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                getBatches={getBatches}
                id = {selectedId}
            />
        </div>
    )
}

export default AllBatches;