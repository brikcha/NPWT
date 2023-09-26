import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../NavBarComponent/sideNavbarUpdateProfile";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import SidebarApp from "../NavBarComponent/SidebarApp";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import "./Popup.css"



function SeeAppointments() {
    const [doctor, setDoctor] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [patients, setPatients] = useState({});

    const [showValidated, setShowValidated] = useState(false);
    const [showUnvalidated, setShowUnvalidated] = useState(false);
    const [showAll, setShowAll] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [dismissAppointmentId, setDismissAppointmentId] = useState('');
    const [dismissPatientId, setDismissPatientId] = useState('');
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    const appointmentsPerPage = 5;
    const pagesVisited = currentPage * appointmentsPerPage;

    const handleValidate = (id) => {
        setShowAlert1(true)
        setTimeout(() => {
            setShowAlert1(false);
          }, 3000);
        axios
            .put(`${process.env.REACT_APP_BACKEND_URL}/doctor/appointments/${id}/verifie`)
            .then((response) => {
                // toast.success(`you have completed an appointment`, {
                //     position: toast.POSITION.BOTTOM_RIGHT,
                // });
                console.log('test');
                setAppointments((prevState) => {
                    const updatedAppointments = prevState.map((appointment) => {
                        if (appointment._id === id) {
                            appointment.isVerified = true; // update the state of the corresponding appointment
                        }
                        return appointment;
                    });
                    return updatedAppointments;
                });
            });
    };

    const handleDismiss = (id, patientID) => {
        console.log('handleDismiss called');
        setShowModal(true);
        setDismissAppointmentId(id);
        setDismissPatientId(patientID);
    };
    
    const handleConfirmDismisspopup = (id, patientID) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/patient/deleteAppointment/${patientID}/${id}`, {
            data: { idAppointment: id }
        }).then((response) => {
            setAppointments(
                appointments.filter((appointment) => appointment._id !== id)
            );
            setShowAlert2(true)
            setTimeout(() => {
                setShowAlert2(false);
              }, 3000);
        }).catch((error) => {
            console.log(error);
        });
    };
      

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setDoctor(response.data);
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}/appointment/getappbydoc/${response.data._id}`
                        )
                        .then((response) => {
                            setAppointments(response.data);
                            const promises = response.data.map((appointment) =>
                                axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${appointment.Patient}`)
                            );
                            Promise.all(promises)
                                .then((responses) => {
                                    const patients = responses.map((response) => response.data);
                                    setPatients(patients);

                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const pageCount = Math.ceil(appointments.length / appointmentsPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
        {showModal && (
  <div className="modal-overlay " tabIndex={-1} role="dialog">
  <div className="custom-modal" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Confirmation</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{setShowModal(false)}}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to dismiss this appointment?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={()=>{handleConfirmDismisspopup(dismissAppointmentId, dismissPatientId) 
            setShowModal(false)}}>Confirm</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{setShowModal(false)}}>Cancel</button>
      </div>
    </div>
  </div>
</div>

)}
            <ToastContainer />
            <div className={showModal ? 'blurred' : ''}>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-lg-4">
                        <SidebarApp />
                    </div>
                    <div className="col-lg-7 mb-5" >
                        <div className="" >
                            {/* Account details card*/}
                            <div className="card cardMD px-5 cardRes"  style={{width: "110%"}}>
                                <div className="card-header ">
                                    <i className="fas fa-user-md iconMed" />
                                    doctor {doctor.userName}'s appointments
                                </div>
                                <div className="card-body">
                                    <div className="col-md-1">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="validationOptions"
                                                id="validatedOnly"
                                                checked={showValidated}
                                                onChange={() => {
                                                    setShowValidated(true);
                                                    setShowUnvalidated(false);
                                                    setShowAll(false);
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="validatedOnly">
                                                Done
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="validationOptions"
                                                id="unvalidatedOnly"
                                                checked={showUnvalidated}
                                                onChange={() => {
                                                    setShowValidated(false);
                                                    setShowUnvalidated(true);
                                                    setShowAll(false);
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="unvalidatedOnly">
                                                Undone
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="validationOptions"
                                                id="all"
                                                checked={showAll}
                                                onChange={() => {
                                                    setShowValidated(false);
                                                    setShowUnvalidated(false);
                                                    setShowAll(true);
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="unvalidatedOnly">
                                                All
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex flex-row justify-content-center">
                                        <div className="text-center table-responsive">
                                        {patients.length !== 0 && (
  <table className="table table-bordered table-striped table-hover w-100">
    <thead className="thead-dark">
      <tr>
        <th></th>
        <th>PatientId</th>
        <th>Patient first name</th>
        <th>Patient last name</th>
        <th>Date</th>
        <th>Time</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      {appointments
        .filter((appointment) =>
          showValidated && appointment.isVerified
            ? true
            : showUnvalidated && !appointment.isVerified
            ? true
            : !showValidated && !showUnvalidated
            ? true
            : false
        )
        .slice(pagesVisited, pagesVisited + appointmentsPerPage)
        .map((appointment, index) => {
          const patient = patients[index];
          return (
            <tr key={appointment._id}>
              <td>
              <button className="btn btn-primary" onClick={() => { window.location.href=`/PatientMedicalRecord/${patients[index]?._id}` }}  title="More info about the patient">
    i
</button>

              </td>
              <td>{patient?._id}</td>
              <td>{patient?.firstName}</td>
              <td>{patient?.lastName}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {moment(appointment.Date).format("MMMM Do YYYY")}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {moment(appointment.Date).format("h:mm:ss a")}
              </td>
              {!appointment.isVerified ? (
  <td>
    <div style={{ display: "flex" }}>
      <button
        className="btn btn-success"
        style={{
          width: "40px",
          marginBottom: "0px",
          marginTop: "0px",
          marginRight: "5px",
        }}
        type="button"
        onClick={() => handleValidate(appointment._id)}
        title="Validate this appointment"
      >
        <i className="fa fa-thumbs-up"></i>
      </button>
      <button
        className="btn btn-danger"
        style={{
          width: "40px",
          marginBottom: "0px",
          marginTop: "0px",
        }}
        type="button"
        onClick={() => handleDismiss(appointment._id,patient?._id)}
        title="Dismiss this appointment"
      >
        <i className="fa fa-thumbs-down"></i>
      </button>
    </div>
  </td>
) : (
  <td></td>
)}

            </tr>
          );
        })}
    </tbody>
  </table>
)}




                                            <ReactPaginate
                                                previousLabel={<i className="fa fa-chevron-left"></i>}
                                                nextLabel={<i className="fa fa-chevron-right"></i>}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"pagination justify-content-center"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                            {showAlert1 && (
                                                <div>
                                                <Alert
                                                className="form-group"
                                                variant="success"
                                                style={{ marginTop: "13px" }}
                                            >
                                                <div
                                                    className="form-icon-wrapper"
                                                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                                                >
                                                    Appointment validated successfully
                                                </div>
                                            </Alert>
                                            </div>
                                            )}
                                            {showAlert2 && (
                                                <Alert
                                                className="form-group"
                                                variant="warning"
                                                style={{ marginTop: "13px" }}
                                            >
                                                <div
                                                    className="form-icon-wrapper"
                                                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                                                >
                                                    Appointment dismissed successfully
                                                </div>
                                            </Alert>
                                            )}




                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );


}

export default SeeAppointments;
