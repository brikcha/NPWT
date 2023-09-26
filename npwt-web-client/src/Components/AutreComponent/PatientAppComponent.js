import SideNavBarComponent from '../NavBarComponent/SideNavBarComponent';
import axios from "axios";
import './styleList.css';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';


function List () {
    const [User, setUser] = useState({});
    const [appointments, setAppointments] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []); 


    async function handleSearch ()  {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getAppointment/${decodedToken.id}`);
        const appointmentsWithServiceName = await Promise.all(response.data.map(async (appointment) => {
            const serviceResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/service/getServiceById/${appointment.HospitalService}`);
            console.log("Service Response: ", serviceResponse);

            const serviceName = serviceResponse.data.ServiceName;
            console.log('Appointment:', appointment);
            console.log('Service Name:', serviceName);
            return {...appointment, serviceName};
        }));
        setAppointments(appointmentsWithServiceName);
      }
    
      const handleDelete = (id) => {
        const appointmentId = id;
        console.log("appointment id :"+appointmentId);
        
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);
        
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/patient/deleteAppointment/${decodedToken.id}/${appointmentId}`)
          .then((response) => {
            console.log(response.data);
            
            // Remove the appointment from the appointments array
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
          })
          .catch((error) => {
            console.log(error);
          });
      };

      useEffect(() => {
        handleSearch();
      }, []);
      console.log(appointments);
      return (
        <div className="container bootstrap snippets bootdey">
        <div className="row">
          <div className="col-lg-4">
            <SideNavBarComponent user={User}></SideNavBarComponent>
          </div>
          <div className="col-lg-8">
            <hr />
            <div className="main-box no-header clearfix">
              <div className="main-box-body clearfix">
                <div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                      <tr>
                        <th><span>Service</span></th>
                        <th><span>Date</span></th>
                        <th><span>Heure</span></th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td>{appointment.serviceName}</td>
                          <td>{new Date(appointment.Date).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'})}</td>
                          <td>{new Date(appointment.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                          <td style={{width: '20%'}}>
                           
                          <button className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>Delete</button>


                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      );
      
}

export default List ;
