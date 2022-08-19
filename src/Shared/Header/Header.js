import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from './singer-logo (1).png';
import './Header.css';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky='top' bg="primary">
        <Container>
          <Navbar.Brand as={Link} to="/">
          <img width={200} src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Products</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
              <Nav.Link as={Link} to="/thirdPartyBom">3rd Party BOM</Nav.Link>
              <Nav.Link as={Link} to="/editThirdPartyBom">Edit 3rd party BOM</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              {
                user?.uid ? <button onClick={() => signOut(auth)}>{user.email}  Sign Out </button>: <Nav.Link as={Link} to="/login">Login</Nav.Link>
              }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
