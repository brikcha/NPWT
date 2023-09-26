import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MedicalRecordDetails = () => {
  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);

  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getMedicalRecordById/${id}`);
        setMedicalRecord(response.data);
      } catch (error) {
        console.error('Error fetching MedicalRecord data:', error);
      }
    }

    fetchMedicalRecord();
  }, [id]);

  if (!medicalRecord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mt-5"  style={{ backgroundColor: '#4169E1', color: 'white' }}>
            <div className="card-body text-center">
              <h5 className="card-title" >
                {/* {`${medicalRecord.firstName} ${medicalRecord.lastName}`} */}
              </h5>
              {/* <p className="card-text " style={{ color: 'white' }}>{medicalRecord.gender}</p> */}

              
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Email:</div>
                {/* <div className="col-sm-8">{medicalRecord.email}</div> */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Phone Number:</div>
                {/* <div className="col-sm-8">{medicalRecord.phoneNumber}</div> */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Governorate:</div>
                {/* <div className="col-sm-8">{medicalRecord.governorate}</div> */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">First Examination Date:</div>
                {/* <div className="col-sm-8">{new Date(medicalRecord.firstExaminationDate).toLocaleDateString()}</div> */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Date of Birth:</div>
                {/* <div className="col-sm-8">{new Date(medicalRecord.dateOfBirth).toLocaleDateString()}</div> */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Medical Conditions:</div>
                {/* <div className="col-sm-8">{medicalRecord.medicalConditions || 'N/A'}</div> */}
              </div>
              {medicalRecord.modeInputs && medicalRecord.modeInputs.ContinuousMode && (
                <div className="row mb-3">
                  <div className="col-sm-4 text-muted">Continuous Mode:</div>
                  <div className="col-sm-8">Pressure: {medicalRecord.modeInputs.ContinuousMode.Pressure}</div>
                </div>
              )}
              {medicalRecord.modeInputs && medicalRecord.modeInputs.IntermittentMode && (
                <div className="row mb-3">
                  <div className="col-sm-4 text-muted">IntermittentMode:</div>
                  <div className="col-sm-8">Minimum Pressure: {medicalRecord.modeInputs.IntermittentMode.MinimumPressure}</div>
                  <div className="col-sm-8">Minimum Pressure Duration: {medicalRecord.modeInputs.IntermittentMode.MinimumPressureDuration}</div>
                  <div className="col-sm-8">Maximum Pressure: {medicalRecord.modeInputs.IntermittentMode.MaximumPressure}</div>
                  <div className="col-sm-8">Maximum Pressure Duration: {medicalRecord.modeInputs.IntermittentMode.MaximumPressureDuration}</div>
                </div>
              )}
              {medicalRecord.modeInputs && medicalRecord.modeInputs.ContinuousInstillationMode && (
                <div className="row mb-3">
                  <div className="col-sm-4 text-muted"> ContinuousInstillationMode:</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.ContinuousInstillationMode.Pressure}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.ContinuousInstillationMode.PressureDuration}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.ContinuousInstillationMode.Volume}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.ContinuousInstillationMode.VolumeDuration}</div>
                </div>
              )}
               {medicalRecord.modeInputs && medicalRecord.modeInputs.IntermittentInstillationMode && (
                <div className="row mb-3">
                  <div className="col-sm-4 text-muted"> IntermittentInstillationMode:</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.IntermittentInstillationMode.MinimumPressure}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.IntermittentInstillationMode.MinimumPressureDuration}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.IntermittentInstillationMode.MaximumPressure}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.IntermittentInstillationMode.MaximumPressureDuration}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.IntermittentInstillationMode.Volume}</div>
                  <div className="col-sm-8">{medicalRecord.modeInputs.IntermittentInstillationMode.VolumeDuration}</div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default MedicalRecordDetails;