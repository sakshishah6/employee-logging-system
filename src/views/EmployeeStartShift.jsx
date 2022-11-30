import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export const EmployeeStartShift = () => {



    let navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1);
    };
    const navigateToLogoutPage = () => {
        let path = `/logout`;
        navigate(path);
    };
    const date = useState(new Date().toLocaleDateString());
    const time = useState(new Date().toLocaleTimeString());
    const [dt, setDt] = useState(new Date().toLocaleString());
    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(secTimer);
    }, []);

    const employeeID = 4;
    const employeeName = "MarkW";

    
    // need to make name and userID dynamic

    useEffect(() => {
        console.log("Here")
        fetch(`http://localhost:3002/api/startShiftBreak/${employeeID}/${employeeName}/Work`)
    }, [])

    return (
        <div className="employee">
            <h1>Employee Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> </p>
            <p><strong>Employee ID:</strong> </p>
            <p><strong>Current Time:</strong> {dt}</p>
            <br></br><br></br>
            <div id="info">
                <p id="detail-start">Started shift at:</p>
                <p id="datetime-start">
                    <strong>Date: </strong> {date}
                    <br></br>
                    <strong>Time: </strong> {time}
                </p>
            </div>
            <div id="back">
                <Button id="back-btn" variant="light" onClick={navigateBack} size="sm">Back</Button>
                <Button id="logout-btn" variant="light" onClick={navigateToLogoutPage} size="sm">Logout</Button>
            </div>
        </div>
    );
};
