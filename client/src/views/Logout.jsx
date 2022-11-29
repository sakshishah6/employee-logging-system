import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const Logout = () => {
    let navigate = useNavigate(); 
    const navigateToLoginPage = () =>{ 
        let path = `/`; 
        navigate(path);
    };
    return (
        <div className="logout">
            <h3>You have been logged out.</h3>
            <br></br><br></br>
            <Button id="return-btn" variant="outline-light" onClick={navigateToLoginPage} size="lg">Return to Login Page</Button>{' '}
        </div>
    );
};