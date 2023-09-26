import { Box, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import DoctorList from '../SearchList/DoctorList';
import NurseList from '../SearchList/NurseList';

const Mode = (consultationInfo, handleChangeconsultationInfo) => {
  const [selectedMode, setSelectedMode] = useState("");
  const [medicalMode, setMedicalMode] = useState([]);
  const [modeInputs, setModeInputs] = useState({
    ContinuousMode: {
      Pressure: '',
    },
    IntermittentMode: {
      "Minimum Pressure": '',
      "Minimum Pressure Duration": '',
      "Maximum Pressure": '',
      "Maximum Pressure Duration": '',
    },
    ContinuousInstillationMode: {
      Pressure: '',
      "Pressure Duration": '',
      Volume: '',
      "Volume Duration (Operating Time + Rest Time)": '',
    },
    IntermittentInstillationMode: {
      "Minimum Pressure": '',
      "Minimum Pressure Duration": '',
      "Maximum Pressure": '',
      "Maximum Pressure Duration": '',
      Volume: '',
      "Volume Duration (Operating Time + Rest Time)": '',
    },
  });
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModeInputs({
      ...modeInputs,
      [selectedMode]: {
        ...modeInputs[selectedMode],
        [name]: value,
      },
    });
  };

  const renderFormInputs = () => {
    if (selectedMode === "ContinuousMode") {
      return (
        <div>
           <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel htmlFor="Pressure" >Pression </InputLabel>
                <OutlinedInput id="Pressure" type='number' name="Pressure" value={consultationInfo.Pressure}
                    onChange={handleChangeconsultationInfo} placeholder='Pression'
                    error={!!consultationInfo.error_list?.Pressure}  label="Pression" 
                />
                <FormHelperText error={true}>
                {consultationInfo.error_list?.Pressure}           
                </FormHelperText> 
            </FormControl>
        </div>
      );
    } else if (selectedMode === "IntermittentMode") {
      return (
        <Box sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MinimumPressure" >Pression min</InputLabel>
                    <OutlinedInput id="MinimumPressure" type='number' name="MinimumPressure" value={consultationInfo.Pressure}
                        onChange={handleChangeconsultationInfo} placeholder='Pression min'
                        error={!!consultationInfo.error_list?.MinimumPressure}  label="Pression min" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MinimumPressure}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MinimumPressureDuration" >Durée pression min</InputLabel>
                    <OutlinedInput id="MinimumPressureDuration" type='number' name="MinimumPressureDuration" value={consultationInfo.MinimumPressureDuration}
                        onChange={handleChangeconsultationInfo} placeholder='Durée pression min'
                        error={!!consultationInfo.error_list?.MinimumPressureDuration}  label="Durée pression min" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MinimumPressureDuration}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MaximumPressure" >Pression max</InputLabel>
                    <OutlinedInput id="MaximumPressure" type='number' name="Pressure" value={consultationInfo.MaximumPressure}
                        onChange={handleChangeconsultationInfo} placeholder='Pression max'
                        error={!!consultationInfo.error_list?.MaximumPressure}  label="Pression max" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MaximumPressure}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MaximumPressureDuration" >Durée pression max</InputLabel>
                    <OutlinedInput id="Pressure" type='number' name="MaximumPressureDuration" value={consultationInfo.MaximumPressureDuration}
                        onChange={handleChangeconsultationInfo} placeholder='Durée pression max'
                        error={!!consultationInfo.error_list?.MaximumPressureDuration}  label="Durée pression max" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MaximumPressureDuration}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
            </Grid>
        </Box>
      );
    } else if (selectedMode === "ContinuousInstillationMode") {
      return (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="Pressure" >Pression</InputLabel>
                    <OutlinedInput id="Pressure" type='number' name="Pressure" value={consultationInfo.Pressure}
                        onChange={handleChangeconsultationInfo} placeholder='Pression'
                        error={!!consultationInfo.error_list?.Pressure}  label="Pression" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.Pressure}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="PressureDuration" >Durée pression</InputLabel>
                    <OutlinedInput id="PressureDuration" type='number' name="PressureDuration" value={consultationInfo.PressureDuration}
                        onChange={handleChangeconsultationInfo} placeholder='Durée pression'
                        error={!!consultationInfo.error_list?.PressureDuration}  label="Durée pression" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.PressureDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="Volume" >Volume</InputLabel>
                    <OutlinedInput id="Volume" type='number' name="Volume" value={consultationInfo.Volume}
                        onChange={handleChangeconsultationInfo} placeholder='Volume'
                        error={!!consultationInfo.error_list?.Volume}  label="Volume" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.Volume}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="VolumeDuration" >Durée volume (Temps fonctionnement + Temps repos)</InputLabel>
                    <OutlinedInput id="VolumeDuration" type='number' name="VolumeDuration" value={consultationInfo.VolumeDuration}
                        onChange={handleChangeconsultationInfo} placeholder='Durée volume (Temps fonctionnement + Temps repos)'
                        error={!!consultationInfo.error_list?.VolumeDuration}  label="Durée volume (Temps fonctionnement + Temps repos)" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.VolumeDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
        </div>
      );
    } else if (selectedMode === "IntermittentInstillationMode") {
      return (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                  <InputLabel htmlFor="MinimumPressure" >Pression min</InputLabel>
                  <OutlinedInput id="MinimumPressure" type='number' name="MinimumPressure" value={consultationInfo.MinimumPressure}
                      onChange={handleChangeconsultationInfo} placeholder='Pression min'
                      error={!!consultationInfo.error_list?.MinimumPressure}  label="Pression min" 
                  />
                  <FormHelperText error={true}>
                  {consultationInfo.error_list?.MinimumPressure}           
                  </FormHelperText> 
            </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MinimumPressureDuration" >Durée pression min</InputLabel>
                    <OutlinedInput id="MinimumPressureDuration" type='number' name="MinimumPressureDuration" value={consultationInfo.MinimumPressureDuration}
                        onChange={handleChangeconsultationInfo} placeholder='Durée pression min'
                        error={!!consultationInfo.error_list?.MinimumPressureDuration}  label="Durée pression min" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MinimumPressureDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MaximumPressure" >Pression Max</InputLabel>
                    <OutlinedInput id="MaximumPressure" type='number' name="MaximumPressure" value={consultationInfo.MaximumPressure}
                        onChange={handleChangeconsultationInfo} placeholder='Pression Max'
                        error={!!consultationInfo.error_list?.MaximumPressure}  label="Pression Max" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MaximumPressure}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MaximumPressureDuration" >Durée pression Max</InputLabel>
                    <OutlinedInput id="MaximumPressureDuration" type='number' name="MaximumPressureDuration" value={consultationInfo.MaximumPressureDuration}
                        onChange={handleChangeconsultationInfo} placeholder='Durée pression Max'
                        error={!!consultationInfo.error_list?.MaximumPressureDuration}  label="Durée pression Max" 
                    />
                    <FormHelperText error={true}>
                    {consultationInfo.error_list?.MaximumPressureDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
          <Grid item xs={12}>
            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                  <InputLabel htmlFor="Volume" >Volume</InputLabel>
                  <OutlinedInput id="Volume" type='number' name="Volume" value={consultationInfo.Volume}
                      onChange={handleChangeconsultationInfo} placeholder='Volume'
                      error={!!consultationInfo.error_list?.Volume}  label="Volume" 
                  />
                  <FormHelperText error={true}>
                  {consultationInfo.error_list?.Volume}           
                  </FormHelperText> 
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                  <InputLabel htmlFor="VolumeDuration" >Durée volume (Temps fonctionnement + Temps repos)</InputLabel>
                  <OutlinedInput id="VolumeDuration" type='number' name="VolumeDuration" value={consultationInfo.VolumeDuration}
                      onChange={handleChangeconsultationInfo} placeholder='Durée volume (Temps fonctionnement + Temps repos)'
                      error={!!consultationInfo.error_list?.VolumeDuration}  label="Durée volume (Temps fonctionnement + Temps repos)" 
                  />
                  <FormHelperText error={true}>
                  {consultationInfo.error_list?.VolumeDuration}           
                  </FormHelperText> 
            </FormControl>
          </Grid>
          </Grid>
        </div>
      );
    } else {
      return <Typography variant='h6' sx={{ textAlign:"center", m:2, color:"red" }}>Veuillez sélectionner un mode</Typography>;
    }
  };
  return (
    <Box>
        <DoctorList data={consultationInfo} onChange={handleChangeconsultationInfo} />
        
        <NurseList data={consultationInfo} onChange={handleChangeconsultationInfo} />

        <FormControl sx={{ marginTop: 1.5 }} variant="outlined" color="primary">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
              label="Date de consultation"
              name="ExaminationDate"
              value={consultationInfo.ExaminationDate}
              onChange={handleChangeconsultationInfo}
              renderInput={(params) => (
              <TextField {...params} variant="standard" />
              )}
              error={consultationInfo.ExaminationDate === null} 
          />
          </LocalizationProvider>
          <FormHelperText error={true}>
          {consultationInfo.error_list?.ExaminationDate}           
          </FormHelperText> 
        </FormControl>
        <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="Mode-label">Mode</InputLabel>
              <Select labelId="Mode-select" id="Mode" name="Mode" value={consultationInfo.selectedMode} label="Mode"
                onChange={handleModeChange} 
              >
                <MenuItem value="ContinuousMode">Mode Continu</MenuItem>
                <MenuItem value="IntermittentMode">Mode intermittent</MenuItem>
                <MenuItem value="ContinuousInstillationMode">Mode instillation continu</MenuItem>
                <MenuItem value="IntermittentInstillationMode">Mode Intermittent instillation</MenuItem>
              </Select>
        </FormControl>
        {renderFormInputs()}
        {medicalMode.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        <ImageUpload />
    </Box>
  );
};
export default Mode;
