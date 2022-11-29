import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export const EmployeeTimePunches = () => {
    const [dt, setDt] = useState(new Date().toLocaleString());
    useEffect(() => {
        let secTimer = setInterval( () => {
          setDt(new Date().toLocaleString())
        },1000)
        return () => clearInterval(secTimer);
    }, []);
    let navigate = useNavigate();
    const navigateToStartShift = () => { 
        let path = `/employee-start-shift`; 
        navigate(path);
    };
    const navigateToEndShift = () => { 
        let path = `/employee-end-shift`; 
        navigate(path);
    };
    const navigateToStartBreak = () => { 
        let path = `/employee-start-break`; 
        navigate(path);
    };
    const navigateToEndBreak = () => { 
        let path = `/employee-end-break`; 
        navigate(path);
    };
    const navigateBack = () => { 
        navigate(-1);
    };
    const navigateToLogoutPage = () => { 
        let path = `/logout`; 
        navigate(path);
    };
    return (
        <div className="employee">
            <h1>Employee Time Punches</h1>
            <br></br>
            <p><strong>Name:</strong> </p>
            <p><strong>Employee ID:</strong> </p>
            <p><strong>Current Date:</strong> {dt}</p>
            <br></br><br></br>
            <div id="emp">
                <p>What would you like to do?</p>
                <div id="c-main">
                    <div id="c1">
                        <Button id="emp-btn" variant="outline-light" onClick={navigateToStartShift} size="lg" >Start Shift</Button>
                        <Button id="emp-btn" variant="outline-light" onClick={navigateToEndShift} size="lg" >End Shift</Button>
                    </div>
                    <div class="vr"></div>
                    <div id="c3">
                        <Button id="emp-btn" variant="outline-light" onClick={navigateToStartBreak} size="lg" >Start Break</Button>
                        <Button id="emp-btn" variant="outline-light" onClick={navigateToEndBreak} size="lg" >End Break</Button>
                    </div>
                </div>
            </div>
            <div id="back">
                <Button id="back-btn" variant="light" onClick={navigateBack} size="sm">Back</Button>
                <Button id="logout-btn" variant="light" onClick={navigateToLogoutPage} size="sm">Logout</Button>
            </div>
        </div>
    )
};