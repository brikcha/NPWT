import React, { useState} from 'react';
import { useNavigate,Link, NavLink} from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, 
  Row, Col, NavbarBrand, Navbar,  Container} from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./login.css";
import backgroundVideo from "../../assets/img/brand/video.mp4"
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email ne peut pas être vide.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Format d\'email invalide.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Mot de passe ne peut pas être vide.');
    } else if (password.length < 8 || !/[0-9]/.test(password) || !/[a-zA-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      setPasswordError('Le mot de passe doit avoir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.');
    } else {
      setPasswordError('');
    }
  };
  const handleLogin = async () => {
    validateEmail();
    validatePassword();
  
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email: email,
          password: password,
        });
  
        sessionStorage.setItem("roleAdmin", response.data.role);
        Cookies.set("jwtAdmin", response.data.token);
        const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwtAdmin="));
  
        if (jwtCookie) {
          const jwtTokenAdmin = jwtCookie.split("=")[1];
          const decodedToken = jwt_decode(jwtTokenAdmin);
          const id = decodedToken.id;
  
          if (response.data.role === "admin") {
            navigate("/admin/index");
            localStorage.setItem("jwtTokenAdmin", jwtTokenAdmin);
          } else {
            setEmailError("Cet email n'est pas enregistré en tant qu'administrateur ou super administrateur");
          }
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          Swal.fire({
            title: 'Connexion',
            text: error.response.data.errors.email || error.response.data.errors.password || 'Une erreur est survenue lors de la connexion.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else {
          // Handle other errors or display a generic error message.
          console.error("An error occurred:", error);
          Swal.fire({
            title: 'Connexion',
            text: 'Une erreur est survenue lors de la connexion.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      }
    }
  };
  const goToSignUp = () => {
    navigate('/SignUp')
    navigate(0)
  }
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" style={{ position:"absolute" }} expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img style={{ width:"140px", height:"60px" }}
              alt="..."
              src={require("../../assets/img/brand/npwtLogo.jpg")}
            />
          </NavbarBrand>
        </Container>
      </Navbar>
        <video autoPlay loop muted style={{ position: "fixed", objectFit: "cover", zIndex: "-1",}}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
        <div className='vh-100 d-flex justify-content-center align-items-center'>
          <div className="container">
              <div className="card col-12  col-lg-6  offset-lg-3 .col-md-6 .offset-md-3 ">
                    <Card className="bg-secondary shadow border-0 px-4">
                      <CardHeader className="bg-transparent pb-1">
                      <div className="text-center text-muted mb-1">
                        <h1>Se connecter</h1>
                      </div>
                      </CardHeader>
                      <CardBody className="px-lg-2 py-lg-2">
                          <FormGroup className="mb-3 mt-4">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Email" type="email" autoComplete="new-email" value={email} 
                                onChange={(e) => setEmail(e.target.value)} required/>
                            </InputGroup>
                          </FormGroup>
                          {emailError && 
                            <Alert className="form-group" variant="danger" style={{marginTop:"-10px"}}>
                              <div className="form-icon-wrapper" style={{marginTop:"-11px",marginBottom:"-13px"}}>
                                {emailError}
                              </div>
                            </Alert>} 
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Mot de passe" type="password" autoComplete="new-password" value={password} 
                                onChange={(e) => setPassword(e.target.value)} required/>
                            </InputGroup>
                          </FormGroup>
                          {passwordError && 
                            <Alert className="form-group" variant="danger" style={{marginTop:"-18px"}}>
                              <div className="form-icon-wrapper" style={{marginTop:"-11px",marginBottom:"-13px"}}>
                                {passwordError}
                              </div>
                            </Alert>} 
                          <div className="text-center">
                            <Button className="my-1 w-100" color="primary" type="button" onClick={handleLogin}>
                              Se connecter
                            </Button>
                          </div>
                      </CardBody>
                    </Card>
                    <Row className="my-2">
                      <Col xs="6">
                        <NavLink to='/oublier_mot_de_passe'>
                          <small>Oublier mot de passe</small>
                        </NavLink>
                      </Col>
                      <Col className="text-right" xs="6">
                      <a href="/SignUp" onClick={goToSignUp}  >
                          <small>Créer un nouveau compte</small>
                        </a>
                      </Col>
                    </Row>
              </div>
          </div>
        </div>
    </>
  );
};
export default Login;
