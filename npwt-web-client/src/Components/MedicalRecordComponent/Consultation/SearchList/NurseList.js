import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function NurseList({ setConsultationInfo }) {
  const [nurses, setNurses] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = React.useState('');

  async function getStatus() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getAllNurse`);
      setNurses(response.data.nurses);
      setError(null);
    } catch (error) {
      setError('Error fetching nurse.');
    }
    setTimeout(getStatus, 10000);
  }

  useEffect(() => {
    getStatus();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
      <Autocomplete
        id="nurse"
        name="nurse"
        disableClearable
        options={nurses.map((option) => ({ id: option.id, name: option.name }))}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            setConsultationInfo((prevData) => ({
              ...prevData,
              nurse: newValue.id,
            }));
          }
        }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
          {...params}
          label="Inférimier"
          InputProps={{
            ...params.InputProps,
            type: 'recherche',
          }}
        />
      )}
      sx={{ marginTop: 1 }} 
      />
    
  );
}
