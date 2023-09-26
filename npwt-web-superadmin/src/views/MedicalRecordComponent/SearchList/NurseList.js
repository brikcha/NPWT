import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function NurseList({ data, onChange }) {
  const [nurses, setNurses] = useState([]);
  const [error, setError] = useState(null);

  async function getStatus() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getAllNurse`);
      setNurses(response.data.nurses);
      setError(null);
    } catch (error) {
      setError('Error fetching nurse.');
    }
  }

  useEffect(() => {
    getStatus();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    
    <Autocomplete id="nurse" disableClearable options={nurses.map((option) => option.name)} 
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
