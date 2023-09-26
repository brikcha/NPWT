import React, {useState} from 'react'
import {FormHelperText, InputAdornment, OutlinedInput , Button, FormControl, InputLabel, Select, MenuItem, 
    Grid, Container, Typography} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

export default function PatientAdd({handleClickOpenNbConsult,handlePatientAdded}) {
    const tunisianGovernorates = ["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Zaghouan","Tunis",];
    const [accountPatientInfo, setAccountPatientInfo] = useState({
        firstName: "",lastName: "",gender: "",email: "",phoneNumber: "",firstExaminationDate: null,
        dateOfBirth: null, medicalConditions: "", governorate:"", 
        error_list: { firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '', governorate:'', 
            gender:'', firstExaminationDate: '',medicalConditions: ''
        },
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            try {
                const response = await addMedicalRecord(accountPatientInfo);
                console.log("Response Data:", response.data);
                console.log("Final Form Data:", { ...accountPatientInfo });
                handleClickOpenNbConsult()
            } catch (error) {
                Swal.fire({
                    title: "Erreur lors de l'ajout d'un nouveau patient.!",
                    text: `${error.response.data.error}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        }
    };
    const addMedicalRecord = async (patientInfo) => {
        try {
            const postData = { ...patientInfo };
            const url2 = `${process.env.REACT_APP_BACKEND_URL}/medical-patient/addMedicalRecordPatient`;
            const response = await axios.post(url2, postData);
    
            if (response.data && response.data._id) {
                handlePatientAdded(response.data._id);
                console.log("Medical record added with ID:", response.data._id);
            } else {
                console.log("Unexpected response data:", response.data);
            }
    
            return response;
        } catch (error) {
            Swal.fire({
                title: "Patient: Erreur222 lors de l'ajout d'un nouveau patient.!",
                text: `${error}`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            throw error; 
        }
    };
    
    const validateForm = () => {
        const isFirstNameEmpty = accountPatientInfo.firstName.trim() === '';
        const isLastNameEmpty = accountPatientInfo.lastName.trim() === '';
        const isGenderEmpty = accountPatientInfo.gender.trim() === ''; 
        const isEmailInvalide = accountPatientInfo.email && !/\S+@\S+\.\S+/.test(accountPatientInfo.email);
        const isPhoneNumberInvalid =accountPatientInfo.phoneNumber && !/^[0-9]{8}$/.test(accountPatientInfo.phoneNumber) ;
        const isFirstExaminationDateEmpty = accountPatientInfo.firstExaminationDate === null;
        const isMedicalConditionsEmpty = accountPatientInfo.medicalConditions.trim() === '';
       
        setAccountPatientInfo((prevData) => ({
        ...prevData,
        error_list: {
        ...prevData.error_list,
        firstName: isFirstNameEmpty ? 'Champ Prénom est requis.' : '',
        lastName: isLastNameEmpty ? 'Champ Nom de famille est requis.' : '',
        email: isEmailInvalide ? 'Champ Adresse e-mail est invalide.' : '',
        gender: isGenderEmpty ? 'Champ Genre est requis.' : '',
        phoneNumber: isPhoneNumberInvalid ? 'Champ Numéro de téléphone est invalide.' : '',
        firstExaminationDate: isFirstExaminationDateEmpty ? 'Champ date première consultation est requis.' : '',
        medicalConditions: isMedicalConditionsEmpty ? 'Champ Conditions médicales est requis.' : '',
        },
        }));
        return !(isFirstNameEmpty || isLastNameEmpty || isEmailInvalide  || isMedicalConditionsEmpty ||isGenderEmpty  || isPhoneNumberInvalid  || isFirstExaminationDateEmpty);
    };
    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
                return value.trim() === '' ? 'Champ Prénom est requis.' : '';
            case 'lastName':
                return value.trim() === '' ? 'Champ Nom de famille est requis.' : '';
            case 'gender':
                return value.trim() === '' ? 'Champ Genre est requis.' : '';
            case 'email':
                return  (accountPatientInfo.email==="" && !/\S+@\S+\.\S+/.test(value)) ? 'Champ Adresse e-mail est invalide.' : '';
            case 'phoneNumber':
                return (accountPatientInfo.phoneNumber && !/^[0-9]{8}$/.test(value) ) ? 'Champ Numéro de téléphone est invalide.' : '';
            default:
                return '';
        }
    };
    
    return (
        <div className="container mb-4">
            <div className="card col-12 col-lg-6 offset-lg-6">
                    <div className="styleCard py-4 px-2 ">
                        <div className="row align-items-center">
                            <Container>
                                <Typography variant="h6" color="primary" sx={{ textAlign:"center" }}>Ajouter un nouveau patient</Typography>
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                                                <InputLabel htmlFor="firstName" >Prénom</InputLabel>
                                                <OutlinedInput id="firstName" type='texte' name="firstName" value={accountPatientInfo.firstName}
                                                    onChange={handleChangeAccountPatientInfo} placeholder='prénom'
                                                    endAdornment={<InputAdornment position="end"><PersonIcon/></InputAdornment> } 
                                                    error={!!accountPatientInfo.error_list?.firstName} label="prénom" 
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
                                                    error={!!accountPatientInfo.error_list?.lastName} label="Nom" 
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
                                            error={!!accountPatientInfo.error_list?.email} label="Adresse e-mail" 
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
                                            error={!!accountPatientInfo.error_list?.phoneNumber} label="Numéro de téléphone" 
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
                                                    <MenuItem value="Masculin">Masculin</MenuItem>
                                                    <MenuItem value="Feminin">Féminin</MenuItem>
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
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Date de naissance"
                                                        name="dateOfBirth"
                                                        format="DD-MM-YYYY"
                                                        value={accountPatientInfo.dateOfBirth}
                                                        onChange={handleDateOfBirthChange}
                                                        slotProps={{ textField: { size: 'small',} }}
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
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Date de 1er consultation"
                                                        name="firstExaminationDate"
                                                        format="DD-MM-YYYY"
                                                        value={accountPatientInfo.firstExaminationDate}
                                                        onChange={handlefirstExaminationDateChange}
                                                        slotProps={{ textField: { size: 'small' } }}
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
                                            error={!!accountPatientInfo.error_list?.medicalConditions} label="Conditions médicales" 
                                        />
                                        <FormHelperText error={true}>
                                            {accountPatientInfo.error_list?.medicalConditions} 
                                        </FormHelperText> 
                                    </FormControl>
                                </>
                                <div className='text-center mt-2'>
                                    <Link to="/medicalrecord/patients/cards"><Button variant='outlined' sx={{ mr:1, textTransform:"capitalize" }}>Retour</Button></Link>
                                    <Button variant="contained" color="primary" 
                                     onClick={handleSubmit} sx={{ textTransform:"capitalize" }}
                                    > Ajouter </Button>
                                </div>
                            </Container>
                        </div>
                    </div>
            </div>
        </div>
    )
}
