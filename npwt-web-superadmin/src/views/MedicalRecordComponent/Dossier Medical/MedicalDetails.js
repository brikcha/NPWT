import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../Css/Patient.css';
import UserChip from "../../../components/Tables/UserChip";
import * as api from 'api/index';
import  DefaultImage  from "../../../assets/img/brand/defaultProfile.jpg";
import '../../Loading.css'
const MedicalDetails = () => {
  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);

  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const response = await api.getMedicalDetails(id);
        setMedicalRecord(response.data);
      } catch (error) {
        console.error('Error fetching MedicalRecord data:', error);
      }
    }
    fetchMedicalRecord();
  }, [id]);

  if (!medicalRecord) {
    return  <div className="centered-container">
                <div className="circle-loader"></div>
            </div>;
  }

  const tableAffiche = [
    'doctor',
    'nurse',
    'referenceMachine',
    'taillePlaies',
    'pansement'
  ];
  const handleValue=(key)=>{
    let value; 
    if (key === 'doctor' || key === 'nurse') {
      value = <UserChip dataUser={medicalRecord[key]}/>;
    } else if (key === 'examinationDate') {
      value = medicalRecord[key].slice(0, 10);
    } else {
      value = medicalRecord[key];
    }   
    return value; 
  }
  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${day}-${month}-${year}`;
    }
    return dateString;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card mt-2 cardDetails">
            <div className="card-body text-center">
              <i className="fa-solid fa-hospital-user" style={{ fontSize: '50px' }}></i>
              {/* <h1>Patient: {medicalRecord.patient.firstName} {medicalRecord.patient.lastName}</h1> */}
              Date consultation:  {`${formatDate(medicalRecord.examinationDate.slice(0,10))}`}  
            </div>
          </div>
          <div className='row' style={{ display:'flex', justifyContent:"center", alignItems:"center" }}>
            <div className='col-md-5 col-sm-12'>
              { medicalRecord.image!== null && medicalRecord.image? 
              <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/MedicalRecord/${medicalRecord.image}`} alt="profile image"
              className=" img-fluid" style={{ width: '500px' , height: '400px' }} />
              :
              <img src={DefaultImage} 
                alt="profile image" id="img" className=" img-fluid" style={{ width: '500px', height: '400px' }} />
              }
            </div>
            <div className='col-md-7  col-sm-12'>
              <div className="card mt-3">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        {tableAffiche.map((key) => {
                          const translatedKey = {
                            doctor: 'Médecin',
                            nurse: 'Infirmier',
                            referenceMachine: 'Référence Machine',
                            taillePlaies: 'Taille Plaie',
                            pansement: 'Pansement'
                          }[key];

                          let value= handleValue(key)

                          return (
                            <tr key={key}>
                              <td className="text-muted">{translatedKey}</td>
                              <td>{value}</td>
                            </tr>
                          );
                        })}
                        {medicalRecord.modeInputs && medicalRecord.modeInputs.ContinuousMode && (
                          <tr>
                            <td className="text-muted">Mode Continu:</td>
                            <td>Pression: {medicalRecord.modeInputs.ContinuousMode.Pressure}</td>
                          </tr>
                        )}
                        {medicalRecord.modeInputs && medicalRecord.modeInputs.IntermittentMode && (
                          <tr>
                            <td className="text-muted">Mode intermittent:</td>
                            <td>
                              <div>Pression min: {medicalRecord.modeInputs.IntermittentMode.MinimumPressure}</div>
                              <div>Durée pression min: {medicalRecord.modeInputs.IntermittentMode.MinimumPressureDuration}</div>
                              <div>Pression max: {medicalRecord.modeInputs.IntermittentMode.MaximumPressure}</div>
                              <div>Durée pression max: {medicalRecord.modeInputs.IntermittentMode.MaximumPressureDuration}</div>
                            </td>
                          </tr>
                        )}
                        {medicalRecord.modeInputs && medicalRecord.modeInputs.ContinuousInstillationMode && (
                          <tr>
                            <td className="text-muted"> Mode instillation continu:</td>
                            <td>
                              <div>Pression: {medicalRecord.modeInputs.ContinuousInstillationMode.Pressure}</div>
                              <div>Durée pression: {medicalRecord.modeInputs.ContinuousInstillationMode.PressureDuration}</div>
                              <div>Volume: {medicalRecord.modeInputs.ContinuousInstillationMode.Volume}</div>
                              <div>Durée volume (Temps fonctionnement + Temps repos): {medicalRecord.modeInputs.ContinuousInstillationMode.VolumeDuration}</div>
                            </td>
                          </tr>
                        )}
                        {medicalRecord.modeInputs && medicalRecord.modeInputs.IntermittentInstillationMode && (
                          <tr>
                            <td className="text-muted"> Mode Intermittent instillation:</td>
                            <td>
                              <div>Pression min: {medicalRecord.modeInputs.IntermittentInstillationMode.MinimumPressure}</div>
                              <div>Durée pression min: {medicalRecord.modeInputs.IntermittentInstillationMode.MinimumPressureDuration}</div>
                              <div>Pression Max: {medicalRecord.modeInputs.IntermittentInstillationMode.MaximumPressure}</div>
                              <div>Durée pression Max: {medicalRecord.modeInputs.IntermittentInstillationMode.MaximumPressureDuration}</div>
                              <div>Volume: {medicalRecord.modeInputs.IntermittentInstillationMode.Volume}</div>
                              <div>Durée volume (Temps fonctionnement + Temps repos): {medicalRecord.modeInputs.IntermittentInstillationMode.VolumeDuration}</div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-12 text-right">
                      <Link to="/admin/medical-record/medicals-table">
                        <Button color="outline-primary" className="btn-lg">
                          Retour
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDetails;