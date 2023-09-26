
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media,
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";

const AdminNavbar = (props) => {
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
          if(response.data.role==="admin" || response.data.role==="superAdmin"){
            localStorage.setItem("connected", 'false');
            if(localStorage.getItem("connected")==='false'){
              toast.success(`Welcome ${response.data.userName}`, {
                position: toast.POSITION.BOTTOM_RIGHT
              }); 
              localStorage.setItem("connected", 'true');        
            }

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
  return (
    <>
      <ToastContainer />
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                      {image!==null ? 
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${image}`} 
                        className="profile_image" alt="profile" />
                        :
                        <img  src={require("../../assets/img/theme/team-4-800x800.jpg")}
                        alt="profile" id="img" className="profile_image"/>
                      } 
                  </span>
                 <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {UserName} {/* Utilisation de la condition */}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome  <span style={{ color:"blue", fontWeight:"bold" }}> {UserName}</span> !</h6>
                </DropdownItem>
                <DropdownItem to="/UpdateProfile/publicProfile" tag={Link}>
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
        </Container>
      </Navbar>
    </>
  );
};
export default AdminNavbar;
