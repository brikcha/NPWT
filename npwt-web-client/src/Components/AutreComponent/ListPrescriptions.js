import axios from "axios";
import jwt_decode from "jwt-decode";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideNavBarComponent from '../NavBarComponent/SideNavBarComponent';
function ListPrescriptionsforPatient () {
    const [prescriptions, setprescriptions] = useState([]);
    const [Patient, setPatient] = useState({});
    const [Doctor, setDoctor] = useState({});
    const navigate=useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getAllPrescriptionsByIdPatient/${decodedToken.id}`)
                .then(response => {
                    setprescriptions(response.data);
                    
                })
                .catch(error => {
                    console.error(error);
                });

            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setPatient(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            
            

        }
    }, []);

    return ( 
        <>
         <div className='container  pt-5 pb-5'>
                <div className=" row  ">
                    <div className="col-lg-4">
                    <SideNavBarComponent user={Patient}></SideNavBarComponent>
                    </div>
                    <div className='col-lg-8  mb-5'>
                        <div className="card cardMD cardRes ">
                            <div className="card-header "><i className="fas fa-plus-square" /> Prescriptions</div>
                            <div className="card-body">
                                <Table striped style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem", backgroundColor: "#fff", color: "#212529", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", border: "1px solid #dee2e6", borderRadius: "0.25rem", overflow: "auto" }}>
                                    <thead style={{ backgroundColor: "#f5f5f5" }}>
                                        <tr>
                                            <th
                                                style={{
                                                    padding: "0.75rem",
                                                    textAlign: "left",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "1px",
                                                    borderBottom: "1px solid #dee2e6",
                                                }}
                                            >
                                                Date of Visit
                                            </th>
                                            <th
                                                style={{
                                                    padding: "0.75rem",
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "1px",
                                                    borderBottom: "1px solid #dee2e6",
                                                }}
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptions.map((prescription, index) => (
                                            <tr key={index} style={{ ':hover': { backgroundColor: "#f5f5f5" } }}>
                                                <td
                                                    style={{
                                                        padding: "0.75rem",
                                                        borderBottom: "1px solid #dee2e6",
                                                        fontWeight: "bold",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {prescription.DateOfVisit}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: "0.75rem",
                                                        textAlign: "center",
                                                        borderBottom: "1px solid #dee2e6",
                                                    }}
                                                >
                                             
                                                    <button
                                                        className="mx-2"
                                                        onClick={()=>navigate(`/Medicalrecord/ShowPrescription/${prescription._id}`)}
                                                        style={{
                                                            padding: "0.375rem 0.75rem",
                                                            border: "none",
                                                            borderRadius: "0.25rem",
                                                            backgroundColor: "rgb(0, 128, 55)",
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                                            transition: "all 0.3s ease",
                                                        }}
                                                    >
                                                        <i className="fas fa-plus-square"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                       

                                    </tbody>
                                </Table>

                            </div>
                        </div>
                    </div>
                </div>


            </div>



        </>
     );
}

export default ListPrescriptionsforPatient;