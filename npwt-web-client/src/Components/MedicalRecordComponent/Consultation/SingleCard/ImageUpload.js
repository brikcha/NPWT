import React, { useState } from 'react';

function ImageUpload({setConsultationInfo}) {
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    setImages(prevImages => prevImages.concat(newImages));

    const imageArray = Array.from(files).map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result;
      };
      return file.name; 
    });
    setImageNames(prevNames => prevNames.concat(imageArray));

    setConsultationInfo(prevData => ({
      ...prevData,
      image: imageArray, 
    }));
  };
// const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
  
  //   setImages(prevImages => prevImages.concat(imageArray));

  //   const imageUrls = imageArray.map(url => url.name);
  //   setConsultationInfo((prevData) => ({
  //     ...prevData,
  //     image: imageUrls,
  //   }));
  // };

  return (
    <div>
       <div style={{  display: "flex", flexWrap: "wrap",  justifyContent: "center", alignItems: "center" }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} style={{ width:"192px", height:"120px", margin:"10px" }}/>
        ))}
      </div>
      <input type="file" multiple onChange={handleImageChange} />
    </div>
  );
}

export default ImageUpload;
