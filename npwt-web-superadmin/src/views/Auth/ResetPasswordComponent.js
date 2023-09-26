import axios from 'axios';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {  Card, CardHeader, CardBody, NavbarBrand, Navbar,  Container} from "reactstrap";
import backgroundVideo from "../../assets/img/brand/video.mp4"
import Alert from 'react-bootstrap/Alert';

function ResetPasswordComponent() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [errorPasswordMessage, setPasswordErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;

  const handleResetPassword = (e) => {
    e.preventDefault();
    if(passwordRegex.test(password)){
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password/${token}`, { password: password })
        .then(() => {
          setSuccessMessage('User password has been reset');
          navigate('/connexion');
        })
        .catch((error) => {
          setErrorMessage(error.response.data.msg);
        });
    } else {
      setPasswordErrorMessage(true);
    }    
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
        <div className="col-12  col-lg-6  offset-lg-3 .col-md-6 .offset-md-3 ">
          <div className="card rounded">
            <Card className="bg-secondary shadow border-0 px-4">
              <CardHeader className="bg-transparent pb-1">
                <h1 className="font-weight-bold mb-3 text-center">Changer le mot de passe</h1>
              </CardHeader>
              <CardBody className="px-lg-2 py-lg-3">
                <p className="text-muted text-center">Changez votre mot de passe pour vous connecter.</p>
                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <div className="form-icon-wrapper">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Entrer le mot de passe"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="form-icon-left mdi mdi-lock" />
                    </div>
                  </div>
                  {errorPasswordMessage && 
                 <Alert className="form-group" variant="danger" style={{marginTop:"-13px"}}>
                    <div className="form-icon-wrapper" style={{marginTop:"-11px",marginBottom:"-13px"}}>
                        Le mot de passe doit avoir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.
                    </div>
                  </Alert>} 
                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                 {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  <div className="form-group">       
                    <button className="btn btn-primary w-100">Changer le mot de passe</button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
</>
  );
}

export default ResetPasswordComponent;