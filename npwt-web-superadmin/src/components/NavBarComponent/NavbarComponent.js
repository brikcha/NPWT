import { Link, NavLink, useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import './navbar.css';
import { FaUser, FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import DefaultProfileImage from "../../defaultProfile.jpg"

function NavbarComponent() {
  const [UserExist, setUserExist] = useState(false);
  const [UserName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [UserIsNurse, setUserIsNurse] = useState(false);
  const token = localStorage.getItem('jwtTokenAdmin');
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const id = decodedToken.id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
            setUserName(response.data.userName)
            setImage(response.data.image)
            if (response.data.roleAdmin === "admin"  ) {
              setUserIsNurse(true);
              setUserExist(true);
            }
        })
    }
  }, []);
  const handleReload = () => {
    navigate('/UpdateProfile/publicProfile');
    navigate(0)
  }
  const logout = () => {
    localStorage.clear();
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
    navigate('/SignIn')
    navigate(0)
  }
  const goToSignUp = () => {
    navigate('/SignUp')
    navigate(0)
  }
  const goToSignIn = () => {
  navigate('/SignIn')
    navigate(0)
  }
  return (
    <>
      <div
        className="container-fluid bg-light p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-map-marker-alt text-primary me-2" />
              <small>Ariana Ghazela </small>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3">
              <small className="far fa-clock text-primary me-2" />
              <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2" />
              <small>+012 345 6789</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-0"
                href=""
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h1 className="m-0 text-primary">
            <i className="far fa-hospital me-3" />
            Npwt
          </h1>
        </NavLink>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">

            <NavLink to="/" className="nav-item nav-link active">
              Home
            </NavLink>
            <NavLink to="/About" className="nav-item nav-link active">
             À propos
            </NavLink>
            <NavLink to="/Services" className="nav-item nav-link active">
              Service
            </NavLink> 
            <NavLink to="/Contact" className="nav-item nav-link">
              Contact
            </NavLink>
          </div>
          {!UserExist && (
            <button className="btn btn-primary " onClick={goToSignUp}>s'inscrire</button>
          )}
          {!UserExist && (<button className="btn btn-primary " onClick={goToSignIn} 
            style={{ marginLeft: "10px",marginRight:"10px"}}>Se connecter </button>
          )}
          {UserExist && (
            <DropdownButton
            eventkey={3}
            title={
                <>
                  {image!==undefined ? <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${image}`} 
                    style={{ borderRadius:"50%", width:"30px", height:"30px", marginRight:"5px"}} alt="" />:
                  <img src={DefaultProfileImage} style={{ borderRadius:"50%", width:"30px", height:"30px", marginRight:"5px"}}/>}  
                  <span style={{ marginRight:"5px" }}>{UserName}</span>
                  <FaAngleDown/>
                </>
            }
            style={{ marginRight:"10px"  }}
          >
            {UserIsNurse&&(<Dropdown.Item eventkey="1">
              <Link onClick={handleReload}>
                <FaUser />Profile Infirmière
              </Link>
            </Dropdown.Item>)}
            {!UserIsNurse&&(<Dropdown.Item eventkey="2">
              <Link onClick={handleReload}>
                <FaUser /> Profile Médecin
              </Link>
            </Dropdown.Item>)}
            <Dropdown.Item eventkey="5">
              <Link  onClick={logout}>
                <FaSignOutAlt /> Se déconnecter
              </Link>
            </Dropdown.Item>
          </DropdownButton>
          )}
        </div>      
      </nav>
    </>
  );
}

export default NavbarComponent;