import React, {useState, useEffect} from 'react'
import classnames from "classnames";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import {  Card, CardHeader, CardBody, NavItem, NavLink, Nav, Row} from "reactstrap";
import { chartOptions, parseOptions} from "variables/charts.js";

export default function NumberPatientByDate() {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [data, setData] = useState([]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  useEffect(() => {
    (async function getStatus() {
      try {
        const dataPatient = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statistique/weekPatientNumber`);
        const vjson = await dataPatient.json();
        setData(vjson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  
  return (
    <Card className="bg-gradient-default shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h6 className="text-uppercase text-light ls-1 mb-1">
            Dossiers médicaux
            </h6>
            <h2 className="text-white mb-0">Nombre Patients</h2>
          </div>
          <div className="col">
            <Nav className="justify-content-end" pills>
              <NavItem>
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: activeNav === 1,
                  })}
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, 1)}
                >
                  <span className="d-none d-md-block">Month</span>
                  <span className="d-md-none">M</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: activeNav === 2,
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, 2)}
                >
                  <span className="d-none d-md-block">Week</span>
                  <span className="d-md-none">W</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="chart">
        <Line
          data={{
            labels: data.map(item => item.date),
            datasets: [
              {
                label: "Number of Patients",
                data: data.map(item => item.count),
                fill: true,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
              },
            ],
          }}
        />
        </div>
      </CardBody>
    </Card>
  )
}
