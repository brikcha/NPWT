import { Card, Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from 'react';

const StatistiquesConsultation = () => {
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    (async function fetchMachine() {
      try {
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statistique/countConsultation`);
        const vjson = await data.json();
        setStatistics(vjson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  return (
    <>
   <div className="header bg-gradient-info pb-8 pt-5 pt-md-6">
  <Container fluid>
    <div className="header-body">
      <Row className="align-items-center">
        {Object.keys(statistics).map((key, index) => (
          <Col lg="4" xl="" key={index}>
            <Card className="mb-1 mb-xl-0 py-2 px-3" style={{ width: '100%'}}>
              <div className="d-flex justify-content-between mb-2 align-items-center">
                <div className="h1 font-weight-bold mb-0">{statistics[key]}</div>
                <h5 className="text-capitalize text-muted ml-3">{key}</h5>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </Container>
</div>

    </>
  );
};

export default StatistiquesConsultation;