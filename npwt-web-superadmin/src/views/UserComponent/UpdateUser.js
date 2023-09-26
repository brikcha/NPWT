import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from "reactstrap";
import Select from "react-select";
import { FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap';
import React, { useState, useEffect } from "react";
import * as api from '../../api/index';
import "../styles.css";

const UpdateUser = () => {
  const { id } = useParams();
  const [emailError, setEmailError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [delegations, setDelegations] = useState([]);
  const [selectedDelegation, setSelectedDelegation] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [locations, setLocations] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [user, setUser] = useState({
    codePostale: "", userName: "", firstName: "", lastName: "", gender: "",
    email: "", phoneNumber: "", password: "", dateOfBirth: "", role: "", secteur: "",
    confirmPassword: "", codePostale: "",
  });

  const [updateStatus, setUpdateStatus] = useState("");
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
  const handleUpdate = async () => {
    try {
      const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailPattern.test(user.email)) {
        return;
      }
      const phoneNumberPattern = /^\d{8}$/;
      if (!phoneNumberPattern.test(user.phoneNumber)) {
        return;
      }
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateUser/${id}`, user);
      setUpdateStatus("Mise à jour réussie !");
    } catch (error) {
      setUpdateStatus("Erreur lors de la mise à jour.");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setEmailError("")
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      email: value,
    }));
    setEmailError("");
  };
  const validateEmail = () => {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(user.email)) {
      setEmailError("Format Email Invalide");
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/locations`)
      .then((response) => {
        const data = response.data;
        console.log("Fetched data:", data);
        setLocations(data);
        const uniqueGovernorates = [...new Set(data.map((locationItem) => locationItem.Gov))];
        setGovernorates(uniqueGovernorates);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (selectedGovernorate) {
      const filteredDelegations = [...new Set(locations
        .filter((locationItem) => locationItem.Gov === selectedGovernorate)
        .map((locationItem) => locationItem.Deleg))];
      setDelegations(filteredDelegations);
      setSelectedDelegation("");
      setCities([]);
      setSelectedCity("");
      setZipCode("");
    }
  }, [selectedGovernorate]);

  useEffect(() => {
    if (selectedDelegation) {
      const filteredCities = [...new Set(locations
        .filter((locationItem) => locationItem.Deleg === selectedDelegation)
        .map((locationItem) => locationItem.Cite))];
      setCities(filteredCities);
      setSelectedCity("");
      setZipCode("");
    }
  }, [selectedDelegation]);
  useEffect(() => {
    if (selectedCity) {
      const filteredZipCode = locations.find((locationItem) => locationItem.Cite === selectedCity)?.zip;
      setZipCode(filteredZipCode || "");
    }
  }, [selectedCity]);
  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      phoneNumber: value,
    }));
    setPhoneNumberError("");
  };
  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{8}$/;
    if (!phoneNumberPattern.test(user.phoneNumber)) {
      setPhoneNumberError("Numéro de Téléphone Doit Comporter 8 Chiffres");
    }
  };
  useEffect(() => {
    const newCodePostale = `${selectedGovernorate}-${selectedDelegation}-${selectedCity}-${zipCode}`;

    setUser(prevUser => ({
      ...prevUser,
      codePostale: newCodePostale,
    }));
  }, [selectedGovernorate, selectedDelegation, selectedCity, zipCode]);
  return (
    <div className="d-flex justify-content-center">
      <img className=" imgForm img-fluid d-none d-lg-block position-absolute" alt="..."
        src={require("../../assets/img/brand/img.jpg")} style={{ width: "100%", height: "100%" }} />
      <div className="container">
        <div className="col-lg-12">
          <div className="d-flex justify-content-center">
            <div className="card-body col-lg-12 offset-lg-5">
              <Card>
                <form>
                  <h1 className="text-center mb-2">Modifier</h1>
                  <div className="d-flex" style={{ marginBottom: "-10px" }}>
                    <FormGroup className="flex-fill mr-1">
                      <Label style={{ marginBottom: "0px" }}>Prénom</Label>
                      <Input type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup className="flex-fill ml-1">
                      <Label style={{ marginBottom: "0px" }}>Nom</Label>
                      <Input type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
                    </FormGroup>
                  </div>
                  <div className="d-flex" style={{ marginBottom: "-10px" }}>
                    <FormGroup className="flex-fill mr-1">
                      <Label style={{ marginBottom: "0px" }}>Email</Label>
                      <Input type="email" name="email" value={user.email} onChange={handleEmailChange} onBlur={validateEmail} required invalid={emailError !== ""} />
                      {emailError && <FormFeedback>{emailError}</FormFeedback>}
                    </FormGroup>
                    <FormGroup className="flex-fill ml-1">
                      <Label style={{ marginBottom: "0px" }}>Téléphone</Label>
                      <Input type="number" name="phoneNumber" value={user.phoneNumber} onChange={handlePhoneNumberChange} onBlur={validatePhoneNumber} required invalid={phoneNumberError !== ""} />
                      {phoneNumberError && <FormFeedback>{phoneNumberError}</FormFeedback>}
                    </FormGroup>
                  </div>
                  <div className="d-flex">
                    <FormGroup className="flex-fill mr-1">
                      <Label style={{ marginBottom: "0px" }} htmlFor="role"> Role </Label>
                      <Input type="select" id="role" required name="role" value={user.role} onChange={handleChange}>
                        <option disabled>{user.role}</option>
                        <option value="admin">Admin</option>
                        <option value="superAdmin">Super Admin</option>
                        <option value="nurse">Infirmier</option>
                        <option value="doctor">Médecin</option>
                      </Input>
                    </FormGroup>
                    <FormGroup className="flex-fill ml-1">
                      <Label style={{ marginBottom: "0px" }} htmlFor="role"> Secteur </Label>
                      <Input type="select" name="secteur"
                        className={`form-select`}
                        id="secteur"
                        onChange={handleChange}
                        required
                      >
                        <option disabled>{user.secteur}</option>
                        <option value="publique">Publique</option>
                        <option value="privée">Privée</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <FormGroup>
                    <div className="mb-3" style={{ marginBottom: "10px" }}>
                      <Label style={{ marginBottom: "0px" }} >Addresse: "{user.codePostale}"</Label>
                      <div className="d-flex">
                        <Select className="flex-fill mr-1" value={selectedGovernorate ? { label: selectedGovernorate, value: selectedGovernorate } : null}
                          onChange={selectedOption => setSelectedGovernorate(selectedOption ? selectedOption.value : '')}
                          options={governorates.map(gov => ({ label: gov, value: gov }))}
                          placeholder="Gouvernorat"
                        />
                        <Select className="flex-fill mr-1" value={selectedDelegation ? { label: selectedDelegation, value: selectedDelegation } : null}
                          onChange={selectedOption => setSelectedDelegation(selectedOption ? selectedOption.value : '')}
                          options={delegations.map(deleg => ({ label: deleg, value: deleg }))}
                          isDisabled={!delegations.length}
                          placeholder="Delegation"
                        />
                      </div>

                      <Select className="mr-1 mt-2" value={selectedCity ? { label: selectedCity, value: selectedCity } : null}
                        onChange={selectedOption => setSelectedCity(selectedOption ? selectedOption.value : '')}
                        options={cities.map(city => ({ label: city, value: city }))}
                        isDisabled={!cities.length}
                        placeholder="Cité"
                      />
                      <input type="text" style={{ width: "99%" }} className="form-control styled-input mt-2"
                        value={zipCode} onChange={event => setZipCode(event.target.value)}
                        disabled={!selectedCity} placeholder='Code postal' />
                    </div>
                  </FormGroup>
                  <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
                    <ModalHeader toggle={() => setModalOpen(false)}> User Added </ModalHeader>
                    <ModalBody>User has been added successfully.</ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => setModalOpen(false)}> OK </Button>
                    </ModalFooter>
                  </Modal>
                  <div className="row">
                    <div className="col text-left">
                      <Link to={`/updatePassword/${id}`}>
                        <Button color="primary">Modifier mot de passe</Button>
                      </Link>
                    </div>
                    <div className="col text-right">
                      <Link to="/admin/utilisateur/table">
                        <Button type="button" className="btn btn-outline-primary mr-2">
                          Retour
                        </Button>
                      </Link>
                      <Button onClick={handleUpdate} color="primary">
                        Mettre à jour
                      </Button>
                    </div>
                  </div>

                  {updateStatus && <p>{updateStatus}</p>}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateUser;

