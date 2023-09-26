import React, { useState, useEffect, useMemo } from "react";
import { PatientSingleCard } from './PatientSingleCard';
import { Grid, Typography, Button } from '@mui/material';
import * as api from '../../MedicalRecordComponent/api/index';
import { Link } from 'react-router-dom';
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import NoData from '../../../nodata.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UnarchiveIcon from '@mui/icons-material/Unarchive'; // Import the UnarchiveIcon
import "../Css/noData.css";
import "../Css/Pagination.css";

export default function PatientCards() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const dataPerPage = 3;
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical-patient/getAllMedicalRecordPatient`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const filteredData = useMemo(() => {
    let computedData = data;

    if (showArchived) {
      computedData = computedData.filter(patient => patient.archived);
    } else {
      computedData = computedData.filter(patient => !patient.archived);
    }

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

    return computedData;
  }, [data, searchTerm, showArchived]);

  const CardData = useMemo(() => {
    const startIndex = (currentPage - 1) * dataPerPage;
    return filteredData.slice(startIndex, startIndex + dataPerPage);
  }, [filteredData, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const resetFilter = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(pageNumbers.length);
    }
  };

  const handleDeletePatient = async (PatientId) => {
    try {
      const response = await api.deletePatient(PatientId);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };
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
const pageTitle = showArchived ? "Liste des patients dans Archives" : "Liste des patients";
  return (
    <div className="px-4">
      <div className='text-center mt-2' style={{ color: "#0d6efd", position: "relative" }}>
        <h1 className="mb-2">Dossiers médicaux</h1>
        <h4>{pageTitle}</h4>
        <div className="text-right" style={{ position: 'absolute', top: "15px", right: "0px", zIndex: "1" }}>
          <Fab size="large" color="success" aria-label="archive" onClick={toggleArchived}>
            {showArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
          </Fab>
          <Link to="/Medicalrecord/patients/ajouter">
            <Fab size="large" color="success" aria-label="add" sx={{ backgroundColor: "green" }}>
              <AddIcon />
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