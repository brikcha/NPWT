import axios from "axios";
import { useEffect, useState } from "react";
import SideNavBarComponent from '../NavBarComponent/SideNavBarComponent';
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

function ShowPrescription() {
    const [Patient, setPatient] = useState({});
    const { idPrescription } = useParams();
    const [Prescription, setPrescription] = useState({});


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setPatient(response.data);
                })
                .catch(error => {
                    console.error(error);
                });



            axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getPrescriptionByid/${idPrescription}`)
                .then(response => {
                    setPrescription(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    /////mettre le date of visit sous formr yyyy-mm-jj pour l'afficher
    const date = new Date(Prescription.DateOfVisit); // récupération de la date actuelle
    const year = date.getFullYear(); // récupération de l'année
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
    const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
    const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée
    return (
        <>
            <div className='container  pt-5 pb-5'>
                <div className=" row  ">
                    <div className="col-lg-4">
                        <SideNavBarComponent user={Patient}></SideNavBarComponent>
                    </div>
                    <div className='col-lg-8  mb-5'>
                        <div className="card cardMD cardRes ">
                            <div className="card-header "><i className="fas fa-plus-square" /> Prescription details</div>
                            <div className="card-body">
                                <div>
                                    {/* <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="input1" className="mt-1" >Doctor: </label>
                                            <input
                                                className="form-control"
                                                id="input1"
                                                type="date"
                                                value={formattedDate}

                                            />
                                        </div>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="input1" className="mt-2" >Date of Visit: </label>
                                            <input
                                                className="form-control"
                                                id="input1"
                                                type="date"
                                                value={formattedDate}
                                                disabled

                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="input1" className="mt-2" >Patient name and firstname: </label>
                                            <div className="d-flex">
                                                <input
                                                    className="form-control"
                                                    id="input1"
                                                    type="text"
                                                    value={Patient.firstName}
                                                    disabled

                                                />
                                                <input
                                                    className="form-control mx-2"
                                                    id="input1"
                                                    type="text"
                                                    value={Patient.lastName}
                                                    disabled

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <label htmlFor="input1" className="mt-3" >Treatments: </label>
                                    <textarea
                                        className="form-control"
                                        id="input2"
                                        name="Treatments"
                                        value={Prescription.Treatments}
                                        disabled

                                    />
                                    <label htmlFor="input1" className="mt-3" >Instruction: </label>
                                    <textarea
                                        className="form-control"
                                        id="input3"
                                        name="Instruction"
                                        value={Prescription.Instruction}
                                        disabled

                                    />
                                    <label htmlFor="input1" className="mt-3" >Note: </label>
                                    <textarea
                                        className="form-control"
                                        id="input4"
                                        name="Note"
                                        value={Prescription.Note}
                                        disabled


                                    />

                                        <p className="img-preview-wrapper mt-5  ">
                                            {
                                                <img src={`http://127.0.0.1:8887/DoctorSignature/${Prescription.Signature}`} alt="preview" className="img-preview " style={{marginLeft:"20%",width:"50%"}}/>
                                            }
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </>
    );
}

export default ShowPrescription;