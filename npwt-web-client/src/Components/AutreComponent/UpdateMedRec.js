import "../NavBarComponent/sideNavBar.css";
import '../../Css/formUpdateMed.css';
import { Alert } from "react-bootstrap";
import SideNavBarComponent from '../NavBarComponent/SideNavBarComponent';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { async } from "q";
import { Button, Modal } from "react-bootstrap";
function UpdateMedicalRecordComponent(props) {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  // const [idUser, setIdUser] = useState('');
  const [User, setUser] = useState({});
  const [MedicalRecord, setMedicalRecord] = useState({});
  const [ConfirmeMessage, setConfirmeMessage] = useState(false);
  /////////les enumerations
  const Country = [
    "Afrique du Sud",
    "Algérie",
    "Angola",
    "Bénin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroun",
    "République centrafricaine",
    "Tchad",
    "Comores",
    "République du Congo",
    "République démocratique du Congo",
    "Côte d'Ivoire",
    "Djibouti",
    "Égypte",
    "Guinée équatoriale",
    "Érythrée",
    "Eswatini",
    "Éthiopie",
    "Gabon",
    "Gambie",
    "Ghana",
    "Guinée",
    "Guinée-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libye",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritanie",
    "Maurice",
    "Maroc",
    "Mozambique",
    "Namibie",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tomé-et-Principe",
    "Sénégal",
    "Seychelles",
    "Sierra Leone",
    "Somalie",
    "Soudan",
    "Soudan du Sud",
    "Tanzanie",
    "Togo",
    "Tunisie",
    "Ouganda",
    "Zambie",
    "Zimbabwe",
  ];
  const civil = ["MARRIED", "SINGLE", "DIVORCED"];

  const {
    email,
    country,
    profession,
    civilState,
    numberOfChildren,
    dateOfBirth,
    placeOfBirth,
  } = MedicalRecord;

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const decodedToken = jwt_decode(token);

      console.log(decodedToken.id);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
          console.log(User);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (User) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`
        )
        .then((response) => {
          setMedicalRecord(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [User]);

  /////mettre le birthdate sous formr yyyy-mm-jj pour l'afficher
  const date = new Date(dateOfBirth); // récupération de la date actuelle
  const year = date.getFullYear(); // récupération de l'année
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
  const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
  const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée

  const onValueChange = (e) => {
    setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });
  };

  const handleUpdateMedical = (e) => {
    e.preventDefault();
    console.log(MedicalRecord);
    /*axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/update/${User.MedicalRecord}`,
        MedicalRecord
      )
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setConfirmeMessage(true);
        }
        console.log("medical record updated suuccessfully");
      });*/
  };

  return (
    <>
      <div className="container pt-5 ">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarComponent user={User}></SideNavBarComponent>
          </div>

          {/* Account details card*/}
          <div className="col-lg-8  mb-5">
            <div className="card cardMD  cardRes">
              <div className="card-header ">
                <i className="fas fa-user-md iconMed" />
                Summary of The medical Record{" "}
              </div>

              <div className="card-body">
                {ConfirmeMessage && (
                  <Alert
                    className="form-group"
                    variant="success"
                    style={{ marginTop: "-13px", height: "50px" }}
                  >
                    <div className="form-icon-wrapper  ">
                      Your Medical Record is updated succesfully !
                    </div>
                  </Alert>
                )}
                <form>
                  {/* Form Group (username)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      value={User.userName}
                      disabled
                    />
                  </div>
                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (first name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={User.firstName}
                        disabled
                      />
                    </div>
                    {/* Form Group (last name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={User.lastName}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-4">
                      <label className="small mb-1" htmlFor="inputDateofbirth">
                        Date of birth
                      </label>
                      <input
                        className="form-control"
                        id="inputDateofbirth"
                        type="date"
                        name="dateOfBirth"
                        placeholder="Enter your Date of birth "
                        value={formattedDate}
                        onChange={(e) => onValueChange(e)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="small mb-1">Country</label>

                      <select
                        className="form-control bg-light p-1 m-1"
                        value={country}
                        name="country"
                        onChange={(e) => onValueChange(e)}
                      >
                        <option value="" selected>
                          Select country
                        </option>
                        {Country.map((C) => (
                          <option key={C} value={C}>
                            {C}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-4">
                      <label className="small mb-1">Civil state</label>

                      <select
                        className="form-control bg-light p-1 m-1"
                        value={civilState}
                        name="civilState"
                        onChange={(e) => onValueChange(e)}
                      >
                        <option selected>Select Civil state</option>
                        {civil.map((C) => (
                          <option key={C} value={C}>
                            {C}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="small mb-1" htmlFor="numberofChil">
                        Number of children
                      </label>
                      <input
                        className="form-control"
                        id="numberofChil"
                        type="number"
                        placeholder="Enter your nbr of children.."
                        min="0"
                        max="9"
                        name="numberOfChildren"
                        value={numberOfChildren}
                        onChange={(e) => onValueChange(e)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="small mb-1" htmlFor="Profession">
                        Profession
                      </label>
                      <input
                        className="form-control"
                        id="Profession"
                        type="text"
                        placeholder="Enter your Profession"
                        name="profession"
                        value={profession}
                        onChange={(e) => onValueChange(e)}
                      />
                    </div>
                  </div>

                  {/* Form Group (email address)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      defaultValue="name@example.com"
                      name="email"
                      value={email}
                      onChange={(e) => onValueChange(e)}
                      disabled
                    />
                  </div>
                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (phone number)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        value={User.phoneNumber}
                        disabled
                      />
                    </div>
                    {/* Form Group (birthday)*/}
                  </div>
                  {/* Save changes button*/}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleShow2}
                  >
                    Save changes
                  </button>
                </form>

                <div className="row d-flex justify-content-end ">
                  <div className=" col-lg-4 col-md-4 col-4 ">
                    <img
                      className="img-fluid Image"
                      src="../assetsTemplates/images/files.png"
                      alt=""
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to confirm changes ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateMedical}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateMedicalRecordComponent;
