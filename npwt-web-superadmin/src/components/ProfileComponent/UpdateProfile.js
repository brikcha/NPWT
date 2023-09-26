import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios"; 
import "react-toastify/dist/ReactToastify.css";
import Alert from "react-bootstrap/Alert";
import { Button, Modal } from "react-bootstrap";
import FlagSelect from "react-flags-select";
//import { getCountryCallingCode } from "react-phone-number-input";
import SideNavBarUpdateProfile from "../NavBarComponent/sideNavbarUpdateProfile";
import "../NavBarComponent/sideNavBarProfile.css";
import { Link } from 'react-router-dom';

function UpdateProfile() {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [User, setUser] = useState({});
  const [opt, setopt] = useState({});
  const [incorrectCode, setincorrectCode] = useState(false); 
  const [greatCode, setgrearCode] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [MedicalRecord, setMedicalRecord] = useState({});
  const [showSendMessage, setshowSendMessage] = useState(true);
  const [UsernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [LastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [PhoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [disableResendButton, setResendButton] = useState(true);
  const [phoneCode, setPhoneCode] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useState(30);
  //onBlur={() =>setPhoneNumberErrorMessage(!/^\d{8}$/.test(User.phoneNumber)) } required
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
      /*axios
        .get( 
          `${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`
        )
        .then((response) => {
          setMedicalRecord(response.data);
        })
        .catch((error) => {
          console.error(error);
        });*/
    }
  }, []);

  /////mettre le birthdate sous formr yyyy-mm-jj pour l'afficher
  const date = new Date(User.dateOfBirth); // récupération de la date actuelle
  const year = date.getFullYear(); // récupération de l'année
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
  const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
  const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée

  const onValueChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (
      !/^[a-zA-Z\s]+$/.test(User.firstName) ||
      !/^[a-zA-Z\s]+$/.test(User.lastName)
    ) {
      setLastNameErrorMessage(true);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(User.userName)) {
      setUsernameErrorMessage(true);
      return;
    }
    // if (!/^\d{8}$/.test(User.phoneNumber)) {
    //   setPhoneNumberErrorMessage(true);
    //   return;
    // }

    const token = localStorage.getItem("jwtTokenAdmin");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/patient/updatePatient/${decodedToken.id}`,
          User
        )
        .then((response) => {
          console.log(response.data);
          console.log("user updated suuccessfully");
        });
      /*axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/update/${User.MedicalRecord}`,
          MedicalRecord
        )
        .then((response) => {
          console.log(response.data);
          console.log("medical record updated suuccessfully");
          toast.success("Profile updated successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });*/
    }
  };
  const handleVerifMobile = () => {
    const token = localStorage.getItem("jwtTokenAdmin");
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/patient/verifSms/${id}`, { codeEnter: opt })
      .then((response) => {
        setgrearCode(true);
        setincorrectCode(false);
      })

      .catch((error) => {
        if (error.response.data["error"]) {
          setincorrectCode(true);
          setgrearCode(false);
          setTimeout(() => {
            setincorrectCode(false);
            setgrearCode(false);
          }, 3000); // 3 seconds
        }
      });
  };
  const handleSentCode = () => {
    if (showSendMessage == false) {
      setshowSendMessage(true);
    }
    setTimeout(() => {
      setshowSendMessage(false);
    }, 3000); // 3 seconds
    setShowTime(true);
    setResendButton(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = prevTime - 1;
        if (updatedTime === 0) {
          clearInterval(newIntervalId);
          setTime(30);
          setShowTime(false);
          setResendButton(false);
        }
        return updatedTime;
      });
    }, 1000);
    setIntervalId(newIntervalId);
    const token = localStorage.getItem("jwtTokenAdmin");
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;
    const phone = phoneCode + User.phoneNumber; 
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/sendSms/${id}`, { phone: phone });
  };
 /* const handleSelectedCountry = (countryCode) => {
    const callingCode = getCountryCallingCode(countryCode);
    setPhoneCode(callingCode);
    setSelectedCountry(countryCode + "(" + "+" + callingCode + ")");
  };*/
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
      <div className="container p-5  ">
        <div className=" row  ">
          <div className="col-lg-4 col-md-12">
            <SideNavBarUpdateProfile user={User}></SideNavBarUpdateProfile>
          </div>

          <div className="col-lg-8 col-md-12 mb-5">
            <div className="ml-lg-5">
              {/* Account details card*/}
              <div className="card cardMD px-5 cardRes">
                <div className="card-header ">
                  <i className="fas fa-user-md iconMed" />
                 Modifier profile {User.userName}
                </div>
                <div className="card-body">
                  <form>
                    {/* Form Group (username)*/}
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputUsername">
                      Nom d'utilisateur (comment votre nom apparaîtra aux autres utilisateurs sur
                        le site Web)
                      </label>
                      <input
                        className="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder="Saisir Votre Nom D'utilisateur"
                        name="userName"
                        value={User.userName}
                        onChange={(e) => onValueChange(e)}
                        onBlur={() =>
                          setUsernameErrorMessage(
                            !/^[a-zA-Z0-9]{3,}$/.test(User.userName)
                          )
                        }
                        required
                      />
                    </div>
                    {UsernameErrorMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Le nom d'utilisateur doit contenir au moins 3 caractères et doit
                          ne pas contenir de caractères spéciaux
                        </div>
                      </Alert>
                    )}
                    {/* Form Row*/}
                    <div className="row gx-3 mb-3">
                      {/* Form Group (first name)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          Prénom
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder="Saisir Votre Prénom"
                          name="firstName"
                          value={User.firstName}
                          onChange={(e) => onValueChange(e)}
                          onBlur={() =>
                            setLastNameErrorMessage(
                              !/^[a-zA-Z\s]+$/.test(User.firstName) ||
                                !/^[a-zA-Z\s]+$/.test(User.lastName)
                            )
                          }
                          required
                        />
                      </div>
                      {/* Form Group (last name)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Nom
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          placeholder="Saisir Votre Nom"
                          name="lastName"
                          value={User.lastName}
                          onChange={(e) => onValueChange(e)}
                          onBlur={() =>
                            setLastNameErrorMessage(
                              !/^[a-zA-Z\s]+$/.test(User.firstName) ||
                                !/^[a-zA-Z\s]+$/.test(User.lastName)
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                    {LastNameErrorMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Le prénom et le nom ne doivent contenir que
                          caractères alphabétiques.
                        </div>
                      </Alert>
                    )}
                    <div className="row gx-3 mb-3">
                      <div className="col-md-4">
                        <label
                          className="small mb-1"
                          htmlFor="inputDateofbirth"
                        >
                          Date de Naissance
                        </label>
                        <input
                          style={{ width: "140px" }}
                          className="form-control"
                          id="inputDateofbirth"
                          type="date"
                          name="dateOfBirth"
                          placeholder="Saisir Votre Date de Naissance "
                          value={formattedDate}
                          onChange={(e) => onValueChange(e)}
                        />
                      </div>
                    </div>

                    {/* Form Group (email address)*/}
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email 
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Saisir Votre Email"
                        defaultValue="name@example.com"
                        name="email"
                        value={User.email}
                        onChange={(e) => onValueChange(e)}
                      />
                    </div>
                    {/* Form Group (email address)*/}
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputAddress">
                         Addresse
                      </label>
                      <input
                        className="form-control"
                        id="inputAddress"
                        type="address"
                        placeholder="Saisir Votre Adresse"
                        defaultValue=""
                        name="address"
                        value={User.codePostale}
                        onChange={(e) => onValueChange(e)}
                      />
                    </div>

                    {/* Form Row*/}
                    

                    {/* Save changes button*/}
                    <div className="text-right">
                      <button className="btn btn-primary ml-0 mt-3" style={{ width: "180px" }} type="button" 
                      //   onClick={handleUpdateProfile} 
                      onClick={handleShow2}>
                        Enregistrer
                      </button>

                    </div>
                  
                  </form>

                  <>
                    {/*{show && (
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Verify Phone</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {showSendMessage && (
                            <Alert className="form-group" variant="success">
                              <div
                                className="form-icon-wrapper  "
                                style={{
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                }}
                              >
                                code is sent to your phone number !
                              </div>
                            </Alert>
                          )}

                          <img
                            className="img-fluid  "
                            style={{ width: "140px", marginLeft: "150px" }}
                            src="../assetsTemplates/images/mobile.jpg"
                            alt="First slide"
                          />

                          <input
                            className="form-control mt-3 "
                            id="inputPhone"
                            type="text"
                            placeholder="Enter the opt here"
                            name="opt"
                            onChange={(e) => setopt(e.target.value)}
                          />
                          <br></br>
                          {greatCode && (
                            <Alert
                              className="form-group"
                              variant="success"
                              style={{ marginTop: "-13px" }}
                            >
                              <div
                                className="form-icon-wrapper  text-success"
                                style={{
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                }}
                              >
                                Phone Number Updated !
                              </div>
                            </Alert>
                          )}
                          <br></br>
                          {incorrectCode && (
                            <Alert
                              className="form-group"
                              variant="danger"
                              style={{ marginTop: "-13px" }}
                            >
                              <div
                                className="form-icon-wrapper  text-danger "
                                style={{
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                }}
                              >
                                Incorrect code !
                              </div>
                            </Alert>
                          )}

                          {showTime && <>Resend after {time} </>}
                          <Button
                            variant="primary"
                            disabled={disableResendButton}
                            onClick={() => {
                              handleSentCode();
                            }}
                          >
                            Resend
                          </Button>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={handleVerifMobile}>
                            verif
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}*/}
                    <Modal show={show2} onHide={handleClose2}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmer Les Modifications</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      Êtes-vous sûr de confirmer les modifications ?
 
                      </Modal.Body>
                      <Modal.Footer>

                        <Link to="/admin/index">
  <Button variant="secondary" onClick={handleClose2}>
    Quitter
  </Button>
</Link>

                        <Button variant="primary" onClick={handleUpdateProfile}>
                          Enregistrer
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateProfile;
