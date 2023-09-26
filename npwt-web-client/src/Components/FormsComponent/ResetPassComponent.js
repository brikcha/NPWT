import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

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
          navigate('/SignIn');
        })
        .catch((error) => {
          setErrorMessage(error.response.data.msg);
        });
    } else {
      setPasswordErrorMessage(true);
    }    
  }
  return (
    <div className="">
      <img
        className="img-fluid"
        src="../assetsTemplates/templateForm/images/image.jpg"
        style={{ width: "100%", height: "100%" }}
        alt=""
      />
      <div className="position-absolute top-50 start-50 translate-middle container">
        <div className="card col-lg-4 offset-lg-8 px-5 mt-5">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="">
                <div className="text-center my-5">
                  <h3 className="font-weight-bold mb-3">Change Password</h3>
                  <p className="text-muted">Change your password to log in.</p>
                </div>

                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="form-icon-wrapper">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="form-icon-left mdi mdi-lock" />
                    </div>
                  </div>
                  {errorPasswordMessage && 
                 <Alert className="form-group" variant="danger" style={{marginTop:"-13px"}}>
                    <div className="form-icon-wrapper  text-danger" style={{marginTop:"-11px",marginBottom:"-13px"}}>Le mot de passe doit avoir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.</div>
                  </Alert>} 

                  <div className="form-group">       
                    <button className="btn btn-primary">Change Password</button>
                  </div>
                </form>
                {errorPasswordMessage && <Alert variant="danger">Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;