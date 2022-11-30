import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const Manager = () => {
    
    const [backendData, setBackendData] = useState([{}])
    //const [statusButtonsState, disableStatusButtons] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3002/api/employee`).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, []);

    const handleAccepted = (uniqueID) => {
        console.log("Accepted")

        fetch(`http://localhost:3002/api/employee/status/update/Accepted/${uniqueID}`).then(
            response => response.json()
        )
        .then (
            data => {
                setBackendData(data)
                console.log(data)
            },
            window.location.reload()
        )
    }

    const handleRejected = (uniqueID) => {
        console.log("Rejected")

        fetch(`http://localhost:3002/api/employee/status/update/Rejected/${uniqueID}`).then(
            response => response.json()
        )
        .then (
            data => {
                setBackendData(data)
                console.log(data)
            },
            window.location.reload()
        )
    }

    function modifyForm(uniqueID) {
        document.getElementById("modify-form").style.visibility = "visible";
        //handleModified(uniqueID)
    }

    const handleModified = () => {
        document.getElementById("modify-form").style.visibility = "visible";
        var uniqueid = document.getElementById("uniqueid").value;
        var starttime = document.getElementById("starttime").value.toLocaleString();
        var endtime = document.getElementById("endtime").value.toLocaleString();
        var shifttype = document.getElementById("shifttype").value;
        console.log("Modified")
        fetch(`http://localhost:3002/api/employee/status/update/Modified/${uniqueid}/${starttime}/${endtime}/${shifttype}`).then(
            response => response.json()
        )
        .then (
            data => {
                setBackendData(data)
                console.log(data)
            },
            window.location.reload()
        )
    }

    const [dt, setDt] = useState(new Date().toLocaleString());
    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(secTimer);
    }, []);

    let navigate = useNavigate();
    const navigateToLogoutPage = () => {
        let path = `/logout`;
        navigate(path);
    };

    return (
        <div className="manager">
            <h1>Manager Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> </p>
            <p><strong>Manager ID:</strong> </p>
            <p><strong>Current Date:</strong> {dt}</p>
            <br></br>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Record #</th>
                        <th>Employee Id</th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration (H)</th>
                        <th>Shift Type</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        backendData && backendData.length > 0 && backendData.map((record, index) => {
                            const startTime = new Date(record.startTime);
                            if (record.endTime === null) {
                                var endTime = "";
                            } else {
                                endTime = new Date(record.endTime);
                            }
                            var hours = 0;
                            if (!endTime) {
                                hours = 0;
                            } else {
                                hours = (endTime - startTime) / 1000;
                                hours /= (60 * 60)
                                hours = hours.toFixed(2);
                            }
                            return (
                                <tr key={index}>
                                    <td>{record.uniqueID}</td>
                                    <td className="row-data">{record.userID}</td>
                                    <td>{record.username}</td>
                                    <td>{startTime.toLocaleString({}, { timeZone: "EST" })}</td>
                                    <td>{endTime.toLocaleString({}, { timeZone: "EST" })}</td>
                                    <td>{hours}</td>
                                    <td>{record.type}</td>
                                    <td>{record.status}</td>
                                    <td>
                                        <Button variant="outline-success" onClick={() => handleAccepted(record.uniqueID)}>Accept</Button>{' '}
                                        <Button variant="outline-danger" onClick={() => handleRejected(record.uniqueID)}>Reject</Button>{' '}
                                        <Button variant="outline-primary" onClick={() => { modifyForm(record.uniqueID); }}>Modify</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <div id="modify-form">
                <form>
                    <label id="manager-label"> Record #: </label> 
                    <input type="number" id="uniqueid"></input>
                    <br></br>
                    <label id="manager-label"> Start Time: </label> 
                    <input type="datetime-local" id="starttime"></input>
                    <br></br>
                    <label id="manager-label"> End Time: </label> 
                    <input type="datetime-local" id="endtime"></input>
                    <br></br>
                    <label id="manager-label"> Shift Type: </label> 
                    <select id="shifttype">
                        <option value="Work">Work</option>
                        <option value="Break">Break</option>
                    </select>
                    <br></br>
                    <button id="modify-btn" onSubmit={handleModified}>Submit</button>
              </form>
            </div>
            <div id="back">
                <Button id="logout-btn" variant="light" onClick={navigateToLogoutPage} size="sm">Logout</Button>
            </div>
        </div>
    );
};
