import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';

export const EmployeeHistory = () => {

    // get the userId
    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch("http://localhost:3002/api/employeeSpecific/4").then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setBackendData(data)
            }
        )
    }, [])

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
    const navigateToLogoutPage = () => {
        let path = `/logout`;
        navigate(path);
    };
    return (
        <div className="employee">
            <h1>Employee Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> </p>
            <p><strong>Employee ID:</strong> </p>
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
                            <th>Time (H)</th>
                            <th>Shift Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //'2022-11-29T11:26:59.000Z'
                            backendData && backendData.length > 0 && backendData.map((record, index) => {
                                const startTime = new Date(record.startTime);
                                if (record.endTime === null) {
                                    var endTime = "";
                                } else {
                                    var endTime = new Date(record.endTime);
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
                <Button id="back-btn" variant="light" onClick={navigateBack} size="sm">Back</Button>
                <Button id="logout-btn" variant="light" onClick={navigateToLogoutPage} size="sm">Logout</Button>
            </div>
        </div>
    );
};
