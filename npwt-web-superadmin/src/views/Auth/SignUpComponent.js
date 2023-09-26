import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import FlagSelect from "react-flags-select";
import { getCountryCallingCode } from "react-phone-number-input";
import './signUp.css';
import { Container, Input, Navbar, NavbarBrand } from 'reactstrap';
import backgroundVideo from "../../assets/img/brand/video.mp4"

function SignUpComponent() {
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
 const [confirmPassword, setConfirmPassword] = useState('');
 const [governorates, setGovernorates] = useState([]);
 const [selectedGovernorate, setSelectedGovernorate] = useState('');
 const [delegations, setDelegations] = useState([]);
 const [selectedDelegation, setSelectedDelegation] = useState('');
 const [cities, setCities] = useState([]);
 const [selectedCity, setSelectedCity] = useState('');
 const [zipCode, setZipCode] = useState('');
 const [selectedCountry, setSelectedCountry] = useState("");
 const [phoneCode, setPhoneCode] = useState("");
 const [secteur, setSecteur] = useState('');
 const [etablissement, setEtablissement] = useState('');

 const handleSelectedCountry = (countryCode) => {
 const callingCode = getCountryCallingCode(countryCode);
 setPhoneCode(callingCode);
 setSelectedCountry(countryCode + "(" + "+" + callingCode + ")");
 };

 const navigate = useNavigate();
 const [emailErrorMessage, setEmailErrorMessage] = useState(false);
 const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
 const [passwordErrorMessage1, setPasswordErrorMessage1] = useState(false);
 const [emailErrorMessage1, setEmailErrorMessage1] = useState(false);
 const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);
 const [emailErrorMessage2, setEmailErrorMessage2] = useState(false);
 const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(false);
 const [phoneNumberErrorMessage1, setPhoneNumberErrorMessage1] = useState(false);

 const [roleErrorMessage, setRoleErrorMessage] = useState(false);
 const [secteurErrorMessage, setSecteurErrorMessage] = useState(false);
 const [etablissementErrorMessage, setEtablissementErrorMessage] = useState(false); 
 
 const [passwordErrorMessage2, setPasswordErrorMessage2] = useState(false);
 const [passwordErrorMessage3, setPasswordErrorMessage3] = useState(false);
 const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [code, setCode] = useState("");
 const [lastNameErrorMessage, setLastNameErrorMessage] = useState(false);
 const [lastNameErrorMessage1, setLastNameErrorMessage1] = useState(false);
 const [usernameErrorMessage1, setUsernameErrorMessage1] = useState(false);
 const [DateOfBirthErrorMessage, setDateOfBirthErrorMessage] = useState(false);
 const toggleShowPassword = () => setShowPassword(!showPassword);
 const [DateOfBirthErrorMessage1, setDateOfBirthErrorMessage1] = useState(false);
 const handleDateOfBirthBlur = () => {
    const currentDate = new Date();
    const inputDate = new Date(dateOfBirth);
    setDateOfBirthErrorMessage(dateOfBirth.trim() === '');
    setDateOfBirthErrorMessage1(inputDate > currentDate);
  };

 const handleSubmit = (e) => {
 e.preventDefault();
 if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
 setLastNameErrorMessage(true);
 return;
 }
 if (firstName.trim() === "" || lastName.trim() === "") {
 setLastNameErrorMessage1(true);
 return;
 }
 if (!/^\d{8}$/.test(phoneNumber)) {
    setPhoneNumberErrorMessage(true);
    return;
}
if (phoneNumber.trim() === "") {
    phoneNumberErrorMessage1(true);
    return;
    }
if (role.trim() === "") {
    roleErrorMessage(true);
    return;
}
if (secteur.trim() === "") {
    secteurErrorMessage(true);
    return;
}
if (gender.trim() === "") {
    return;
} 
if (etablissement.trim() === "") {
    etablissementErrorMessage(true);
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
 // Handling empty fields
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


 const handleSubmit = (e) => {
 e.preventDefault();
 console.log({ code });
 setCode("");
 //navigate("/dashboard");
 };




 try {
 axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup/`, {
 userName: userName,
 firstName: firstName,
 lastName: lastName,
 gender: gender,
 //address: address,
 email: email,
 phoneNumber: phoneNumber,
 password: password,
 dateOfBirth: dateOfBirth,
 role: role,
 confirmPassword: confirmPassword,
 enableTwoFactorAuth: enableTwoFactorAuth,
 code: "",
 secteur: secteur,
 etablissement: etablissement,
 phoneNotVerif: "",
 codePostale: `${selectedGovernorate} ${selectedDelegation} ${selectedCity} ${zipCode}`
 }).then(
 (response) => {
 console.log(response);
 if (response.data.message === 'User already exists!') {
 setEmailErrorMessage(true);
 return;
 }

 navigate(`/EmailVerifiaction/${response.data.data._id}`);
 }
 )

 console.log(userName)
 } catch (error) {

 }
 };



 const handleRoleChange = (event) => {
 setRole(event.target.value);
 console.log(event.target.value);
 };

 useEffect(() => {
 axios
 .get(`${process.env.REACT_APP_BACKEND_URL}/locations`)
 .then((response) => {
 const data = response.data; // Access the response data
 console.log("Fetched data:", data);
 setLocations(data); // Update the locations state with the fetched data
 
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
 return (
 <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" style={{ position:"absolute" }} expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img style={{ width:"140px", height:"60px" }}
              alt="..."
              src={require("../../assets/img/brand/npwtLogo.jpg")}
            />
          </NavbarBrand>
        </Container>
      </Navbar>
        <video autoPlay loop muted style={{ position: "fixed", objectFit: "cover", zIndex: "-1",}}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
    <div className="pb-4">
        <div className="container pt-lg-5 pb-lg-5">
            <div className="card col-12 col-lg-7 offset-lg-5">
                <div className="row align-items-center">
                    <form onSubmit={handleSubmit} style={{padding:"0px 80px 20px" }}>
                    <div className="text-center my-5">
                    <h3 className="font-weight-bold mb-2">S'inscrire</h3>
                </div>
                <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                    <input
                    className="form-control"
                    id="inputFirstName"
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() =>
                    setLastNameErrorMessage(
                    !/^[a-zA-Z\s]+$/.test(firstName) ||
                    !/^[a-zA-Z\s]+$/.test(lastName)
                    ) ||
                    setLastNameErrorMessage1(
                    firstName.trim() === "" || lastName.trim() === ""
                    )
                    }
                    required
                    />
                    </div>

                    <div className="col-md-6">
                    <input
                    className="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() =>
                    setLastNameErrorMessage(
                    !/^[a-zA-Z\s]+$/.test(firstName) ||
                    !/^[a-zA-Z\s]+$/.test(lastName)
                    ) ||
                    setLastNameErrorMessage1(
                    firstName.trim() === "" || lastName.trim() === ""
                    )
                    }
                    required
                    />
                    </div>
                </div>

                    {lastNameErrorMessage1 && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "-13px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Le prénom et le nom de famille sont obligatoires.
                    </div>
                    </Alert>
                    )}
                    {lastNameErrorMessage && !lastNameErrorMessage1 && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "-3px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Le prénom et le nom ne doivent contenir que des caractères alphabétiques.
                    </div>
                    </Alert>
                    )}

                    <div className="form-group">
                    <div className="form-icon-wrapper">
                    <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Entrer votre nom complet "
                    value={userName}
                    onChange={(e) => {
                    const value = e.target.value;
                    setUserName(value);
                    setUsernameErrorMessage(
                    !/^(?=.*[a-zA-Z]{3})[a-zA-Z0-9]*$/.test(value)
                    );
                    setUsernameErrorMessage1(value.trim() === "");
                    }}
                    onBlur={() => {
                    setUsernameErrorMessage(
                    !/^(?=.*[a-zA-Z]{3})[a-zA-Z0-9]*$/.test(userName)
                    );
                    setUsernameErrorMessage1(userName.trim() === "");
                    }}
                    required
                    />
                    <i className="form-icon-left mdi mdi-account" style={{ color:"#4169d6" }} />
                    </div>
                    </div>
                    {usernameErrorMessage1 && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "-13px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Nom d'utilisateur est onligatoire.
                    </div>
                    </Alert>
                    )}
                    {usernameErrorMessage && !usernameErrorMessage1 && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "-13px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Le nom d'utilisateur doit contenir au moins 3 lettres et peut éventuellement inclure des chiffres.
                    </div>
                    </Alert>
                    )}

                        <div className="row m-1">
                        <label className="small mb-1" htmlFor="inputOrgName">
                        Date de naissance
                        </label>
                        <input
                        className="form-control"
                            id="inputOrgName"
                            type="date"
                            placeholder="Date de naissance"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            onBlur={handleDateOfBirthBlur}
                            required
                        />
                        {DateOfBirthErrorMessage && (
                        <Alert className="mt-2" variant="danger">
                        <div
                        className="form-icon-wrapper text-danger"
                        style={{ marginTop: "-13px"}}
                        >
                        La date d'anniversaire est obligatoire.
                        </div>
                        </Alert>
                        )}                  
                        {!DateOfBirthErrorMessage && DateOfBirthErrorMessage1 && (
                            <Alert
                            className="form-group "
                            variant="danger"
                            style={{ marginTop: "-13px" }}
                            >
                            <div
                            className="form-icon-wrapper text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                            Date invalide.
                            </div>
                            </Alert>
                            )}
                        </div>
                        <div className="row m-1">
                        <label className="col-4" htmlFor="inputOrgName">
                        Genre:
                        </label>

                        <div className="col-3 align-items-center">
                            <input className='m-1'
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={gender === "MALE"}
                                onChange={(e) => setGender(e.target.value)}
                             /*   onBlur={() => {
                                    setGenreErrorMessage(gender.trim() === "");
                                }}  */
                            />
                            <label htmlFor="inputFirstName">
                                masculin
                            </label>
                        </div>
                        <div className="col-5">
                            <input className='m-1'
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={gender === "FEMALE"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="inputFirstName">
                                Féminin
                            </label>
                        </div>
                        {/* {genreErrorMessage && (
                        <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                        >
                        <div
                        className="form-icon-wrapper text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                        Le genre est obligatoire.
                        </div>
                        </Alert>
                        )} */}

                        </div>
                    {/*<div className="form-group">
                    <div className="form-icon-wrapper ">
                    <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => setaddresErrorMessage(address.trim() === "")}
                    required
                    />
                    </div>
                    </div>
                    {addressErrorMessage && (
                    <Alert
                    className="form-group"
                    variant="danger"
                    style={{ marginTop: "-13px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Address is required.
                    </div>
                    </Alert>
                    )}*/}

                    <div className="form-group">
                    <div className="form-icon-wrapper">
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Entrer votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                    setEmailErrorMessage1(
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    );
                    setEmailErrorMessage(false);
                    setEmailErrorMessage2(email.trim() === "");
                    }}
                    required
                    />
                    <i className="form-icon-left mdi mdi-email" style={{ color:"#4169d6" }}/>
                    </div>
                    {emailErrorMessage2 && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "-13px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    l'email est obligatoire
                    </div>
                    </Alert>
                    )}
                    {emailErrorMessage1 && !emailErrorMessage2 && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "6px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Veuillez saisir une adresse email valide.
                    </div>
                    </Alert>
                    )}
                    {emailErrorMessage && (
                    <Alert
                    className="form-group "
                    variant="danger"
                    style={{ marginTop: "6px" }}
                    >
                    <div
                    className="form-icon-wrapper text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                    >
                    Cet adresse email est déjà utilisée.
                    </div>
                    </Alert>
                    )}
                    </div>

                    <div className="d-flex align-items-center">
                        <div className='flex-fill mr-1'>
                            <div className="form-group">
                                <Input type="select" className="form-control " onChange={handleRoleChange} 
                                    onBlur={() => {
                                        setRoleErrorMessage(role.trim() === "");
                                    }}
                                required >
                                    <option value="">Choisir Role</option>
                                    <option value="nurse">Super Admin</option>
                                    <option value="doctor">Admin</option>
                                </Input>
                            </div>
                            {roleErrorMessage && (
                            <Alert
                            className="form-group "
                            variant="danger"
                            style={{ marginTop: "-13px" }}
                            >
                            <div
                            className="form-icon-wrapper text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                            Le role est obligatoire.
                            </div>
                            </Alert>
                            )}
                        </div>
                        {/* secteur */}
                        <div className="flex-fill ml-1">
                            <div className="form-group">
                                <Input type="select" name="secteur"
                                    className={`form-select`}
                                    id="secteur"
                                    onChange={(e) => setSecteur(e.target.value)}
                                    onBlur={() => {
                                        setSecteurErrorMessage(secteur.trim() === "");
                                    }}
                                    required
                                >
                                    <option value="publique">Choisir un secteur</option>
                                    <option value="publique">Publique</option>
                                    <option value="privée">Privée</option>
                                </Input>
                                {secteurErrorMessage && (
                                    <Alert className="form-group " variant="danger" style={{ marginTop: "-13px"}}>
                                    <div className="form-icon-wrapper text-danger" style={{ marginTop: "-11px", marginBottom: "-13px" }}>
                                        Veuillez sélectionner un secteur
                                    </div>
                                </Alert>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* etablissement */}
                    <div className="form-group">
                    <input type="text" className="form-control" id="etablissement" name="etalissement" 
                        placeholder="Entrez votre adresse d'établissement" value={etablissement} 
                        onChange={(e) => {
                        const value = e.target.value;
                        setEtablissement(value);
                        setEtablissementErrorMessage(value.trim() === '');
                        }}
                        onBlur={() => {
                            setEtablissementErrorMessage(etablissement.trim() === '');
                        }}
                    />
                    </div>
                    {etablissementErrorMessage && (
                        <Alert className="form-group" variant="danger" style={{ marginTop: "-13px" }} >
                            <div className="form-icon-wrapper text-danger" style={{ marginTop: "-11px", marginBottom: "-13px" }}>
                                           
                            Le champ établissement est requis
                            </div>
                        </Alert>
                    )}
                    <div className="row gx-3 mb-3">
                    <div className="col-md-4">
                    <FlagSelect
                    onSelect={handleSelectedCountry}
                    placeholder={
                    selectedCountry
                    ? selectedCountry
                    : "votre pays"
                    }
                    countries={["TN"]}
                    />
                    </div>
                        <div className="col-md-8">
                        <div className="form-group">
                        <div className="form-icon-wrapper ">
                            <input  type="number"
                                className="form-control"
                                id="fullname"
                                placeholder="Entrer votre numéro de portable"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                onBlur={() => {
                                    setPhoneNumberErrorMessage(!/^\d{8}$/.test(phoneNumber) );
                                    setPhoneNumberErrorMessage1(phoneNumber.trim() === "");
                                }}
                                required
                            />
                        </div>
                        </div>
                        </div>
                    </div>
                    {phoneNumberErrorMessage1 && (
                        <Alert className="form-group" variant="danger" style={{ marginTop: "-13px" }} >
                            <div className="form-icon-wrapper text-danger" style={{ marginTop: "-11px", marginBottom: "-13px" }}>
                                Le numéro de téléphone est obligatoire.
                            </div>
                        </Alert>
                    )}
                     {phoneNumberErrorMessage && !phoneNumberErrorMessage1 && (
                        <Alert
                            className="form-group "
                            variant="danger"
                            style={{ marginTop: "-13px" }}
                            >
                            <div
                            className="form-icon-wrapper text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                            Le numéro de téléphone est invalide.
                            </div>
                        </Alert>
                    )}
                    {/* Governorate, Delegation, City, and Zip Code selection */}
                    <div className="form-group">
                        <div className="row gx-3">
                        <div className="col-md-3">
                        <label className="form-label">Governorate:</label>
                        <select
                        className="form-select styled-input"
                        value={selectedGovernorate}
                        onChange={(e) => setSelectedGovernorate(e.target.value)}
                        >
                        <option value="">sélectionner</option>
                        {governorates.map((gov) => (
                        <option key={gov} value={gov}>
                        {gov}
                        </option>
                        ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                    <label className="form-label">Délégation:</label>
                    <select
                    className="form-select styled-input"
                    value={selectedDelegation}
                    onChange={(e) => setSelectedDelegation(e.target.value)}
                    disabled={!delegations.length}
                    >
                    <option value="">sélectionner</option>
                    {delegations.map((deleg) => (
                    <option key={deleg} value={deleg}>
                    {deleg}
                    </option>
                    ))}
                    </select>
                    </div>

                    <div className="col-md-3">
                    <label className="form-label">Ville:</label>
                    <select
                    className="form-select styled-input"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!cities.length}
                    >
                    <option value="">sélectionner</option>
                    {cities.map((city) => (
                    <option key={city} value={city}>
                    {city}
                    </option>
                    ))}
                    </select>
                    </div>

                    <div className="col-md-3">
                    <label className="form-label">Code postal:</label>
                    <input
                    type="text"
                    className="form-control styled-input"
                    value={zipCode}
                    readOnly
                    disabled={!selectedCity}
                    />
                    </div>
                    </div>
                    </div>

                    <div className='row'>
                        <div className="col">
                        <div className="form-group">
                            <div className="form-icon-wrapper">
                            <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            placeholder="Entrer votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => {
                            setPasswordErrorMessage(
                            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(
                            password
                            )
                            );
                            setPasswordErrorMessage2(password.trim() === "");
                            }}
                            required
                            />
                            <i className={`form-icon-left mdi mdi-eye${showPassword ? "-off" : ""}`}
                            onClick={toggleShowPassword} style={{ color:"#4169d6" }}
                            />
                            </div>
                            </div>
                            {passwordErrorMessage2 && (
                            <Alert
                            className="form-group"
                            variant="danger"
                            style={{ marginTop: "-13px" }}
                            >
                            <div
                            className="form-icon-wrapper text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                            le mot de passe est obligatoire
                            </div>
                            </Alert>
                            )}

                            {passwordErrorMessage && !passwordErrorMessage2 && (
                            <Alert
                            className="form-group"
                            variant="danger"
                            style={{ marginTop: "-13px" }}
                            >
                            <div
                            className="form-icon-wrapper text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                            Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et comporter au moins 8 caractères.
                            </div>
                            </Alert>
                            )}
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="form-icon-wrapper">
                                <input
                                type="password"
                                className="form-control"
                                id="password-repeat"
                                placeholder="confirmér votre mot de passe "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => {
                                setPasswordErrorMessage1(password !== confirmPassword);
                                setPasswordErrorMessage3(confirmPassword.trim() === "");
                                }}
                                required
                                />
                                <i className="form-icon-left mdi mdi-lock" style={{ color:"#4169d6" }}/>
                                </div>
                                </div>
                                {passwordErrorMessage3 && (
                                <Alert
                                className="form-group"
                                variant="danger"
                                style={{ marginTop: "-13px" }}
                                >
                                <div
                                className="form-icon-wrapper text-danger"
                                style={{ marginTop: "-11px", marginBottom: "-13px" }}
                                >
                                La confirmation du mot de passe est obligatoire.
                                </div>
                                </Alert>
                                )}
                                {passwordErrorMessage1 && !passwordErrorMessage3 && (
                                <Alert
                                className="form-group"
                                variant="danger"
                                style={{ marginTop: "-13px" }}
                                >
                                <div
                                className="form-icon-wrapper text-danger"
                                style={{ marginTop: "-11px", marginBottom: "-13px" }}
                                >
                                Les mots de passe ne correspondent pas. Veuillez réessayer.
                                </div>
                                </Alert>
                                )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                    <p className="mt-3">
                    Avez-vous déjà un compte ? 
                    <Link to="/connexion">Connectez-vous.</Link>.
                    </p>
                    <div>
                    <button className="btn btn-primary px-5 py-3 font-weight-bold">S'inscrire</button>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
 </>
 )
}

export default SignUpComponent;


