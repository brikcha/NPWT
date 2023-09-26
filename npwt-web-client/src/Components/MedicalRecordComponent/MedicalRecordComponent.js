import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField,FormHelperText, InputAdornment, OutlinedInput , FormControl, InputLabel, Select, MenuItem, Grid, Container, Typography, IconButton, Box,} from "@mui/material";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DoctorList from './DoctorList';
import Mode from './Mode';
import { Add } from '@mui/icons-material';

const MedicalRecordComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [consultations, setConsultations] = useState([]);
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);

  const addConsultation = () => {
    setConsultations([...consultations, {}]); 
  };

  const [accountPatientInfo, setAccountPatientInfo] = useState({
    firstName: "",lastName: "",gender: "",email: "",phoneNumber: "",firstExaminationDate: null,
    dateOfBirth: null,  medicalConditions: "", medicalHistory: "", governorate:"", 
    error_list: { firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '', governorate:'', gender:'', firstExaminationDate: '',medicalConditions: '', medicalHistory: ''
    },
  });
  const tunisianGovernorates = ["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Zaghouan","Tunis",];
  const [medicalRecordInfo, setMedicalRecordInfo] = useState({
    selectedMode: "",
    modeInputs: {
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
    },
    doctor: '',
  });
  const handleChangeAccountPatientInfo = (e) => {
    const { name, value } = e.target;
    setAccountPatientInfo((prevData) => ({
      ...prevData,
      [name]: value,
      error_list: {
        ...prevData.error_list,
        [name]: validateField(name, value), 
      },
    }));
  };
    const handleNext = () => {
      // Validate the form before proceeding to the next step
      const isFormValid = validateForm();
  
      if (isFormValid) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    };  
    const handleSubmit = (e) => {
      e.preventDefault();
      const isFormValid = validateForm();
      if (isFormValid) {
        test();
        console.log("Final Form Data:", { ...accountPatientInfo, ...medicalRecordInfo });
      }
    };
    const validateForm = () => {
      const isFirstNameEmpty = accountPatientInfo.firstName.trim() === '';
      const isLastNameEmpty = accountPatientInfo.lastName.trim() === '';
      const isGenderEmpty = accountPatientInfo.gender.trim() === ''; 
      const isGovernorateEmpty = accountPatientInfo.governorate.trim() === ''; 
      const isEmailEmpty = accountPatientInfo.email.trim() === '';
      const isPhoneNumberEmpty = accountPatientInfo.phoneNumber.trim() === '';
      const isDateOfBirthEmpty = accountPatientInfo.dateOfBirth === null;
      const isFirstExaminationDateEmpty = accountPatientInfo.firstExaminationDate === null;
      const isMedicalConditionsEmpty = accountPatientInfo.medicalConditions.trim() === '';
      const ismedicalHistoryEmpty = accountPatientInfo.medicalHistory.trim() === '';

      setAccountPatientInfo((prevData) => ({
        ...prevData,
        error_list: {
          ...prevData.error_list,
          firstName: isFirstNameEmpty ? 'Ce champ Prénom est requis.' : '',
          lastName: isLastNameEmpty ? 'Ce champ Nom de famille est requis.' : '',
          email: isEmailEmpty ? 'Ce champ Adresse e-mail est requis.' : '',
          gender: isGenderEmpty ? 'Ce champ Genre est requis.' : '',
          governorate: isGovernorateEmpty ? 'Ce champ Gouvernorat est requis.' : '',
          phoneNumber: isPhoneNumberEmpty ? 'Ce champ Numéro de téléphone est requis.' : '',
          dateOfBirth: isDateOfBirthEmpty ? 'Veuillez sélectionner votre date de naissance.' : '',
          firstExaminationDate: isFirstExaminationDateEmpty ? 'Veuillez sélectionner la date de la première consultation.' : '',
          medicalConditions: isMedicalConditionsEmpty ? 'Ce champ Conditions médicales est requis.' : '',
          medicalHistory: ismedicalHistoryEmpty ? 'Ce champ Antécédents médicaux est requis.' : '',          
        },
      }));
      return !(isFirstNameEmpty || isLastNameEmpty || isEmailEmpty || ismedicalHistoryEmpty || isMedicalConditionsEmpty ||isGenderEmpty || isGovernorateEmpty || isPhoneNumberEmpty || isDateOfBirthEmpty || isFirstExaminationDateEmpty);
    };
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName': case 'lastName': case 'email': case 'gender': case 'governorate': case 'governorate':
        return value.trim() === '' ? 'This field is required.' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format.' : '';
      case 'phoneNumber':
        return !/^[0-9]{8}$/.test(value) ? 'Invalid phone number format.' : '';
      default:
        return '';
    }
  };

  const handleChangemedicalRecordInfo = (e) => {
    const { name, value } = e.target;
    setMedicalRecordInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateOfBirthChange = (newValue) => {
    setAccountPatientInfo((prevData) => ({
      ...prevData,
      dateOfBirth: newValue,
    }));
  };
  const handlefirstExaminationDateChange = (newValue) => {
    setAccountPatientInfo((prevData) => ({
      ...prevData,
      firstExaminationDate: newValue,
    }));
  };
  async function test() {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/medical/medicalRecords`, {
      patientId: decodedToken.id
    });
    console.log(response.data);
  }
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  return (
  <>
        <img className="imgForm img-fluid d-none d-lg-block position-absolute" src="../assetsTemplates/templateForm/images/img.jpg" style={{ width: "100%", minHeight: "100vh" }}/>
        <div className="pb-4">
          <div className="container pt-lg-5 pb-lg-5">
            <div className="card col-12 col-lg-7 offset-lg-6">
              <div className="card-body styleCard">
                <div className="row align-items-center">
                    <div className="text-center">
                      <h3 className="font-weight-bold mb-0">Ajouter un nouveau dossier médical</h3>
                    </div>
                    <Container minWidth="lg" sx={{ mt: 4  }}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        <Step>
                          <StepLabel>Informations sur le patient</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Informations sur le dossier médical</StepLabel>
                        </Step>
                      </Stepper>
                        <Grid container direction="column" alignItems="center" spacing={2}>
                            <Grid item xs={12}>
                                {activeStep === 0 && (
                                    <>
                                        <Typography variant="h6" sx={{ textAlign:"center", margin:"20px" }}>Informations sur le patient</Typography>
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                        <InputLabel htmlFor="firstName" >Prénom</InputLabel>
                                                        <OutlinedInput id="firstName" type='texte' name="firstName" value={accountPatientInfo.firstName}
                                                        onChange={handleChangeAccountPatientInfo} placeholder='prénom'
                                                        endAdornment={<InputAdornment position="end"><PersonIcon/></InputAdornment> }  
                                                        error={!!accountPatientInfo.error_list?.firstName}  label="prénom" 
                                                    />
                                                        <FormHelperText error={true}>
                                                        {accountPatientInfo.error_list?.firstName}           
                                                    </FormHelperText> 
                                                    </FormControl>
                                                </Grid>                          
                                                <Grid item xs={6}>
                                                    <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                        <InputLabel htmlFor="lastName" >Nom</InputLabel>
                                                        <OutlinedInput id="lastName" type='texte' name="lastName" value={accountPatientInfo.lastName}
                                                        onChange={handleChangeAccountPatientInfo} placeholder='Nom'
                                                        endAdornment={<InputAdornment position="end"><PersonIcon/></InputAdornment> }  
                                                        error={!!accountPatientInfo.error_list?.lastName}  label="Nom" 
                                                    />
                                                        <FormHelperText error={true}>
                                                        {accountPatientInfo.error_list?.lastName}           
                                                    </FormHelperText> 
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                <InputLabel htmlFor="Email" >Adresse e-mail</InputLabel>
                                                <OutlinedInput id="email" type='email' name="email" value={accountPatientInfo.email}
                                                onChange={handleChangeAccountPatientInfo} placeholder='Adresse e-mail'
                                                endAdornment={<InputAdornment position="end"><EmailIcon/></InputAdornment> }  
                                                error={!!accountPatientInfo.error_list?.email}  label="Adresse e-mail" 
                                            />
                                                <FormHelperText error={true}>
                                                {accountPatientInfo.error_list?.email}           
                                            </FormHelperText> 
                                            </FormControl>
                                            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                <InputLabel htmlFor="Numéro de téléphone" >Numéro de téléphone</InputLabel>
                                                <OutlinedInput id="phoneNumber" type='tel' name="phoneNumber" value={accountPatientInfo.phoneNumber}
                                                onChange={handleChangeAccountPatientInfo} placeholder='Numéro de téléphone'
                                                endAdornment={<InputAdornment position="end"><PhoneIcon/></InputAdornment> }  
                                                error={!!accountPatientInfo.error_list?.phoneNumber}  label="Numéro de téléphone" 
                                              />
                                                  <FormHelperText error={true}>
                                                  {accountPatientInfo.error_list?.phoneNumber}           
                                              </FormHelperText> 
                                            </FormControl>
                                            <Grid container spacing={2}>
                                              <Grid item xs={6}>
                                                <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
                                                  <InputLabel id="governorate-label">Gouvernorat</InputLabel>
                                                  <Select labelId="governorate-select" id="governorate" name="governorate"
                                                    value={accountPatientInfo.governorate} label="Gouvernorat" onChange={handleChangeAccountPatientInfo}
                                                  >
                                                    {tunisianGovernorates.map((governorate) => (
                                                      <MenuItem key={governorate} value={governorate}>
                                                        {governorate}
                                                      </MenuItem>
                                                    ))}
                                                  </Select>
                                                  <FormHelperText error={true}>
                                                        {accountPatientInfo.error_list?.governorate}           
                                                      </FormHelperText> 
                                                </FormControl>     
                                              </Grid>
                                              <Grid item xs={6}>
                                                <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
                                                    <InputLabel id="gender-label">Genre</InputLabel>
                                                      <Select
                                                        labelId="gender-select"
                                                        id="gender"
                                                        name="gender"
                                                        value={accountPatientInfo.gender}
                                                        label="Gender"
                                                        onChange={handleChangeAccountPatientInfo} 
                                                      >
                                                        <MenuItem value=""></MenuItem>
                                                        <MenuItem value="Male">Masculin</MenuItem>
                                                         <MenuItem value="Female">Féminin</MenuItem>
                                                      </Select>
                                                      <FormHelperText error={true}>
                                                        {accountPatientInfo.error_list?.gender}           
                                                      </FormHelperText> 
                                                </FormControl>
                                              </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                              <Grid item xs={6}>
                                                  <FormControl sx={{ marginTop: 1.5 }} variant="outlined" color="primary" fullWidth>
                                                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                      <DatePicker
                                                          label="Date de naissance"
                                                          name="dateOfBirth"
                                                          value={accountPatientInfo.dateOfBirth}
                                                          onChange={handleDateOfBirthChange}
                                                          renderInput={(params) => (
                                                          <TextField {...params} variant="standard" />
                                                          )}
                                                          error={accountPatientInfo.dateOfBirth === null} 
                                                      />
                                                      </LocalizationProvider>
                                                      <FormHelperText error={true}>
                                                      {accountPatientInfo.error_list?.dateOfBirth}           
                                                  </FormHelperText> 
                                                  </FormControl>
                                              </Grid>
                                              <Grid item xs={6}>
                                                <FormControl sx={{ marginTop: 1.5 }} variant="outlined" color="primary">
                                                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                  <DatePicker
                                                      label="Date de 1er consultation"
                                                      name="firstExaminationDate"
                                                      value={accountPatientInfo.firstExaminationDate}
                                                      onChange={handlefirstExaminationDateChange}
                                                      renderInput={(params) => (
                                                      <TextField {...params} variant="standard" />
                                                      )}
                                                      error={accountPatientInfo.firstExaminationDate === null} 
                                                  />
                                                  </LocalizationProvider>
                                                  <FormHelperText error={true}>
                                                  {accountPatientInfo.error_list?.firstExaminationDate}           
                                              </FormHelperText> 
                                                </FormControl>
                                              </Grid>
                                            </Grid>
                                            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                <InputLabel htmlFor="Conditions médicales" >Conditions médicales</InputLabel>
                                                <OutlinedInput id="medicalConditions" type='tel' name="medicalConditions" value={accountPatientInfo.medicalConditions}
                                                onChange={handleChangeAccountPatientInfo} placeholder='Conditions médicales' rows={3} multiline
                                                error={!!accountPatientInfo.error_list?.medicalConditions}  label="Conditions médicales" 
                                                />
                                                <FormHelperText error={true}>
                                                    {accountPatientInfo.error_list?.medicalConditions}           
                                                </FormHelperText> 
                                            </FormControl>
                                            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                <InputLabel htmlFor="Medical History" >Antécédents médicaux</InputLabel>
                                                <OutlinedInput id="medicalHistory" type='tel' name="medicalHistory" value={accountPatientInfo.medicalHistory}
                                                onChange={handleChangeAccountPatientInfo} placeholder='Antécédents médicaux' rows={3} multiline
                                                error={!!accountPatientInfo.error_list?.medicalHistory}  label="Antécédents médicaux" 
                                              />
                                                  <FormHelperText error={true}>
                                                  {accountPatientInfo.error_list?.medicalHistory}           
                                              </FormHelperText> 
                                            </FormControl>
                                        </>
                                    </>
                                )}
                                {activeStep === 1 && (
                                  <>
                                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                                      <Typography variant="h6" sx={{ textAlign:"center", margin:"20px" }}>Informations sur les consultations</Typography>
                                      <Button variant="contained" color="primary" onClick={addConsultation }>
                                        <IconButton><Add/></IconButton>
                                      </Button>
                                  </div>
                                  <Box >
                                    {consultations.length===0?
                                      <Mode medicalRecordInfo={medicalRecordInfo} onChange={handleChangemedicalRecordInfo} />
                                      :  
                                      <>
                                        {consultations.map((consultation, index) => (
                                            <Mode
                                              key={index}
                                              medicalRecordInfo={medicalRecordInfo}
                                              onChange={handleChangemedicalRecordInfo}
                                            />
                                          ))} 
                                      </>
                                    }
                                  </Box>
                                  </>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={handleBack}>
                                      Retour
                                    </Button>
                                    {activeStep === 1 ? ( 
                                        <Button variant="contained" color="primary" onClick={handleSubmit}> Soumettre </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={handleNext}> Suivant </Button>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
              </div>
              </div>
            </div>
          </div>
        </div>
  </>
  );
};
export default MedicalRecordComponent;