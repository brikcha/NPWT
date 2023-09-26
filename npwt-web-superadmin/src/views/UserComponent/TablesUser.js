import { Button, Card, CardHeader, CardFooter, Container, Input, CardBody} from "reactstrap";
import React, { useState, useEffect, useRef} from "react";
import * as api from '../../api/index.js';
import Pagination from 'components/Tables/Pagination.js';
import HeaderTableUser from 'components/Tables/HeaderTableUser.js';
import Statistique from './Statistique.js';
import TableDash from 'components/Tables/TableDash.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';
const TablesUser = () => {
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);
    const currentPage = useRef();
    const [pageCount, setPageCount] = useState(1);
    const [filterRole, setFilterRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [userList, setUserList] = useState([]);
    const [cb, setCb] = useState(false);

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const tableInputs = ["","Nom", "Prénom", "Email", "Role", "Addresse", "Numéro de Téléphone"];
    const tableAffiche = ["image","firstName","lastName", "email", "role", "codePostale", "phoneNumber"];

    async function getPaginatedUsers(currentPage, limit, search,role) {
        try {
            const { data } = await api.paginatedUsers(currentPage, limit, search,role);
            setPageCount(data.pageCount);
            setUserList(data.data);
            setTotal(data.total);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        currentPage.current = 1;
        getPaginatedUsers(currentPage, +limit,searchTerm,filterRole);
    }, [cb,filterRole,searchTerm]);
    function changeLimit(event) {
        setLimit(event?.target?.value);
        currentPage.current = 1;
        getPaginatedUsers(currentPage, event?.target?.value,searchTerm,filterRole );
    }
    function changeRole(event) {
        setFilterRole(event?.target?.value);
        currentPage.current = 1;
        getPaginatedUsers(currentPage, limit,searchTerm,event?.target?.value );
    }    
    function handleSearchSubmit(event) {
        setSearchTerm(event?.target?.value);
        currentPage.current = 1;
        getPaginatedUsers(currentPage, limit,event?.target?.value,filterRole );
    }  
    function handleSearchTermChange(event) {
        setSearchTerm(event?.target?.value);
    }
 
    const handleVerify = async (id) => {
        try {
            const { data } = await api.verifyUser(id);
            setMsg(data.message);
            setError("");
            setCb(!cb);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    };
    const handleUnVerify = async (id) => {
        try {
            const { data } = await api.unverifyUser(id);
            setMsg(data.message);
            setError("");
            setCb(!cb);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    }
    async function handleDeleteUser(userId) {
        try {
            await api.deleteUser(userId);
            setCb(!cb);
        } catch (err) {
            console.error(err);
        }
    }
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#services-table' });
        doc.save(`Responsables-List.pdf`);
      };
    return (
    <>
        <Statistique />
        <Container className="mt--7" fluid>
            <Card className="shadow">
                <CardHeader className="border-0" style={{ fontSize: "24px", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                    <h3 className="mb-0" style={{ fontSize: "inherit", fontWeight: "inherit" }}>
                        Liste des utilisateurs</h3>
                        <Button onClick={generatePDF}
            color="primary"
            className="pdf-btn">
          <FaFilePdf />
          <span className='pdf-btn-text'>Exporter en PDF</span>
          </Button>
                    
                </CardHeader>
                <CardBody>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 0 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                            <Input type="select" value={filterRole} 
                            onChange={changeRole}
                            style={{ width: "150px", fontSize: "14px" }} className="mr-2 form-control" >
                                <option value=""> Roles</option>
                                <option value="doctor">Docteur</option>
                                <option value="nurse">Infirmier</option>
                                <option value="admin">Administrateur</option>
                            </Input>
                        </div>
                        <HeaderTableUser limit={limit} changeLimit={changeLimit}  
                        NameTable="User" handleSearchSubmit={handleSearchSubmit}
                         handleSearchTermChange={handleSearchTermChange}
                         max={total}/>
                    </div>
                    </div>
                    <TableDash tableInputs={tableInputs} tableAffiche={tableAffiche} combinedList={userList} 
                        deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} 
                        handleDelete={handleDeleteUser} deleteId={deleteUserId} 
                        setDeleteId={setDeleteUserId} 
                        handleUnVerify={handleUnVerify} 
                        handleVerify={handleVerify} 
                        tableName="utilisateur" linkEdit="/utilisateur/edit-table" linkDetails="/utilisateur"
                    />
                </CardBody>
                <CardFooter className="py-1">
                    <Pagination currentPage={currentPage} role={filterRole} 
                    getPaginated={getPaginatedUsers} searchTerm={searchTerm} limit={limit} pageCount={pageCount}/>
                </CardFooter>
            </Card>
        </Container >
    </>
    );
};

export default TablesUser;
