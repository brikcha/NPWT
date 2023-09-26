import '../imageFile.css';
import '../../NavBarComponent/sideNavBar.css';
import SideNavBarComponent from './HamzaSideBar';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function MedicalRecForDoc() {
    const { id } = useParams();
    const [User, setUser] = useState({});
    const [MedicalRecord, setMedicalRecord] = useState({});
    const Country =["Afrique du Sud", "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroun", "République centrafricaine", "Tchad", "Comores", "République du Congo", "République démocratique du Congo", "Côte d'Ivoire", "Djibouti", "Égypte", "Guinée équatoriale", "Érythrée", "Eswatini", "Éthiopie", "Gabon", "Gambie", "Ghana", "Guinée", "Guinée-Bissau", "Kenya", "Lesotho", "Liberia", "Libye", "Madagascar", "Malawi", "Mali", "Mauritanie", "Maurice", "Maroc", "Mozambique", "Namibie", "Niger", "Nigeria", "Rwanda", "Sao Tomé-et-Principe", "Sénégal", "Seychelles", "Sierra Leone", "Somalie", "Soudan", "Soudan du Sud", "Tanzanie", "Togo", "Tunisie", "Ouganda", "Zambie", "Zimbabwe"];
    const civil = ["MARRIED", "SINGLE", "DIVORCED"];
    const {
        email,
        country,
        profession,
        civilState,
        numberOfChildren,
        dateOfBirth,
        placeOfBirth,

    } = MedicalRecord
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
                .then(response => {
                    setUser(response.data);
                    console.log(response.data);
                    console.log(User);

                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, []);
    useEffect(() => {
        if (User) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
                .then(response => {
                    setMedicalRecord(response.data);

                })
                .catch(error => {
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
    return (
        <div className='container pt-5 '>
            <div className=" row  ">
                <div className="col-lg-4">
                    <SideNavBarComponent user={User}></SideNavBarComponent>
                </div>

                {/* Account details card*/}
                <div className='col-lg-8  mb-5'>
                    <div className="card cardMD  cardRes">
                        <div className="card-header "><i className="fas fa-user-md iconMed" />Summary of The medical Record </div>

                        <div className="card-body">
                            <form >
                                {/* Form Group (username)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername" >Username</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="username" value={User.userName} disabled />
                                </div>
                                {/* Form Row*/}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                        <input className="form-control" id="inputFirstName" type="text" placeholder="first name" value={User.firstName} disabled />
                                    </div>
                                    {/* Form Group (last name)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                        <input className="form-control" id="inputLastName" type="text" placeholder="last name" value={User.lastName} disabled />
                                    </div>
                                </div>




                                <div className="row gx-3 mb-3">

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="inputDateofbirth">Date of birth</label>
                                        <input className="form-control" id="inputDateofbirth" type="date" name='dateOfBirth' placeholder="Date of birth " value={formattedDate} disabled/>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1">Country</label>

                                        <select className="form-control bg-light p-1 m-1" value={country} name='country'disabled>
                                            <option value="" selected>Select country</option>
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
                                        <label className="small mb-1" >Civil state</label>

                                        <select className="form-control bg-light p-1 m-1" value={civilState} name='civilState' disabled>
                                            <option selected>Select Civil state</option>
                                            {civil.map((C) => (
                                                <option key={C} value={C}>
                                                    {C}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="numberofChil">Number of children</label>
                                        <input className="form-control" id="numberofChil" type="number" placeholder="nbr of children.." min="0" max="9" name='numberOfChildren' value={numberOfChildren} disabled/>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="Profession">Profession</label>
                                        <input className="form-control" id="Profession" type="text" placeholder="Profession" name='profession' value={profession} disabled/>
                                    </div>

                                </div>

                                {/* Form Group (email address)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress" >Email address</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="email address" defaultValue="name@example.com" name='email' value={email} disabled />
                                </div>
                                {/* Form Row*/}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (phone number)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone" >Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="phone number" name='phoneNumber' value={User.phoneNumber} disabled />
                                    </div>
                                    {/* Form Group (birthday)*/}

                                </div>
                            </form>

                            <div className="row d-flex justify-content-end ">
                                <div className=" col-lg-4 col-md-4 col-4 " >
                                    <img className="img-fluid Image" src="../assetsTemplates/images/files.png" alt="" style={{ width: "auto", height: "auto" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}
export default MedicalRecForDoc;