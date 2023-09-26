import React, { useState, useEffect } from 'react';
import { blue } from '@mui/material/colors';
import TireRepairIcon from '@mui/icons-material/TireRepair';
import TimerIcon from '@mui/icons-material/Timer';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Grid, List,Box, ListItem,Divider, ListItemButton, ListItemIcon,
    Card, CardHeader, CardContent, Avatar, Typography, Button,
    Dialog, DialogActions, DialogContent,SpeedDial,SpeedDialAction, DialogTitle, TextField, InputLabel, FormControl, 
    Select, MenuItem, IconButton} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { QuestionMark } from '@mui/icons-material';
import HealingIcon from '@mui/icons-material/Healing';
import {FaUserNurse, FaUserMd} from 'react-icons/fa'
import {GiScarWound} from 'react-icons/gi'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DefaultProfileImage from '../../../defaultProfile.jpg';
import Slide from '@mui/material/Slide';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import * as api from '../../MedicalRecordComponent/api/index';
import ConsultationGallery from './SingleCard/ConsultationGallery';
import UserChip from './SearchList/UserChip';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DefaultImage from '../../../upload-image.png'
import CloseIcon from '@mui/icons-material/Close';
import { FormGroup, Label, Input } from 'reactstrap';
import DoctorList from '../../../Components/MedicalRecordComponent/Consultation/SearchList/DoctorList'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ControlledOpenSpeedDial({ handleClickOpenDetails,handleClickOpenGallery,handleClickOpenEdit,
  handleClickOpenDelete  }) {
  const actions = [
    { icon: <RemoveRedEyeIcon />, name: 'Détails consultation', color:"#5e72e4", backgroundColor:"whitesmoke" },
    { icon: <PhotoLibraryIcon />, name: 'Galerie de photos de plaies', color:"white", backgroundColor:"#89CFF0" },
    { icon: <EditIcon />, name: 'Edit' , color:"#525f7f", backgroundColor:"rgb(237, 226, 14)"},
    { icon: <DeleteIcon />, name: 'Delete', color:"white", backgroundColor:"#f5365c" },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleActionClick = (actionName) => {
    if (actionName === 'Delete') {
      handleClickOpenDelete();
    } else if (actionName === 'Edit') {
      handleClickOpenEdit();
    }else if (actionName === 'Détails consultation') {
      handleClickOpenDetails();
    }else if (actionName === 'Galerie de photos de plaies') {
      handleClickOpenGallery()
    }
  };
  return (
   <div>
      <SpeedDial  ariaLabel="actions icons" icon={<QuestionMark />}   sx={{  position:"absolute", top:"-65px", right:"10px" }}
        onClose={handleClose}  onOpen={handleOpen}  open={open}  direction="down">
        {actions.map((action, index) => (
          <SpeedDialAction key={action.name} icon={action.icon} 
             tooltipTitle={action.name} onClick={() => handleActionClick(action.name)} 
             sx={{color:action.color , backgroundColor:action.backgroundColor, margin:"2px 0"}}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
const ConsultationSingleCard = ({index,record,consultationNumber}) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [swiperKey, setSwiperKey] = useState(0); 
  const [activeSlideIndex, setActiveSlideIndex] = useState(consultationNumber - 1);
  const [hovered, setHovered] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const handleClickOpenDetails = () => {  setOpenDetails(true);};
  const handleCloseDetails = () => {setOpenDetails(false);};
  
  const [openDelete, setOpenDelete] = useState(false);
  const [consultationId, setConsultationId] = useState(null);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  
  // delete consultation 
  const handleClickOpenDelete = (consultationId) => {
    setSelectedConsultationId(consultationId);
    setConsultationId(consultationId); 
    setOpenDelete(true);
  };
  const handleConfirmDelete = async () => {
  try {
  await handleDeleteConsultation(selectedConsultationId); 
  console.log("selecte",selectedConsultationId)
  handleCloseDelete();
  // Mettez à jour votre état ou effectuez d'autres actions nécessaires
  } catch (error) {
  console.error(error);
  }
  };
  
  const handleDeleteConsultation = async (consultationId) => {
  try {
    const response = await api.deleteMedical(record._id);
  } catch (error) {
    console.error(error);
  }
  };
  const handleCloseDelete = () => { setOpenDelete(false);};

  const [openGallery, setOpenGallery] = useState(false);
  const handleCloseGallery = () => { setOpenGallery(false);};
  const handleClickOpenGallery = () => { setOpenGallery(true);
    setSwiperKey(prevKey => prevKey + 1); 
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/medical/images/${record.patient_id}`)
    .then(response => response.json())
      .then(data => setImageUrls(data))
      .catch(error => console.error(error));
  }, [record.patient_id]);

  const token = localStorage.getItem('jwtToken');
  const [user_id, setUserId] = useState('');
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const id = decodedToken.id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          setUserId(response.data._id)
        })
    }
  }, []);
  const [commentaire, setCommentaire] = useState('');
  const handleAjouterCommentaire = async () => {
    try {
      const newCommentaire = {
        commentaire_texte: commentaire,
        user_id: user_id
      };
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/medical/newCommentaire/${record._id}`, {
        commentaire: newCommentaire
      });
      setCommentaire('');
      handleCloseDetails();
      window.location.reload();  
    } catch (error) {
      console.error('Error adding new commentaire:', error);
    }
  };

  const handleAnnulerCommentaire = () => {
    setCommentaire('');
  };

  const getColorForMode = (modeType) => {
    switch (modeType) {
      case "ContinuousMode":
        return "#B9FFB9"; 
      case "IntermittentMode":
        return "#8FDCF1"; 
      case "ContinuousInstillationMode":
        return "#F6BCBC"; 
      case "IntermittentInstillationMode":
        return "#FFFF99"; 
      default:
        return ""; 
    }
  };
  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${day}-${month}-${year}`;
    }
    return dateString;
  };
  const renderModeData = (modeType, modeInputs) => {
    switch (modeType) {
      case "ContinuousMode":
        return (
          <Box sx={{ width: '100%', bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
           <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TireRepairIcon/>
                  </ListItemIcon>
                  <Typography>Pression: {modeInputs.ContinuousMode.Pressure}</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case "IntermittentMode":
        return (
          <Box sx={{ width: '100%', bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
            <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression min: {modeInputs.IntermittentMode.MinimumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression min: {modeInputs.IntermittentMode.MinimumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression max: {modeInputs.IntermittentMode.MaximumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression max: {modeInputs.IntermittentMode.MaximumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case "ContinuousInstillationMode":
        return (
          <Box sx={{ width: '100%', bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
            <List component="nav">
              <ListItem disablePadding >
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression: {modeInputs.ContinuousInstillationMode.Pressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression: {modeInputs.ContinuousInstillationMode.PressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <VolumeUpIcon/> </ListItemIcon>
                  <Typography> Volume: {modeInputs.ContinuousInstillationMode.Volume} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée volume (Temps fonctionnement + Temps repos): {modeInputs.ContinuousInstillationMode.VolumeDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case "IntermittentInstillationMode":
        return (
          <Box sx={{ width: '100%', bgcolor: '#FFFBFB', marginBottom:"10px"}}>            
            <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression min: {modeInputs.IntermittentInstillationMode.MinimumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression min: {modeInputs.IntermittentInstillationMode.MinimumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression Max: {modeInputs.IntermittentInstillationMode.MaximumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression Max: {modeInputs.IntermittentInstillationMode.MaximumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <VolumeUpIcon/> </ListItemIcon>
                  <Typography> Volume: {modeInputs.IntermittentInstillationMode.Volume} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée volume (Temps fonctionnement + Temps repos): {modeInputs.IntermittentInstillationMode.VolumeDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>  
        );
      default:
        return null;
    }
  };
  const ModeTypeData = (modeType) => {
    switch (modeType) {
      case "ContinuousMode":
        return "Mode Continu";
      case "IntermittentMode":
        return "Mode intermittent:";
      case "ContinuousInstillationMode":
        return "Mode instillation continu";
      case "IntermittentInstillationMode":
        return "Mode Intermittent instillation";
      default:
        return null;
    }
  };
  const infoItems = [ 
  {
    icon: <FaUserMd style={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
    title: 'Médecin',
    value: <UserChip data={record.doctor}/> , 
  },
  {
    icon: <FaUserNurse style={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
    title: 'Infirmière',
    value: <UserChip data={record.nurse}/>,
  },
  {
    icon: <HealingIcon sx={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
    title: 'Pansement',
    value: record.pansement,
  },
  {
    icon: <MonitorHeartIcon sx={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
    title: 'Référence machine',
    value: record.referenceMachine,
  },  
  {
    icon: <GiScarWound style={{ color:"rgb(25, 118, 210)", fontSize:"22px",marginTop:"-10px" }}/>,
    title: 'Taille de la plaie',
    value: record.taillePlaies,
  }
  ];
  const infoItemsDetails = [ 
    {
      icon: <CalendarMonthIcon style={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
      title: 'Date du consultation',
      value: record.examinationDate ? formatDate(record.examinationDate.slice(0,10)):"",
    }, 
     {
      icon: <FaUserMd style={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
      title: 'Médecin',
      value:<UserChip data={record.doctor}/>,
    },
    {
      icon: <FaUserNurse style={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
      title: 'Infirmière',
      value:<UserChip data={record.nurse}/>,
    },
    {
      icon: <HealingIcon sx={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
      title: 'Pansement',
      value: record.pansement,
    },
    {
      icon: <MonitorHeartIcon sx={{ color:"rgb(25, 118, 210)", fontSize:"20px",marginTop:"-8px" }}/>,
      title: 'Référence machine',
      value: record.referenceMachine,
    },  
    {
      icon: <GiScarWound style={{ color:"rgb(25, 118, 210)", fontSize:"22px",marginTop:"-10px" }}/>,
      title: 'Taille de la plaie',
      value: record.taillePlaies,
    }
    ];


// update consultation
  const [editDetails, setEditDetails] = useState({
  // Initialize with the current consultation details
    doctor: record.doctor,
    nurse: record.nurse, 
    pansement: record.pansement,
    referenceMachine: record.referenceMachine,
    taillePlaies: record.taillePlaies,
    examinationDate:record.examinationDate,
    modeType:record.modeType,
    modeInputs:record.modeInputs,
    

    // Add more fields as needed
  });
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => { setOpenEdit(false);};
 
  const handleClickOpenEdit = () => {
    setEditDetails({
      // doctor: record.doctor.firstName+' '+record.doctor.lastName,
      // nurse: record.nurse.firstName+' '+record.nurse.lastName,
      pansement: record.pansement,
      referenceMachine: record.referenceMachine,
      taillePlaies: record.taillePlaies,
      modeType: record.modeType,
      examinationDate: record.examinationDate,
      modeInputs: record.modeInputs,
      // Add more fields as needed
      // Add the additional fields here
    });
    setOpenEdit(true);
  };
  
  const handleEditFormChange = (field, value) => {
    if (field.startsWith('modeInputs.')) {
      const [modeType, inputName] = field.split('.').slice(1);
      setEditDetails((prevData) => ({
        ...prevData,
        modeInputs: {
          ...prevData.modeInputs,
          [modeType]: {
            ...prevData.modeInputs[modeType],
            [inputName]: value,
          },
        },
      }));
    } else if (field === 'examinationDate' || field === 'modeType' || field === 'taillePlaies') {
      setEditDetails((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    } else {
      setEditDetails((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };
  
  const handleEditSubmit = async () => {
    try {
      // Mettez à jour les autres champs sans changer l'image
      await api.updateMedical(record._id, editDetails);
  
      // Fermez le dialogue d'édition et effectuez les actions nécessaires
      setOpenEdit(false); // Fermez le dialogue d'édition
      // Rafraîchissez les données ou mettez à jour l'état si nécessaire
    } catch (error) {
      console.error('Error updating consultation:', error);
    }
};
  

  const [editImage, setEditImage] = useState(null);

  const handleEditImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setEditImage(selectedImage);
  };
    return (
        <>
          <Grid item lg={4} xs={12} sm={6} key={index}> 
            <Card onMouseEnter={()=> setHovered(true)}
              onMouseLeave={()=> setHovered(false)}
              sx={{
                backgroundColor: getColorForMode(record.modeType),
                transform: hovered ? 'translateY(-10px) rotateX(10deg)' : 'none',
                transition: 'transform 0.3s ease-in-out',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <CardHeader
                title={ <Typography sx={{ display:"flex" }} color="primary">{ModeTypeData(record.modeType)}</Typography>}
                subheader={<Typography variant='body2' sx={{ display:"flex" }}>{formatDate(record.examinationDate.slice(0,10))}</Typography>}
                 avatar={
                <Avatar sx={{ width: 46, height: 46 ,fontSize:"28px",bgcolor: blue[700]}}>{consultationNumber}</Avatar>}       
      />

            <CardContent style={{ display:"grid",gridTemplateColumns:"100% 16%", gap:"2%" , position:"relative" }}>
              <Box>
                {infoItems.map((item, index) => (
                  <div key={index} style={{ display:"grid", gridTemplateColumns:"8% 50% 1fr", margin:'8px 30px', gap:"0", textAlign:"left" }}>
                    <div>{item.icon}</div>
                    <Typography variant="body1" color="primary">
                      {item.title}:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value}
                    </Typography>
                  </div>
                ))}
              </Box>   
              <ControlledOpenSpeedDial 
                handleClickOpenDetails={handleClickOpenDetails} 
                handleClickOpenGallery={handleClickOpenGallery}  
                handleClickOpenEdit={handleClickOpenEdit}  
                handleClickOpenDelete={handleClickOpenDelete}  
              />          
            </CardContent>
            </Card>
          </Grid>
          {/* -----------------------------------------Details consultation-------------------------------------------- */}
            <Dialog open={openDetails} TransitionComponent={Transition} keepMounted 
              aria-describedby="details consultation" fullWidth maxWidth="sm">
              <DialogTitle sx={{ position:"relative" }}>
                <IconButton aria-label="close" onClick={handleCloseDetails} 
                  sx={{ position:"absolute",top:"10px",right:"10px" }}>
                  <CloseIcon />
                </IconButton>     
                <Typography  color="primary" sx={{ textAlign:"center",marginBottom:"10px", fontSize:"20px" }}>
                Détails du consultation numéro:{consultationNumber}
                </Typography>    
            </DialogTitle>
              <DialogContent>
                {infoItemsDetails.map((item, index) => (
                  <div key={index} style={{ display:"grid", gridTemplateColumns:"8% 50% 1fr", margin:'8px 10px', gap:"0", textAlign:"left" }}>
                    <div>{item.icon}</div>
                    <Typography variant="body1" color="primary">
                      {item.title}:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value}
                    </Typography>
                  </div>
                ))}                
                  {renderModeData(record.modeType, record.modeInputs)}
                  <Typography variant="h6" color="primary">Commentaire:  </Typography>
                  <TextField
                    sx={{ margin: "10px 0 15px" }}
                    multiline
                    rows="3"
                    fullWidth
                    id="commentaire_texte"
                    label="Ajouter un commentaire"
                    variant="outlined"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                  />
                  <div className="text-right" sx={{ marginBottom: "20px" }}>
                    <Button variant="outlined" sx={{ marginRight: "4px" }} onClick={handleAnnulerCommentaire}>
                      Annuler
                    </Button>
                    <Button variant="contained" onClick={handleAjouterCommentaire}>
                      Ajouter
                    </Button>
                  </div>
                    
                    {record.commentaire.map((comment, index) => (
                      <div key={index} style={{ display:"grid", gridTemplateColumns:"15% 1fr" }}>
                        {comment.image && comment.image!==undefined ? 
                          <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${comment.image}`} 
                            style={{borderRadius:"50%", width:"45px", height:"45px"}} alt="" />
                          :
                          <img src={DefaultProfileImage} alt="profileImage" id="img" style={{borderRaduis:"50%", width:"45px", height:"45px"}}/>
                        }
                        <div style={{ marginBottom:"10px" }}>
                          <div style={{ display:"flex", gap:"3%", alignItems:"center" }}>
                            <Typography variant="subtitle1">{comment.name}</Typography>
                            <Typography variant="caption"> {formatDate(comment.created_at.slice(0,10))}</Typography>
                          </div>
                          <Typography style={{ margin:"-5px 0 5px" }} variant="subtitle2">{comment.role}</Typography>
                          <Typography variant="body2">{comment.commentaire_texte}</Typography>  
                        </div>
                      </div>

                    ))}                
                </DialogContent>
            </Dialog>
          {/* --------------------------------------- Update consultation --------------------------------------------- */}
            <Dialog open={openEdit} TransitionComponent={Transition} keepMounted onClose={handleCloseEdit} aria-describedby="Edit consultation" fullWidth maxWidth="sm" >
              <DialogTitle sx={{ position:"relative" }}>
                <IconButton aria-label="close" onClick={handleCloseDetails} 
                  sx={{ position:"absolute",top:"10px",right:"10px" }}>
                  <CloseIcon />
                </IconButton>     
                <Typography  color="primary" sx={{ textAlign:"center",marginBottom:"10px", fontSize:"20px" }}>
                Modifier consultation numéro:{consultationNumber}
                </Typography>    
            </DialogTitle>

              <DialogContent>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="modeType-label">Type de mode</InputLabel>
                  <Select
                    labelId="modeType-select"
                    id="modeType"
                    name="modeType"
                    value={editDetails.modeType}
                    onChange={(e) => {
                      const newModeType = e.target.value;
                      let newModeInputs = {};

                      if (newModeType === 'ContinuousMode') {
                        newModeInputs = {
                          ContinuousMode: {
                            Pressure: '', // Mettez la valeur par défaut souhaitée ici
                          },
                        };
                      } else if (newModeType === 'IntermittentMode') {
                        newModeInputs = {
                          IntermittentMode: {
                            MinimumPressure: '', // Mettez la valeur par défaut souhaitée ici
                            MinimumPressureDuration: '',
                            MaximumPressure: '',
                            MaximumPressureDuration: '',
                          },
                        };
                      } else if (newModeType === 'ContinuousInstillationMode') {
                        newModeInputs = {
                          ContinuousInstillationMode: {
                            Pressure: '', // Mettez la valeur par défaut souhaitée ici
                            PressureDuration: '',
                            Volume: '',
                            VolumeDuration: '',
                          },
                        };
                      }
                      else if (newModeType === 'IntermittentInstillationMode') {
                        newModeInputs = {
                          IntermittentInstillationMode: {
                            Pressure: '', // Mettez la valeur par défaut souhaitée ici
                            PressureDuration: '',
                            Volume: '',
                            VolumeDuration: '',
                          },
                        };
                      }

                      handleEditFormChange('modeType', newModeType);
                      handleEditFormChange('modeInputs', newModeInputs);
                    }}
                    label="Type de mode"
                  >
                    <MenuItem value="ContinuousMode">Mode Continu</MenuItem>
                    <MenuItem value="IntermittentMode">Mode intermittent</MenuItem>
                    <MenuItem value="ContinuousInstillationMode">Mode instillation continu</MenuItem>
                    <MenuItem value="IntermittentInstillationMode">Mode Intermittent instillation</MenuItem>
                  </Select>
                </FormControl>

                {editDetails.modeType === 'ContinuousMode' && (
                  <TextField
                    label="Pression"
                    fullWidth
                    margin="normal"
                    value={editDetails.modeInputs.ContinuousMode.Pressure}
                    onChange={(e) =>
                      handleEditFormChange('modeInputs.ContinuousMode.Pressure', e.target.value)
                    }
                  />
                )}

            {editDetails.modeType === 'IntermittentMode' && (
              <>
                <TextField
                  label="Pression min"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentMode.MinimumPressure}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentMode.MinimumPressure', e.target.value)
                  }
                />
                <TextField
                  label="Durée pression min"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentMode.MinimumPressureDuration}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentMode.MinimumPressureDuration', e.target.value)
                  }
                />
                <TextField
                  label="Pression Max"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentMode.MaximumPressure}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentMode.MaximumPressure', e.target.value)
                  }
                />
                <TextField
                  label="Durée pression Max"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentMode.MaximumPressureDuration}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentMode.MaximumPressureDuration', e.target.value)
                  }
                />
              </>
            )}


            {editDetails.modeType === 'ContinuousInstillationMode' && (
              <>
                <TextField
                  label="Pression"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.ContinuousInstillationMode.Pressure}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.ContinuousInstillationMode.Pressure', e.target.value)
                  }
                />
                <TextField
                  label="Durée pression"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.ContinuousInstillationMode.PressureDuration}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.ContinuousInstillationMode.PressureDuration', e.target.value)
                  }
                />
                <TextField
                  label="Volume"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.ContinuousInstillationMode.Volume}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.ContinuousInstillationMode.Volume', e.target.value)
                  }
                />
                <TextField
                  label="Durée volum"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.ContinuousInstillationMode.VolumeDuration}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.ContinuousInstillationMode.VolumeDuration', e.target.value)
                  }
                />
              </>
              
            )}
            {editDetails.modeType === 'IntermittentInstillationMode' && (
              <>
                <TextField
                  label="Pression min"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.MinimumPressure}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.MinimumPressure', e.target.value)
                  }
                />
                <TextField
                  label="Durée pression min"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.MinimumPressureDuration
                  }
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.MinimumPressureDuration', e.target.value)
                  }
                />
                <TextField
                  label="Volume"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.Volume}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.Volume', e.target.value)
                  }
                />
                <TextField 
                  label="Pression Max"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.MaximumPressure}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.MaximumPressure', e.target.value)
                  }
                />
                <TextField
                  label="Durée pression Max"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.MaximumPressureDuration}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.MaximumPressureDuration', e.target.value)
                  }
                />
                <TextField
                  label="Volume"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.Volume}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.Volume', e.target.value)
                  }
                />
                <TextField
                  label="Durée volume"
                  fullWidth
                  margin="normal"
                  value={editDetails.modeInputs.IntermittentInstillationMode.VolumeDuration}
                  onChange={(e) =>
                    handleEditFormChange('modeInputs.IntermittentInstillationMode.VolumeDuration', e.target.value)
                  }
                />
              </>
              
            )}
                {/* <TextField
                              label="Médecin" 
                             fullWidth
                             margin="normal"
                             value={editDetails.doctor}
                             onChange={(e) => handleEditFormChange('doctor', e.target.value)}
                           /> */}
                  {/* <DoctorList setConsultationInfo={setEditDetails} editDoctor={ record.doctor} /> */}
                            
                  {/* <TextField
                              label="Infirmière"
                              fullWidth
                              margin="normal" // Add margin
                              value={editDetails.nurse}
                              onChange={(e) => handleEditFormChange('nurse', e.target.value)}
                            /> */}
                            <FormControl fullWidth>
                              <InputLabel id="pansement-label">Pansement</InputLabel>
                              <Select
                                labelId="pansement-select"
                                id="pansement"
                                name="pansement"
                                value={editDetails.pansement}
                                onChange={(e) => handleEditFormChange('pansement', e.target.value)}
                                label="Pansement"
                              >
                                <MenuItem value="small">Petit</MenuItem>
                                <MenuItem value="medium">Moyen</MenuItem>
                                <MenuItem value="large">Grand</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              label="Référence machine"
                              fullWidth
                              margin="normal" // Add margin
                              value={editDetails.referenceMachine}
                              onChange={(e) => handleEditFormChange('referenceMachine', e.target.value)}
                            />
                            <TextField
                              label="Taille de la plaie"
                              fullWidth
                              margin="normal" // Add margin
                              value={editDetails.taillePlaies}
                              onChange={(e) => handleEditFormChange('taillePlaies', e.target.value)}
                            />
                            <FormGroup className="ml-1" >
                                <Label>Date de consultation</Label>
                                <Input
                                  fullWidth
                                  type="date"
                                  name="examinationDate"
                                  value={editDetails.examinationDate.slice(0, 10)} // Make sure this value is correctly set
                                  onChange={(e) => handleEditFormChange('examinationDate', e.target.value)}
                                />
                              </FormGroup>
            </DialogContent>
                <DialogActions>
                  <Button variant='contained' color='primary' sx={{ textTransform: "capitalize" }} onClick={handleEditSubmit}>Enregistrer</Button>
                </DialogActions>
              </Dialog>
          {/* -----------------------------------------Delete-------------------------------------------- */}
            <Dialog open={openDelete} TransitionComponent={Transition} keepMounted onClose={handleCloseDelete}
             aria-describedby="Delete consultation" >
            <DialogTitle sx={{ position:"relative" }}>
                <IconButton aria-label="close" onClick={handleCloseDelete}
                   sx={{ position:"absolute",top:"10px",right:"10px" }}>
                  <CloseIcon />
                </IconButton>     
                <Typography  color="primary" sx={{ textAlign:"center",marginBottom:"10px", fontSize:"20px" }}>
                Supprimer consultation numéro: {consultationNumber}
                </Typography>    
              </DialogTitle>

            <DialogContent>
            <Typography  sx={{ textAlign:"center",marginBottom:"10px", fontSize:"18px" }}>

            Êtes-vous sûr de vouloir supprimer cette consultation ?
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button variant='contained' color='error' sx={{ textTransform:"capitalize" }} onClick={() => handleConfirmDelete(consultationId)}>Confirmer la suppression</Button>
            </DialogActions>
            </Dialog>
          {/* -----------------------------------------Gallery-------------------------------------------- */}
            <ConsultationGallery openGallery={openGallery} Transition={Transition} handleCloseGallery={handleCloseGallery}
            consultationNumber={consultationNumber} activeSlideIndex={activeSlideIndex} setActiveSlideIndex={setActiveSlideIndex}
            imageUrls={imageUrls} swiperKey={swiperKey}  />
        </>
      );
}
export default ConsultationSingleCard;
