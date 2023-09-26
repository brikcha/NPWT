import React, { useState } from 'react';
import DefaultProfileImage from "../../defaultProfile.jpg"

export default function UpdateImage({doctor, idDoctor}) {
  const [profileImg, setProfileImg]=useState("");
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{ if(reader.readyState === 2){  setProfileImg(reader.result) } }
    reader.readAsDataURL(e.target.files[0])
    var formdata = new FormData();
    formdata.append("image", e.target.files[0], e.target.files[0].name);
    console.log(e.target.files[0])
    var requestOptions = {  method: 'POST', body: formdata,};
    fetch(`${process.env.REACT_APP_BACKEND_URL}/addImageProfile/${idDoctor}`, requestOptions)
    .then(response => response.json()).then(result =>{   
      window.location.reload();  
    }).catch(error => console.log('error', error)); 
  }
	return (
    <>
      <div className="avatar-upload">
        <div className="avatar-edit">
          <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} style={{display:"none"}}/>
            <div className="label">
              <label className="image-upload" htmlFor="input">
              <img src="../assetsTemplates/images/rotate.png" className="image-upload " alt="" />                
              </label>
            </div>
          </div>  
          <div className="profile_info">     
              <div className="avatar-preview">
                {doctor.image!==undefined ? 
                  <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${doctor.image}`} 
                  className="profile_image" alt="" />
                  :
                  <img src={DefaultProfileImage} alt="profileImage" id="img" className="profile_image"
                   />}       
              </div>
              <h4 className="title">
                {doctor.firstName} {doctor.lastName}<br/>
                {`Bienvenue ${doctor.role} ${doctor.userName} !`}
              </h4>
          </div>
      </div> 
        
    </>
	);
}
