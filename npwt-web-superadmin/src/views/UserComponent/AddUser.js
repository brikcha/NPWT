import { Input} from "reactstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
const AddUser = () => {
  const [locations, setLocations] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('');
  const [secteur, setSecteur] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [delegations, setDelegations] = useState([]);
  const [selectedDelegation, setSelectedDelegation] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [passwordErrorMessage1, setPasswordErrorMessage1] = useState(false);
  const [emailErrorMessage2, setEmailErrorMessage2] = useState(false);
  const [passwordErrorMessage2, setPasswordErrorMessage2] = useState(false);
  const [passwordErrorMessage3, setPasswordErrorMessage3] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);
  const [usernameErrorMessage1, setUsernameErrorMessage1] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [etablissementErrorMessage1, setEtablissementErrorMessage1] = useState(false);
  const [DateOfBirthErrorMessage, setDateOfBirthErrorMessage] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleDateOfBirthBlur = () => {
    setDateOfBirthErrorMessage(dateOfBirth.trim() === '');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
      setLastNameErrorMessage(true);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(userName)) {
      setUsernameErrorMessage(true);
      return;
    }
    if (userName.trim() === "") {
      setUsernameErrorMessage1(true);
      return;
    }
    if (etablissement.trim() === "") {
      setEtablissementErrorMessage1(true);
      return;
    }
    if (dateOfBirth.trim() === "") {
      setDateOfBirthErrorMessage(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErrorMessage(true);
      return;
    }
    if (email.trim() === "") {
      setEmailErrorMessage2(true);
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(password)) {
      setPasswordErrorMessage(true);
      return
    }
    if (password.trim() === "") {
      setPasswordErrorMessage2(true);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordErrorMessage1(true);
      return
    }
    if (confirmPassword.trim() === "") {
      setPasswordErrorMessage3(true);
      return;
    }
    try {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup/`, {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        dateOfBirth: dateOfBirth,
        role: role,
        secteur: secteur,
        etablissement: etablissement,
        confirmPassword: confirmPassword,
        code: "",
        phoneNotVerif: "",
        codePostale: `${selectedGovernorate} ${selectedDelegation} ${selectedCity} ${zipCode}`
      }).then(
        (response) => {
          console.log(response);
          Swal.fire({
            title: 'Utilisateur',
            text: response.data.message,
            text: " L'utilisateur a été ajouté avec succès.",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      )
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Utilisateur',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
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
    console.log("Selected Governorate:", selectedGovernorate);
    if (selectedGovernorate) {
      const filteredDelegations = [...new Set(locations
        .filter((locationItem) => locationItem.Gov === selectedGovernorate)
        .map((locationItem) => locationItem.Deleg))];

      console.log("Filtered Delegations:", filteredDelegations);

      setDelegations(filteredDelegations);
      setSelectedDelegation("");
      setCities([]);
      setSelectedCity("");
      setZipCode("");
    }
  }, [selectedGovernorate]);
  useEffect(() => {
    console.log("Selected Delegation:", selectedDelegation);

    if (selectedDelegation) {
      const filteredCities = [...new Set(locations
        .filter((locationItem) => locationItem.Deleg === selectedDelegation)
        .map((locationItem) => locationItem.Cite))];

      console.log("Filtered Cities:", filteredCities);

      setCities(filteredCities);
      setSelectedCity("");
      setZipCode("");
    }
  }, [selectedDelegation]);
  useEffect(() => {
    console.log("Selected City:", selectedCity);
    if (selectedCity) {
      const filteredZipCode = locations.find((locationItem) => locationItem.Cite === selectedCity)?.zip;
      console.log("Filtered Zip Code:", filteredZipCode);

      setZipCode(filteredZipCode || "");
    }
  }, [selectedCity]);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber( value);
    setPhoneNumberError(""); // Clear any previous error
  };
  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{8}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError("Numéro de Téléphone Doit Comporter 8 Chiffres");
    }
  };
  return (
    <div className="d-flex justify-content-center">
       <img  className=" imgForm img-fluid d-none d-lg-block position-absolute"  alt="..."  src={require("../../assets/img/brand/img.jpg")}  style={{ width: "500%", height: "100%" }}/>
       <div className="container mt-12">    
          <div className="col-lg-12">
            <div className="d-flex justify-content-center">
            <div className="card-body col-lg-12 offset-lg-5" style={{ width:"1800px" }}>  
              <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-2">Ajouter Utilisateur</h2>      
                <div className="d-flex justify-content-between">          
                  <div className="mb-1 flex-fill mr-1">
                    <label htmlFor="firstName" className="form-label">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className={`form-control ${lastNameErrorMessage ? 'is-invalid' : ''}`}
                      id="firstName"
                      placeholder="Saisir votre prénom"
                      value={firstName}
                      width="100px"
                      onChange={(e) => setFirstName(e.target.value)}
                      onBlur={() =>
                        setLastNameErrorMessage(!/^[a-zA-Z\s]+$/.test(firstName) || firstName.trim() === '')
                      }
                      required
                    />
                    {lastNameErrorMessage && (
                      <div className="invalid-feedback">Veuillez saisir un prénom valide</div>
                    )}
                  </div>
                  <div className="mb-1 flex-fill ml-1">
                    <label htmlFor="lastName" className="form-label">
                    Nom
                    </label>
                    <input
                      type="text"
                      className={`form-control ${lastNameErrorMessage ? 'is-invalid' : ''}`}
                      id="lastName"
                      placeholder="Saisir votre nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onBlur={() =>
                        setLastNameErrorMessage(!/^[a-zA-Z\s]+$/.test(lastName) || lastName.trim() === '')
                      }
                      required
                    />
                    {lastNameErrorMessage && (
                      <div className="invalid-feedback">Veuillez saisir un nom valide</div>
                    )}
                  </div>
                </div>
                
                {/* Username */}
                <div className="mb-1">
                    <label htmlFor="username" className="form-label">
                    Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      className={`form-control ${usernameErrorMessage ? 'is-invalid' : ''}`}
                      id="username"
                      placeholder="Saisir votre Nom d'utilisateur"
                      value={userName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setUserName(value);
                        setUsernameErrorMessage(!/^(?=.*[a-zA-Z]{3})[a-zA-Z0-9]*$/.test(value));
                        setUsernameErrorMessage1(value.trim() === '');
                      }}
                      onBlur={() => {
                        setUsernameErrorMessage(!/^(?=.*[a-zA-Z]{3})[a-zA-Z0-9]*$/.test(userName));
                        setUsernameErrorMessage1(userName.trim() === '');
                      }}
                      required
                    />
                    {usernameErrorMessage && (
                      <div className="invalid-feedback">Le nom d'utilisateur doit comporter au moins 3 caractères</div>
                    )}
                    {usernameErrorMessage1 && (
                      <div className="invalid-feedback">Veuillez saisir un nom d'utilisateur</div>
                    )}
                </div>

                <div className="d-flex align-item-center">
                  {/* Email */}
                  <div className="mb-1 flex-fill mr-1">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control is-invalid}`}
                      id="email"
                      placeholder="Saisir votre email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => {
                        setEmailErrorMessage(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
                        setEmailErrorMessage2(email.trim() === '');
                      }}
                      required
                    />
                    {emailErrorMessage && (
                      <div className="invalid-feedback">Veuillez saisir une adresse e-mail valide</div>
                    )}
                    {emailErrorMessage2 && (
                      <div className="invalid-feedback">Veuillez saisir un e-mail</div>
                    )}
                  </div>            
                  {/* Phone Number */}
                  <div className="mb-1 flex-fill ml-1">
                    <label htmlFor="phoneNumber" className="form-label">  Numéro de téléphone  </label>
                    <input type="number" className="form-control" id="phoneNumber" name="phoneNumber"
                     placeholder="Entrez votre numéro de téléphone" value={phoneNumber} 
                     onChange={handlePhoneNumberChange} onBlur={validatePhoneNumber} required
                     invalid={phoneNumberError !== ""}
                    />
                    {phoneNumberError && <p>{phoneNumberError}</p>}
                  </div>

                </div>
                <div className="mb-0 d-flex align-item-center">
                  {/* Date of Birth */}
                  <div className="mb-1 flex-fill mr-5">
                    <label htmlFor="dateOfBirth" className="form-label">
                    Date de naissance
                    </label>
                    <input
                      type="date"
                      className={`form-control ${DateOfBirthErrorMessage ? 'is-invalid' : ''}`}
                      id="dateOfBirth"
                      placeholder="Date de naissance"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      onBlur={handleDateOfBirthBlur}
                      required
                    />
                    {DateOfBirthErrorMessage && (
                      <div className="invalid-feedback">Please enter a valid date of birth</div>
                    )}
                  </div>
                  {/* Gender */}
                  <div className="mb-1 flex-fill mr-1 align-self-center">
                    <div className="mb-0 align-item-center">
                      <label className="form-label">Sexe</label>
                      <div className="d-flex align-items-center pb-2">
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="gender"
                            value="MALE"
                            checked={gender === 'MALE'}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="gender"
                            value="FEMALE"
                            checked={gender === 'FEMALE'}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">          
                    {/* Role */}
                    <div className="mb-1 flex-fill mr-1">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <Input type="select" name="role"
                        className={`form-select`}
                        id="role"
                        onChange={handleRoleChange}
                        onBlur={() => { }}
                        required
                      >
                        <option value="doctor">Choisir un rôle</option>
                        <option value="nurse">Infirmier</option>
                        <option value="doctor">Docteur</option>
                      </Input>
                      {<div className="invalid-feedback">Veuillez sélectionner un rôle</div>}
                    </div>

                    {/* secteur */}
                    <div className="mb-1 flex-fill ml-1">
                      <label htmlFor="secteur" className="form-label">
                        Secteur
                      </label>
                      <Input type="select" name="secteur"
                        className={`form-select`}
                        id="secteur"
                        onChange={(e) => setSecteur(e.target.value)}
                        onBlur={() => { }}
                        required
                      >
                        <option value="publique">Choisir un secteur</option>
                        <option value="publique">Publique</option>
                        <option value="privée">Privée</option>
                      </Input>
                      {<div className="invalid-feedback">Veuillez sélectionner un secteur</div>}
                    </div>
                </div>
               
                {/* etablissement */}
                <div className="mb-1">
                  <label htmlFor="etablissement" className="form-label"> Etablissement </label>
                  <input type="text" className="form-control" id="etablissement" name="etalissement" 
                    placeholder="Entrez votre établissement" value={etablissement} 
                    onChange={(e) => {
                      const value = e.target.value;
                      setEtablissement(value);
                      setEtablissementErrorMessage1(value.trim() === '');
                    }}
                    onBlur={() => {
                      setEtablissementErrorMessage1(etablissement.trim() === '');
                    }}
                  />
                </div>
                {etablissementErrorMessage1 && (
                    <div className="invalid-feedback">Le champ établissement est requis </div>
                  )}
                {/* Address */}
                <div className={`mb-1 ${selectedGovernorate? "row": ""}  align-items-center`}>
                  {/* Address label */}
                  <div className={`mb-1 ${selectedGovernorate? "col": ""}`}>              
                    <label className="form-label">Addresse</label>
                    <Select
                      value={selectedGovernorate ? { label: selectedGovernorate, value: selectedGovernorate } : null}
                      onChange={(selectedOption) => setSelectedGovernorate(selectedOption ? selectedOption.value : '')}
                      options={governorates.map((gov) => ({ label: gov, value: gov }))}
                      placeholder="Sélectionnez "
                    />
                  </div>
   
                  {/* Additional fields when Governorate is selected */}
                  {selectedGovernorate && (
                    <>
                      {/* Delegation selection */}
                      <div className="mb-1 col">
                        <label className="form-label">Délégation:</label>
                        <Select
                          value={selectedDelegation ? { label: selectedDelegation, value: selectedDelegation } : null}
                          onChange={(selectedOption) => setSelectedDelegation(selectedOption ? selectedOption.value : '')}
                          options={delegations.map((deleg) => ({ label: deleg, value: deleg }))}
                          isDisabled={!delegations.length}
                          placeholder="Sélectionnez"
                        />
                      </div>
                      <div className="w-100"></div>
                      {/* City selection */}
                      <div className="mb-1 col">
                        <label className="form-label">Cité:</label>
                        <Select
                          value={selectedCity ? { label: selectedCity, value: selectedCity } : null}
                          onChange={(selectedOption) => setSelectedCity(selectedOption ? selectedOption.value : '')}
                          options={cities.map((city) => ({ label: city, value: city }))}
                          isDisabled={!cities.length}
                          placeholder="Sélectionnez"
                        />
                      </div>

                      {/* Zip Code input */}
                      <div className="mb-1 col">
                        <label className="form-label">Code Postale:</label>
                        <input
                          type="text"
                          className="form-control styled-input"
                          value={zipCode}
                          readOnly
                          disabled={!selectedCity}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-between">          
                  {/* Password */}
                  <div className="mb-2 flex-fill mr-1">
                    <label htmlFor="password" className="form-label">
                      Mot de Passe
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${passwordErrorMessage ? 'is-invalid' : ''}`}
                        id="password"
                        placeholder="Saisir votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => {
                          setPasswordErrorMessage(
                            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(
                              password
                            )
                          );
                          setPasswordErrorMessage2(password.trim() === '');
                        }}
                        required
                      />
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        style={{ width:"50px", padding:"0" }}
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <i className="fa  fa-eye-slash" /> : <i className="fas  fa-eye" />}
                      </button>
                    </div>
                    {passwordErrorMessage && (
                      <div className="invalid-feedback">
                        Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, une lettre minuscule,
                        un chiffre et un caractère spécial.
                      </div>
                    )}
                    {passwordErrorMessage2 && (
                      <div className="invalid-feedback">Veuillez saisir un mot de passe</div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-2 flex-fill ml-1">
                    <label htmlFor="confirmPassword" className="form-label">
                    Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      className={`form-control ${passwordErrorMessage1 || passwordErrorMessage3 ? 'is-invalid' : ''
                        }`}
                      id="confirmPassword"
                      placeholder="Retaper le mot de passe"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => {
                        setPasswordErrorMessage1(password !== confirmPassword);
                        setPasswordErrorMessage3(confirmPassword.trim() === '');
                      }}
                      required
                    />
                    {passwordErrorMessage1 && (
                      <div className="invalid-feedback">Les mots de passe ne correspondent pas</div>
                    )}
                    {passwordErrorMessage3 && (
                      <div className="invalid-feedback">Veuillez confirmer votre mot de passe</div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Ajouter
                  </button>
                  <Link to="/admin/utilisateur/table">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Retour
                    </button>
                  </Link>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
    </div> 
  );
};
export default AddUser;