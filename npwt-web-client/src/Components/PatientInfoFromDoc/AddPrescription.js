import { useEffect, useState } from "react";
import SideNavBarComponent from "../MedicalRecordComponent/SideNavBarComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SidebarApp from "../FormsComponent/SidebarApp";
import HamzaSideBar from "./HamzaSideBar";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import './stylecss.css';
import jwt_decode from "jwt-decode";
import { Alert } from 'react-bootstrap';


function AddPrescriptionComponent() {
    const { id } = useParams();
    const [User, setUser] = useState({});
    const [ShowErrorMessage, setShowErrorMessage] = useState(false)
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const navigate=useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    const [newPrescription, setnewPrescription] = useState({
        DateOfVisit: "",
        Treatments: "",
        Instruction: "",
        Note: "",
     
    })


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
            .then(response => {

                setUser(response.data);


            })
            .catch(error => {
                console.error(error);
            });


    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);

    };

    const changeHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
        console.log(file)
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    const onValueChange = (e) => {
        e.preventDefault();
        setnewPrescription({ ...newPrescription, [e.target.name]: e.target.value });
        console.log(newPrescription)


    };

    const nextStep = () => {
        if (newPrescription.isFormEmpty === "" || newPrescription.Treatments==="" || newPrescription.Instruction==="" || newPrescription.Note==="") {
            setShowErrorMessage(true)
        }
        else{
            setShowErrorMessage(false)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
          
            
        
    }

    const addPrescriptionwithFile = (e) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(newPrescription)
            console.log(id)
            console.log(decodedToken.id)
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/prescription/addPrescriptionwithDoctorAndPatient/${decodedToken.id}/${id}`, newPrescription)
                .then((response) => {
                    console.log(response.data)
                    const formData = new FormData();
                    formData.append('file', file, file.name);
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/prescription/addFileToPrescription/${response.data._id}`, formData)
                        .then((response) => {
                            console.log(response.data)
                            
                            navigate(`/Medicalrecord/listPrescriptionsForDoctor/${id}`)

                        })
                        .catch((error) => {
                            console.log(error);
                        });


                })
                .catch((error) => {
                    console.error(error);
                });
        }

        

    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (

                    <div>
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="input1" className="mt-5" >Date of Visit: </label>
                                <input
                                    className="form-control"
                                    id="input1"
                                    type="date"
                                    name="DateOfVisit"
                                    value={newPrescription.DateOfVisit}
                                    onChange={(e) => onValueChange(e)}

                                />
                            </div>
                        </div>
                        <label htmlFor="input1" className="mt-3" >Treatments: </label>
                        <textarea
                            className="form-control"
                            id="input2"
                            name="Treatments"
                            value={newPrescription.Treatments}
                            onChange={(e) => onValueChange(e)}
                        />
                        <label htmlFor="input1" className="mt-3" >Instruction: </label>
                        <textarea
                            className="form-control"
                            id="input3"
                            name="Instruction"
                            value={newPrescription.Instruction}
                            onChange={(e) => onValueChange(e)}

                        />
                        <label htmlFor="input1" className="mt-3" >Note: </label>
                        <textarea
                            className="form-control"
                            id="input4"
                            name="Note"
                            value={newPrescription.Note}
                            onChange={(e) => onValueChange(e)}



                        />
                    </div>


                );
            case 1:
                return (
                    <div className="d-flex flex-column">
                        <label htmlFor="input2" className="mt-5">Add your Signature:</label>

                        <input
                            id="input2"
                            type="file"

                            onChange={changeHandler}
                        />
                        {fileDataURL ?
                            <p className="img-preview-wrapper">
                                {
                                    <img src={fileDataURL} alt="preview" className="img-preview " />
                                }
                            </p> : null}

                    </div>
                );

            default:
                return "Unknown step";
        }
    };







    return (
        <>
            <div className='container  pt-5 pb-5'>
                <div className=" row  ">
                    <div className="col-lg-4">
                        <HamzaSideBar user={User}></HamzaSideBar>
                    </div>

                    {/* Account details card*/}
                    <div className='col-lg-8  mb-5'>
                        <div className="card cardMD cardRes ">
                            <div className="card-header "><i className="fas fa-plus-square" /> Prescription </div>
                            <div className="card-body">
                                <Box sx={{ maxWidth: 1000 }}>
                                    <Stepper activeStep={activeStep}>
                                        <Step>
                                            <StepLabel>Step 1</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Step 2</StepLabel>
                                        </Step>

                                    </Stepper>
                                    <div>
                                        {ShowErrorMessage && (
                                            <Alert
                                                className="form-group"
                                                variant="danger"
                                                style={{ marginTop: "20px", height: "50px" }}
                                            >
                                                <div
                                                    className="form-icon-wrapper  "
                                                >
                                                   you must complete all fields before proceeding !

                                                </div>
                                            </Alert>
                                        )}
                                        {getStepContent(activeStep)}
                                    </div>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className="mt-3">
                                            Back
                                        </Button>
                                        {activeStep === 1 ? (
                                            <Button onClick={addPrescriptionwithFile}  className="mt-3">
                                                Save
                                            </Button>
                                        ) : (

                                            <Button onClick={() => { nextStep() }} className="mt-3">Next</Button>

                                        )}
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default AddPrescriptionComponent;