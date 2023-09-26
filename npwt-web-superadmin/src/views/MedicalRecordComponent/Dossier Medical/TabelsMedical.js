import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, CardFooter, Container,CardHeader,Button, Input } from "reactstrap";
import * as api from '../../../api/index';
import TableDash from "components/Tables/TableDash.js";
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import "../../../components/Tables/Pagination"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';
import StatistiquesConsultation from "./StatistiquesConsultation";

const TablesMedical = ({}) => {
 const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteMedicalId, setDeleteMedicalId] = useState(null);
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
  const tableInputs = [
    "Médecin",
    "Infirmier",
    "Date consultation",
    "référence Machine",
    "taille Plais",
    "pansement"
  ];
  const tableAffiche = [
    "doctor",
    "nurse",
    "examinationDate",
    "referenceMachine",
    "taillePlaies",
    "pansement"
  ];
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    async function fetchMedical() {
      try {
        const medicalData = await api.getAllMedicalRecords();
        setData(medicalData.data);
      } catch (error) {
        console.error('Error fetching Medical data:', error);
      }
    }
    fetchMedical();
  }, []);

  function changeLimit(event) {
    setCurrentPage(pageNumbers.length)
    const newLimit = parseInt(event.target.value);
    const newPage = Math.ceil((currentPage * limit) / newLimit);

    if (newPage === 0) {
      setCurrentPage(1); // If newPage is 0, set it to 1
    } else {
      setCurrentPage(newPage);
    }

    setLimit(newLimit);
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
      (currentPage - 1) * limit,
      (currentPage - 1) * limit + limit
  );
}, [data, currentPage, searchTerm]);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / limit); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
  async function handleDeleteMedical(MedicalId) {
      try {
          await api.deleteMedical(MedicalId);
      } catch (err) {
          console.error(err);
      }
  }
  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${day}-${month}-${year}`;
    }
    return dateString;
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#services-table' });
    doc.save('consultation-List.pdf');
  };
  return (
    <>
      <StatistiquesConsultation/>
      <Container className="mt--7" fluid>
        <Card className="shadow">
            <CardHeader className="border-0" style={{ fontSize: "24px", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
              <h3 className="mb-0" style={{ fontSize: "inherit", fontWeight: "inherit" }}>Liste des consultations</h3>
              <Button onClick={generatePDF}
                  color="primary"
                  className="pdf-btn">
                <FaFilePdf />
                <span className='pdf-btn-text'>Exporter en PDF</span>
              </Button>
          </CardHeader>
        <CardBody>
        <div className="d-flex align-items-center justify-content-between my-2">
          <div className="d-flex align-items-center justify-content-between my-2">
            <Input
              type="number"
              placeholder={`${limit}`}
              value={limit}
              onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  let updatedValue = newValue;
                  const currentValue = parseInt(limit);
                  if (newValue < 5) {
                      updatedValue = 5;
                  } else if (newValue > totalData) {
                    updatedValue=totalData;
                  }else if(newValue > currentValue){
                    updatedValue = Math.ceil(newValue / 5) * 5;
                  }else{
                    updatedValue = (Math.ceil(newValue / 5)-1) * 5;
                  }
                  changeLimit({ target: { value: updatedValue } }); 
              }}
              style={{ width: "70px", fontSize: "14px" }}
              className="mr-2 form-control"
              min={5}
              max={totalData}
            />
            <div className="input-group-append">
              <Link to="/medical-record/medical/ajouter" style={{ textDecoration: "none", color: "inherit" }}>
              <Button color="success">
                Ajouter <FaPlus />
              </Button>
              </Link>
            </div>
          </div>
            <div style={{ width:"35%" }}>
              <input type="text" className="form-control" id="search" placeholder="Rechercher" value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value);
                  setCurrentPage(1);}}/>
            </div>
          </div>     
          <TableDash
            tableInputs={tableInputs}
            tableAffiche={tableAffiche}
            combinedList={CardData}
            deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} 
             handleDelete={handleDeleteMedical} deleteId={deleteMedicalId} 
             setDeleteId={setDeleteMedicalId} 
            tableName="Medicals"
            linkEdit="/medical-record/medical/edit-table"
            linkDetails="/medical-record/medical-details"
            customRender={(item, key) => (
              key === 'examinationDate' ? formatDate(item) : item
            )}
          />
        </CardBody>
        <CardFooter className="py-1">
          <nav>
              <ul className="pagination">
                  <li className="page-item">
                      <button onClick={prevPage} className="page-link">
                      <NavigateBeforeIcon/>
                      </button>
                  </li>
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <button onClick={() => paginate(number)} className={`page-link ${number === currentPage ? "active2" : ""}`}>
                          {number}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button onClick={nextPage} className="page-link"> <NavigateNextIcon/> </button>
                  </li>
              </ul>
          </nav>
        </CardFooter>
      </Card>
    </Container>
    </>
  );
};
export default TablesMedical;
