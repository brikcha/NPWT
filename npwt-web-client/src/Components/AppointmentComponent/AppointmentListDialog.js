
import React , { useRef, useState }  from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format , parse } from 'date-fns';
import jwt_decode from "jwt-decode";
import moment from "moment";



function AppointmentListDialog(props) {
  const { appointments, open, onClose } = props;
  
  
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);

  const formattedAppointments = appointments.map((appointment) => ({
    ...appointment,
    id: appointment._id
  }));
  
  
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleRowClick = (params) => {
    setSelectedAppointmentId(params.row.id);
  }


  const columns = [
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1,
      valueFormatter: (params) => moment(params.value).format("DD/MM/YYYY"),
    },
    {
      field: 'Heure',
      headerName: 'Heure',
      flex: 1,
      valueFormatter: (params) => moment(params.value).format("HH:mm"),
      valueGetter: (params) => {
        const date = moment(params.row.Date);
        return date.isValid() ? date.format("YYYY-MM-DDTHH:mm:ss.SSSZ") : null;
      }
    }
  ];  
  
  
  
  
  

  console.log("appointments:", appointments);


  async function handleTakeAppointment() {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/patient/appointments/${selectedAppointmentId}/take`, {
      patientId: decodedToken.id
    });
    console.log(response.data);
  }
  return (
    <Dialog open={open} onClose={onClose}  maxWidth="md" fullWidth >
      <DialogTitle>Appointment List</DialogTitle>
      <DialogContent>
        <div style={{ height: 500, width: '100%' }}>
       
        <DataGrid rows={formattedAppointments} columns={columns} getRowId={(row) => row.id}
                               onRowClick={handleRowClick}
        /> 
        </div>
      </DialogContent>
      <DialogActions>
      <button className="btn btn-primary mt-4" onClick={handleTakeAppointment}>Take Appointment</button>
      <Button className="btn btn-danger mt-4" onClick={onClose}>Close </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentListDialog;
