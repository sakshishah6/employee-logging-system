import ReactDOM from "react-dom/client";
import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './views/Home';
import { Login } from './views/Login';
import { Manager } from './views/Manager';
import { Employee } from './views/Employee';
import { EmployeeHistory } from './views/EmployeeHistory';
import { EmployeeTimePunches } from './views/EmployeeTimePunches';
import { EmployeeStartShift } from './views/EmployeeStartShift';
import { EmployeeEndShift } from './views/EmployeeEndShift';
import { EmployeeStartBreak } from './views/EmployeeStartBreak';
import { EmployeeEndBreak } from './views/EmployeeEndBreak';
import { Logout } from './views/Logout';
import { Register } from "./views/Register";
import Navbar1 from "./components/Navbar";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);

  return (
    <div className="main">
      <div id="landing-page">
        <BrowserRouter>
          <Navbar1 />
          <Routes>
            <Route path="/">
              <Route index element={<Login userId={userId} setUserId={setUserId} />} />
              <Route path="register" element={<Register name={name} />} />
              <Route path="home" element={<Home userId={userId} name={name} />} />
              <Route path="manager" element={<Manager userId={userId} name={name} />} />
              <Route path="employee" element={<Employee userId={userId} name={name} setName={setName} />} />
              <Route path="employee-history" element={<EmployeeHistory userId={userId} name={name} />} />
              <Route path="employee-time-punches" element={<EmployeeTimePunches userId={userId} name={name} />} />
              <Route path="employee-start-shift" element={<EmployeeStartShift userId={userId} name={name} />} />
              <Route path="employee-end-shift" element={<EmployeeEndShift userId={userId} name={name} />} />
              <Route path="employee-start-break" element={<EmployeeStartBreak userId={userId} name={name} />} />
              <Route path="employee-end-break" element={<EmployeeEndBreak userId={userId} name={name} />} />
              <Route path="logout" element={<Logout userId={userId} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
