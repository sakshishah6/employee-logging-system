import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';

export const EmployeeHistory = ({ userId, name, setName }) => {

    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch(`http://localhost:3002/api/employeeSpecific/${userId}`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setBackendData(data)
            }
        )
    })

    const [dt, setDt] = useState(new Date().toLocaleString());
    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(secTimer);
    }, []);
    let navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1);
    };
    
    return (
        <div className="employee">
            <h1>Employee Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Employee ID:</strong> {userId}</p>
            <p><strong>Current Date:</strong> {dt}</p>
            <br></br>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration (H)</th>
                            <th>Shift Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            backendData && backendData.length > 0 && backendData.map((record, index) => {
                                const startTime = new Date(record.startTime);
                                setName(record.name);
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
                                        <td>{record.userID}</td>
                                        <td>{record.username}</td>
                                        <td>{startTime.toLocaleString({}, { timeZone: "EST" })}</td>
                                        <td>{endTime.toLocaleString({}, { timeZone: "EST" })}</td>
                                        <td>{hours}</td>
                                        <td>{record.type}</td>
                                        <td>{record.status}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <div id="back">
                <Button id="back-btn" variant="light" onClick={navigateBack} size="sm">Back to Dashboard</Button>
            </div>
        </div>
    );
};
