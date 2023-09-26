import React, { useState } from 'react';

function ImageUpload() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prevImages => prevImages.concat(imageArray));
  };

  return (
    <div>
       <div style={{  display: "flex", flexWrap: "wrap",  justifyContent: "center", alignItems: "center" }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${index}`} style={{ width:"192px", height:"120px", margin:"10px" }}/>
        ))}
      </div>
      <input type="file" multiple onChange={handleImageChange} />
    </div>
  );
}

export default ImageUpload;
