import { PhotoCamera } from '@mui/icons-material';
import { Container, Dialog, IconButton, Slide } from '@mui/material';
import React, { useState } from 'react';
import DefaultImage from '../../upload-image.png';
import NoDataImage from '../../analyseImage.jpg';
import {ProgressBar} from "react-progressbar-fancy";
import ZoomImage from '../MedicalRecordComponent/Consultation/SingleCard/imageGallery/ZoomImage';
import { Close } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver'
import PansementResult from './PansementResult';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AnalyseImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [maxClass, setMaxClass] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setSelectedImage(file);
      setError(null);
  
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Convert class probabilities to percentages
          const classProbabilities = data.class_probabilities[0].map((probability) => probability * 100 );
          data.class_probabilities[0] = classProbabilities;
  
          setAnalysisResults(data);
  
          // Find the class with the maximum probability
          const maxProbability = Math.max(...classProbabilities);
          const maxClassIndex = classProbabilities.indexOf(maxProbability);
  
          setData(classProbabilities)
          // Assign the corresponding class based on the index
          let maxClass = '';
          if (maxClassIndex === 0) {
            maxClass = "Plaies Primaires";
          } else if (maxClassIndex === 1) {
            maxClass = "Plaies en Phase de Cicatrisation Moyenne";
          } else if (maxClassIndex === 2) {
            maxClass = "Plaies Avancées";
          }
  
          setMaxClass(maxClass);
        })
        .catch((error) => {
          console.error('Error analyzing image:', error);
          setError('Error analyzing image');
        });
    } else {
      setError('No image selected');
    }
  };
  const [openImage, setOpenImage] = useState(false);
  const handleClickOpenImage = () => {  setOpenImage(true);};
  const handleCloseImage = () => {setOpenImage(false);};

  const [zoomedImg, setZoomedImg] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const openZoom = (imageUrl) => {
    setZoomedImg(imageUrl);
    setZoomed(true);
    handleClickOpenImage()
  };

  const closeZoom = () => {
    setZoomedImg(null);
    setZoomed(false);
    handleCloseImage()
  };
  const handleDownload = (url) => {
    saveAs(url, 'image.jpg') 
  };
  return (
    <div className="container mt-4">
      <div className="row d-flex align-items-center">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="m-5 text-center">
            {selectedImage === null && <h5 className="text-muted fw-bold">Veuillez sélectionner une image.</h5>}                   
              <Container maxWidth="md" sx={{
                position: "relative", border: "2px dashed blue",
                borderRadius: "20px", height: "320px"
              }}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{ position: "absolute", top: "-30px", right: "-30px" }}
                >
                  <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                  <PhotoCamera sx={{ fontSize: "50px" }} />
                </IconButton>
                {selectedImage !== null ? (
                  <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    {selectedImage &&
                    <div className="image-container">
                      <div className="zoom-indicator">
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected"
                          style={{ width: "100%", height: "300px", margin: "2.5%" }} />
                        <div className='btn-zoom'>
                          <div className="zoom-icon"  onClick={() => openZoom(selectedImage)}>
                            <i className="fa fa-search-plus"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    }
                  </div>
                ) : (
                  <>                
                  <img src={DefaultImage} alt="Image"
                    style={{ width: "70%", height: "300px", margin: "2.5% 15%" }} />
                  </>
                )}
              </Container>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="m-4">
              <h4 className="text-muted fw-bold text-center">Résultats de l'analyse</h4>
              {analysisResults && !error ? (
                <>
                  <span className="fw-bold text-muted m-3">Plaies Primaires</span>
                  <ProgressBar score={data[0]} primaryColor={"lightGreen"} secondaryColor={"green"}  hideText/>
                  <br/>
                  <span className="fw-bold text-muted m-3">Plaies en Phase de Cicatrisation Moyenne</span>
                  <ProgressBar score={data[1]} primaryColor={"#fffe7a"} secondaryColor={"yellow"} hideText/>
                  <br/>
                  <span className="fw-bold text-muted m-3">Plaies Avancées</span>
                  <ProgressBar score={data[2]} primaryColor={"orange"} secondaryColor={"red"} hideText/>
                  <br/>
                  {maxClass &&
                    <> 
                      <p className="text-muted fw-bold text-center">Liste des pansements:</p>
                      <PansementResult maxClass={maxClass}/>
                    </>
                  }
                </>
              ) : (
              <div className='text-center'>
                <img src={NoDataImage} alt="Image"
                  style={{ width: "60%", height: "50%", margin: "1.5%" }} />  
                <h5 className="text-muted fw-bold">Aucun résultat trouvé.</h5>   
              </div>     
              )}
            </div>
          </div>
        </div>
      </div>
      {zoomed && (
          <Dialog open={openImage} TransitionComponent={Transition}  keepMounted  fullScreen
            aria-describedby="Image consultation" 
          >
              <div className="react-image-zoom-container">
                <ZoomImage ConsultationImg={URL.createObjectURL(selectedImage)} />
                <button className="minimize-button" onClick={closeZoom}><Close/></button>
               <button onClick={() => handleDownload(URL.createObjectURL(selectedImage))} type="button" className="download-icon">
                <DownloadIcon/>
              </button>
              </div>
              </Dialog>
          )}
    </div>
  );
};

export default AnalyseImage;
