import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Form, FormGroup, Label, FormFeedback } from "reactstrap";
import * as api from '../../MedicalRecordComponent/api/index.js';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const PatientUpdate = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({ firstName: "", lastName: "", gender: "", email: "", governorate: "", phoneNumber: "", firstExaminationDate: "", dateOfBirth: "", medicalConditions: "",});
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");  
  const tunisianGovernorates = ["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Zaghouan","Tunis",];
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await api.getMedicalRecordPatientDetails(id);
        setPatient(userData.data);
        console.log(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUser();
  }, [id]);
  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/medical-patient/updateMedicalRecordPatient/${id}`, patient);
      Swal.fire({
        title: 'Patient',
        text: 'Mise à jour réussie !',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      Swal.fire({
        title: 'Patient: Erreur lors de la mise à jour.!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      email: value,
    }));
    setEmailError(""); 
  };
  const validateEmail = () => {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(patient.email)) {
      setEmailError("Format Email Invalide");
    }
  };
  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      phoneNumber: value,
    }));
    setPhoneNumberError(""); 
  };
  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{8}$/;
    if (!phoneNumberPattern.test(patient.phoneNumber)) {
      setPhoneNumberError("Numéro de Téléphone Doit Comporter 8 Chiffres");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card mt-4">
            <div className="card-body">
              <Form>
                <h1 className="text-center mb-2">Modifier Patient</h1>
                <div className="d-flex justify-content-between">
                    <FormGroup className="flex-fill mr-1">
                    <Label>Prénom</Label>
                    <Input
                        type="text"
                        name="firstName"
                        value={patient.firstName}
                        onChange={handleChange}
                        required
                    />
                    </FormGroup>
    
                    <FormGroup className="flex-fill ml-1">
                    <Label>Nom</Label>
                    <Input
                        type="text"
                        name="lastName"
                        value={patient.lastName}
                        onChange={handleChange}
                        required
                    />
                    </FormGroup>
                </div>
                <div className="d-flex justify-content-between">
                  <FormGroup className="mr-1" style={{ width:"50%" }}>
                    <Label>Genre</Label>
                    <Input type="select" name="gender" value={patient.gender} onChange={handleChange} required >
                      <option value="">Choisir un genre</option>
                      <option value="Masculin">Masculin</option>
                      <option value="Feminin">Féminin</option>
                    </Input>
                  </FormGroup>
                  <FormGroup  className="ml-1" style={{ width:"50%" }}>
                    <Label>Gouvernorat</Label>
                    <Input type="select" name="governorate" value={patient.governorate} onChange={handleChange} required >
                    {tunisianGovernorates.map((governorate) => (
                      <option key={governorate} value={governorate}>
                        {governorate}
                      </option>
                    ))}
                    </Input>
                  </FormGroup>
                </div>
                <div className="d-flex justify-content-between">
                  <FormGroup className="flex-fill mr-1">
                    <Label>Email</Label>
                    <Input type="email" name="email" value={patient.email} onChange={handleEmailChange} 
                      onBlur={validateEmail} required invalid={emailError !== ""}
                    />
                    {emailError && <FormFeedback>{emailError}</FormFeedback>}
                  </FormGroup>
                  <FormGroup className="flex-fill ml-1">
                    <Label>Numéro de téléphone</Label>
                    <Input type="text" name="phoneNumber" value={patient.phoneNumber} onChange={handleChange}  />
                  </FormGroup>
                </div>
                <div className="d-flex justify-content-between">          
                  <FormGroup className="mr-1" style={{ width:"50%" }}>
                    <Label>Date de naissance</Label>
                    <Input type="date" name="dateOfBirth" value={patient.dateOfBirth.slice(0, 10)} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup className="ml-1" style={{ width:"50%" }}>
                    <Label>Date de première consultation</Label>
                    <Input type="date" name="firstExaminationDate" value={patient.firstExaminationDate.slice(0, 10)} onChange={handleChange}/>
                </FormGroup>
                </div>
                <FormGroup>
                    <Label>Conditions médicales</Label>
                    <Input type="text" name="medicalConditions" value={patient.medicalConditions} onChange={handleChange} />
                </FormGroup>
                <div className="text-center">
                  <Button  color="primary" onClick={handleUpdate}> Mettre à jour</Button>  
                  <Link to="/medicalrecord/patients/cards">
                    <Button color="outline-primary" className="ms-1"> Retour </Button>
                  </Link>
                </div>
              </Form> 
            </div>
          </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default PatientUpdate;