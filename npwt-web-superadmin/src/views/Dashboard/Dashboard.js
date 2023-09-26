import { Container, Row, Col,} from "reactstrap";
import NumberPatientByDate from "./Components/NumberPatientByDate";
import CardDash from "./Components/CardDash";
import ListeMachineDispo from "./Components/ListeMachineDispo";
import ModeConsultationByDate from "./Components/ModeConsultationByDate";
import ListLastConsult from "./Components/ListLastConsult";

const Dashboard = (props) => {
  return (
    <>
      <CardDash />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <NumberPatientByDate/>
          </Col>
          <Col xl="6">
            <ModeConsultationByDate/>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <ListLastConsult/>
          </Col>
          <Col xl="4">
            <ListeMachineDispo/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
