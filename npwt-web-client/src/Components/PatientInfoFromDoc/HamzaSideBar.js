import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../MedicalRecordComponent/sideNavBar.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil, faPlus, faTrash, faLock } from "@fortawesome/free-solid-svg-icons";

function HamzaSideBar(props) {

  const navigate = useNavigate();

  const handleBackToWorkspace = () => {
    navigate('/AddWorktime/AppointmentsList');
  };

  return (
    <>
      <div>
        {/*mobile navigation bar start*/}
        <div className="mobile_nav">
          <div className="nav_barr">
            <img src="../assetsTemplates/template1/img/testimonial-1.jpg" className="mobile_profile_imagee" alt="" />
            <i className="fa fa-bars nav_btnn" />
          </div>
          <div className="mobile_nav_items">

            <a href="#"><i className="fas fa-table" /><span>Tables</span></a>
            <a href="#"><i className="fas fa-th" /><span>Forms</span></a>
            <a href="#"><i className="fas fa-info-circle" /><span>About</span></a>
            <a href="#"><i className="fas fa-sliders-h" /><span>Settings</span></a>


          </div>
        </div>
        {/*mobile navigation bar end*/}



        {/*sidebar start*/}
        <div className="sidebarr sidebar">
          <div className="profile_infoo">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${props.user.image}`} className="profile_imagee" alt="" />
            <h4 className="titlee">{props.user.userName}</h4>
          </div>

          <NavLink to={`/Medicalrecord/SummaryAlpha/${props.user._id}`} className="nav-item nav-link "><i className="fas fa-user" /><span>Summary Of the medical record</span></NavLink>
          <NavLink to={`/Medicalrecord/BloodandMeasurementsAlpha/${props.user._id}`} className="nav-item nav-link "><i className="fas fa-plus-square" /><span>Blood groups and measurements</span></NavLink>
          <NavLink to={`/Medicalrecord/VitalSignsAlpha/${props.user._id}`} className="nav-item nav-link "><i className="fas fa-heartbeat" /><span>Vital Signs</span></NavLink>
          <NavLink to={`/Medicalrecord/listPrescriptionsForDoctor/${props.user._id}`} className="nav-item nav-link "><i className="fas fa-list" /><span>Prescriptions</span></NavLink>

          
         
          <div className="cardd cardMD col-lg-9 mx-5 mt-4 mb-5">
            <div className="card-header "><i className="fas fa-plus" /><button className="btn btn-secondary mx-3" onClick={()=>{navigate(`/Medicalrecord/addPrescription/${props.user._id}`)}}>Add Prescription</button></div>
          </div>


          <div className="text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={handleBackToWorkspace} style={{ backgroundColor: "green" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fas fa-arrow-left mt-1" style={{ display: "inline-block", verticalAlign: "middle" }}></i>
                Go back to workspace
              </div>
            </button>
          </div>
        </div>

        {/*sidebar end*/}

      </div>
    </>
  );
}

export default HamzaSideBar;
