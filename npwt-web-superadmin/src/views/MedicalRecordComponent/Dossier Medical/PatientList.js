import { Autocomplete, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PatientList({ setConsultationInfo }) {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getAllPatients`);
        console.log('Response from API:', response.data);

        if (Array.isArray(response.data)) {
          setPatients(response.data);
          setError(null);
        } else {
          setError('Invalid response data.');
        }
      } catch (err) {
        setError('Error fetching patients.');
      }
    }

    fetchPatients();
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handlePatientChange = (event, newValue) => {
    if (newValue) {
      setConsultationInfo((prevData) => ({
        ...prevData,
        patient: newValue.id,
      }));
    }
  };

  return (
    <Autocomplete
      id="patient"
      name="patient"
      disableClearable
      options={patients.map((patient) => ({
        id: patient.id,
        name: `${patient.firstName} ${patient.lastName}`,
      }))}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handlePatientChange}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Patient"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
      sx={{ marginTop: 1 }}
    />
  );
}