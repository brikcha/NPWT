import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import AppointmentListDialog from './AppointmentListDialog';
import { Button } from '@mui/material';




function AppointmentForm() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalServices, setHospitalServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('');



  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    async function fetchHospitals() {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
      setHospitals(response.data);
    }
    fetchHospitals();
    console.log(decodedToken.id)
  }, []);

  async function handleHospitalChange(event) {
    const hospitalId = event.target.value;

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/services/${hospitalId}`);
    setHospitalServices(response.data);
  }

  async function handleAppointmentSelect(event) {
    setSelectedAppointment(event.target.value);
  }

  async function handleTakeAppointment() {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/patient/appointments/${selectedAppointment}/take`, {
      patientId: decodedToken.id
    });
    console.log(response.data);
  }

  async function handleSearch ()  {
    
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/getDoctorAppointmentsWithLeastPatients/${selectedServiceId}`);
    setAppointments(response.data);
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false); 
  }
  
  return (
    <div className="">
      <img
        className=" imgForm img-fluid d-none d-lg-block position-absolute "
        src="../assetsTemplates/templateForm/images/img2.jpg"
        style={{ width: "100%", height: "100%" }}
      />'
      <ToastContainer />
      <div className="pb-5">
        <div className=" container pt-lg-5 pb-lg-5 ">
          <div className="  card col-12  col-lg-5  offset-lg-7 " >
            <div className="card-body styleCard">
              <div className="row align-items-center">
                <div className="">
                  <div className="text-center my-5">
                    <h3 className="font-weight-bold mb-3">Take Appointment</h3>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label" for="hospital-select">Choose a hospital:</label>
                        <select className="form-select" id="hospital-select" onChange={handleHospitalChange}>
                          <option value="">Select a hospital</option>
                          {hospitals.map(hospital => (
                            <option key={hospital._id} value={hospital._id}>
                              {hospital.HospitalName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" for="service-select">Choose a service:</label>
                        <select className="form-select" id="service-select" onChange={(e) => setSelectedServiceId(e.target.value)}> 
                          <option value="">Select a service</option> 
                          {hospitalServices.map(service => (
                            <option key={service._id} value={service._id}>
                              {service.ServiceName}
                            </option>
                          ))}
                        </select> 
                        <div className="row">
                        <div className="col-md-10">
                        <button className="btn btn-primary mt-5 " onClick={handleSearch}>Show available Appointments</button>

                        </div>
                        </div>
                        <AppointmentListDialog appointments={appointments} open={openDialog} onClose={handleClose} />

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;