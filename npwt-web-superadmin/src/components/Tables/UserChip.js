import React, {useState, useEffect} from "react";
import { Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import  DefaultImage  from "../../assets/img/brand/defaultProfile.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserChip({dataUser}) {
  const [openDetails, setOpenDetails] = useState(false);
  const handleClickOpenDetails = () => {  setOpenDetails(true);};
  const handleCloseDetails = () => {setOpenDetails(false);};
 
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState({});
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    useEffect(() => {
      setImage(dataUser.image)  ;
      setUserName(capitalizeFirstLetter(dataUser.firstName)+" " +
      capitalizeFirstLetter(dataUser.lastName));
      setUser(dataUser)
    });
  return (
    <div>
      <Chip
         avatar={<Avatar alt={userName.toUpperCase()} 
         src={ image && image!==null?`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${image}`: DefaultImage} />} 
         label={userName} 
         variant="outlined"
         onClick={handleClickOpenDetails}
       />
          <Dialog open={openDetails} TransitionComponent={Transition} keepMounted 
              aria-describedby="details consultation" fullWidth maxWidth="sm">
              <DialogTitle sx={{ textAlign:"center" }} color="primary"></DialogTitle>
              <DialogContent>
                  <div className="card mb-1">
                    <div className="pt-2 text-center">
                      {user.image!==null ? 
                          <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${user.image}`} alt="profile"
                          className="rounded-circle img-fluid" style={{ width: '150px' , height: '150px' }} />
                          :
                          <img src={require("../../assets/img/brand/hi.jpg")} 
                            alt="profile" id="img" className="rounded-circle img-fluid" style={{ width: '150px', height: '150px' }} />
                      } 
                        <h5 className="mt-2"> {`${user.firstName} ${user.lastName}`}</h5>
                        <h5 className="text-muted">{user.role}</h5>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                    <div className="row">
                    <div className="col-sm-6">
                      <p className="mb-0">Nom et Prénom</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="text-muted mb-0">{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                      </div>
                      <hr style={{   margin: '0.5rem 0' }}/>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-muted mb-0">{user.email} </p>
                        </div>
                      </div>
                      <hr style={{   margin: '0.5rem 0' }}/>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="mb-0">Numéro de Téléphone</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-muted mb-0">{user.phoneNumber} </p>
                        </div>
                      </div>
                      <hr style={{   margin: '0.5rem 0' }}/>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="mb-0">Sexe</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-muted mb-0">{user.gender} </p>
                        </div>
                      </div>
                      <hr style={{   margin: '0.5rem 0' }}/>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="mb-0">Date D'anniversaire</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-muted mb-0">{user.dateOfBirth} </p>
                        </div>
                      </div>
                      <hr style={{   margin: '0.5rem 0' }}/>              
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="mb-0">Addresse</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-muted mb-0">{user.codePostale} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              <DialogActions>
                <Button variant='contained' sx={{ textTransform:"capitalize" }} onClick={handleCloseDetails}>Retour</Button>
              </DialogActions>
            </Dialog>
    </div>
  )
}
