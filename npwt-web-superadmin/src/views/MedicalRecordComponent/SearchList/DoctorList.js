import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function DoctorList({ data, onChange }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  async function getStatus() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getAllDoctor`);
      setDoctors(response.data.doctors);
      setError(null);
    } catch (error) {
      setError('Error fetching doctors.');
    }
  }

  useEffect(() => {
    getStatus();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    
    <Autocomplete id="doctor" disableClearable options={doctors.map((option) => option.name)} 
        renderInput={(params) => (
          <TextField
            {...params}
            label="Médecin"
            InputProps={{
              ...params.InputProps,
              type: 'recherche',
            }}
          />
        )}
    />
  );
}
