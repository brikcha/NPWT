import { Button ,Card, CardHeader, CardFooter, Container, CardBody} from "reactstrap";
import React, { useState, useEffect, useRef , useMemo} from "react";
import * as api from '../../../api/index';
import Pagination from 'components/Tables/Pagination.js';
import HeaderTable from 'components/Tables/HeaderTable.js';
import TableDash from 'components/Tables/TableDash.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

const TablesPatient = () => {
    const [deletePatientId, setDeletePatientId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [total, setTotal] = useState([]);
    const [limit, setLimit] = useState(5);
    const currentPage = useRef();
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [PatientList, setPatientList] = useState([]);
    const [cb, setCb] = useState(false);

    const tableInputs = ["Nom", "Prénom", "Genre", "Date 1ére consultation", "Gouvernorat", "Conditions médicales"];
    const tableAffiche = ["firstName","lastName", "gender", "firstExaminationDate", "governorate", "medicalConditions"];
    async function getPaginatedPatients(currentPage, limit, search) {
        try {
            const { data } = await api.paginatedPatients(currentPage, limit, search);
            setPageCount(data.pageCount);
            setPatientList(data.data);
            setTotal(data.total);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        currentPage.current = 1;
        getPaginatedPatients(currentPage, +limit,searchTerm);
    }, [cb,searchTerm]);
    function changeLimit(event) {
        setLimit(event?.target?.value);
        currentPage.current = 1;
        getPaginatedPatients(currentPage, event?.target?.value,searchTerm );
    }
    function handleSearchSubmit(event) {
        setSearchTerm(event?.target?.value);
        currentPage.current = 1;
        getPaginatedPatients(currentPage, limit,event?.target?.value );
    }  
    function handleSearchTermChange(event) {
        setSearchTerm(event?.target?.value);
    }
    async function handleDeletePatient(PatientId) {
        try {
            await api.deletePatient(PatientId);
            setCb(!cb);
        } catch (err) {
            console.error(err);
        }
    }
    const handleArchived = async (id) => {
        try {
             await api.archiveMedicalRecordPatient(id);
             setPatientList((prevRecords) =>
             prevRecords.map((record) =>
               record._id === id ? { ...record, archived: true } : record
             ))
        } catch (error) {

        }
    }
    const handleUnArchived = async (id) => {
        try {
            await api.unArchiveMedicalRecordPatient(id);
            setPatientList((prevRecords) =>
            prevRecords.map((record) =>
              record._id === id ? { ...record, archived: false } : record
            )
          );
        } catch (error) {
            
        }
    }
    const generatePDF = (NameTable) => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#services-table' });
    doc.save(`Patients-List.pdf`);
  };
    return (
    <>
     <div className="header bg-gradient-info pb-9 pt-12 pt-md-8">
        <div className="header-body">
            
         </div>
      </div>
      <Container className="mt--1" fluid style={{ position:"absolute", top:"100px" }}>
        <Card className="shadow">
          <CardHeader className="border-0" style={{ fontSize: "24px", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
              <h3 className="mb-0" style={{ fontSize: "inherit", fontWeight: "inherit" }}>Liste des patients</h3>
              <Button onClick={generatePDF}
            color="primary"
            className="pdf-btn">
          <FaFilePdf />
          <span className='pdf-btn-text'>Exporter en PDF</span>
          </Button>
          </CardHeader>
          <CardBody>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 0 20px" }}>
              <HeaderTable limit={limit} changeLimit={changeLimit}  max={total} tableName="patient"
                    NameTable="Patient" handleSearchSubmit={handleSearchSubmit} handleSearchTermChange={handleSearchTermChange}/>
              </div>
              <TableDash tableInputs={tableInputs} tableAffiche={tableAffiche} combinedList={PatientList} 
                    deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} 
                    handleDelete={handleDeletePatient} deleteId={deletePatientId} 
                    setDeleteId={setDeletePatientId} 
                    handleArchived={handleArchived} handleUnArchived={handleUnArchived}
                    tableName="Patients"  linkEdit='/medical-record/patient/edit-table' linkDetails="/medical-record/patient-details"
              />
          </CardBody>
          <CardFooter className="py-1">
            <Pagination currentPage={currentPage}  role={""} searchTerm={searchTerm}
            getPaginated={getPaginatedPatients}
            limit={limit} pageCount={pageCount}/>
          </CardFooter>
        </Card>
      </Container >
    </>
    );
};
export default TablesPatient;