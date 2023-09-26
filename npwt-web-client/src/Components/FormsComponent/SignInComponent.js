import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function SignInComponent() {
  const [email, setEmail] = useState("");
  const [loginAttempts, setLoginAttempts] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [secret, setSecret] = useState("");
  const [errorEmailMessage, setEmailErrorMessage] = useState(false);
  const [errorConfirmeMessage, setConfirmeErrorMessage] = useState(false);
  const [errorValideMessage, setValideErrorMessage] = useState(false);
  const [errorPasswordMessage, setPasswordErrorMessage] = useState(false);
  const [errorSecretMessage, setSecretErrorMessage] = useState(false);
  const [errorPasswordMessage1, setPasswordErrorMessage1] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  if (showAlert && show) {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  useEffect(() => {
    const jwtCookie = document.cookie ? document.cookie.split('; ').find(row => row.startsWith('jwt=')) : null;
    const jwt = jwtCookie ? jwtCookie.split('=')[1] : null; 
    if (jwt) {
      localStorage.setItem("jwtToken", jwt);
    }
  },[]);

  const handleSignIn = (e) => {
    e.preventDefault(); 
    if (loginAttempts >= 3) {
      alert('Vous avez atteint le nombre maximum de tentatives de connexion.');
      return;
    }    
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {      
        email: email,
        password: password,
        secret: secret,
      })
      .then((response) => {
        sessionStorage.setItem("role", response.data.role);       
        Cookies.set("jwt", response.data.token);
        const jwtCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwt="));
        if (jwtCookie) {
          const jwtToken = jwtCookie.split("=")[1];
          const decodedToken = jwt_decode(jwtToken);
          const id = decodedToken.id;
          if (response.data.role === "admin") {
            window.location.replace(`${process.env.REACT_APP_SUPER_URL}/admin/index`);
          }
          else{  
            axios
              .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
              .then((response) => {
                console.log('here')
                if (response.data.secret) {
                  setShow(true)
                  if (secret === response.data.secret) {      
                      localStorage.clear();                    
                    localStorage.setItem("jwtToken", jwtToken);
                    setTimeout(function() {
                      console.log('La fonction anonyme a été exécutée !');
                    }, 500);
                    navigate('/front');
                    navigate(0)
                  } else {
                    setEmailErrorMessage(false);
                    setPasswordErrorMessage(false);
                  }
                } else {
                  setShow(false);
                  localStorage.setItem("jwtToken", jwtToken);
                  setTimeout(function() {
                    console.log('La fonction anonyme a été exécutée !');
                  }, 500);
                  navigate('/front');
                  navigate(0)
                }
              });
          }
      }})
      .catch((error) => {
        if (error.response.data["message"]) {
          setSecretErrorMessage(true);
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
        }
        if (error.response.data.errors.validated) {
          setValideErrorMessage(true);
          setConfirmeErrorMessage(false)
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
        }
        if (error.response.data.errors.email) {
          setEmailErrorMessage(true);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)          
        }
        if (error.response.data.errors.confirmed) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(true)          
        }
        if (error.response.data.errors.verified) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(true)          
        }
        if (error.response.data.errors.password) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(true);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
        }
      });
  };
  return (
    <div>
      <img className=" imgForm img-fluid d-none d-lg-block position-absolute "
          src="../assetsTemplates/templateForm/images/img.jpg" 
          style={{ width: "100%", height: "100%" }}
        />
        <ToastContainer />
          <div className=" container pt-lg-4 pb-lg-4 ">
            <div className="card col-12  col-lg-5  offset-lg-7 " >
              <div className="styleCard px-5 py-3">
                <div className="row align-items-center">
                  <div>
                    <div className="text-center py-5">
                      <h3 className="font-weight-bold mb-2">Se connecter</h3>
                      <p className="text-muted">Connectez-vous à platforme pour continuer</p>
                    </div>
                    <div className="text-center d-none d-lg-inline">
                      <p>  Vous n'avez pas de compte ?
                        <NavLink to="/SignUp">Créer un compte gratuit</NavLink>.
                      </p>
                    </div>
                    <div className="social-links justify-content-center">
                      <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`} className="bg-google">
                        <i className="mdi mdi-google" /> Connectez-vous avec Google
                      </a>
                    </div>
                    <div className="text-divider">ou connectez-vous avec e-mail</div>
                    <form onSubmit={handleSignIn}>
                      <div className="form-group">
                        <label htmlFor="email">Email*</label>
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

                      {errorEmailMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            l'email n'est pas utilisé
                          </div>
                        </Alert>
                      )}
                      {errorConfirmeMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                          Votre compte n'est pas confirmé
                          </div>
                        </Alert>
                      )}
                      {errorValideMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            Votre compte n'est pas encore validé
                          </div>
                        </Alert>
                      )}
                      <div className="form-group">
                        <label htmlFor="password">Mot de passe*</label>
                          <div className="form-icon-wrapper">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                placeholder="Entrer mot de passe"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className={`form-icon-left mdi mdi-${showPassword ? 'eye' : 'eye-off'}`}
                                onClick={toggleShowPassword}
                              />
                          </div>
                      </div>
                      {errorPasswordMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                          Mot de passe incorrect
                          </div>
                        </Alert>
                      )}

                      {show && (
                        <div className="form-group">
                          <label htmlFor="password">Secrète</label>
                          <div className="form-icon-wrapper">
                            <input
                              type="Secret"
                              className="form-control"
                              id="password"
                              placeholder="Enter secret code"
                              required
                              value={secret}
                              onChange={(e) => setSecret(e.target.value)}
                            />
                            <i className="form-icon-left mdi mdi-lock" />
                          </div>
                        </div>                   
                      )}

                    {show && showAlert && (
                        <Alert
                        className="form-group"
                        variant="success"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-success"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Vérifiez votre boîte de réception pour le code secret que nous venons de vous envoyer
                        </div>
                      </Alert>                
                      )}

                      {errorSecretMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            secret incorrect
                          </div>
                        </Alert>
                      )}

                      <div className="form-group">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="mt-3 mt-md-0">
                            <NavLink to="/ForgetPassword">
                            J'ai oublié mon mot de passe!
                            </NavLink>
                          </div>
                          <button className="connexion-btn" type="submit" onClick={() => setLoginAttempts(loginAttempts + 1)}> Se connecter</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
         </div>
    </div>
  );
}
export default SignInComponent;