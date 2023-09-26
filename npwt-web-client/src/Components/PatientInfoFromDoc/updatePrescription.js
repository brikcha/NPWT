import { useEffect, useState } from "react";
import HamzaSideBar from "./HamzaSideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button';

function UpdatePrescription() {
    const { id, idPrescription } = useParams();
    const [User, setUser] = useState({});
    const [Doctor, setDoctor] = useState({});
    const [Prescription, setPrescription] = useState({});
    const [showfile, setshowfile] = useState(false)
    const [showUpdatefile, setshowUpdatefile] = useState(false)
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const navigate=useNavigate()
    const {
        DateOfVisit,
        Treatments,
        Instruction,
        Note,
        Signature


    } = Prescription

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getPrescriptionByid/${idPrescription}`)
            .then(response => {
                setPrescription(response.data);
            })
            .catch(error => {
                console.error(error);
            });


        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setDoctor(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

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
        setPrescription({ ...Prescription, [e.target.name]: e.target.value });

    };

    const updatePrescription = (e) => {
        console.log("hello")
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/prescription/updatePrescription/${idPrescription}`, Prescription)
            .then((response) => {
                console.log(response.data)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    const addPrescriptionwithFile = (e) => {

        const formData = new FormData();
        formData.append('file', file, file.name);
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/prescription/addFileToPrescription/${idPrescription}`, formData)
            .then((response) => {
                console.log(response.data)
                navigate(0)

            })
            .catch((error) => {
                console.log(error);
            });   
    }




/////mettre le date of visit sous formr yyyy-mm-jj pour l'afficher
const date = new Date(DateOfVisit); // récupération de la date actuelle
const year = date.getFullYear(); // récupération de l'année
const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée



return (

    <>
        <div className='container  pt-5 pb-5'>
            <div className=" row  ">
                <div className="col-lg-4">
                    <HamzaSideBar user={User}></HamzaSideBar>
                </div>

                <div className='col-lg-8  '>
                    <div className="card cardMD cardRes ">
                        <div className="card-header "><i className="fas fa-plus-square" /> Update Prsecription </div>
                        <div className="card-body">
                            <div className="row col-lg-12 ">
                                <div>
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="input1" className="mt-2" >Date of Visit: </label>
                                            <input
                                                className="form-control"
                                                id="input1"
                                                type="date"
                                                name="DateOfVisit"
                                                value={formattedDate}
                                                onChange={(e) => onValueChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="input1" className="mt-3" >Treatments: </label>
                                    <textarea
                                        className="form-control"
                                        id="input2"
                                        name="Treatments"
                                        value={Treatments}
                                        onChange={(e) => onValueChange(e)}

                                    />
                                    <label htmlFor="input1" className="mt-3" >Instruction: </label>
                                    <textarea
                                        className="form-control"
                                        id="input3"
                                        name="Instruction"
                                        value={Instruction}
                                        onChange={(e) => onValueChange(e)}

                                    />
                                    <label htmlFor="input1" className="mt-3" >Note: </label>
                                    <textarea
                                        className="form-control"
                                        id="input4"
                                        name="Note"
                                        value={Note}
                                        onChange={(e) => onValueChange(e)}

                                    />
                                    <label htmlFor="input1" className="mt-3" >Signature: </label>
                                    <div className="mt-2">
                                        <Button variant="secondary" onClick={() => { setshowfile(!showfile) }}>
                                            Show file
                                        </Button>

                                        <Button variant="primary" className='mx-2' onClick={() => { setshowUpdatefile(!showUpdatefile) }} >
                                            Update file
                                        </Button>
                                    </div>

                                    {showfile  &&

                                        <p className="img-preview-wrapper mt-2">
                                            {
                                                <img src={`http://127.0.0.1:8887/DoctorSignature/${Signature}`} alt="preview" className="img-preview " />
                                            }
                                        </p>}

                                    {showUpdatefile &&
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
                                            <Button variant="success" className='mt-2' style={{ maxWidth: "100px" }} onClick={()=>{addPrescriptionwithFile()}}>Save file</Button>

                                        </div>

                                    }

                                    <Button variant="success" className='mt-2' style={{ maxWidth: "150px", marginLeft: "80%" }} onClick={updatePrescription } >Update Prescription</Button>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>

    </>
);
}

export default UpdatePrescription;