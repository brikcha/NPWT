import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserDetails from "views/UserComponent/userDetails";
import UpdateUser from "views/UserComponent/UpdateUser";
import AddUser from "views/UserComponent/AddUser"
import TablesUser from "views/UserComponent/TablesUser";
import TablesPatient from "views/MedicalRecordComponent/Patients/TablesPatient";
import UpdatePatient from "views/MedicalRecordComponent/Patients/UpdatePatient";
import PatientDetails from "views/MedicalRecordComponent/Patients/PatientDetails";
import UpdateMedical from "views/MedicalRecordComponent/Dossier Medical/UpdateMedical";
import MedicalDetails from 'views/MedicalRecordComponent/Dossier Medical/MedicalDetails';

import Login from 'views/Auth/Login';
import Register from 'views/Auth/Register';
import ForgotPassword from 'views/Auth/ForgotPassword';
import PasswordVerification from 'views/Auth/PasswordVerification';
import ResetPasswordComponent from 'views/Auth/ResetPasswordComponent';
import PatientAdd from 'views/MedicalRecordComponent/Patients/PatientAdd';
import UpdatePassword from './components/ProfileComponent/updatePassword';
import UserChatList from './components/ChatComponent/UserChatList';
import SingleChat from './components/ChatComponent/SingleChat';
import SignUpComponent from 'views/Auth/SignUpComponent';
import EmailVerificationMessage from 'views/Auth/EmailVerificationMessage';
import UpdateProfile from './components/ProfileComponent/UpdateProfile';


import PatientConsultation from 'views/MedicalRecordComponent/Patients/PatientConsultation';
import AddMedical from 'views/MedicalRecordComponent/Dossier Medical/AddMedical';
import TableMachine from 'views/Machine/TableMachine';
import AddMachine from 'views/Machine/AddMachine';
import UpdateMachine from 'views/Machine/UpdateMachine';
import DetailsMachine from 'views/Machine/DetailsMachine';

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<AuthLayout />} />
    <Route path="/argon-dashboard-react" element={<Navigate to='/' />} />
    <Route path="/connexion" element={<Login />} />
    <Route path='/registre' element={<Register/>} ></Route>
    <Route path='/oublier_mot_de_passe' element={<ForgotPassword/>} ></Route>
    <Route path='/voir-email' element={<PasswordVerification/>} ></Route>
    <Route path='/reinitialisation-mot-de-passe/:token' element={<ResetPasswordComponent/>} ></Route>
    <Route path="/SignUp" element={<SignUpComponent />} />
    <Route path='/EmailVerifiaction/:id' element={<EmailVerificationMessage></EmailVerificationMessage>} ></Route>

    <Route index path="/admin/*" element={<AdminLayout />} />   
    <Route  path='/medical-record' >
        <Route path='patients-table' element={<TablesPatient/>} ></Route>
        <Route path='patient-details/:id' element={<PatientDetails/>}></Route>
        <Route path="patient/edit-table/:id" element={<UpdatePatient/>} />
        <Route path="patient/consultation-table/:id" element={<PatientConsultation/>} />

        <Route path="medical/edit-table/:id" element={<UpdateMedical/>}></Route>
        <Route path='medical-details/:id' element={<MedicalDetails/>}></Route>
    </Route>
    <Route path='/patient/ajouter' element={<PatientAdd/>}></Route>
    <Route path='/medical-record/medical/ajouter' element={<AddMedical/>}></Route>


    <Route path='/utilisateur'>
      <Route path='table' element={<TablesUser />} />
      <Route path='ajouter' element={<AddUser />} />
      <Route path='edit-table/:id' element={<UpdateUser />}/>
      <Route path=':id' element={<UserDetails />} />
     
    </Route>

    <Route path='/machine'>
      <Route path='table' element={<TableMachine />} />
      <Route path='ajouter' element={<AddMachine />} />
      <Route path='edit-table/:id' element={<UpdateMachine />}> </Route>
      <Route path=':id' element={<DetailsMachine />} />
    </Route>


    <Route path='/UpdateProfile'>
          <Route path='publicProfile'  element={<UpdateProfile></UpdateProfile>} ></Route>
          <Route path='UpdatePassword' element={<UpdatePassword></UpdatePassword>} ></Route>
          <Route path='liste-utilisateur-chat' element={<UserChatList></UserChatList>} ></Route> 
          <Route path='chat' element={<SingleChat></SingleChat>} ></Route> 
        </Route>

  </Routes>
  );
};

export default App;