import React, {useState,useEffect} from 'react'
import { Button, FormHelperText, OutlinedInput, FormControl, InputLabel, Select, MenuItem, Container, Box} from "@mui/material";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import DoctorList from './DoctorList';
import NurseList from './NurseList';
import PatientList from './PatientList';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DefaultImage from './upload-image.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function ConsultationAdd() {
  const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [userRole, setUserRole] = useState(null); 
    const dataConsultation= {
      patient_id: "",
      examinationDate: null,
      modeType:"ContinuousMode",
      modeInputs: {
        ContinuousMode: {
          Pressure: '',
        },
        IntermittentMode: {
          MinimumPressure:"",
          MinimumPressureDuration:"",
          MaximumPressure:"",
          MaximumPressureDuration:"",
        },
        ContinuousInstillationMode: {
          Pressure: "",
          PressureDuration: "",
          Volume: "",
          VolumeDuration : "",
        },
        IntermittentInstillationMode: {
          MinimumPressure: "",
          MinimumPressureDuration: "",
          MaximumPressure: "",
          MaximumPressureDuration: "",
          Volume: "",
          VolumeDuration: "",
        },
      },
      doctor: "",
      nurse: "",
      image: "",
      taillePlaies: "",
      pansement: "",
      referenceMachine: "",
      commentaire: [{
        commentaire_texte: '',
      }],    error_list: { 
        patient_id: '', examinationDate: '', modeType: '', doctor:'',
        nurse:'', image:'', taillePlaies:'', pansement:'', referenceMachine:'', commentaire:''
      },
    }
    const [consultationInfo, setConsultationInfo] = useState(dataConsultation);




  const resetConsultationForm = () => {
    setConsultationInfo(dataConsultation)
    setImage(null)
  };
  const handleChangeconsultationInfo = (e) => {
    const { name, value } = e.target;
      if (name === "commentaire") {
        setConsultationInfo((prevData) => ({
          ...prevData,
          commentaire: [{ commentaire_texte: e.target.value, user_id: userId }], 
        }));
        console.log("valeunen",e.target.value)
    } else {
      setConsultationInfo((prevData) => ({
        ...prevData,
        [name]: value,
        error_list: {
          ...prevData.error_list,
          [name]: validateField(name, value),
        },
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);  
    setConsultationInfo(prevData => ({
      ...prevData,
      image: selectedImage.name, 
    }));
  };
  const handleModeChange = (event) => {
    const selectedModeType = event.target.value;
    setConsultationInfo({
      ...consultationInfo,
      modeType: selectedModeType,
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setConsultationInfo((prevData) => ({
      ...prevData,
      modeInputs: {
        ...prevData.modeInputs,
        [prevData.modeType]: {
          ...prevData.modeInputs[prevData.modeType],
          [name]: value,
        },
      },
    }));
  };
  const handleExaminationDateChange = (newValue) => {
    setConsultationInfo((prevData) => ({
        ...prevData,
        examinationDate: newValue,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      const formData = new FormData(); 
      formData.append('image', image);
      formData.append('patient', consultationInfo.patient_id);
      formData.append('nurse', consultationInfo.nurse);
      formData.append('doctor', consultationInfo.doctor);
      formData.append('modeType', consultationInfo.modeType);
      formData.append('taillePlaies', consultationInfo.taillePlaies);
      formData.append('examinationDate', consultationInfo.examinationDate);
      formData.append('commentaire',JSON.stringify(consultationInfo.commentaire));      
      formData.append('pansement', consultationInfo.pansement);
      formData.append('referenceMachine', consultationInfo.referenceMachine);
      if(consultationInfo.modeType==="ContinuousMode"){
        formData.append('modeInputs.ContinuousMode.Pressure', consultationInfo.modeInputs.ContinuousMode.Pressure);
      }else if(consultationInfo.modeType==="IntermittentMode"){
        formData.append('modeInputs.IntermittentMode.MinimumPressure', consultationInfo.modeInputs.IntermittentMode.MinimumPressure);
        formData.append('modeInputs.IntermittentMode.MinimumPressureDuration', consultationInfo.modeInputs.IntermittentMode.MinimumPressureDuration);
        formData.append('modeInputs.IntermittentMode.MaximumPressure', consultationInfo.modeInputs.IntermittentMode.MaximumPressure);
        formData.append('modeInputs.IntermittentMode.MaximumPressureDuration', consultationInfo.modeInputs.IntermittentMode.MaximumPressureDuration);
      }else if(consultationInfo.modeType==="ContinuousInstillationMode"){
        formData.append('modeInputs.ContinuousInstillationMode.Pressure', consultationInfo.modeInputs.ContinuousInstillationMode.Pressure);
        formData.append('modeInputs.ContinuousInstillationMode.PressureDuration', consultationInfo.modeInputs.ContinuousInstillationMode.PressureDuration);
        formData.append('modeInputs.ContinuousInstillationMode.Volume', consultationInfo.modeInputs.ContinuousInstillationMode.Volume);
        formData.append('modeInputs.ContinuousInstillationMode.VolumeDuration', consultationInfo.modeInputs.ContinuousInstillationMode.VolumeDuration);
      }else if(consultationInfo.modeType==="IntermittentInstillationMode"){
        formData.append('modeInputs.IntermittentInstillationMode.MinimumPressure', consultationInfo.modeInputs.IntermittentInstillationMode.MinimumPressure);
        formData.append('modeInputs.IntermittentInstillationMode.MinimumPressureDuration', consultationInfo.modeInputs.IntermittentInstillationMode.MinimumPressureDuration);
        formData.append('modeInputs.IntermittentInstillationMode.MaximumPressure', consultationInfo.modeInputs.IntermittentInstillationMode.MaximumPressure);
        formData.append('modeInputs.IntermittentInstillationMode.MaximumPressureDuration', consultationInfo.modeInputs.IntermittentInstillationMode.MaximumPressureDuration);
        formData.append('modeInputs.IntermittentInstillationMode.Volume', consultationInfo.modeInputs.IntermittentInstillationMode.Volume);
        formData.append('modeInputs.IntermittentInstillationMode.VolumeDuration', consultationInfo.modeInputs.IntermittentInstillationMode.VolumeDuration);
      }
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/medical/addMedical`, formData, {
          headers: {
              "Content-type": "multipart/form-data",
          }                  
        });
        resetConsultationForm()
        setImage(null);
        Swal.fire({
          title: 'Nouveau Consulation',
          text: 'Nouveau Consulation ajouté avec succes!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        navigate(-1);

      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Nouveau Consulation',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  };
  const validateForm = () => {
    const isexaminationDateEmpty = consultationInfo.examinationDate === null;
    setConsultationInfo((prevData) => ({
      ...prevData,
      error_list: {
        ...prevData.error_list,
      },
    }));
    return !(false);
  };
  const validateField = (name, value) => {
        switch (name) {
        // case 'firstName': case 'lastName': case 'email': case 'gender': case 'governorate': case 'governorate':
        // return value.trim() === '' ? 'This field is required.' : '';
        default:
        return '';
        }
  };    
  return (
    <Container className='py-3'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-center'>Ajouter Consulation</h2>
        <Box className='row' >
          <div className="col-6">
            <Container maxWidth="md" sx={{ my: 2 , position: "relative" , border:"2px dashed blue",
             borderRadius:"20px", height:"280px"}}> 
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{ position:"absolute", top:"-30px", right:"-30px" }}
                >
                  <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                  <PhotoCamera sx={{ fontSize:"50px"}}/>
                </IconButton>
                  {image !== null ? (
                    <div style={ {"display": "flex", "alignItems": "center", "justifyContent": "center"}}>
                      <img src={URL.createObjectURL(image)} alt="Image" 
                      style={{ width: "95%", height: "250px", margin: "2.5%"  }} />
                    </div>
                  ) : (
                    <img src={DefaultImage} alt="Image" 
                    style={{ width: "70%", height: "250px", margin: "2.5% 15%" }} />
                    )}
            </Container>
            <DoctorList setConsultationInfo={setConsultationInfo} />
            <NurseList setConsultationInfo={setConsultationInfo} />
            <PatientList setConsultationInfo={setConsultationInfo} />
          </div>
          <div className="col-6">
              <FormControl sx={{ marginTop: 1.5 }} variant="outlined" color="primary">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date de consultation"
                    name="ExaminationDate"
                    value={consultationInfo.examinationDate}
                    onChange={handleExaminationDateChange}
                    slotProps={{ textField: { size: 'small' } }}
                    error={consultationInfo.examinationDate === null} 
                />
                </LocalizationProvider>
                <FormHelperText error={true}>
                {consultationInfo.error_list?.examinationDate}           
                </FormHelperText> 
              </FormControl>
              <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
                  <InputLabel id="Mode-label" htmlFor="modeType">Type de mode</InputLabel>
                    <Select labelId="Mode-select" id="modeType" name="modeType" 
                      value={consultationInfo.modeType} label="modeType"
                      onChange={handleModeChange} 
                    >
                      <MenuItem value="ContinuousMode">Mode Continu</MenuItem>
                      <MenuItem value="IntermittentMode">Mode intermittent</MenuItem>
                      <MenuItem value="ContinuousInstillationMode">Mode instillation continu</MenuItem>
                      <MenuItem value="IntermittentInstillationMode">Mode Intermittent instillation</MenuItem>
                    </Select>
              </FormControl>
              <div style={{ display:'grid', gridTemplateColumns:'50% 50%', gap:"1%"  }}>
                {Object.keys(consultationInfo.modeInputs[consultationInfo.modeType]).map((inputName) => (
                    <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth key={inputName}>
                      <InputLabel  htmlFor={inputName} >{inputName}:</InputLabel>
                        <OutlinedInput  id={inputName} type='number'  name={inputName} 
                          value={consultationInfo.modeInputs[consultationInfo.modeType][inputName]}
                          onChange={handleInputChange} placeholder={inputName}
                          // error={!!consultationInfo.error_list?.modeInputs[consultationInfo.modeType][inputName]} 
                        />
                        <FormHelperText error={true}>
                          {/* {consultationInfo.error_list?.modeInputs[consultationInfo.modeType][inputName]}            */}
                        </FormHelperText> 
                    </FormControl>
                ))}
              </div>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel htmlFor="taillePlaies">Taille Plaies</InputLabel>
                <OutlinedInput
                  id="taillePlaies"
                  type="text"
                  name="taillePlaies"
                  value={consultationInfo.taillePlaies}
                  onChange={handleChangeconsultationInfo}
                  placeholder="Taille Plaies"
                  error={!!consultationInfo.error_list?.taillePlaies}
                  label="Taille Plaies"
                />
                <FormHelperText error={true}>
                  {consultationInfo.error_list?.taillePlaies}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel id="pansement-label">Pansement</InputLabel>
                <Select
                  labelId="pansement-select"
                  id="pansement"
                  name="pansement"
                  value={consultationInfo.pansement}
                  label="Pansement"
                  onChange={handleChangeconsultationInfo}
                >
                  <MenuItem value="small">Petit</MenuItem>
                  <MenuItem value="medium">Moyen</MenuItem>
                  <MenuItem value="large">Grand</MenuItem>
                </Select>
                <FormHelperText error={true}>
                  {consultationInfo.error_list?.pansement}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel htmlFor="referenceMachine">Référence Machine</InputLabel>
                <OutlinedInput
                  id="referenceMachine"
                  type="text"
                  name="referenceMachine"
                  value={consultationInfo.referenceMachine}
                  onChange={handleChangeconsultationInfo}
                  placeholder="Référence Machine"
                  error={!!consultationInfo.error_list?.referenceMachine}
                  label="Référence Machine"
                />
                <FormHelperText error={true}>
                  {consultationInfo.error_list?.referenceMachine}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ marginTop: 1 }} variant="outlined" color="primary" fullWidth>
                <InputLabel htmlFor="commentaire">Commentaire</InputLabel>
                <OutlinedInput id="commentaire" type="text" name="commentaire"
      value={consultationInfo.commentaire[0].commentaire_texte.length > 0 ? consultationInfo.commentaire[0].commentaire_texte : ''}
      onChange={handleChangeconsultationInfo} placeholder="Commentaire" 
                  error={!!consultationInfo.error_list?.commentaire} label="Commentaire"
                />
                <FormHelperText error={true}>
                  {consultationInfo.error_list?.commentaire}
                </FormHelperText>
              </FormControl>
            </div>
        </Box>
        <div className='text-center mt-2'>
            <Button variant='outlined' sx={{ textTransform:"capitalize" }} 
      onClick={() => navigate(-1)}>Retour</Button>
            <Button type='submit' variant="contained" color="primary" 
              sx={{ textTransform:"capitalize", marginLeft:"10px" }}>
              Ajouter consultation
            </Button>
        </div>
      </form>
  </Container>
  )
}