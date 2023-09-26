import '../../Css/formUpdateMed.css';
import SideNavBarComponent from '../NavBarComponent/SideNavBarComponent';
import jwt_decode from "jwt-decode";
import axios from "axios"
import { useEffect, useState } from "react"
import { Alert } from 'react-bootstrap';

function BloodComponent() {
   
    const [User, setUser] = useState({});
    const [MedicalRecord, setMedicalRecord] = useState({});
    const [ConfirmeMessage,setConfirmeMessage]=useState(false);
    const Blood=["A","B","AB","O"]
    const {
        bloodGroups,
        arterialPressure,
        weight,
        size
       }=MedicalRecord 
       const token = localStorage.getItem('jwtToken');
      
       const decodedToken = jwt_decode(token);
     //   setIdUser(decodedToken.id);
       console.log(decodedToken.id)
    useEffect(() => {
      
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
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

    const onValueChange = (e) => {
        setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });
        };

    const handleUpdateMedical = (e) => {
            e.preventDefault();
            console.log(MedicalRecord)
           /* axios.put(`${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/update/${User.MedicalRecord}`, MedicalRecord)
               
            .then((response)=>{
                console.log(response.data)
                console.log("medical record updated suuccessfully")
                if(response.data){
                    setConfirmeMessage(true)
                }
            })*/
        }


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
                {ConfirmeMessage && (
                                <Alert
                                    className="form-group"
                                    variant="success"
                                    style={{ marginTop: "-13px" ,height:"50px"}}
                                >
                                    <div
                                        className="form-icon-wrapper  "
                                    >
                                        Your Medical Record is updated succesfully !
                                    </div>
                                </Alert>
                            )}
                    <form>
                        {/* Form Group (username)*/}
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Blood Groups</label>
                                <select className="form-control bg-light p-1 m-1" value={bloodGroups} name='bloodGroups' onChange={(e) => onValueChange(e)}>
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
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your arterial pressure" value={arterialPressure} name='arterialPressure' onChange={(e) => onValueChange(e)} />
                            </div>
                        </div>

                        <div className="row gx-3 mb-3">


                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">weight</label>
                                <input className="form-control" id="inputOrgName" type="number" placeholder="Enter your weight.." min="0" max="500"  value={weight} name='weight' onChange={(e) => onValueChange(e)} />
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">size(cm)</label>
                                <input className="form-control" id="inputOrgName" type="number" min="0" max="300"  placeholder="Enter your size" value={size} name='size' onChange={(e) => onValueChange(e)} />
                            </div>
                        </div>

                        <button className="btn btn-primary " type="button" onClick={handleUpdateMedical}>Save changes</button>

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

export default BloodComponent;
