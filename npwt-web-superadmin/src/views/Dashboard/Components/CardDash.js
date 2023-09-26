import { Card, Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardDash() {
    const [statistics, setStatistics] = useState({});
    const iconColors = ["bg-yellow", "bg-blue", "bg-green", "bg-red"];
    const iconName = ["fa-user-tie","fa-users","fa-file-medical", "fa-kit-medical"];
    useEffect(() => {
      (async function fetchCard() {
        try {
          const dataCard = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statistique/countDashboard`);
          const vjson = await dataCard.json();
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
              <Row>
                {Object.keys(statistics).map((key, index) => (
                  <Col lg="4" xl="" key={index} >
                    <Card className=" mb-1 mb-xl-0 py-2 px-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="h1 font-weight-bold mb-0">{statistics[key]}</span>
                          <div className={`icon icon-shape text-white rounded-circle shadow ${iconColors[index % iconColors.length]}`}>
                            <i className={`fas ${iconName[index % iconName.length]}`}/>                          
                          </div>
                        </div>
                        <div className="text-capitalize text-muted"> {key} </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
}
