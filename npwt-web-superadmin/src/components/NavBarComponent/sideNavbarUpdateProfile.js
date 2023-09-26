import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { NavLink } from "react-router-dom";

import UpdateImage from "../ProfileComponent/UpdateImage";

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
        <div style={{ marginBottom: "40px" }}>
            <div className="sidebar">
                <UpdateImage admin={admin} idAdmin={admin._id}/>
                <NavLink to="/UpdateProfile/publicProfile" className="nav-item nav-link "><i className="fas fa-user" /><span>Profile</span></NavLink>
                <NavLink to="/UpdateProfile/UpdatePassword" className="nav-item nav-link "><i className="fas fa-key" /><span>Changer mot de passe</span></NavLink>
                <NavLink to="/UpdateProfile/liste-utilisateur-chat" className="nav-item nav-link "><i className="fas fa-comments" /><span>Discussion</span></NavLink>


                {/* <NavLink
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
                </NavLink> */}
                {/* <NavLink to="/UpdateProfile/liste-utilisateur-chat" className="nav-item nav-link "><i className="fas fa-user" /><span>Patient List</span></NavLink> */}

            </div>
        </div>
            );
}
export default SidebarApp;