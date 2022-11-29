import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const Home = () => {
    let navigate = useNavigate();
    const navigateToManager = () => { 
        let path = `/manager`; 
        navigate(path);
    };
    const navigateToEmployee = () => { 
        let path = `/employee`; 
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
        <div className="home">
            <h1>Welcome to TimeSheet</h1>
            <hr></hr>
            <p id="top">A clock-in clock-out system for employees and managers alike. <br></br>Keep track of all your shifts and breaks with the click of a button.</p>
            <div id="home-container">
                <div id="home-manager">
                    <h4>Managers</h4>
                    <p>
                        <li>View past employee history</li>
                        <li>Accept, Reject, or Modify breaks & shifts</li>
                    </p>
                    <div id="b">
                        <Button id="man-dash-btn" variant="outline-light" onClick={navigateToManager} size="md">Go to Manager Dashboard</Button>
                    </div>
                </div>
                <div id="home-employee">
                    <h4>Employees</h4>
                    <p>
                        <li>View past clocking-in/clocking-out history</li>
                        <li>Clock in/out for work shifts and breaks</li>
                    </p>
                    <div id="b">
                        <Button id="emp-dash-btn" variant="outline-light" onClick={navigateToEmployee} size="md">Go to Employee Dashboard</Button>
                    </div>
                </div>
            </div>
            <div id="back">
                <Button id="back-btn" variant="light" onClick={navigateBack} size="sm">Back</Button>
                <Button id="logout-btn" variant="light" onClick={navigateToLogoutPage} size="sm">Logout</Button>
            </div>
        </div>
    )
}