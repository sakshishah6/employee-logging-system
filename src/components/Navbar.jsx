import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { React, useState } from 'react';

export const Navbar1 = () => {

  const [homePage, setHomePage] = useState(false)
  const [employeePage, setEmployeePage] = useState(false)
  const [managerPage, setManagerPage] = useState(false)
  const [logoutPage, setLogoutPage] = useState(false)

  function disableNav() {
    setHomePage(true);
    setEmployeePage(true);
    setManagerPage(true);
    setLogoutPage(true);
  }

  function enableNavManager() {
    setHomePage(false);
    setEmployeePage(false);
    setManagerPage(false);
    setLogoutPage(false);
  }

  function enableNavEmployee() {
    setHomePage(false);
    setEmployeePage(false);
    setManagerPage(true);
    setLogoutPage(false);
  }
  
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">TimeSheet</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Login</Nav.Link>
          <Nav.Link href="/home" disabled={homePage}>Home</Nav.Link>
          <Nav.Link href="/employee" disabled={employeePage} >Employee</Nav.Link>
          <Nav.Link href="/manager" disabled={managerPage} >Manager</Nav.Link>
          <Nav.Link href="/logout" disabled={logoutPage} >Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navbar1