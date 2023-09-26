import React, { useState, useEffect, useRef , useMemo} from "react";
import * as api from '../../api/index';
import {  Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Card, CardHeader, Table, Container, Row, Button,} from "reactstrap";
import { Card as CardM, CardContent, Typography,Box } from "@mui/material";
import TireRepairIcon from '@mui/icons-material/TireRepair';
import { Input,  Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';
import { MaterialReactTable } from 'material-react-table';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import  "./Css/styles.css";
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { BsPencil } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerIcon from '@mui/icons-material/Timer';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import ConsultationPatient from "./ConsultationPatient.js";
import { Add } from "@mui/icons-material";

const MedicalRecordTable = () => {
  const [deleteMedicalId, setDeleteMedicalId] = useState(null);

  const [data, setData] = useState([]);  
  const currentPage = useRef();
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const [MedicalList, setMedicalList] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#table' });
    doc.save('Medical-List.pdf');
  };
  const handlePageClick = (e) => {
    currentPage.current = e.selected + 1;
    getPaginatedMedical(currentPage, limit);
  };
  function changeLimit(event) {
    setLimit(event?.target?.value);
    console.log("test",event?.target?.value);
    currentPage.current = 1;
    getPaginatedMedical(currentPage, event?.target?.value );
  }
  async function getPaginatedMedical(currentPage, limit) {
    try {
      const { data } = await api.paginatedMedical(currentPage, limit);
      setPageCount(data.pageCount);
      setData(data.result);
      setMedicalList(data.result);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDeleteMedical(MedicalId) {
    try {
      await api.deleteMedical(MedicalId);
      // setCb(!cb);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    currentPage.current = 1;
    getPaginatedMedical(currentPage, +limit);
  }, []);



  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'Prénom',
        size: 100,
      },
      {
        accessorKey: 'lastName',
        header: 'Nom de famille',
        size: 100,
      },
      {
        accessorKey: 'gender',
        header: 'Genre',
        size: 100,
      },
      {
        accessorKey: 'email',
        header: 'E-mail',
        size: 100,
      },
      {
        accessorKey: 'governorate',
        header: 'Gouvernorat',
        size: 100,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Numéro de téléphone',
        size: 100,
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date de naissance',
        size: 100,
      },
      {
        accessorKey: 'firstExaminationDate',
        header: 'Date de première consultation',
      },
      {
        accessorKey: 'medicalConditions',
        header: 'Conditions médicales',
        size: 100,
      },
    ],
    [],
  );


  const getColorForMode = (modeType) => {
    switch (modeType) {
      case "ContinuousMode":
        return "#B9FFB9"; 
      case "IntermittentMode":
        return "#8FDCF1"; 
      case "ContinuousInstillationMode":
        return "#F6BCBC"; 
      case "IntermittentInstillationMode":
        return "#FFFF99"; 
      default:
        return ""; 
    }
  };
  const renderModeData = (modeType, modeInputs) => {
    switch (modeType) {
      case "ContinuousMode":
        return (
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
           <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TireRepairIcon/>
                  </ListItemIcon>
                  <Typography>Pression: {modeInputs.ContinuousMode.Pressure}</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case "Intermittent Mode":
        return (
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
            <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression min: {modeInputs.IntermittentMode.MinimumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression min: {modeInputs.IntermittentMode.MinimumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression max: {modeInputs.IntermittentMode.MaximumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression max: {modeInputs.IntermittentMode.MaximumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case "ContinuousInstillationMode":
        return (
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
            <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression: {modeInputs.ContinuousInstillationMode.Pressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression: {modeInputs.ContinuousInstillationMode.PressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <VolumeUpIcon/> </ListItemIcon>
                  <Typography> Volume: {modeInputs.ContinuousInstillationMode.Volume} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée volume (Temps fonctionnement + Temps repos): {modeInputs.ContinuousInstillationMode.VolumeDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>
        );
      case "IntermittentInstillationMode":
        return (
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px"}}>            
            <List component="nav">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression min: {modeInputs.IntermittentInstillationMode.MinimumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression min: {modeInputs.IntermittentInstillationMode.MinimumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TireRepairIcon/> </ListItemIcon>
                  <Typography> Pression Max: {modeInputs.IntermittentInstillationMode.MaximumPressure} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée pression Max: {modeInputs.IntermittentInstillationMode.MaximumPressureDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <VolumeUpIcon/> </ListItemIcon>
                  <Typography> Volume: {modeInputs.IntermittentInstillationMode.Volume} </Typography> 
                  </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon> <TimerIcon/> </ListItemIcon>
                  <Typography> Durée volume (Temps fonctionnement + Temps repos): {modeInputs.IntermittentInstillationMode.VolumeDuration} </Typography> 
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>  
        );
      default:
        return null;
    }
  };
  return (
    <Container className="mt--7" fluid>
    <Row>
      <div className="col">
        <Card className="shadow">
        <CardHeader className="border-0" style={{ fontSize: "24px", fontWeight: "bold",  position: "relative", textAlign: "center" }}>
          <div>
            <h1 className="mb-0">Tableau des dossiers médicaux</h1>
          </div>  
          <div>
          <Input
  type="number"
  placeholder={`${limit}`}
  value={limit}
  onChange={(e) => {
    const currentValue = parseInt(limit);
    const newValue = parseInt(e.target.value);

    const updatedValue = newValue > currentValue ? newValue + 9 : newValue - 9;

    changeLimit({ target: { value: updatedValue } }); // Call the changeLimit function with the updated value
  }}
  style={{ width: "70px", fontSize: "14px" }}
  className="mr-2 form-control"
  min={0}
/>
            <Link to="/Medicalrecord/add" style={{ textDecoration: "none", color: "inherit",  position: "absolute", top: "15px", right: "45px"}}>
              <button style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                <FaPlus style={{ fontSize: "24px" }} />
              </button>
            </Link>
          </div>
        </CardHeader>
      <MaterialReactTable id="table"
        columns={columns}
        data={data}
        enablePagination={false}
        renderDetailPanel={({ row }) => ( 
          <Box sx={{ display: 'grid',  gridTemplateColumns: '95% 1fr' }}>
            <Box sx={{ display: 'grid', margin: 'auto', gridTemplateColumns: '1fr 1fr', width: '100%'}}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", justifyContent: "space-around", alignItems: "stretch" }}>
                {row.original.consultation && row.original.consultation.length === 0 ? (
                    <Box>
                      <Typography variant="">Data not found</Typography>  
                    </Box>
                  ):(
                row.original.consultation.map((consultation, index) =>  (
                    <CardM key={index}
                      style={{ backgroundColor: getColorForMode(consultation.modeType), margin: "10px", padding: "10px", color: "black", minWidth: "350px", display: "flex", flexDirection: "column",
                      }} >
                      <CardHeader sx={{display:"grid", gridTemplateColumns:"50% 50%", alignItems:"center"}}>
                          <Grid container>
                            <Grid item lg={6}><Typography variant="h5">Consultation</Typography></Grid>
                            <Grid item lg={6}>
                              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                                <Button onClick={() => { }} color="yellow-button" title="Edit " className="yellow-button">
                                  <BsPencil />
                                </Button>
                                <Button onClick={() => { }} color="danger" title="Delete "> 
                                  <RiDeleteBinLine/> 
                                </Button>
                                <ConsultationPatient/>
                              </Box>
                            </Grid>
                            </Grid>
                      </CardHeader>
                      <CardContent>
                        <Typography>
                          Date de consultation: {consultation.examinationDate}
                        </Typography>
                        <Typography variant="h6">
                          Mode: {consultation.modeType} 
                        </Typography>
                        {renderModeData(consultation.modeType, consultation.modeInputs)}
                        <Typography variant="h6">Médecins</Typography>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
                          <List component="nav">
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <MedicalServicesIcon/>
                                  </ListItemIcon>
                                <Typography>
                                    {consultation.doctor.map((doctor, index) => (
                                      <div key={index}>{doctor}</div>
                                    ))}
                                  </Typography>                
                                </ListItemButton>
                              </ListItem>
                          </List>
                        </Box>
                        <Typography variant="h6">Infirmières</Typography>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px" }}>            
                            <List component="nav">
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <MedicationLiquidIcon/>
                                  </ListItemIcon>
                                  <Typography>
                                    {consultation.nurse.map((nurse, index) => (
                                      <div key={index}>{nurse}</div>
                                    ))}
                                  </Typography>               
                                </ListItemButton>
                              </ListItem>
                            </List>
                        </Box>

                        <Typography variant="h6">Images</Typography>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFBFB', marginBottom:"10px"}}> 
                          {consultation.image.map((img, index) => (
                            <img key={index} src={img} alt={img} />
                            ))}
                        </Box>

                      </CardContent>
                    </CardM>
                )))}
              </div>
            </Box>
            <Box sx={{ width:"80px", height:"80px" }}>
              <IconButton color="primary"> <Add/></IconButton>
            </Box>
          </Box>
        )}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <Button
              onClick={() => {
                table.setEditingRow(row);
              }}
                color="yellow-button"
                title="Edit "
                className="yellow-button"
              >
                <BsPencil />
              </Button>
              <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
                <ModalHeader toggle={() => setDeleteModalOpen(false)}>Confirm deletion</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete this Medical?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => {
                    handleDeleteMedical(deleteMedicalId);
                    setDeleteModalOpen(false);
                  }}>Yes</Button>{' '}
                  <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>Retour</Button>
                </ModalFooter>
              </Modal>
              <Button onClick={() => { setDeleteMedicalId(row.original._id); setDeleteModalOpen(true);
                  data.splice(row.index, 1);
                  setData([...data]);
                }}
              color="danger"  title="Delete "> <RiDeleteBinLine /> </Button>
              <button className="btn  blue-button">
                <a href="#eyeModal" data-toggle="modal" style={{ color: 'white' }}>
                  <Link to={`/medical-record/patient-details/${row.original._id}`}>
                    <FaEye/>
                  </Link>
                </a>
              </button>
            </Box>
          </Box>
        )}
      />
      <div id="react-paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={8}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={8}
          containerClassName={"pagination"}
          pageClassName="pageitem"
          pageLinkClassName="pagelink"
          previousClassName="pageitem"
          nextClassName="pageitem"
          breakClassName="pageitem"
          nextLinkClassName="pagelink"
          previousLinkClassName="pagelink"
          activeClassName="active"
          forcePage={currentPage.current - 1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        />
     </div>
     </Card>
          </div>
        </Row >
      </Container >
  );
};
export default MedicalRecordTable;






