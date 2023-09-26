import { Box, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import DoctorList from './DoctorList';

const Mode = (medicalRecordInfo, handleChangemedicalRecordInfo) => {
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

  const handleAddMedicalMode = () => {
    // Implement logic to add medical history to the array
    // You can use setMedicalMode to update the state
  };

  const renderFormInputs = () => {
    if (selectedMode === "ContinuousMode") {
      return (
        <div>
           <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel htmlFor="Pressure" >Pressure </InputLabel>
                <OutlinedInput id="Pressure" type='number' name="Pressure" value={medicalRecordInfo.Pressure}
                    onChange={handleChangemedicalRecordInfo} placeholder='Pressure'
                    error={!!medicalRecordInfo.error_list?.Pressure}  label="Pressure" 
                />
                <FormHelperText error={true}>
                {medicalRecordInfo.error_list?.Pressure}           
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
                    <InputLabel htmlFor="MinimumPressure" >Minimum Pressure</InputLabel>
                    <OutlinedInput id="MinimumPressure" type='number' name="MinimumPressure" value={medicalRecordInfo.Pressure}
                        onChange={handleChangemedicalRecordInfo} placeholder='Minimum Pressure'
                        error={!!medicalRecordInfo.error_list?.MinimumPressure}  label="MinimumPressure" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.MinimumPressure}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MinimumPressureDuration" >Minimum Pressure Duration</InputLabel>
                    <OutlinedInput id="MinimumPressureDuration" type='number' name="MinimumPressureDuration" value={medicalRecordInfo.MinimumPressureDuration}
                        onChange={handleChangemedicalRecordInfo} placeholder='Minimum Pressure Duration'
                        error={!!medicalRecordInfo.error_list?.MinimumPressureDuration}  label="MinimumPressureDuration" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.MinimumPressureDuration}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MaximumPressure" >Maximum Pressure</InputLabel>
                    <OutlinedInput id="MaximumPressure" type='number' name="Pressure" value={medicalRecordInfo.MaximumPressure}
                        onChange={handleChangemedicalRecordInfo} placeholder='Maximum Pressure'
                        error={!!medicalRecordInfo.error_list?.MaximumPressure}  label="MaximumPressure" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.MaximumPressure}           
                    </FormHelperText> 
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="MaximumPressureDuration" >MaximumPressureDuration</InputLabel>
                    <OutlinedInput id="Pressure" type='number' name="MaximumPressureDuration" value={medicalRecordInfo.MaximumPressureDuration}
                        onChange={handleChangemedicalRecordInfo} placeholder='Maximum Pressure Duration'
                        error={!!medicalRecordInfo.error_list?.MaximumPressureDuration}  label="MaximumPressureDuration" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.MaximumPressureDuration}           
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
                    <InputLabel htmlFor="Pressure" >Pressure</InputLabel>
                    <OutlinedInput id="Pressure" type='number' name="Pressure" value={medicalRecordInfo.Pressure}
                        onChange={handleChangemedicalRecordInfo} placeholder='Pressure'
                        error={!!medicalRecordInfo.error_list?.Pressure}  label="Pressure" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.Pressure}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="PressureDuration" >Pressure Duration</InputLabel>
                    <OutlinedInput id="PressureDuration" type='number' name="PressureDuration" value={medicalRecordInfo.PressureDuration}
                        onChange={handleChangemedicalRecordInfo} placeholder='PressureDuration'
                        error={!!medicalRecordInfo.error_list?.PressureDuration}  label="Pressure Duration" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.PressureDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="Volume" >Volume</InputLabel>
                    <OutlinedInput id="Volume" type='number' name="Volume" value={medicalRecordInfo.Volume}
                        onChange={handleChangemedicalRecordInfo} placeholder='Volume'
                        error={!!medicalRecordInfo.error_list?.Volume}  label="Volume" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.Volume}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="VolumeDuration" >Volume Duration</InputLabel>
                    <OutlinedInput id="VolumeDuration" type='number' name="VolumeDuration" value={medicalRecordInfo.VolumeDuration}
                        onChange={handleChangemedicalRecordInfo} placeholder='Volume Duration (Operating Time + Rest Time)'
                        error={!!medicalRecordInfo.error_list?.VolumeDuration}  label="VolumeDuration" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.VolumeDuration}           
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
                  <InputLabel htmlFor="Pressure" >Pressure</InputLabel>
                  <OutlinedInput id="Pressure" type='number' name="Pressure" value={medicalRecordInfo.Pressure}
                      onChange={handleChangemedicalRecordInfo} placeholder='Pressure'
                      error={!!medicalRecordInfo.error_list?.Pressure}  label="Pressure" 
                  />
                  <FormHelperText error={true}>
                  {medicalRecordInfo.error_list?.Pressure}           
                  </FormHelperText> 
            </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="PressureDuration" >Pressure Duration</InputLabel>
                    <OutlinedInput id="PressureDuration" type='number' name="PressureDuration" value={medicalRecordInfo.PressureDuration}
                        onChange={handleChangemedicalRecordInfo} placeholder='PressureDuration'
                        error={!!medicalRecordInfo.error_list?.PressureDuration}  label="Pressure Duration" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.PressureDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="Volume" >Volume</InputLabel>
                    <OutlinedInput id="Volume" type='number' name="Volume" value={medicalRecordInfo.Volume}
                        onChange={handleChangemedicalRecordInfo} placeholder='Volume'
                        error={!!medicalRecordInfo.error_list?.Volume}  label="Volume" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.Volume}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="VolumeDuration" >Volume Duration</InputLabel>
                    <OutlinedInput id="VolumeDuration" type='number' name="VolumeDuration" value={medicalRecordInfo.VolumeDuration}
                        onChange={handleChangemedicalRecordInfo} placeholder='Volume Duration (Operating Time + Rest Time)'
                        error={!!medicalRecordInfo.error_list?.VolumeDuration}  label="VolumeDuration" 
                    />
                    <FormHelperText error={true}>
                    {medicalRecordInfo.error_list?.VolumeDuration}           
                    </FormHelperText> 
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                  <InputLabel htmlFor="Volume" >Volume</InputLabel>
                  <OutlinedInput id="Volume" type='number' name="Volume" value={medicalRecordInfo.Volume}
                      onChange={handleChangemedicalRecordInfo} placeholder='Volume'
                      error={!!medicalRecordInfo.error_list?.Volume}  label="Volume" 
                  />
                  <FormHelperText error={true}>
                  {medicalRecordInfo.error_list?.Volume}           
                  </FormHelperText> 
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel htmlFor="VolumeDuration" >Volume Duration</InputLabel>
                <OutlinedInput id="VolumeDuration" type='number' name="VolumeDuration" value={medicalRecordInfo.VolumeDuration}
                    onChange={handleChangemedicalRecordInfo} placeholder='Volume Duration (Operating Time + Rest Time)'
                    error={!!medicalRecordInfo.error_list?.VolumeDuration}  label="VolumeDuration" 
                />
                <FormHelperText error={true}>
                {medicalRecordInfo.error_list?.VolumeDuration}           
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
        <DoctorList data={medicalRecordInfo} onChange={handleChangemedicalRecordInfo} />
        <FormControl sx={{ marginTop: 1.5 }} variant="outlined" color="primary">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
              label="Date de consultation"
              name="ExaminationDate"
              value={medicalRecordInfo.ExaminationDate}
              onChange={handleChangemedicalRecordInfo}
              renderInput={(params) => (
              <TextField {...params} variant="standard" />
              )}
              error={medicalRecordInfo.ExaminationDate === null} 
          />
          </LocalizationProvider>
          <FormHelperText error={true}>
          {medicalRecordInfo.error_list?.ExaminationDate}           
          </FormHelperText> 
        </FormControl>
        <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="Mode-label">Mode</InputLabel>
              <Select labelId="Mode-select" id="Mode" name="Mode" value={medicalRecordInfo.selectedMode} label="Mode"
                onChange={handleModeChange} 
              >
                <MenuItem value="ContinuousMode">Continuous Mode</MenuItem>
                <MenuItem value="IntermittentMode">Intermittent Mode</MenuItem>
                <MenuItem value="ContinuousInstillationMode">Continuous Instillation Mode</MenuItem>
                <MenuItem value="IntermittentInstillationMode">Intermittent Instillation Mode</MenuItem>
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
