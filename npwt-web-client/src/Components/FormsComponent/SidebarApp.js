import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function SidebarApp() {
    const [doctor, setDoctor] = useState({});
    const [uploadedFile, setUploadedFile] = useState()
    const navigate=useNavigate()
 
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setDoctor(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);
    const handleChange = (event) => {
        setUploadedFile(event.target.files[0]);
        console.log(uploadedFile)
    
      };


    const addImageprofile = (e) => {

        const formData = new FormData();
        // uploadedFile.forEach(file => {
        //   console.log(file)
        //   formData.append('file', uploadedFile, uploadedFile.name);
        //   console.log(formData)
        // });
         formData.append('file', uploadedFile, uploadedFile.name);
    
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/addImageProfile/${doctor._id}`, formData)
          .then((response) => {
            console.log(response.data)
            navigate(0)
           
          })
          .catch((error) => {
            console.log(error);
          });
    
    
      }
    return ( 
        <>
            <div className="col-lg-4" style={{ marginBottom: "40px" }}>
                <>
                    <div>
                        {/*sidebar start*/}
                    
                            <div className="sidebar  ">

                                <div className="image-upload ">
                                    <label htmlFor="file-input">
                                        <img src="../assetsTemplates/images/rotate.png" className="image-upload " alt="" />
                                    </label>
                                    <input id="file-input" onChange={(e) => handleChange(e)} type="file" />
                                </div>

                                <div className="profile_info">
                                    <img src={`${process.env.REACT_APP_CLIENT_URL}/userProfile/${doctor.image}`} className="profile_image  " alt="" />

                                    <Button onClick={() => addImageprofile()}>
                                        <FontAwesomeIcon icon={faPlus} className="px-2" />Change Image
                                    </Button>
                                    <h4 className="title">{doctor.userName}</h4>
                                <h4 className="title">{`Bienvenue ${doctor.userName} !`}</h4>
                                </div>


                                {/*<NavLink
                                    to="/AddWorktime/WorktimeDoc"
                                    className="nav-item nav-link "
                                >
                                    <i className="far fa-clock" />
                                    <span>Worktime</span>
                                </NavLink>
                                <NavLink
                                    to="/AddWorktime/AppointmentsList"
                                    className="nav-item nav-link "
                                >
                                    <i className="fas fa-th" />
                                    <span>Appointments</span>
    </NavLink>*/}
     <NavLink to="/UpdateProfile/publicProfile" className="nav-item nav-link "><i className="fas fa-user" /><span>Profile</span></NavLink>
        <NavLink to="/UpdateProfile/UpdatePassword" className="nav-item nav-link "><i className="fas fa-key" /><span>Changer Le Mot De Passe</span></NavLink>
        <NavLink to="/UpdateProfile/patientList" className="nav-item nav-link "><i className="fas fa-comments" /><span>Discussion</span></NavLink>
        {/* <NavLink to="/UpdateProfile/patientList" className="nav-item nav-link "><i className="fas fa-user" /><span>Patient List</span></NavLink> */}

                            </div>

                            {/*sidebar end*/}
                        </div>
                    </>
                </div>
            </>
            );
}
export default SidebarApp;