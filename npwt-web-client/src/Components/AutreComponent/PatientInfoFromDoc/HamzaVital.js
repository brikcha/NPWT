
import SideNavBarComponent from './HamzaSideBar';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../imageFile.css';
import '../../NavBarComponent/sideNavBar.css';
import { useNavigate } from 'react-router';
import { useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HamzaVital(props) {

    const { id } = useParams();

    const MAX_COUNT = 40;
    const [User, setUser] = useState({});
    const [files, setFiles] = useState([])
    const [MedicalRecord, setMedicalRecord] = useState({})
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/uploads/`;
    const [ConfirmeMessage, setConfirmeMessage] = useState(false);
    const navigate = useNavigate()
    const [currentImage, setCurrentImage] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [ModalShowImagingreports, setModalShowImagingreports] = useState(false);
    const [ModalShowLaboratoryreports, setModalShowLaboratoryreports] = useState(false);
    const [ModalShowMedicalHistory, setModalShowMedicalHistory] = useState(false);
    const [ModalShowInsuranceClaims, setModalShowInsuranceClaims] = useState(false);

    const [ShowImagingReports, setShowImagingReports] = useState(false);
    const [ShowLaboratoryReports, setShowLaboratoryReports] = useState(false);
    const [ShowMedicalHistory, setShowMedicalHistory] = useState(false);
    const [ShowInsuranceclaims, setShowInsuranceclaims] = useState(false);


    /////open image 
    const imageUrls = []
    const openImageViewer = useCallback((imageUrl) => {
        setCurrentImage(imageUrl);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(null);
        setIsViewerOpen(false);
    };
    ///////////////////////////////


    const toggleImagingReports = () => {
        setShowImagingReports(!ShowImagingReports);
    }
    const toggleLaboratoryReports = () => {
        setShowLaboratoryReports(!ShowLaboratoryReports);
    }
    const toggleMedicalHistory = () => {
        setShowMedicalHistory(!ShowMedicalHistory);
    }
    const toggleInsuranceClaims = () => {
        setShowInsuranceclaims(!ShowInsuranceclaims);
    }



    ///dowload files 
    const handleDownloadFile = (fileName) => {
        axios({
          url: `http://127.0.0.1:8887/ImagingReports/${fileName}`,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // clean up
        }).catch((error) => {
          console.log(error);
        });
      };
    // const downloadImage = (imageUrl, namefile) => {
    //     saveAs(imageUrl, namefile);
    // }


 
    const {
        disease,
        allergies,
        ImagingReports,
        LaboratoryReports,
        MedicalHistory,
        InsuranceClaims

    } = MedicalRecord
    console.log(files)
    ///////////////////////////////
    useEffect(() => {
        if (id) {


            axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${id}`)
                .then(response => {

                    setUser(response.data);


                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, []);

    useEffect(() => {
        if (User) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
                .then(response => {
                    setMedicalRecord(response.data);
                    setFiles(response.data.files)
                    console.log(files)


                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, [User]);

    ///////////////////////////////////////

    const handleRemoveFile = (index) => {
        const uploaded = [...uploadedFiles];
        uploaded.splice(index, 1);
        setUploadedFiles(uploaded);
        setFileLimit(false);
    };



    //////////////added files imaging reports 
    const addedFilesImagingReports = (e) => {
        e.preventDefault();
        const formData = new FormData();
        uploadedFiles.forEach(file => {
            console.log(file)
            formData.append('file', file, file.name);
            console.log(formData)
        });
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/MedicalRecord/addImagingReports/${User.MedicalRecord}`, formData)
            .then((response) => {
                console.log(response.data)
                console.log("medical record updated successfully")
                if (response.data) {
                    setConfirmeMessage(true)
                }
                navigate(0);
            })
            .catch((error) => {
                console.log(error);
            });


    }


    return (


        <div className='container pt-5 '>
            <div className=" row ">
                <div className="col-lg-4">
                    <SideNavBarComponent user={User}></SideNavBarComponent>
                </div>

                <div className='d-flex flex-column col-lg-8 mb-5'>
                    {/* Account details card*/}
                    <div className="card cardMD cardRes  ">
                        <div className="card-header "><i className="fas fa-heartbeat" /> Vital Signs </div>
                        <div className="card-body ">
                            <form>
                                {/* Form Group (username)*/}

                                <div className="row col-lg-12 ">
                                    <div className="col-lg-10">
                                        <label className="small mb-1">Hereditary or Chronic Diseases</label>
                                        <textarea className="form-control" id="inputdisease" type="text" placeholder="hereditary or chronic diseases " value={disease} name='disease' disabled/>
                                    </div>

                                    <div className="col-lg-10">
                                        <label className="small mb-1">Allergies</label>
                                        <textarea className="form-control" id="inputallergies" type="text" placeholder="allergies " value={allergies} name='allergies' disabled/>
                                    </div>


                                </div>



                            </form>
                        </div>
                    </div >



                    <div className="card cardMD mt-5 cardRes">
                        <div className="card-header "><i className="fas fa-file" /> Medical document </div>
                        <div className="card-body">
                            <form>

                                <div className="row gx-3 mb-3">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-lg-row">
                                                <span className="avatar avatar-text rounded-3 me-4 bg-secondary mb-2">IR</span>
                                                <div className="row flex-fill">
                                                    <div className="col-sm-5">
                                                        <h4 className="h5">Imaging reports</h4>
                                                        <span className="badge bg-secondary"> X-rays</span> <span className="badge bg-success">CT scans</span> <span className="badge bg-primary">MRIs</span>
                                                    </div>

                                                    <div className="col-sm-4 text-lg-end offset-lg-3 mt-3">
                                                        <Button variant="secondary" onClick={toggleImagingReports}>
                                                            Show files
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {ShowImagingReports && (<div className="uploaded-files-list ">

                                        {ImagingReports.map((file) => {
                                            var imageUrl = `http://127.0.0.1:8887/ImagingReports/${file}`;
                                            imageUrls.push(imageUrl)
                                            console.log(imageUrls)
                                            return (
                                                <div key={file.name}>
                                                    {/* <img src={imageUrl} alt={file.name} onError={() => console.log(`Impossible de charger l'image: ${imageUrl}`)} /> */}

                                                    <img
                                                        src={imageUrl}
                                                        onClick={() => openImageViewer(imageUrl)}

                                                        key={imageUrl}
                                                        style={{ margin: "2px" }}
                                                        alt=""
                                                    />
                                                    <p>{file.name}</p>
                                                    <button onClick={() => handleDownloadFile(file.name)}>Download </button>
                                                </div>

                                            );


                                        })}
                                    </div>)}
                                    {isViewerOpen && (
                                        <ImageViewer
                                            src={imageUrls}
                                            currentIndex={imageUrls.indexOf(currentImage)}
                                            onClose={closeImageViewer}
                                            disableScroll={false}
                                            backgroundStyle={{
                                                backgroundColor: "rgba(0,0,0,0.9)"
                                            }}
                                            closeOnClickOutside={true}
                                            defaultSize={{
                                                width: 200,
                                                height: 200
                                            }}
                                            imageStyle={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain"
                                            }}
                                        />
                                    )}

                                    <Modal
                                        {...props}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={ModalShowImagingreports}
                                        onHide={() => setModalShowImagingreports(false)}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Add Imaging reports to your Medical Record!
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-4">
                                                    <input id='fileUpload' type='file' multiple

                                                        
                                                        disabled={fileLimit}
                                                    />
                                                </div>

                                            </div>

                                            <div className="uploaded-files-list">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={file.name}>
                                                        <img src={URL.createObjectURL(file)} alt={file.name} />
                                                        <p>{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>


                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>




                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-lg-row">
                                                <span className="avatar avatar-text rounded-3 me-4 bg-warning mb-2">LR</span>
                                                <div className="row flex-fill">
                                                    <div className="col-sm-5">
                                                        <h4 className="h5">Laboratory reports</h4>
                                                        <span className="badge bg-secondary">blood tests</span> <span className="badge bg-success">urine tests</span> <span className="badge bg-primary">diagnostic tests</span>
                                                    </div>

                                                    <div className="col-sm-4 text-lg-end offset-lg-3 mt-3">
                                                        <Button variant="secondary" onClick={toggleLaboratoryReports}>
                                                            Show files
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {ShowLaboratoryReports && (<div className="uploaded-files-list ">

                                        {LaboratoryReports.map((file) => {
                                            var imageUrl = `http://127.0.0.1:8887/LaboratoryReports/${file}`;
                                            imageUrls.push(imageUrl)
                                            console.log(imageUrls)
                                            return (
                                                <div key={file.name}>
                                                    {/* <img src={imageUrl} alt={file.name} onError={() => console.log(`Impossible de charger l'image: ${imageUrl}`)} /> */}

                                                    <img
                                                        src={imageUrl}
                                                        onClick={() => openImageViewer(imageUrl)}

                                                        key={imageUrl}
                                                        style={{ margin: "2px" }}
                                                        alt=""
                                                    />
                                                    <p>{file.name}</p>
                                                    {/* <button onClick={() => downloadImage(imageUrl, file.name)}>Download </button> */}
                                                </div>

                                            );


                                        })}
                                    </div>)}
                                    {isViewerOpen && (
                                        <ImageViewer
                                            src={imageUrls}
                                            currentIndex={imageUrls.indexOf(currentImage)}
                                            onClose={closeImageViewer}
                                            disableScroll={false}
                                            backgroundStyle={{
                                                backgroundColor: "rgba(0,0,0,0.9)"
                                            }}
                                            closeOnClickOutside={true}
                                            defaultSize={{
                                                width: 200,
                                                height: 200
                                            }}
                                            imageStyle={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain"
                                            }}
                                        />
                                    )}

                                    <Modal
                                        {...props}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={ModalShowLaboratoryreports}
                                        onHide={() => setModalShowLaboratoryreports(false)}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Add Laboratory reports to your Medical Record!
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-4">
                                                    <input id='fileUpload' type='file' multiple

                                                        
                                                        disabled={fileLimit}
                                                    />
                                                </div>

                                            </div>

                                            <div className="uploaded-files-list">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={file.name}>
                                                        <img src={URL.createObjectURL(file)} alt={file.name} />
                                                        <p>{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>


                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>








                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-lg-row">
                                                <span className="avatar avatar-text rounded-3 me-4 bg-primary mb-2">MH</span>
                                                <div className="row flex-fill">
                                                    <div className="col-sm-5">
                                                        <h4 className="h5">Medical history</h4>
                                                        <span className="badge bg-secondary">medications</span> <span className="badge bg-success">surgeries</span> <span className="badge bg-primary">allergies</span>
                                                    </div>

                                                    <div className="col-sm-4 text-lg-end offset-lg-3 mt-3">
                                                        <Button variant="secondary" onClick={toggleMedicalHistory}>
                                                            Show files
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {ShowMedicalHistory && (<div className="uploaded-files-list ">

                                        {MedicalHistory.map((file) => {
                                            var imageUrl = `http://127.0.0.1:8887/MedicalHistory/${file}`;
                                            imageUrls.push(imageUrl)
                                            console.log(imageUrls)
                                            return (
                                                <div key={file.name}>
                                                    {/* <img src={imageUrl} alt={file.name} onError={() => console.log(`Impossible de charger l'image: ${imageUrl}`)} /> */}

                                                    <img
                                                        src={imageUrl}
                                                        onClick={() => openImageViewer(imageUrl)}

                                                        key={imageUrl}
                                                        style={{ margin: "2px" }}
                                                        alt=""
                                                    />
                                                    <p>{file.name}</p>
                                                    {/* <button onClick={() => downloadImage(imageUrl, file.name)}>Download </button> */}
                                                </div>

                                            );


                                        })}
                                    </div>)}
                                    {isViewerOpen && (
                                        <ImageViewer
                                            src={imageUrls}
                                            currentIndex={imageUrls.indexOf(currentImage)}
                                            onClose={closeImageViewer}
                                            disableScroll={false}
                                            backgroundStyle={{
                                                backgroundColor: "rgba(0,0,0,0.9)"
                                            }}
                                            closeOnClickOutside={true}
                                            defaultSize={{
                                                width: 200,
                                                height: 200
                                            }}
                                            imageStyle={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain"
                                            }}
                                        />
                                    )}

                                    <Modal
                                        {...props}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={ModalShowMedicalHistory}
                                        onHide={() => setModalShowMedicalHistory(false)}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Add Medical history to your Medical Record!
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-4">
                                                    <input id='fileUpload' type='file' multiple

                                                        
                                                        disabled={fileLimit}
                                                    />
                                                </div>

                                            </div>

                                            <div className="uploaded-files-list">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={file.name}>
                                                        <img src={URL.createObjectURL(file)} alt={file.name} />
                                                        <p>{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>


                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>






                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-lg-row">
                                                <span className="avatar avatar-text rounded-3 me-4  mb-2">IC</span>
                                                <div className="row flex-fill">
                                                    <div className="col-sm-5">
                                                        <h4 className="h5">Insurance claims</h4>
                                                        <span className="badge bg-secondary">CNAM</span> <span className="badge bg-success">CNSS</span>
                                                    </div>

                                                    <div className="col-sm-4 text-lg-end offset-lg-3 mt-3">
                                                        <Button variant="secondary" onClick={toggleInsuranceClaims}>
                                                            Show files
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {ShowInsuranceclaims && (<div className="uploaded-files-list ">

                                        {InsuranceClaims.map((file) => {
                                            var imageUrl = `http://127.0.0.1:8887/InsuranceClaims/${file}`;
                                            imageUrls.push(imageUrl)
                                            console.log(imageUrls)
                                            return (
                                                <div key={file.name}>
                                                    {/* <img src={imageUrl} alt={file.name} onError={() => console.log(`Impossible de charger l'image: ${imageUrl}`)} /> */}

                                                    <img
                                                        src={imageUrl}
                                                        onClick={() => openImageViewer(imageUrl)}

                                                        key={imageUrl}
                                                        style={{ margin: "2px" }}
                                                        alt=""
                                                    />
                                                    <p>{file.name}</p>
                                                    {/* <button onClick={() => downloadImage(imageUrl, file.name)}>Download </button> */}
                                                </div>

                                            );


                                        })}
                                    </div>)}
                                    {isViewerOpen && (
                                        <ImageViewer
                                            src={imageUrls}
                                            currentIndex={imageUrls.indexOf(currentImage)}
                                            onClose={closeImageViewer}
                                            disableScroll={false}
                                            backgroundStyle={{
                                                backgroundColor: "rgba(0,0,0,0.9)"
                                            }}
                                            closeOnClickOutside={true}
                                            defaultSize={{
                                                width: 200,
                                                height: 200
                                            }}
                                            imageStyle={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain"
                                            }}
                                        />
                                    )}

                                    <Modal
                                        {...props}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={ModalShowInsuranceClaims}
                                        onHide={() => setModalShowInsuranceClaims(false)}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Add Insurance Claims to your Medical Record!
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-4">
                                                    <input id='fileUpload' type='file' multiple

                                                        
                                                        disabled={fileLimit}
                                                    />
                                                </div>

                                            </div>

                                            <div className="uploaded-files-list">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={file.name}>
                                                        <img src={URL.createObjectURL(file)} alt={file.name} />
                                                        <p>{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>


                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>



                                </div>
                            </form>
                        </div>
                    </div >
                </div>
            </div>
        </div>

    );
}

export default HamzaVital;