import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

export const Employee = () => {
    let navigate = useNavigate(); 
    const navigateToHistory = () =>{ 
        let path = `/employee-history`; 
        navigate(path);
    };
    const navigateToTimePunches = () =>{ 
        let path = `/employee-time-punches`; 
        navigate(path);
    };
    const [dt, setDt] = useState(new Date().toLocaleString());
    useEffect(() => {
        let secTimer = setInterval( () => {
          setDt(new Date().toLocaleString())
        },1000)
        return () => clearInterval(secTimer);
    }, []);
    return (
        <div className="employee">
            <h1>Employee Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> </p>
            <p><strong>Employee ID:</strong> </p>
            <p><strong>Current Date:</strong> {dt}</p>
            <br></br><br></br>
            <div id="emp">
                <p>What would you like to do?</p>
                <Button id="emp-btn" variant="outline-light" onClick={navigateToHistory} size="lg">View History</Button>{' '}{' '}
                <Button id="emp-btn" variant="outline-light" onClick={navigateToTimePunches} size="lg" >Time Punches</Button>
            </div>
        </div>
    );
};