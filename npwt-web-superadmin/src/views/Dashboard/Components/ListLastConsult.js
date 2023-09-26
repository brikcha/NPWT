import { Card, Row,CardHeader,Button,Table } from "reactstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ListLastConsult() {
    const [Consultation, setConsultation] = useState([]);
    useEffect(() => {
      (async function fetchConsult() {
        try {
          const dataConsult = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statistique/getLastConsultations`);
          const vjson = await dataConsult.json();
          setConsultation(vjson);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }, []);
    const ModeTypeData = (modeType) => {
        switch (modeType) {
          case "ContinuousMode":
            return "Continu";
          case "IntermittentMode":
            return "Intermittent:";
          case "ContinuousInstillationMode":
            return "Instillation Continu";
          case "IntermittentInstillationMode":
            return "Intermittent Instillation";
          default:
            return null;
        }
      };
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
      }
      
  return (
    <Card className="shadow">
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col">
          <h3 className="mb-0">Liste des derniers consultations</h3>
        </div>
        <div className="col text-right">
          <Link to='/admin/medical-record/medicals-table'>
            <Button
              color="primary"
              size="sm"
            >
              Plus détails
            </Button>
          </Link>
        </div>
      </Row>
    </CardHeader>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
            <th scope="col">Image</th>
            <th scope="col">Date</th>
            <th scope="col">Mode</th>
            <th scope="col">Taille</th>
            <th scope="col">Machine</th>
        </tr>
      </thead>
      <tbody>
      {Consultation.map((data)=>(
          <tr>
            <th><img style={{ width:"40px", height:"30px" }} src={ `${process.env.REACT_APP_BACKEND_URL}/uploads/MedicalRecord/${data.image}`} alt='plaies'/></th>
            <th scope="row">{formatDate(data.examinationDate)}</th>
            <th scope="row">{ModeTypeData(data.modeType)}</th>
            <th scope="row">{data.taillePlaies}</th>
            <th scope="row">{data.referenceMachine}</th>
          </tr> 
        ))}
      </tbody>
    </Table>
  </Card>
  )
}
