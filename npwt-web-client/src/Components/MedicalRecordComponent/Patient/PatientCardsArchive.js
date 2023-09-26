import axios from "axios";
import React, { useState, useEffect , useMemo} from "react";
import { PatientSingleCard } from './PatientSingleCard';
import {  Grid, Typography,Button } from '@mui/material';
import * as api from '../api/index';
import { Link} from 'react-router-dom';
import Fab from '@mui/material/Fab'; 
import UnArchiveIcon from '@mui/icons-material/Unarchive';
import NoData from '../../../nodata.png';
import "../Css/noData.css"
import "../Css/Pagination.css"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
export default function PatientCardsArchive() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const dataPerPage = 3;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/medical-patient/getAllMedicalRecordPatient`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const CardData = useMemo(() => {
    let computedData = data;
    if (searchTerm) {
        computedData = computedData.filter(patient =>
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.firstExaminationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.dateOfBirth.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.governorate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.medicalConditions.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phoneNumber.includes(searchTerm)
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


  async function handleDeletePatient(PatientId) {
      try {
         const response= await api.deletePatient(PatientId);
          console.log(response.data);
      } catch (err) {
          console.error(err);
      }
  }
  const handleArchived = async (id) => {
      try {
           await api.archiveMedicalRecordPatient(id);
           setData((prevRecords) =>
           prevRecords.map((record) =>
             record._id === id ? { ...record, archived: true } : record
           ))
      } catch (error) { 
      }
  }
  const handleUnArchived = async (id) => {
      try {
          await api.unArchiveMedicalRecordPatient(id);
          setData((prevRecords) =>
          prevRecords.map((record) =>
            record._id === id ? { ...record, archived: false } : record
          )
        );
      } catch (error) {
          
      }
  }
  return (
    <div className="px-4">
        <div className='text-center mt-2' style={{ color:"#0d6efd", position:"relative" }}>
            <h1 className="mb-2">Dossiers médicaux</h1>
            <h4>Liste des patients dans les archives</h4>
        
            <div className="text-right" style={{ position:'absolute', top:"15px", right:"0px", zIndex:"1" }}>
                <Link to="/Medicalrecord/patients/cards" style={{ marginRight:"5px" }}>
                    <Fab size="large" color="warning" aria-label="unarchive">
                        <UnArchiveIcon />
                    </Fab>
                </Link>   
            </div>
        </div> 
        <div className="d-flex align-items-center justify-content-center">
            <div className="my-1 d-flex col col-md-6 mx-auto center">

                        <input 
                        type="text"
                        className="form-control "
                        id="search"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        />
                        <Button
                        type="button"
                        onClick={resetFilter}
                        variant="contained"
                        >
                        <RestartAltIcon/>
                        </Button>
            </div>
        </div>
        {CardData.length===0?
            <div className="text-center m-5">
              <img src={NoData} alt="noData" className="nodata"/>
              <Typography variant="h5" color="primary">Aucune information</Typography>
            </div> 
            : 
            <Grid container spacing={3} sx={{ padding: "20px 0" }}>
                {CardData.map((patient) => (
                    <PatientSingleCard
                        key={patient._id}
                        patient={patient}
                        handleDeletePatient={handleDeletePatient}
                        handleArchived={handleArchived}
                        handleUnArchived={handleUnArchived}
                    />
                ))}
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
    </div>
  );
}


















