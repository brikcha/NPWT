import React, { useState, useEffect } from 'react';
import MedicationIcon from '@mui/icons-material/Medication';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Grid, Card, CardHeader, CardContent, CardActions, Avatar, Typography, Button, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Snackbar, Box} from '@mui/material';
import { red } from '@mui/material/colors';
import ArchiveIcon from '@mui/icons-material/Archive';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { QuestionMark } from '@mui/icons-material';
import axios from "axios"
function ControlledOpenSpeedDial({ handleDeleteClick, _id,isArchived,handleArchiveClick }) {
  const actions = [
    { icon: <RemoveRedEyeIcon />, name: 'Détails Patient', color:"#5e72e4", backgroundColor:"whitesmoke" },
    { icon: <MedicalInformationIcon />, name: 'Liste de consultations', color:"white", backgroundColor:"#89CFF0" },
    { icon: <EditIcon />, name: 'Edit' , color:"#525f7f", backgroundColor:"rgb(237, 226, 14)"},
    { icon: <DeleteIcon />, name: 'Delete', color:"white", backgroundColor:"#f5365c" },
    isArchived ?
    { icon: <UnarchiveIcon />, name: 'unArchiver', color:"white", backgroundColor:"#2dce89" }
    : 
    { icon: <ArchiveIcon />, name: 'Archiver', color:"white" , backgroundColor:"#ff365c"}
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleActionClick = (actionName) => {
    if (actionName === 'Delete') {
      handleDeleteClick();
    } else if (actionName === 'Edit') {
      window.location.href = `/Medicalrecord/patients/${_id}`;
    }else if (actionName === 'Archiver') {
      handleArchiveClick();
    }else if (actionName === 'unArchiver') {
      handleArchiveClick();
    }else if (actionName === 'Détails Patient') {
      window.location.href = `/Medicalrecord/details/${_id}`;
    }else if (actionName === 'Liste de consultations') {
      window.location.href = `/Medicalrecord/patients/consultations-cards/${_id}`;
    }
  };
  return (
   <div>
      <SpeedDial  ariaLabel="actions icons" icon={<QuestionMark />}   sx={{  position:"absolute", top:"-65px", right:"10px" }}
        onClose={handleClose}  onOpen={handleOpen}  open={open}  direction="down">
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} 
             tooltipTitle={action.name} onClick={() => handleActionClick(action.name)} 
             sx={{color:action.color , backgroundColor:action.backgroundColor, margin:"2px 0"}}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
export const PatientSingleCard = ({key,patient, handleDeletePatient, handleArchived, handleUnArchived}) => {
  const [hovered, setHovered] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [archiveSnackbarOpen, setArchiveSnackbarOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [numberConsulatation, setNumberConsulatation] = useState(false);
  const handleArchiveClick = async () => {
    try {
      if (!isArchived) {
        await handleArchived(patient._id);
        setArchiveSnackbarOpen(true);
        setIsArchived(true);
      } else {
        await handleUnArchived(patient._id);
        setIsArchived(false);
      }
    } catch (error) {
    }
  };
  const handleSnackbarClose = () => {
    setArchiveSnackbarOpen(false);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    handleDeletePatient(patient._id);
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getNumberConsultationByIdPatient/${patient._id}`);
        setNumberConsulatation(response.data.number_consultation);
      } catch (error) {
        console.error('Error fetching MedicalRecord data:', error);
      }
    }

    fetchMedicalRecord();
  }, []);
  const infoItems = [
    // {
    //   icon: <PersonIcon color="primary" />,
    //   title: 'Nom et prénom',
    //   value: `${patient.firstName} ${patient.lastName}`,
    // },
    // {
    //   icon: <WcIcon color="primary" />,
    //   title: 'Genre',
    //   value: patient.gender,
    // },
    {
      icon: <AlternateEmailIcon color="primary" />,
      title: 'Email',
      value: patient.email,
    },
    {
      icon: <PhoneIcon color="primary" />,
      title: 'Numéro de téléphone',
      value: patient.phoneNumber,
    },
    {
      icon: <CalendarMonthIcon color="primary" />,
      title: 'Date de naissance',
      value: patient.dateOfBirth,
    },
    {
      icon: <PlaceIcon color="primary" />,
      title: 'Gouvernorat',
      value: patient.governorate,
    },
    {
      icon: <CalendarMonthIcon color="primary" />,
      title: '1ère consultation',
      value: patient.firstExaminationDate,
    },
    {
      icon: <MedicationIcon color="primary" />,
      title: 'Conditions médicaux',
      value: patient.medicalConditions,
    },
    {
      icon: <MedicalInformationIcon color="primary" />,
      title: 'Nombre consultations',
      value: numberConsulatation,
    },
  ];
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Grid item lg={4} md={6} xs={12}>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? 'translateY(-10px) rotateX(10deg)' : 'none',
          transition: 'transform 0.3s ease-in-out',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader
          subheader={patient.gender}
          title={ <Typography variant='h6' color="primary">{`${capitalizeFirstLetter(patient.firstName)} ${capitalizeFirstLetter(patient.lastName)}`}</Typography>}
          avatar={<Avatar sx={{ bgcolor: red[500] }}>{capitalizeFirstLetter(patient.firstName.charAt(0))}{capitalizeFirstLetter(patient.lastName.charAt(0))}</Avatar>} 
        />
        <CardContent style={{ display:"grid",gridTemplateColumns:"100% 16%", gap:"2%" , position:"relative" }}>
        <Box>
            {infoItems.map((item, index) => (
              <div key={index} style={{ display:"flex", justifyContent:"space-between", gap:"2%", alignItems:"center",margin:"5px 0" }}>
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
          <ControlledOpenSpeedDial handleDeleteClick={handleDeleteClick} _id={patient._id} 
              isArchived={isArchived} handleArchiveClick={handleArchiveClick} />
        </CardContent>
        <CardActions disableSpacing>
         
        </CardActions>
      </Card>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
            Voulez-vous vraiment supprimer le patient nommé{' '}
            <strong>{`${patient.firstName} ${patient.lastName}`}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            variant="contained"
          >
            Confirmer la suppression
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={archiveSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="L'utilisateur est archivé."
      />
    </Grid>
  );
};

