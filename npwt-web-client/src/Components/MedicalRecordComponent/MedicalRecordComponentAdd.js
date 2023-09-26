import React, { useState } from 'react';
import { Button, Typography, TextField,DialogContent,Dialog, DialogTitle,DialogActions} from "@mui/material";
import ConsultationAddWithNewPatient from './Consultation/ConsultationAddWithNewPatient';
import PatientAdd from './Patient/PatientAdd';
import { Link } from 'react-router-dom';

const MedicalRecordComponentAdd = () => {
    const [openNbConsult, setOpenNbConsult] = React.useState(false);
    const [openAddCons, setOpenAddCons] = React.useState(false);
    const [openSuccessAddMsg, setOpenSuccessAddMsg] = React.useState(false);
    const [consultationCount, setConsultationCount] = useState(1);
    const [currentConsultation, setCurrentConsultation] = useState(1);
    const [currentSuccessMsg, setCurrentSuccessMsg] = useState(1);
    const [patientId, setPatientId] = useState(null);
    const handlePatientAdded = (id) => {
        setPatientId(id); 
    };

    const handleConsultationChange = (event) => {
        const inputValue = parseInt(event.target.value);
        if (!isNaN(inputValue) && inputValue >= 0) {
            setConsultationCount(inputValue);
        }
    };
    const handleClickOpenNbConsult = () => { setOpenNbConsult(true);}; 
    const handleCloseNbConsult = () => {setOpenNbConsult(false); };

    const handleClickOpenAddCons = () => {
        setOpenAddCons(true);
    };
    const handleCloseAddCons = () => { setOpenAddCons(false);};

    const handleAddConsultationSuccesMsg = () => {
        if ( currentSuccessMsg<= currentConsultation) {
            setCurrentSuccessMsg(currentSuccessMsg + 1);
            setOpenSuccessAddMsg(true);
        } else {
            setOpenSuccessAddMsg(false);
        }
    };
    const handleConsultationAdd = () => {
        if (currentConsultation < consultationCount) {
            setCurrentConsultation(currentConsultation + 1);
            handleAddConsultationSuccesMsg()
        } else {
            setOpenAddCons(false);
            setOpenSuccessAddMsg(true);
        }
    };
    return (
    <>
        <img className="imgForm img-fluid d-none d-lg-block position-absolute" src="../../assetsTemplates/templateForm/images/img.jpg" style={{ width: "100%", minHeight: "100vh" }}/>
        <h3 className="font-weight-bold mb-0">Ajouter un nouveau dossier médical</h3>
        <PatientAdd handleClickOpenNbConsult={handleClickOpenNbConsult} handlePatientAdded={handlePatientAdded}/>

        <Dialog open={openNbConsult}>
            <DialogTitle>
                <Typography  color="primary" sx={{ textAlign:"center", fontSize:"18px" }}>
                    Patient Ajouté avec succès
                </Typography> 
            </DialogTitle>
            <DialogContent sx={{ padding:"10px 40px" }}>
                <Typography>
                    L'ajout du patient a été réalisé avec succès.
                </Typography>
                <br/>
                <Typography>
                    Veuillez indiquer combien de consultations vous souhaitez ajouter à ce patient
                </Typography>
                <Typography color="error" sx={{  textAlign:"center" }}> Ou bien </Typography>
                <Typography>
                    Vous avez la possibilité d'annuler cette action et revenir à la liste des patients.
                </Typography>
                <br/>
                <TextField autoFocus inputProps={{ min: 1 }} margin="dense" id="name" 
                 label="Nombre de consultations" type="number" fullWidth variant="outlined"
                 value={consultationCount}
                 onChange={handleConsultationChange}
                />
            </DialogContent>
            <DialogActions>
                <Link to="/medicalrecord/patients/cards">
                    <Button onClick={handleCloseNbConsult}>Annuler</Button>
                </Link>
                <Button onClick={handleClickOpenAddCons} variant="contained" color="primary" >Ajouter les consultations</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openAddCons}>
            <DialogTitle>
                <Typography color="primary" sx={{ textAlign:"center", fontSize:"20px" }}>
                    Ajouter consultation numéro ({currentConsultation}/{consultationCount})</Typography> 
            </DialogTitle>
            <DialogContent>
                <ConsultationAddWithNewPatient 
                    handleAddConsultationSuccesMsg={handleAddConsultationSuccesMsg}
                    currentConsultation={currentConsultation}
                    consultationCount={consultationCount}
                    patientId={patientId}
                />
            </DialogContent>
        </Dialog>

        <Dialog open={openSuccessAddMsg} onClose={() => setOpenSuccessAddMsg(false)}>
            <DialogTitle>
                {currentConsultation===1? 
                    <Typography color="primary" sx={{ textAlign:"center", fontSize:"18px" }}>
                        Un consultation a été ajoutée avec succès.
                    </Typography> 
                :
                    <Typography color="primary" sx={{ textAlign:"center", fontSize:"18px" }}>
                      Il y a {currentConsultation} consultations ont été ajoutées avec succès.
                    </Typography>
                } 
            </DialogTitle>
            <DialogContent sx={{ padding:"10px 50px" }}>
                {currentConsultation===1? 
                    <Typography  color="success" style={{ fontSize:"16px" }}>
                        L'ajout du {currentConsultation}ére consultation a été réalisé avec succès 
                    </Typography> 
                :<>
                    <Typography color="success" style={{ fontSize:"16px" }}>
                      L'ajout du {currentConsultation}éme consultation a été réalisé avec succès 
                    </Typography>
                </>
                } 
                {consultationCount>1?
                    <Typography>
                      Vous pouvez maintenant choisir entre ajouter le contenu des consultations restantes ou retourner à la liste des patients en cliquant sur le bouton "Annuler".
                    </Typography> :<></>
                }

            </DialogContent>
            <DialogActions>
                {currentConsultation < consultationCount ?
                    <>
                        <Button onClick={handleCloseNbConsult}>Annuler</Button>
                        <Button onClick={handleConsultationAdd} variant="contained" color="primary" >Ajouter {currentConsultation+1}éme consultation</Button>
                    </>
                : 
                   <Link to="/medicalrecord/patients/cards">
                    <Button onClick={handleCloseNbConsult}  variant="contained" color="primary" >Terminer</Button>
                   </Link> 
                } 
            </DialogActions>        
        </Dialog>

    </>
    );
};
export default MedicalRecordComponentAdd;