
import { useState,useEffect } from "react";
import { NavLink as NavLinkRRD, Link,useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, Input, InputGroupAddon, 
  InputGroupText, InputGroup, Media, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col,} from "reactstrap";
  import axios from "axios";

const Sidebar = (props) => {
  const [UserName, setUserName] = useState('');
  const [image, setUserImage] = useState(null);
  useEffect(() => {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtAdmin='));
    const jwt = jwtCookie ? jwtCookie.split('=')[1] : null;
    if (jwt) {
      localStorage.setItem("jwtTokenAdmin", jwt);
      const decodedToken = jwt_decode(jwt);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
        .then(response => {
          if(response.data.role==="admin"){
            setUserName(response.data.userName)
            setUserImage(response.data.image)
          }else{
            localStorage.removeItem('jwtTokenAdmin');
            localStorage.clear();
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i];
              const eqPos = cookie.indexOf('=');
              const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const navigate = useNavigate();
  const handleLogout= async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`);
  
      if (response.status === 200) {
        localStorage.removeItem('jwtTokenAdmin');
        localStorage.clear();
        sessionStorage.removeItem("roleAdmin");       
        sessionStorage.clear();
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
        navigate('/');
      } else {
        console.error('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }; 
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
            {prop.styled ==='none' ? <></>: <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className={prop.icon} style={{ fontSize:"18px" }}/>
            <span style={{ fontSize:"14px"}}>{prop.name}</span>
          </NavLink> }
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        <button className="navbar-toggler" type="button" onClick={toggleCollapse} >
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
              style={{width:"80px", margin:"-5px"}}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                      {image!==null ? 
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${image}`} 
                        className="profile_image" alt="" />
                        :
                        <img  src={require("../../assets/img/theme/team-4-800x800.jpg")}
                        alt="profileImage" id="img" className="profile_image"/>
                      } 
                  </span>
                 <Media className="mx-2 ">
                    <span style={{ color:"blue", fontWeight:"bold" }} className="mb-0 text-sm font-weight-bold">
                      {UserName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome  <span style={{ color:"blue", fontWeight:"bold" }}> {UserName}</span> !</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                 <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                     <img alt={logo.imgAlt} src={logo.imgSrc} 
                     style={{width:"120px", height:"60px",margin:"5px"}}/>
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                    <img alt={logo.imgAlt} src={logo.imgSrc} 
                    style={{width:"120px", height:"60px",margin:"5px"}}/>
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
        
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};
export default Sidebar;
