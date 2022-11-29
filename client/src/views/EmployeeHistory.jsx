import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';

export const EmployeeHistory = () => {
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
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>2:00</td>
                            <td>10:00</td>
                            <td>8.5</td>
                            <td>Work</td>
                            <td>21/11/2022</td>
                            <td>Accepted</td>
                        </tr>
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
