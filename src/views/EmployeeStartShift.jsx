import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export const EmployeeStartShift = ({ userId, name }) => {

    let navigate = useNavigate();
    const navigateBack = () => {
        let path = `/employee`;
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

    var checkCall = true;

    useEffect(() => {
        if (checkCall) {
            fetch(`http://localhost:3002/api/startShiftBreak/${userId}/${name}/Work`)
            checkCall = false;
        }
    }, [])

    return (
        <div className="employee">
            <h1>Employee Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Employee ID:</strong> {userId}</p>
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
                <Button id="back-btn" variant="light" onClick={navigateBack} size="sm">Back to Dashboard</Button>
            </div>
        </div>
    );
};
