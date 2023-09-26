import { Autocomplete, TextField, ListSubheader, ListItemAvatar, Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorList({ setConsultationInfo, editDoctor }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(editDoctor);

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
    <div>
      <Autocomplete
        id="doctor"
        name="doctor"
        disableClearable
        options={doctors.map((option) => ({ id: option.id, name: option.name, image: option.image }))} 
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          setSelectedDoctor(newValue); // Update selected doctor
          if (newValue) {
            setConsultationInfo((prevData) => ({
              ...prevData,
              doctor: newValue.id,
            }));
          }
        }}
        getOptionLabel={(option) => option.name || ''}
        ListboxComponent={({ children, ...props }) => (
          <>           
            <ListSubheader>Médecins</ListSubheader>
            <ul {...props}>
              {children}
            </ul>
          </>

        )}
        renderOption={(props, option) => (
          <li {...props}>
            <ListItemAvatar>
              <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${option.image}`}
               alt={option.name} />
            </ListItemAvatar>
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
          {...params}
          label="Médecin"
            InputProps={{
            ...params.InputProps,
            type: 'recherche',
            endAdornment: selectedDoctor && ( // Display selected doctor's avatar and name
              <ListItemAvatar>
               <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${selectedDoctor.image}`} alt={selectedDoctor.name} />
              </ListItemAvatar>
            ),
          }}
        />
        )}
      />
    </div>
  );
}
