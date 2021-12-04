import React from "react";
import {Container, Nav} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Menu = () => {
  return (
      <Container fluid className="bg-light navbar-light">
        <Row>
          <Col className="col-1"> </Col>
          <Col className="col-10">
            <nav className="navbar navbar-expand-lg ">
              <a className="navbar-brand" href="#">VIRSTAS</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/" style={{textDecoration: 'none', color: 'black'}}>List</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about" style={{textDecoration: 'none', color: 'black'}}>About Us</Link>
                  </li>
                </ul>
              </div>
              {/*<div className="menu bg-secondary">*/}
              {/*  <Container>*/}
              {/*    <Nav>*/}
              {/*      <Nav.Item>*/}
              {/*        <Nav.Link>*/}
              {/*          <button className="btn btn-info" style={{width: 100}}>*/}
              {/*
          {/*          </button>*/}
              {/*        </Nav.Link>*/}
              {/*      </Nav.Item>*/}
              {/*      <Nav.Item>*/}
              {/*        <Nav.Link>*/}
              {/*          <button className="btn btn-info" style={{width: 100}}>*/}
              {/*            */}
              {/*          </button>*/}
              {/*        </Nav.Link>*/}
              {/*      </Nav.Item>*/}
              {/*    </Nav>*/}
              {/*  </Container>*/}
              {/*</div>*/}
            </nav>
          </Col>
          <Col className="col-1"> </Col>
        </Row>
      </Container>
  )
};

export default Menu;
