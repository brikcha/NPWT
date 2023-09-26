import { Card, CardHeader, CardFooter, Container, CardBody,Button} from "reactstrap";
import React, { useState, useEffect, useRef , useMemo} from "react";
import * as api from '../../api/index.js';
import Pagination from 'components/Tables/Pagination.js';
import HeaderTable from 'components/Tables/HeaderTable.js';
import StatistiqueMachine from './StatistiqueMachine.js';
import TableDash from 'components/Tables/TableDash.js';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

const TableMachine = () => {
    const [deleteMachineId, setDeleteMachineId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState([]);
    const currentPage = useRef();
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [machineList, setMachineList] = useState([]);
    const [cb, setCb] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const tableInputs = ["Reference","Disponibilite","Etat"];
    const tableAffiche = ["reference","disponibilite","etat"];
    async function getPaginatedMachines(currentPage, limit, search) {
        try {
            const { data } = await api.paginatedMachines(currentPage, limit,search);
            setPageCount(data.pageCount);
            setMachineList(data.data);
            setTotal(data.total);
        } catch (error) {
            console.error(error);
        }
    }  
    useEffect(() => {
        currentPage.current = 1;
        getPaginatedMachines(currentPage, +limit,searchTerm);
    }, [cb,searchTerm]);
    function changeLimit(event) {
        setLimit(event?.target?.value);
        currentPage.current = 1;
        getPaginatedMachines(currentPage, event?.target?.value,searchTerm );
    }
    function handleSearchSubmit(event) {
        setSearchTerm(event?.target?.value);
        currentPage.current = 1;
        getPaginatedMachines(currentPage, limit,event?.target?.value );
    }  
    function handleSearchTermChange(event) {
        setSearchTerm(event?.target?.value);
    }



    async function handleDeleteMachine(machineId) {
        try {
            await api.deleteMachine(machineId);
            setCb(!cb);
        } catch (err) {
            console.error(err);
        }
    }
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#services-table' });
        doc.save('machine-List.pdf');
      };


    return (
    <>
        <StatistiqueMachine />
        <Container className="mt--7" fluid>
            <Card className="shadow">
                <CardHeader className="border-0" style={{ fontSize: "24px", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                    <h3 className="mb-0" style={{ fontSize: "inherit", fontWeight: "inherit" }}>
                        Liste des machines</h3>
                        <div className="input-group-append">
                <Button onClick={generatePDF}
                  color="primary"
                  className="pdf-btn">
                <FaFilePdf />
                <span className='pdf-btn-text'>Exporter en PDF</span>
                </Button>
            </div>
                </CardHeader> 
                <CardBody>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 0 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <HeaderTable limit={limit} changeLimit={changeLimit}  max={total}
                        NameTable="Machine" handleSearchSubmit={handleSearchSubmit}
                        handleSearchTermChange={handleSearchTermChange} tableName="machine"/>
                    </div>
                    </div>
                    <TableDash tableInputs={tableInputs} tableAffiche={tableAffiche} combinedList={machineList} 
                        deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} 
                        handleDelete={handleDeleteMachine} deleteId={deleteMachineId} 
                        setDeleteId={setDeleteMachineId} 
                        tableName="machine" linkEdit="/machine/edit-table" linkDetails="/machine"
                    />
                </CardBody>
                <CardFooter className="py-1">
                <Pagination currentPage={currentPage}  role={""} searchTerm={searchTerm}
                    getPaginated={getPaginatedMachines}
                    limit={limit} pageCount={pageCount}/>
                </CardFooter>
            </Card>
        </Container >
    </>
    );
};
export default TableMachine;