import { useEffect, useState } from "react";
import DefaultProfileImage from '../../defaultProfile.jpg';
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./chat.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectReceiver,
  selectUser,
} from "../../Redux/slices/userSelectedSlice";
import SidebarApp from "../NavBarComponent/SidebarApp";
function UserChatList() {
  const dispatch = useDispatch();
  const [User, setUser] = useState({});
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(token);
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/listUser`, {
        doctorId: decodedToken.id,
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/doctor/getPatientList`, {
        doctorId: decodedToken.id,
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleClick = async (patient) => {
    dispatch(selectUser(patient.userName));
    dispatch(selectReceiver(patient));
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
      userId: patient._id,
      userConnectedId: decodedToken.id,
    });
    navigate("/UpdateProfile/chat");
  };
  return (
    <>
      <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4 col-md-12">
            <SidebarApp user={User}></SidebarApp>
          </div>
          <div className="col-lg-8 col-md-12 mb-5">
            <div className="ml-lg-5">
            <div className="card cardMD cardRes ">
              <div className="card-header ">
                <i className="fas fa-plus-square" /> Liste des utilisateurs
              </div>
              <div className="card-body">
              <Table striped style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem", backgroundColor: "#fff", color: "#212529", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", border: "1px solid #dee2e6", borderRadius: "0.25rem", overflow: "auto" }}>
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th className="title-table"></th>
                    <th className="title-table"> Nom d'utilisateur </th>
                    <th className="title-table">Role </th>
                    <th className="title-table">Action </th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} style={{ ':hover': { backgroundColor: "#f5f5f5" } }}>
                      <td className="td-table td-image" >
                      {patient.image!==undefined ? 
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${patient.image}`} className="imgChat" alt="" />
                        :
                        <img src={DefaultProfileImage} alt="profileImage" id="img" className="imgChat"/>
                        }
                      </td>
                      <td className="td-table" >{patient.userName}</td>
                      <td className="td-table" >{patient.role}</td>
                      <td className="td-table">
                        <button
                          onClick={() => handleClick(patient)}
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
      </div>
    </>
  );
}

export default UserChatList;