import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DefaultProfileImage from "../ChatComponent/defaultProfile.jpg"

function SidebarApp() {
    const [admin, setAdmin] = useState({});
    useEffect(() => {
        const token = localStorage.getItem("jwtTokenAdmin");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setAdmin(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);
    return ( 
        <div style={{ marginBottom: "40px" }} >
            <div className="sidebar" >
                <div className="profile_info">
                    {admin.image!==undefined ? 
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${admin.image}`} 
                        className="profile_image" alt="" />
                        :
                        <img src={DefaultProfileImage} alt="profileImage" id="img" className="profile_image"/>
                    } 
                    <h4 className="title">
                        {admin.firstName} {admin.lastName}<br/>
                     
                    </h4>
                </div>
                <NavLink to="/UpdateProfile/publicProfile" className="nav-item nav-link "><i className="fas fa-user" /><span>Profile</span></NavLink>
                <NavLink to="/UpdateProfile/UpdatePassword" className="nav-item nav-link "><i className="fas fa-key" /><span>Changer mot de passe</span></NavLink>
                <NavLink to="/UpdateProfile/liste-utilisateur-chat" className="nav-item nav-link "><i className="fas fa-comments" /><span>Discussion</span></NavLink>
               
            </div>
        </div>
    );
}
export default SidebarApp;