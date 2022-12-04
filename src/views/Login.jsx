import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar1 } from '../components/Navbar';

export const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    var [inputStatus, setInputStatus] = useState();
    const [backendData, setBackendData] = useState([{}])
    const SignIn = (e) => {
        e.preventDefault();
        if (containsOnlyNumbers(username)) {
            fetch(`http://localhost:3002/api/login/${username}/${password}`).then(
                response => response.json()
            ).then(
                data => {
                    setBackendData(data)
                    if (JSON.stringify(data) === '[]') {
                        setInputStatus("Incorrect User ID or Password");
                    } else {
                        setInputStatus("")
                        navigateToHome();

                    }
                }
            )
        } else {
            setInputStatus("Incorrect User ID or Password");
        }
    };

    function containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
    }

    let navigate = useNavigate();

    const navigateToHome = () => {
        let path = `/home`;
        // Need to store these globally so they can be displayed on the pages and use these to enable and disable navbar buttons(manager page)
        // var name = backendData[0].name;
        // var userName = backendData[0].userName;
        // var userType = backendData[0].userType;
        navigate(path);
    };

    const navigateToRegister = () => {
        let path = `/register`;
        navigate(path);
    };

    return (
        <div id="auth-form-container">
            <p id="title">Welcome to TimeSheet </p>
            <div id="login-reg">
                <form id="login-form">
                    <label>User ID</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" />
                    <label >Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    <div>
                        <button id="login-btn" onClick={SignIn}>Login</button>
                        <button id="register-btn" onClick={navigateToRegister}>Register</button>
                    </div>

                    <center><label>{inputStatus}</label></center>

                </form>
            </div>
        </div>

    )
}