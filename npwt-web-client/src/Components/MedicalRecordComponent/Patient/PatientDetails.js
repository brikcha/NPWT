import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';

const PatientDetails = () => {
  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);
  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical-patient/getMedicalRecordPatientDetails/${id}`);
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
  const fields = {
    email: 'Email',
    gender: 'Genre',
    firstName: 'Nom',
    lastName: 'Prénom',
    governorate: 'Gouvernorat',
    phoneNumber: 'Numéro de téléphone',
    firstExaminationDate: 'Date de première consultation',
    dateOfBirth: 'Date de naissance',
    medicalConditions: 'Conditions médicales',
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body text-center">
              <i className="fa-solid fa-hospital-user" style={{ fontSize: "70px" }}></i>
              <h1 className="card-title">
                {`${medicalRecord.firstName} ${medicalRecord.lastName}`}
              </h1>
              <p className="card-text">{medicalRecord.gender}</p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              {Object.keys(medicalRecord).map((key, index) => {
                if (key in medicalRecord && key !== '_id' && key !== '__v' && key !== 'archived') {
                  const translatedKey = fields[key] || key;
                  const fieldValue = key !== 'dateOfBirth' && key !== 'firstExaminationDate'
                    ? medicalRecord[key]
                    : medicalRecord[key].slice(0, 10);

                  return (
                    <div className="row mb-3" key={index}>
                      <div className="col-sm-4 text-muted">{translatedKey}</div>
                      <div className="col-sm-8">{fieldValue}</div>
                    </div>
                  );
                }
                return null;
              })}

              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Nombre de consultation totale:</div>
                <div className="col-sm-8"> {/* Ajoutez ici le nombre de consultations */}
                </div>
              </div>

              <div className="text-center">
                <Link to="/medicalrecord/patients/cards">
                  <Button color="outline-primary" className="btn-lg">Retour</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientDetails;