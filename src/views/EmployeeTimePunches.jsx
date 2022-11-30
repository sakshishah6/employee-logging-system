import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export const EmployeeTimePunches = () => {
    // call db and based on that render this
    const [isShiftStarted, setShiftStarted] = useState(false)
    const [isBreakStarted, setBreakStarted] = useState(false)
    const [isShiftEnded, setShiftEnded] = useState(false)
    const [isBreakEnded, setBreakEnded] = useState(false)

    const employeeID = 4;

    useEffect(() => {
        fetch(`http://localhost:3002/api/endTimeNull/${employeeID}`).then(
            response => response.json()
        ).then(
            data => {
                if (JSON.stringify(data) === '[]') {
                    setShiftStarted(false)
                    setBreakStarted(false)
                    setShiftEnded(true)
                    setBreakEnded(true)
                } else {
                    // check if it is work or break
                    setBreakStarted(true)
                    setShiftStarted(true)

                    if (data[0].type === "Work") {
                        setBreakEnded(true)
                    } else {
                        setShiftEnded(true)
                    }
                }
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
                        <Button id="btn1" variant="outline-light" onClick={navigateToStartShift} disabled={isShiftStarted} size="lg" >Start Shift</Button>
                        <Button id="btn2" variant="outline-light" onClick={navigateToEndShift} disabled={isShiftEnded} size="lg" >End Shift</Button>
                    </div>
                    <div class="vr"></div>
                    <div id="c3">
                        <Button id="btn3" variant="outline-light" onClick={navigateToStartBreak} disabled={isBreakStarted} size="lg" >Start Break</Button>
                        <Button id="btn4" variant="outline-light" onClick={navigateToEndBreak} disabled={isBreakEnded} size="lg" >End Break</Button>
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