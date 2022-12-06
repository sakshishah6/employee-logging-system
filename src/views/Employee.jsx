import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

export const Employee = ({ userId, name, setName }) => {

    let navigate = useNavigate();
    const navigateToHistory = () => {
        let path = `/employee-history`;
        navigate(path);
    };
    const navigateToTimePunches = () => {
        let path = `/employee-time-punches`;
        navigate(path);
    };
    const [dt, setDt] = useState(new Date().toLocaleString());
    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(secTimer);
    }, []);

    const [backendData, setBackendData] = useState([{}]);
    useEffect(() => {
        fetch(`http://localhost:3002/api/username/${userId}`)
        .then(response => response.json())
        .then(
            data => {
                setBackendData(data)
                let n = backendData.map(
                    function(element){
                        let arr = `${element.name}`;
                        return arr;
                    }
                )
                setName(n[0]);
            },
            
        )
    }, []);

    

    return (
        <div className="employee">
            <h1>Employee Dashboard</h1>
            <br></br>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Employee ID:</strong> {userId}</p>
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