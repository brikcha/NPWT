import { Link } from "react-router-dom";
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col,} from "reactstrap";
import React, { useState, useEffect } from "react";

const AuthNavbar = () => {
  const token = localStorage.getItem('jwtTokenAdmin');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (token) {
      setConnected(true);
    }
  }, [token]);
  return (
    <> 
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img style={{ width:"140px", height:"60px" }}
              alt="..."
              src={require("../../assets/img/brand/npwtLogo.jpg")}
            />
          </NavbarBrand>
          
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img style={{ width:"140px", height:"60px" }}
                      alt="..."               
                      src={require("../../assets/img/brand/npwtLogo.jpg")}
                    />
                  </Link>     
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
             
             {!connected? <NavItem>
                <NavLink className="nav-link-icon" to="/connexion" tag={Link}
                 style={{ color: "black" }}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Se connecter</span>
                </NavLink>
              </NavItem>:
              <>
              <NavItem>
                <NavLink className="nav-link-icon" to="/admin/index" tag={Link} style={{ color: "black" }} >
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/UpdateProfile/publicProfile" tag={Link} style={{ color: "black" }}>
                  <i className="ni ni-single-02" />
                  <span className="nav-link-inner--text">Profile</span>
                </NavLink>
              </NavItem>
              </>
               }
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    
    </>
  );
};
export default AuthNavbar;
