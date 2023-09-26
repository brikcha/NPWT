import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../api/index';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await api.getDetails(id);
        setUser(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="centered-container">
        <div className="circle-loader"></div>
      </div>;
  }

  // Format birth date if available
  const formattedBirthDate = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';
  return (
    <div >
        <img className=" imgForm img-fluid d-none d-lg-block position-absolute"
          alt="..."
          src={require("../../assets/img/brand/fond.webp")}
          style={{ width: "100%", height: "100%" }}
        />
        <div style={{ display:'flex', justifyContent:"center", alignItems:"center" }}>
            <div className="col-md-4 m-2 mt-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body text-center">
                  {user.image!==null ? 
                      <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${user.image}`} alt="profile"
                      className="rounded-circle img-fluid" style={{ width: '200px' , height: '200px' }} />
                      :
                      <img src={require("../../assets/img/brand/hi.jpg")} 
                        alt="profile" id="img" className="rounded-circle img-fluid" style={{ width: '200px', height: '200px' }} />
                  } 
                    <h5 className="mt-2"> {`${user.firstName} ${user.lastName}`}</h5>
                    <p className="text-muted mb-1">{user.role}</p>
                </div>
              </div>
            </div>
            <div className="col-md-7  m-2 mt-6">
              <div className="card">
                <div className="card-body">
                <div className="row">
                <div className="col-sm-4">
                  <p className="mb-0">Nom et Prénom</p>
                </div>
                <div className="col-sm-8">
                  <p className="text-muted mb-0">{`${user.firstName} ${user.lastName}`}</p>
                </div>
                  </div>
                  <hr style={{   margin: '1.4rem 0' }}/>
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user.email} </p>
                    </div>
                  </div>
                  <hr style={{   margin: '1.4rem 0' }}/>
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Numéro de Téléphone</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user.phoneNumber} </p>
                    </div>
                  </div>
                  <hr style={{   margin: '1.4rem 0' }}/>
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Sexe</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user.gender} </p>
                    </div>
                  </div>
                  <hr style={{   margin: '1.4rem 0' }}/>
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Date D'anniversaire</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{formattedBirthDate} </p>
                    </div>
                  </div>
                  <hr style={{   margin: '1.4rem 0' }}/>              
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Addresse</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user.codePostale} </p>
                    </div>
                  </div>
                  <div className='text-right mt-4'>
                    <Link to="/admin/utilisateur/table" >
                      <button type="button" className="btn btn-outline-primary ms-1">
                        Retour
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default UserDetails;
