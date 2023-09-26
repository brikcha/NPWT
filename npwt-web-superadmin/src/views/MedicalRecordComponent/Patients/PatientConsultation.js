import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function PatientConsultation() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [numberConsulatation, setNumberConsulatation] = useState(null);
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/medical/getMedicalRecordByIdPatient/${id}`)
          .then((response) => {
            setData(response.data.sort((a, b) =>
              a.examinationDate.localeCompare(b.examinationDate)
            ));
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);
    useEffect(() => {
        async function fetchMedicalRecord() {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical/getNumberConsultationByIdPatient/${id}`);
            setNumberConsulatation(response.data.number_consultation);
          } catch (error) {
            console.error('Error fetching MedicalRecord data:', error);
          }
        }
        fetchMedicalRecord();
      }, []);
  return (
    <div>
      consultation patient
    </div>
  )
}
