import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../NavBarComponent/sideNavBarProfile.css";
import "react-toastify/dist/ReactToastify.css";
import Alert from "react-bootstrap/Alert";
import { Button, Modal } from "react-bootstrap";
import SidebarApp from "../NavBarComponent/SidebarApp";

function UpdateProfile() {
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
    const token = localStorage.getItem("jwtTokenAdmin");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  const handleUpdatePassword = () => {
    const token = localStorage.getItem("jwtTokenAdmin");
    const decodedToken = jwt_decode(token);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/doctor/updatePasswordDoctor/${decodedToken.id}`,
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
      <div className="container pt-5 pb-5  ">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <SidebarApp user={User}></SidebarApp>
          </div>
          <div className="col-lg-8 col-md-12 mb-5">
            <div className="ml-lg-5">
              <div className="card cardMD px-5 cardRes">
                <div className="card-header ">
                  <i className="fas fa-user-md iconMed" />
                  Modifier le mot de passe du {User.userName}
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label className="small mb-1">Ancien mot de passe</label>
                      <input className="form-control" id="inputpassword" type="password" placeholder="Saisair Votre Ancien Mot de Passe" name="password" required onChange={(e) => setOldPassword(e.target.value)}/>
                    </div>
                    {showoldPassword && (
                      <Alert
                        className="form-group"
                        variant="danger"
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
                    <div className="mb-3">
                      <label className="small mb-1">Noveau Mot de Passe</label>
                      <input className="form-control" id="inputpassword" type="password" placeholder="Saisir Votre Noveau Mot de Passe" name="newPassword" required
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
                      <Alert className="form-group" variant="danger" style={{ marginTop: "-13px" }} >
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
                    <div className="text-center">
                      <button className="btn btn-primary ml-0 mt-3" style={{ width: "180px" }} type="button" onClick={handleShow2}> Enregistrer</button>
                    </div>
                    {showSuccesfullySaved && (
                      <Alert className=" mt-3"
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer </Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir changer votre mot de passe ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>Quitter</Button>
          <Button variant="primary" onClick={handleUpdatePassword}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UpdateProfile;