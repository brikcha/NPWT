import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Form, FormGroup, Label, FormFeedback } from "reactstrap";
import * as api from 'api/index';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const UpdateMedical = () => {
  const { id } = useParams();
  const [medical, setMedical] = useState({ doctor: "", nurse: "", examinationDate: "", referenceMachine: "", taillePlaies: "", pansement: "",});
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await api.getMedicalDetails(id);
        setMedical(userData.data);
        console.log(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUser();
  }, [id]);
  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/medical/updateMedical/${id}`,medical);
      Swal.fire({
        title: 'Medical',
        text: 'Mise à jour réussie !',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      Swal.fire({
        title: 'Medical: Erreur lors de la mise à jour.!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedical((prevMedical) => ({
      ...prevMedical,
      [name]: value, 
    }));
  };
 
 
 
  return (
    <div className="d-flex justify-content-center">
      <img className="imgForm img-fluid d-none d-lg-block position-absolute" alt="..." src={require("assets/img/brand/img.jpg")} style={{  height: "100vh", width:"100%" }}/>
      <div className="container align-middle">
          <div className="d-flex justify-content-center">
            <div className="card-body col-lg-12 offset-lg-5">
              <Form>
                <h1 className="text-center mb-2">Modifier Dossier Medical</h1>
                {/* <div className="d-flex justify-content-between">
                    <FormGroup className="flex-fill mr-1">
                    <Label>Médecin</Label>
                    <Input
                        type="text"
                        name="doctor"
                        value={medical.doctor} 
                        onChange={handleChange}
                        required
                    />
                    </FormGroup>
    
                    <FormGroup className="flex-fill ml-1">
                    <Label>Infirmier</Label>
                    <Input
                        type="text"
                        name="nurse"
                        value={medical.nurse}
                        onChange={handleChange}
                        required
                    />
                    </FormGroup>
                </div> */}
                <div className="d-flex justify-content-between">
                  <FormGroup className="mr-1" style={{ width:"50%" }}>
                    <Label>Pansement</Label>
                    <Input type="select" name="pansement" value={medical.pansement} onChange={handleChange} required >
                      <option value="">Choisir un pansement</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Input>
                  </FormGroup>
                 
                </div>
                <div className="d-flex justify-content-between">
                  
                  <FormGroup className="flex-fill ml-1">
                    <Label>Taille Plaies</Label>
                    <Input type="text" name="taillePlaies" value={medical.taillePlaies} onChange={handleChange}  />
                  </FormGroup>
                </div>
                <div className="d-flex justify-content-between">          
                  
                  <FormGroup className="ml-1" style={{ width:"50%" }}>
                    <Label>Date de première consultation</Label>
                    <Input type="date" name="examinationDate" value={medical.examinationDate.slice(0, 10)} onChange={handleChange}/>
                </FormGroup>
                </div>
                <FormGroup>
                    <Label>Référence Machine</Label>
                    <Input type="text" name="referenceMachine" value={medical.referenceMachine} onChange={handleChange} />
                </FormGroup>
                <div className="text-center">
                  <Button color="primary" onClick={handleUpdate}> Mettre à jour</Button>  
                  <Link to="/admin/medical-record/medicals-table">
                    <Button color="outline-primary" className="ms-1"> Retour </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
      </div>
    </div>
  );
};
export default UpdateMedical;