import { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import backgroundVideo from "../../assets/img/brand/video.mp4"
import { useNavigate,Link} from 'react-router-dom';
import {  NavbarBrand, Navbar,  Container, Card, CardHeader, CardBody} from "reactstrap";
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorUserMessage, setUserErrorMessage] = useState(false);
    const navigate = useNavigate();
    const handleForgetPassword = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/forget-password`,{email:email}).then( () => {
          navigate('/voir-email');
  }).catch((error)=>{ 
     if (error.response.data['msg']){
      setUserErrorMessage(true)
     }
  })
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
                  <CardHeader className="bg-transparent pb-1 text-center">
                    <h1 className="font-weight-bold mb-3">Mot de passe oublié </h1>
                  </CardHeader>
                  <CardBody className="px-lg-2 py-lg-3">
                    <form onSubmit={handleForgetPassword}>
                      <p className="text-muted text-center"> Demandez maintenant pour obtenir un nouveau mot de passe. </p>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="form-icon-wrapper">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Entrer email"
                            autoFocus
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <i className="form-icon-left mdi mdi-email" />
                        </div>
                      </div>
                      {errorUserMessage && 
                      <Alert className="form-group" variant="danger" style={{marginTop:"-13px"}}>
                        <div className="form-icon-wrapper" style={{marginTop:"-11px",marginBottom:"-13px"}}> Cet email n'existe pas </div>
                      </Alert>} 
                      <button className="btn btn-primary w-100">Envoyer</button>
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

export default ForgotPassword;