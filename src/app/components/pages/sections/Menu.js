import React from "react";
import {Container, Nav, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";


const Menu = () => {
  return (
    <div className="menu bg-black">
      <Container>
        <Nav>
          <Nav.Item>
            <Nav.Link>
              <Button variant="success">
                <Link to="/list" style={{textDecoration: 'none', color: 'white'}}>List</Link>
              </Button>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Button variant="success">
                <Link to="/about" style={{textDecoration: 'none', color: 'white'}}>About Us</Link>
              </Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </div>
  )
};

export default Menu;
