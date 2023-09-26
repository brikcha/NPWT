import React, {useState} from 'react'
import "../../Css/Gallery.css";
import { Dialog, DialogTitle,DialogContent, IconButton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import CloseIcon from '@mui/icons-material/Close';
import ZoomImage from './imageGallery/ZoomImage';
import { Close } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver'

export default function ConsultationGallery({openGallery,Transition,handleCloseGallery,consultationNumber,
  activeSlideIndex,setActiveSlideIndex,imageUrls,swiperKey}) {
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
  const formatDate = (dateString) => {
    const dateParts = dateString.slice(0,10).split('-');
      if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}-${month}-${year}`;
      }
      return dateString;
  };

   const handleDownload = (url) => {
    saveAs(url, 'image.jpg') 
  };
  return (
        <>
          <Dialog open={openGallery} TransitionComponent={Transition}  keepMounted 
              aria-describedby="Gallery consultation"
            >
            <DialogTitle sx={{ position:"relative" }}>
                <IconButton aria-label="close" onClick={handleCloseGallery} sx={{ position:"absolute",top:"10px",right:"10px" }}>
                  <CloseIcon />
                </IconButton>     
                <Typography  color="primary" sx={{ textAlign:"center",marginBottom:"10px", fontSize:"20px" }}>
                   Galerie de photos de plaies de consultation numéro: {consultationNumber}
                </Typography>    
            </DialogTitle>
            <DialogContent>
                <Swiper
                    key={swiperKey} 
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={false}
                    initialSlide={consultationNumber-1}
                    slidesPerView={'auto'}
                    onSlideChange={(swiper) => {
                      setActiveSlideIndex(swiper.realIndex);
                    }}   
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                      clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container">

                  {imageUrls.map((imageUrl, index) => (
                      <SwiperSlide key={index} className={index > consultationNumber - 1 ? "inactive-slide" : ""}>
                        <Typography className='dateImg'>{formatDate(imageUrl.examinationDate)}</Typography>
                        <Typography className='numberImg'>{index+1}</Typography>
                        <div className="image-container">
                          <div className="zoom-indicator">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/MedicalRecord/${imageUrl.image}`}
                              style={{ height:"450px", width:"100%" }}
                             alt={`slide_${index}`} className="image-thumbnail" />
                              <div className='btn-zoom'>
                                <div className="zoom-icon"  onClick={() => openZoom(imageUrl.image)}>
                                  <i className="fa fa-search-plus"></i>
                                </div>
                              </div>
                          </div>
                        </div>                      
                      </SwiperSlide>                  
                  ))}
                  <div className="slider-controler">
                    <div
                      className={`swiper-button-prev slider-arrow ${
                        activeSlideIndex === 0 ? 'disabled' : ''
                      }`}
                    >
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </div>
                    <div className="swiper-pagination"></div>
                    <div
                      className={`swiper-button-next slider-arrow ${
                        activeSlideIndex === consultationNumber - 1 ? 'disabled' : ''
                      }`}
                    >
                      <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>     
                  </div>
                </Swiper>
            </DialogContent>
          </Dialog> 

          {zoomed && (
          <Dialog open={openImage} TransitionComponent={Transition}  keepMounted  fullScreen
            aria-describedby="Image consultation" 
          >
              <div className="react-image-zoom-container">
                <ZoomImage ConsultationImg={`${process.env.REACT_APP_BACKEND_URL}/uploads/MedicalRecord/${zoomedImg}`}/>
                <button className="minimize-button" onClick={closeZoom}><Close/></button>
               <button onClick={() => handleDownload(`${process.env.REACT_APP_BACKEND_URL}/uploads/MedicalRecord/${zoomedImg}`)} type="button" className="download-icon">
                <DownloadIcon/>
              </button>
              </div>
              </Dialog>
          )}
    </>
  )
}
