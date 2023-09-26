import { Card, Row,CardHeader,Button,Table } from "reactstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ListeMachineDispo() {
  const [Machine, setMachine] = useState([]);
  useEffect(() => {
    (async function fetchMachine() {
      try {
        const dataMachine = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statistique/listeMachineDisponible`);
        const vjson = await dataMachine.json();
        setMachine(vjson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  return (
    <Card className="shadow">
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col-8">
          <h3 className="mb-0">Liste Machine disponible</h3>
        </div>
        <div className="col text-right">
          <Link to='/admin/machines/table'>
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
          <th scope="col">Reference Machine</th>
        </tr>
      </thead>
      <tbody>
        {Machine.map((data)=>(
          <tr>
            <th scope="row">{data.reference}</th>
          </tr> 
        ))}
      </tbody>
    </Table>
  </Card>
  )
}
