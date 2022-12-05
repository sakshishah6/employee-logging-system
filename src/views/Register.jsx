import { useNavigate } from "react-router-dom";
import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';

export const Register = () => {
    const [useridReg, setUserIdReg] = useState('');
    const [nameReg, setNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [passwordReReg, setPasswordReReg] = useState('');
    const [userTypeReg, setUserTypeReg] = useState('');
    var [regInputStatus, setRegInputStatus] = useState();
    const [setBackendData] = useState([{}])

    function containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
    }

    let navigate = useNavigate();
    const navigateToLoginPage = () => {
        let path = `/`;
        navigate(path);
    };

    const register = (e) => {
        e.preventDefault();
        if (useridReg.length === 0 || nameReg.length === 0 || passwordReg.length === 0 || passwordReReg.length === 0 || userTypeReg.length === 0) {
            setRegInputStatus("Not All Entries Entered");
        } else {
            if (containsOnlyNumbers(useridReg) && useridReg.length === 5) {
                if (userTypeReg === 'Employee' || userTypeReg === 'Manager') {
                    if (passwordReg === passwordReReg) {
                        if (passwordReg.length >= 7) {
                            setRegInputStatus("Registered! Please return to login screen.");
                            fetch(`http://localhost:3002/api/register/${useridReg}/${passwordReg}/${nameReg}/${userTypeReg}`).then(
                                response => response.json()
                            ).then(
                                data => {
                                    setBackendData(data);
                                }
                            )
                        } else {
                            setRegInputStatus("Passwords must be 7 or more characters.");
                        }
                    } else {
                        setRegInputStatus("Passwords Do Not Match.");
                    }
                } else {
                    setRegInputStatus("Incorrect Employee Type. Please enter 'Manager' or 'Employee'.");
                }
            } else {
                setRegInputStatus("Incorrect User ID format. User ID must be 5 numeric characters.");
            }
        }
    };

    return (
        <div id="auth-form-container">
            <p id="title">Register for TimeSheet</p>
            <div id="login-reg">
                <form id="login-form">
                    <label>User ID</label>
                    <input
                        type="text"
                        maxlength="5"
                        minlength="5"
                        onChange={(e) => {
                            setUserIdReg(e.target.value);
                        }}
                    />
                    <label>Name</label>
                    <input
                        type="text"
                        maxlength="20"
                        onChange={(e) => {
                            setNameReg(e.target.value);
                        }}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        maxlength="7"
                        minlength="7"
                        onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }} />
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        maxlength="7"
                        minlength="7"
                        onChange={(e) => {
                            setPasswordReReg(e.target.value);
                        }} />
                    <label >Employee Type</label>
                    <select name="type" id="select">
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                        onChange={(e) => {
                            setUserTypeReg(e.target.value);
                        }}
                    </select>
                    <button id="register-btn2" onClick={register}>Register</button>
                    <center><label>{regInputStatus}</label></center>

                </form>
            </div>
            <div id="back-to-login">
                <Button id="back-to-login-btn" variant="light" onClick={navigateToLoginPage} size="sm">Return To Login Page</Button>
            </div>
        </div>
    )
}

export default Register