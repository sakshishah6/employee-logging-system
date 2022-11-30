import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const Manager = () => {

    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch("https://employeehoursloggingsystem-production.up.railway.app/api/employee").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])


    const handleAccepted = () => {
        console.log("Accepted")
        // api call and update
    }

    const handleRejected = () => {
        console.log("Rejected")
    }

    const handleModify = () => {
        console.log("Modified")
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
                        <th>Employee Id</th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Time (H)</th>
                        <th>Shift Type</th>
                        <th>Date (yyyy-mm-dd)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>2:00</td>
                        <td>10:00</td>
                        <td>8</td>
                        <td>Work</td>
                        <td>12/10/2022</td>
                        <td><Button variant="outline-success" onClick={handleAccepted}>Accept</Button>{' '}
                            <Button variant="outline-danger" onClick={handleRejected}>Reject</Button>{' '}
                            <Button variant="outline-primary" onClick={handleModify}>Modify</Button></td>
                    </tr>
                </tbody>
            </Table>
            <div id="back">
                <Button id="logout-btn" variant="light" onClick={navigateToLogoutPage} size="sm">Logout</Button>
            </div>
        </div>
    );
};
