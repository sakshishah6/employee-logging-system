import React, { useState } from "react";
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';

export const Login = () => {
    const [useridReg, setUserIdReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [userTypeReg, setUserTypeReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register = () => {
        Axios.post('http://localhost:3002/api/register', {
            username: useridReg,
            password: passwordReg,
            usertype: userTypeReg
        }).then((response) => {
            console.log(response);
        });
    };


    const login = () => {
        Axios.post('http://localhost:3002/api/login', {
            username: username,
            password: password,
        }).then((res) => {
            console.log("hi")
            console.log(res);
        });
    };


    let navigate = useNavigate();

    const navigateToManager = () => {
        let path = `/manager`;
        navigate(path);
    };


    return (
        <div id="auth-form-container">
            <p id="title">Welcome to TimeSheet </p>
            <div id="login-reg">
                <form id="login-form">
                    <label>User ID</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setUserIdReg(e.target.value);
                        }}
                    />
                    <label>Password</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }} />
                    <label >Employee Type</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setUserTypeReg(e.target.value);
                        }}
                    />
                    <button id="register-btn" onClick={register}>Register</button>
                </form>
            
            <form id="login-form">
                <label>User ID</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" />
                <label >Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="text" />
                <button id="login-btn" onClick={navigateToManager}>Login</button>
            </form>
            </div>
        </div>

    )
}