import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import ReactApexChart from "react-apexcharts";
import { Bar, Pie } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { InputLabel,FormControl,MenuItem,Select } from "@mui/material";
import axios from "axios"; // Importez Axios pour effectuer des requêtes HTTP

export default function ModeConsultationByDate() {
  const [selected, setSelected] = useState("total"); // État local pour suivre la sélection de l'utilisateur
  const [chartDataTotal, setChartDataTotal] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'top', // Adjust legend position
        fontSize: '12px', // Adjust legend font size
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 400
          },
          legend: {
            horizontalAlign: 'right',
          }
        }
      }]
    }
  });  const [chartDataSemaine, setChartDataSemaine] = useState({}); // État local pour stocker les données du graphique
  const [chartDataMois, setChartDataMois] = useState({}); // État local pour stocker les données du graphique
  const [chartDataAnnee, setChartDataAnnee] = useState({}); 

  const mode = (modeType) => {
    switch (modeType) {
      case "ContinuousMode":
        return "Mode Continu";
      case "IntermittentMode":
        return "Mode intermittent:";
      case "ContinuousInstillationMode":
        return "Mode instillation continu";
      case "IntermittentInstillationMode":
        return "Mode Intermittent instillation";
      default:
        return null;
    }
  };
  useEffect(() => {
    axios.get("http://localhost:5000/statistique/getTotalConsultationsByModeType")
      .then((response) => {
        const data = response.data;
        const chartDataTotal = {
          series:  data.map((item) => item.count),
          options: {
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 400
                },
                legend: {
                  horizontalAlign: 'right',
                }
              }
            }],
            //labels: data.map((item) => mode(item._id)),
          },
        };
        setChartDataTotal(chartDataTotal); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleModeChange = (event) => {
    setSelected(event.target.value);
  };
  let chartData;
  switch (selected) {
    case "total":
      chartData = chartDataTotal;
      break;
    case "semaine":
      chartData = chartDataSemaine;
      break;
    case "mois":
      chartData = chartDataMois;
      break;
    case "annee":
      chartData = chartDataAnnee;
      break;
    default:
      chartData = chartDataTotal; // Par défaut, utilisez le mode "Total"
  }

  return (
    <Card className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h6 className="text-uppercase text-muted ls-1 mb-1">
              Dossiers médicaux
            </h6>
            <h2 className="mb-0">Nombre consultations</h2>
          </div>
          <div className="">
            <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
              <InputLabel id="Mode-label">Mode</InputLabel>
              <Select
                labelId="Mode-select"
                id="Mode"
                name="Mode"
                value={selected}
                label="Mode"
                onChange={handleModeChange}
              >
                <MenuItem value="total">Total</MenuItem>
                <MenuItem value="semaine">Semaine</MenuItem>
                <MenuItem value="mois">Mois</MenuItem>
                <MenuItem value="annee">Année</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Row>
      </CardHeader>
      <CardBody>
        <div id="chart">
          <ReactApexChart options={chartDataTotal.options} series={chartDataTotal.series} type="donut" />
        </div>
      </CardBody>
    </Card>
  );
}






























// import React,{ useState } from "react";
// import Chart from "chart.js";
// import {  Bar } from "react-chartjs-2";
// import { Button, Card, CardHeader, CardBody, NavItem, NavLink, Nav, Progress, Table, Container, Row, Col,} from "reactstrap";
// import { chartOptions, parseOptions, chartExample1, chartExample2,} from "variables/charts.js";
// import { InputLabel,FormControl,MenuItem,Select } from "@mui/material";
// export default function ModeConsultationByDate() {
//   return (
//     <Card className="shadow">
//     <CardHeader className="bg-transparent">
//       <Row className="align-items-center">
//         <div className="col">
//           <h6 className="text-uppercase text-muted ls-1 mb-1">
//             Dossiers médicaux
//           </h6>
//           <h2 className="mb-0">Nombre consultations</h2>
//         </div>
//         <div className="">
//           <FormControl sx={{ marginTop: 1, minWidth: 120 }} fullWidth>
//               <InputLabel id="Mode-label">Mode</InputLabel>
//                 <Select labelId="Mode-select" id="Mode" name="Mode" 
//                   value={} label="Mode"
//                   onChange={} 
//                 >
//                   <MenuItem value="total">Total</MenuItem>
//                   <MenuItem value="semaine">Semaine</MenuItem>
//                   <MenuItem value="mois">Mois</MenuItem>
//                   <MenuItem value="annee">Année</MenuItem>
//                 </Select>
//           </FormControl>
//         </div>
//       </Row>
//     </CardHeader>
//     <CardBody>
//       <div className="chart">
//         <Bar
//           data={chartExample2.data}
//           options={chartExample2.options}
//         />
//       </div>
//     </CardBody>
//   </Card>
//   )
// }
