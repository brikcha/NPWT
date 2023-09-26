import Table from "react-bootstrap/Table";
import SideNavBarComponent from "../NavBarComponent/SideNavBarComponent";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  selectReceiver,
  selectUser,
} from "../../Redux/slices/userSelectedSlice";
import { useNavigate } from "react-router-dom";
function DoctorsListComponent() {
  const [User, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/patient/getListDoctor`, {
        patientId: decodedToken.id,
      })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleClick = async (doctor) => {
    dispatch(selectUser(doctor.userName));
    dispatch(selectReceiver(doctor));
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
      userId: doctor._id,
      userConnectedId: decodedToken.id,
    });
    navigate("/MedicalRecord/chat");
  };
  return (
    <>
      <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarComponent user={User}></SideNavBarComponent>
          </div>
          <div className="col-lg-8  mb-5">
            <div className="card cardMD cardRes ">
              <div className="card-header ">
                <i className="fas fa-plus-square" /> Doctors List
              </div>
              <div className="card-body">
              <Table striped style={{ 
  borderCollapse: "collapse", 
  width: "100%", 
  marginBottom: "1rem", 
  backgroundColor: "#fff", 
  color: "#212529", 
  fontSize: "0.875rem", 
  fontWeight: "400", 
  lineHeight: "1.5", 
  border: "1px solid #dee2e6", 
  borderRadius: "0.25rem", 
  overflow: "auto" 
}}>
  <thead style={{ backgroundColor: "#f5f5f5" }}>
    <tr>
      <th
        style={{
          padding: "0.75rem",
          textAlign: "left",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        Doctor Name
      </th>
      <th
        style={{
          padding: "0.75rem",
          textAlign: "center",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        Action
      </th>
    </tr>
  </thead>
  <tbody>
    {doctors.map((doctor, index) => (
      <tr key={index} style={{ ':hover': { backgroundColor: "#f5f5f5" } }}>
        <td
          style={{
            padding: "0.75rem",
            borderBottom: "1px solid #dee2e6",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {doctor.userName}
        </td>
        <td
          style={{
            padding: "0.75rem",
            textAlign: "center",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <button
            onClick={() => handleClick(doctor)}
            style={{
              padding: "0.375rem 0.75rem",
              border: "none",
              borderRadius: "0.25rem",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              transition: "all 0.3s ease",
            }}
          >
            <i className="bi bi-chat"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsListComponent;
