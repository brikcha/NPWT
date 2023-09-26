import { useNavigate, useParams } from "react-router-dom";
import HamzaSideBar from "./HamzaSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ListPrescription(props) {
    const { id } = useParams();
    const [User, setUser] = useState({});
    const [Doctor, setDoctor] = useState({});
    const [prescriptions, setprescriptions] = useState([]);
    const navigate = useNavigate()
    const [ModalShow,setModalShow]=useState(false)
    const[IdPrescription,setIdPrescription]=useState("")

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        const token = localStorage.getItem('jwtToken');

        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getAllPrescriptionsByIdPatientAndDoctor/${decodedToken.id}/${id}`)
                .then(response => {
                    setprescriptions(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setDoctor(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, []);

    const deletePrescription = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
        const decodedToken = jwt_decode(token);
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/prescription/deletePrescription/${IdPrescription}`)
            .then((response) => {
                console.log(response.data)
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getAllPrescriptionsByIdPatientAndDoctor/${decodedToken.id}/${id}`)
                .then(response => {
                    setprescriptions(response.data);
                })
            })
            .catch((error) => {
                console.error(error);        
            })
    }
    }

    return (
        <>

            <div className='container  pt-5 pb-5'>
                <div className=" row  ">
                    <div className="col-lg-4">
                        <HamzaSideBar user={User}></HamzaSideBar>
                    </div>
                    <div className='col-lg-8  mb-5'>
                        <div className="card cardMD cardRes ">
                            <div className="card-header "><i className="fas fa-plus-square" /> Dr {Doctor.firstName} you have assigned the following prescriptions for the patient {User.firstName} {User.lastName}</div>
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
                                                        onClick={() => { setModalShow(true);setIdPrescription(prescription._id) }}
                                                        style={{
                                                            padding: "0.375rem 0.75rem",
                                                            border: "none",
                                                            borderRadius: "0.25rem",
                                                            backgroundColor: "rgb(255, 0, 0)",
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                                            transition: "all 0.3s ease",
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                    <button
                                                        className="mx-2"
                                                        onClick={() => { navigate(`/Medicalrecord/updatePrescription/${id}/${prescription._id}`) }}
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
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        <Modal
                                            {...props}
                                            size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            show={ModalShow}
                                            onHide={() => setModalShow(false)}
                                        >

                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Confirmation
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>Confirm if you want to delete this element</p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => { setModalShow(false)}}>
                                                   close
                                                </Button>
                                                <Button variant="primary" onClick={() => { deletePrescription(); setModalShow(false) }}>
                                                    Confirm
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

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

export default ListPrescription;