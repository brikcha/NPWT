import SideNavBarComponent from '../PatientInfoFromDoc/HamzaSideBar';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../MedicalRecordComponent/imageFile.css';
import '../MedicalRecordComponent/sideNavBar.css';

function HamzaBlood() {

    const { id } = useParams();

    const [User, setUser] = useState({});
    const [MedicalRecord, setMedicalRecord] = useState({});
    const Blood=["A","B","AB","O"]
    const {
        bloodGroups,
        arterialPressure,
        weight,
        size
       }=MedicalRecord 
       
    useEffect(() => {
      
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
              .then(response => {
               
                setUser(response.data);
              
              })
              .catch(error => {
                console.error(error);
              });
          
       
      }, []);

      useEffect(() => {
        if (User) {
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
            .then(response => {
              setMedicalRecord(response.data);
            
            })
            .catch(error => {
              console.error(error);
            });
          
        }
      }, [User]);


    return (

        <div className='container  pt-5 pb-5'>
            <div className=" row  ">
                <div className="col-lg-4">
                <SideNavBarComponent  user={User}></SideNavBarComponent>
            </div>

            {/* Account details card*/}
            <div className='col-lg-8  mb-5'>
                    <div className="card cardMD cardRes ">
                <div className="card-header "><i className="fas fa-plus-square" /> Blood groups and Measurements </div>
                <div className="card-body">
                    <form>
                        {/* Form Group (username)*/}
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Blood Groups</label>
                                <select className="form-control bg-light p-1 m-1" value={bloodGroups} name='bloodGroups' disabled>
                                    <option value="" selected>Select Blood Group</option>
                                    {Blood.map((P) => (
                                        <option key={P} value={P}>
                                            {P}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone">arterial pressure</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your arterial pressure" value={arterialPressure} name='arterialPressure' disabled/>
                            </div>
                        </div>

                        <div className="row gx-3 mb-3">


                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">weight</label>
                                <input className="form-control" id="inputOrgName" type="number" placeholder="Enter your weight.." min="0" max="500"  value={weight} name='weight' disabled/>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">size(cm)</label>
                                <input className="form-control" id="inputOrgName" type="number" min="0" max="300"  placeholder="Enter your size" value={size} name='size' disabled/>
                            </div>
                        </div>

                     </form>


                        <div className="row d-flex justify-content-end ">
                                <div className=" col-lg-8 col-md-8 col-12 mt-5 " >
                                    <img className="img-fluid Image" src="../assetsTemplates/images/human.png" alt="" style={{ width: "auto", height: "auto"}} />
                                </div>
                        </div>


                
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default HamzaBlood;