import React, { useState, useEffect , useMemo} from "react";
import { Fab, Grid,Dialog , DialogTitle,DialogContent,DialogContentText, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import  ConsultationSingleCard from './ConsultationSingleCard';
import axios from 'axios';
import ConsultationAdd from './ConsultationAdd'
import Slide from '@mui/material/Slide';
import NoData from '../../../nodata.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import "../Css/noData.css"
import "../Css/Pagination.css"
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConsultationCards() {
  const { id } = useParams();
  const [openAdd, setOpenAdd] = useState(false);
  const handleClickOpenAdd = () => {  setOpenAdd(true);};
  const handleCloseAdd = () => {setOpenAdd(false);};
  const [patient, setPatient] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
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
  const dataPerPage = 3;
  useEffect(() => {
    const fetchPatientData = async () => {  
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical-patient/getMedicalRecordPatientDetails/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchPatientData(); 
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/medical/getMedicalRecordByIdPatient/${id}`)
      .then((response) => {
        setData(response.data.sort((a, b) =>
          a.examinationDate.localeCompare(b.examinationDate)
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const CardData = useMemo(() => {
    let computedData = data;

    if (searchTerm) {
        computedData = computedData.filter(consultation =>
          consultation.doctor.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.nurse.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.nurse.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.nurse.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         
          (consultation.doctor.firstName+" "+ consultation.doctor.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (consultation.nurse.firstName+" "+ consultation.nurse.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
          
          consultation.pansement.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.referenceMachine.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.taillePlaies.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ModeTypeData(consultation.modeType).toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.examinationDate.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
    }
    setTotalData(computedData.length);
    return computedData.slice(
        (currentPage - 1) * dataPerPage,
        (currentPage - 1) * dataPerPage + dataPerPage
    );
}, [data, currentPage, searchTerm]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const resetFilter = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }else{
      setCurrentPage( 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }else{
        setCurrentPage( pageNumbers.length);
      }
  };

  return (
    <>
      <div className='text-center mt-2' style={{ color:"#0d6efd", position:"relative" }}>
        <h1 className="mb-2">Dossiers médicaux</h1>
        <h4>Liste des consultations du patient: 
          <span style={{ textTransform:"capitalize" }}> "{patient.firstName} {patient.lastName}"</span> 
        </h4>
        <div className="text-right m-4" style={{ position:'absolute', top:"-15px", right:"10px", zIndex:"1" }}>
         <Link to="/medicalrecord/patients/cards"> 
            <Fab size="large" color="primary" aria-label="add" sx={{ marginRight:'5px' }}>
              <PersonIcon />
            </Fab>
          </Link>
          <Fab onClick={handleClickOpenAdd} size="large" color="success" aria-label="add" 
            sx={{ backgroundColor:"green" }}>
            <AddIcon />
          </Fab>
        </div>
        <div className="d-flex align-items-center justify-content-center">
            <div className="my-1 d-flex col col-md-6 mx-auto center">
              <input type="text"className="form-control "id="search"placeholder="Rechercher..."value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
              />
              <Button type="button" onClick={resetFilter} variant="contained"><RestartAltIcon/></Button>
            </div>
        </div>
        {CardData.length===0?
          <div className="text-center m-5">
            <img src={NoData} alt="noData" className="nodata"/>
            <Typography variant="h5" color="primary">Aucune information</Typography>
          </div> 
          :
          <Grid container spacing={3} sx={{ padding: "20px" }}>
            {CardData.map((record, index) => {
            return (
              <ConsultationSingleCard
                index={index}
                record={record}
                consultationNumber={index + 1+(dataPerPage*(currentPage-1))}
              />
            );
          })}
          </Grid>
        }
          <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={prevPage} className="page-link">
                    <NavigateBeforeIcon/>
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                    <button onClick={() => paginate(number)} className={`page-link ${
                    number === currentPage ? "active" : ""
                    }`}>
                        {number}
                    </button>
                    </li>
                ))}
                <li className="page-item">
                    <button onClick={nextPage} className="page-link">
                    <NavigateNextIcon/>
                    </button>
                </li>
            </ul>
        </nav>
         <Dialog open={openAdd} TransitionComponent={Transition} keepMounted aria-describedby="Add consultation">
            <DialogTitle sx={{ position:"relative" }}>
                <IconButton aria-label="close" onClick={handleCloseAdd} sx={{ position:"absolute",top:"10px",right:"10px" }}>
                  <CloseIcon />
                </IconButton>     
                <Typography  color="primary" sx={{ textAlign:"center",marginBottom:"10px", fontSize:"20px" }}>
                  Ajouter nouveau consultation
                </Typography>    
            </DialogTitle>
              <DialogContent >           
                <ConsultationAdd patientId={id} handleCloseAdd={handleCloseAdd}/>
                </DialogContent>
            </Dialog>
      </div>  
    </>
  )
}
