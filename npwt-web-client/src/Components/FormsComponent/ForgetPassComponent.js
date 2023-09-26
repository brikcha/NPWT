import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
function ForgotPasswordComponent() {
    const [email, setEmail] = useState('');
    const [errorUserMessage, setUserErrorMessage] = useState(false);
    const navigate = useNavigate();
    const handleForgetPassword = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/forget-password`,{email:email}).then( () => {
          navigate('/PasswordVerification');
  }).catch((error)=>{ 
     if (error.response.data['msg']){
      setUserErrorMessage(true)
     }
  })
    }
  return (
  
    <div className="">
      <img
        className="img-fluid"
        src="../assetsTemplates/templateForm/images/image.jpg"
        style={{ width: "100%", height: "100%" }} alt=""
      />
      <div className="position-absolute top-50 start-50 translate-middle container">
        <div className="card col-lg-4 offset-lg-8 mt-5">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="">
                <div className="text-center my-5">
                  <h3 className="font-weight-bold mb-3">
                  Mot de passe oublié
                  </h3>
                  <p className="text-muted">
                  Demandez maintenant pour obtenir un nouveau mot de passe.
                  </p>
                </div>

                <form onSubmit={handleForgetPassword}>
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
                    <div className="form-icon-wrapper  text-danger" style={{marginTop:"-11px",marginBottom:"-13px"}}>this email does not exists</div>
                  </Alert>} 

                  <button className="btn btn-primary">Envoyer</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;