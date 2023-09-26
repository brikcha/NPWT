import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table} from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import { BsPencil } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TbArchiveOff, TbArchive } from 'react-icons/tb';
import UserChip from "./UserChip";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PatientChip from "./PatientChip";

export default function TableDash({tableInputs, tableAffiche, combinedList, deleteModalOpen, setDeleteModalOpen,
    handleDelete, deleteId,setDeleteId ,handleUnVerify ,handleVerify, tableName, linkEdit, linkDetails, 
    handleArchived,handleUnArchived}) {
        const formatDate = (dateString) => {
            const dateParts = dateString.split('-');
            if (dateParts.length === 3) {
              const [year, month, day] = dateParts;
              return `${day}-${month}-${year}`;
            }
            return dateString;
          };
          const grayButtonStyle = {
            backgroundColor: 'gray',
            borderColor: 'gray',
            color: 'white',
          };
    return (
        <Table id="services-table" className="align-items-center table-flush" responsive>
            <thead className="thead-light">
                <tr>
                    {tableInputs.map((input, index) => (
                        <th key={index} scope="col">{input}</th>
                    ))}
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>   
                { combinedList.map((row, index) => (
                        <tr key={index}>                       
                            {tableAffiche.map((input, i) => (
                                <td key={i}>
                                {input === 'examinationDate'|| input === 'firstExaminationDate'|| input === 'dateOfBirth'
                                    ? formatDate(row[input].slice(0, 10))
                                    :
                                    input === 'image' 
                                    ? <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${row[input]}`}  alt="profile"
                                    className="rounded-circle" style={{ width:"50px", height:"50px" }}/> 
                                    :input === 'doctor' 
                                    ? <UserChip dataUser={row[input]}/>
                                    : input === 'nurse'
                                    ?  <UserChip dataUser={row[input]}/>
                                    : input === 'patientAffecte'
                                    ?  <PatientChip dataUser={row[input]}/>
                                    : row[input]}
                                </td>))}
                            <td> 
                                <Link to={`${linkDetails}/${row._id}`} style={{ marginRight: "12px" }}>
                                    <Button
                                        color="primary"  // Set the default button color to blue
                                        title="Profile"
                                        className="purple-button"
                                        style={{
                                            backgroundColor: "#007bff",  // Use a lighter shade of blue
                                            borderColor: "#007bff",      // Set the border color to blue
                                        color: "white",          // Set the icon color to white
                                        }}
                                    >
                                        <FaEye />
                                    </Button>
                                </Link>
                                <Link to={`${linkEdit}/${row._id}`} style={{ marginRight:"12px" }}> 
                                    <Button color="yellow-button"title="Modifier " className="yellow-button">
                                        <BsPencil />
                                    </Button>
                                </Link>
                                <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
                                    <ModalHeader toggle={() => setDeleteModalOpen(false)}>confirmer la suppression  </ModalHeader>
                                    <ModalBody> Voulez-vous vraiment supprimer {tableName}? </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={() => {
                                        handleDelete(deleteId);
                                        setDeleteModalOpen(false);
                                        }}>Oui</Button>{' '}
                                        <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
                                    </ModalFooter>
                                </Modal>
                                {tableName==="utilisateur"? 
                                    !row.verified  ? ( 
                                        <Button onClick={() => handleVerify(row._id)} style={grayButtonStyle}  title="Débloquer"><FaTimes/> </Button>
                                        ):(
                                        <Button onClick={() => handleUnVerify(row._id)} color="success" title="Bloquer"> <FaCheck/> </Button>
                                    ): 
                                    <></>}
                                {tableName==="Patients"? 
                                    !row.archived ? (
                                        <Button onClick={() => handleArchived(row._id)} color="success" title="Archiver" >
                                            <TbArchive style={{ fontSize:'18px' }}/>
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleUnArchived(row._id)} style={grayButtonStyle} title="DésArchiver">
                                            <TbArchiveOff style={{ fontSize:'18px' }} />
                                        </Button>
                                    ): <></>} 
      
                                <Button onClick={() => { setDeleteId(row._id); setDeleteModalOpen(true); }} color="danger" title="Effacer">
                                    <RiDeleteBinLine />
                                </Button>
                                
                                {tableName==="Patients"? 
                                    <Link to={`/medical-record/patient/consultation-table/${row._id}`}> 
                                        <Button onClick={() => handleArchived(row._id)} color="primary" title="consultation" >
                                            <MedicalInformationIcon style={{ fontSize:'18px' }}/>
                                        </Button>
                                    </Link>
                                : <></>} 
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
  )
}
