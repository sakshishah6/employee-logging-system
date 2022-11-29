import React, { useState } from "react";

export const Login = () => {
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');

    /*     const handleSubmit = (e) => {
            e.preventDefault();
            console.log(userid);
        } */

    return (
        <div id="auth-form-container">
            <p id="title">Login to TimeSheet</p>
            <form id="login-form">
                <label htmlFor="userid">User ID</label>
                <input value={userid} onChange={(e) => setUserId(e.target.value)} type="text" id="userid" name="userid" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" />
                <button id="login-btn">Login</button>
            </form>
        </div>
    )
}