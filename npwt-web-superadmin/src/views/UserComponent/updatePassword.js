import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Alert from "react-bootstrap/Alert";
import { Button, Modal } from "react-bootstrap";
import * as api from '../../api/index';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const { id } = useParams();
  const [User, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showoldPassword, setShowOldPassword] = useState(false);
  const [shownewPassword, setShowNewPassword] = useState(false);
  const [showconfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showSuccesfullySaved, setshowSuccesfullySaved] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await api.getDetails(id);
        setUser(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUser();
  }, [id]);

  const handleUpdatePassword = () => {
   
    
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/doctor/updatePasswordDoctor/${id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }
      )
      .then((response) => {
        setshowSuccesfullySaved(true);
        setShowConfirmNewPassword(false);
        setShowOldPassword(false);
        setShowNewPassword(false);

        setTimeout(() => {
          setshowSuccesfullySaved(false);
          setShowConfirmNewPassword(false);
          setShowOldPassword(false);
          setShowNewPassword(false);
        }, 3000); // 3 seconds
      })
      .catch((err) => {
        if (err.response.data["error"] === "Wrong password !") {
          setshowSuccesfullySaved(false);
          setShowConfirmNewPassword(false);
          setShowOldPassword(true);
          setShowNewPassword(false);
        } else if (err.response.data["error"] === "wrong confirm password") {
          setshowSuccesfullySaved(false);
          setShowConfirmNewPassword(true);
          setShowOldPassword(false);
          setShowNewPassword(false);
        }
      });
  };
  const handleSubmit = (e) => {
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(
        newPassword
      )
    ) {
      setPasswordErrorMessage(true);
      return;
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center">
      <img
        className=" imgForm img-fluid d-none d-lg-block position-absolute"
        alt="..."
        src={require("../../assets/img/brand/img.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="container">
        <div className="col-lg-12">
          <div className="d-flex justify-content-center">
            <div className="card-body col-lg-12 offset-lg-5">
              <form>
                <div className="card-body">
                  <h1 className="text-center mb-1" style={{ fontSize: "20px" }}>
                    <i className="fas fa-user-md iconMed" />
                    Modifier le Mot De Passe {User.userName}
                  </h1>
  
                  {/* Form Group (Ancien mot de passe) */}
                  <div className="mb-3">
                    <label className="small mb-1">Ancien mot de passe</label>
                    <input
                      className="form-control"
                      id="inputpassword"
                      type="password"
                      placeholder="Saisair Votre Ancien Mot de Passe"
                      name="password"
                      required
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  {showoldPassword && (
                    <Alert
                      className="form-group"
                      variant="white"
                      style={{ marginTop: "-13px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                        Mot de Passe Incorrect
                      </div>
                    </Alert>
                  )}
  
                  {/* Form Group (Nouveau Mot de Passe) */}
                  <div className="mb-3">
                    <label className="small mb-1">Nouveau Mot de Passe</label>
                    <input
                      className="form-control"
                      id="inputpassword"
                      type="password"
                      placeholder="Saisir Votre Noveau Mot de Passe"
                      name="newPassword"
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                      onBlur={() =>
                        setPasswordErrorMessage(
                          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(
                            newPassword
                          )
                        )
                      }
                    />
                  </div>
                  {passwordErrorMessage && (
                    <Alert
                      className="form-group"
                      variant="white"
                      style={{ marginTop: "-13px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                        Le mot de passe doit contenir au moins une lettre majuscule,
                        une lettre minuscule, un chiffre et être au moins 8
                        Longs caractères.
                      </div>
                    </Alert>
                  )}
  
                  {/* Form Group (Confirmer Nouveau Mot de Passe) */}
                  <div className="mb-3">
                    <label className="small mb-1">Confirmer Noveau Mot de Passe</label>
                    <input
                      className="form-control"
                      id="inputpassword"
                      type="password"
                      placeholder="Confirmer Votre Mot de Passe"
                      name="Confirmpassword"
                      required
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  {showconfirmNewPassword && (
                    <Alert
                      className="form-group"
                      variant="danger"
                      style={{ marginTop: "-13px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                        vérifiez votre mot de passe de confirmation !
                      </div>
                    </Alert>
                  )}
  
  <div className="col text-right">
  <Link to="/admin/utilisateur/table">
    <Button type="button" className="btn btn-outline-primary mr-2 mt-4">
      Retour
    </Button>
  </Link>

  <div className="d-inline-block"> {/* This div ensures inline display */}
    <button
      className="btn btn-primary ml-0 mt-4"
      style={{ width: "200px" }}
      type="button"
      onClick={handleShow2}
    >
      Enregistrer
    </button>
  </div>
</div>

                  {showSuccesfullySaved && (
                    <Alert
                      className=" mt-3"
                      variant="success"
                      style={{ marginTop: "-13px" }}
                    >
                      <div
                        className="form-icon-wrapper  text"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                        Mot de passe modifié avec succès ! !
                      </div>
                    </Alert>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir changer votre mot de passe ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Quitter
          </Button>
          <Button variant="primary" onClick={handleUpdatePassword}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </>
  
  );
}

export default UpdateProfile;