import './App.css';
import { Routes , Route, Navigate } from 'react-router-dom';
import React from "react"
import NavbarComponent from './Components/NavBarComponent/NavbarComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import SignInComponent from './Components/FormsComponent/SignInComponent';
import SignUpComponent from './Components/FormsComponent/SignUpComponent';
import ResetPasswordComponent from './Components/FormsComponent/ResetPassComponent';
import ForgotPasswordComponent from './Components/FormsComponent/ForgetPassComponent';
import EmailVerificationMessage from './Components/FormsComponent/EmailVerificationMessage';
import MedicalRecordComponentAdd from './Components/MedicalRecordComponent/MedicalRecordComponentAdd';
import BloodComponent from './Components/AutreComponent/BloodComponent';
import VitalSignsComponent from './Components/AutreComponent/VitalSignsComponent';
import ErrorSignInPage from './Components/FormsComponent/ErrorSignInPage';
import UpdateProfile from './Components/ProfileComponent/UpdateProfile';
import AboutComponent from './Components/HomeComponent/About';
import ServiceComponent from './Components/HomeComponent/ServiceComponent';
import UpdatePassword from './Components/ProfileComponent/updatePassword';
import WorktimeDoc from './Components/FormsComponent/WorktimeDoc';
import SeeAppointments from './Components/FormsComponent/SeeAppointments';
import MedicalRecForDoc from './Components/AutreComponent/PatientInfoFromDoc/MedicalRecForDoc';
import HamzaBlood from './Components/AutreComponent/PatientInfoFromDoc/HamzaBlood';
import HamzaVital from './Components/AutreComponent/PatientInfoFromDoc/HamzaVital';
import AppointmentForm from './Components/AppointmentComponent/AppointmentForm';
import DoctorsListComponent from './Components/AutreComponent/doctorsListComponent';
import UserChatList from './Components/ChatComponent/UserChatList';
import SingleChat from './Components/ChatComponent/SingleChat';
import SingleChatPatient from './Components/ChatComponent/SingleChatPatient';
import PatientAppComponent from './Components/AutreComponent/PatientAppComponent';
import AddPrescriptionComponent from './Components/AutreComponent/PatientInfoFromDoc/AddPrescription';
import ListPrescription from './Components/AutreComponent/PatientInfoFromDoc/prescriptionList';
import UpdatePrescription from './Components/AutreComponent/PatientInfoFromDoc/updatePrescription';
import ListPrescriptionsforPatient from './Components/AutreComponent/ListPrescriptions';
import ShowPrescription from './Components/AutreComponent/ShowPrescription';
import locations from './Components/FormsComponent/SignUpComponent';
import PatientCards from './Components/MedicalRecordComponent/Patient/PatientCards';
import MedicalRecordDetails from './Components/MedicalRecordComponent/MedicalRecordDetails';
import PasswordVerification from './Components/FormsComponent/PasswordVerification';
import ConsultationCards from './Components/MedicalRecordComponent/Consultation/ConsultationCards';
import ConsultationAdd from './Components/MedicalRecordComponent/Consultation/ConsultationAdd';
import PatientUpdate from './Components/MedicalRecordComponent/Patient/PatientUpdate';
import PatientDetails from './Components/MedicalRecordComponent/Patient/PatientDetails';
import AnalyseImage from './Components/AnalyseImage/AnalyseImage';

function App() {

  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Routes>
        <Route path="/" element={<Navigate to='/front' />} />
        <Route path='/front' element={<HomeComponent></HomeComponent>} ></Route>

        <Route path='/SignIn' element={<SignInComponent/>} ></Route>
        <Route path='/SignUp' element={<SignUpComponent/>} ></Route>
        <Route path='/locations' element={<locations></locations>} ></Route>
        <Route path='/reinitialisation-mot-de-passe/:token' element={<ResetPasswordComponent></ResetPasswordComponent>} ></Route>
        <Route path='/ForgetPassword' element={<ForgotPasswordComponent></ForgotPasswordComponent>} ></Route>
        <Route path='/EmailVerifiaction/:id' element={<EmailVerificationMessage></EmailVerificationMessage>} ></Route>
        <Route path='/PasswordVerification' element={<PasswordVerification></PasswordVerification>} ></Route>
         
        <Route path='/ErrorSignInPage' element={<ErrorSignInPage></ErrorSignInPage>} ></Route>
        <Route path='/About' element={<AboutComponent></AboutComponent>} ></Route>
        <Route path='/Services' element={<ServiceComponent></ServiceComponent>} ></Route>
        <Route path='/Contact' element={<doctorsListComponent></doctorsListComponent>}></Route>
        <Route path='/AppointmentForm'  element={<AppointmentForm></AppointmentForm>} ></Route>
        <Route path='/Contact' element={<></>}></Route>
        <Route path='/UpdateProfile'>
          <Route path='publicProfile'  element={<UpdateProfile></UpdateProfile>} ></Route>
          <Route path='UpdatePassword' element={<UpdatePassword></UpdatePassword>} ></Route>
          <Route path='liste-utilisateur-chat' element={<UserChatList></UserChatList>} ></Route> 
          <Route path='chat' element={<SingleChat></SingleChat>} ></Route> 
        </Route>
      
        <Route  path='/medicalrecord' >
            <Route path='patients/ajouter' element={<MedicalRecordComponentAdd></MedicalRecordComponentAdd>} ></Route>
            <Route path='patients/cards' element={<PatientCards></PatientCards>} ></Route>
            
            <Route path='patients/consultations-cards/:id' element={<ConsultationCards></ConsultationCards>}></Route>
            <Route path='patients/consultations-cards/ajouter/:id' element={<ConsultationAdd></ConsultationAdd>}></Route>
            <Route path='patients/:id' element={<PatientUpdate></PatientUpdate>} ></Route>
            <Route path='details/:id' element={<PatientDetails></PatientDetails>} ></Route>


            

            <Route path='MedicalRecordDetails/:id' element={<MedicalRecordDetails></MedicalRecordDetails>}></Route>


            <Route path='BloodandMeasurements' element={<BloodComponent></BloodComponent>} ></Route>
            <Route path='VitalSigns' element={<VitalSignsComponent></VitalSignsComponent>} ></Route>
            <Route path='listPrescriptionsforPatient' element={<ListPrescriptionsforPatient></ListPrescriptionsforPatient>} ></Route>
            <Route path='ShowPrescription/:idPrescription' element={<ShowPrescription></ShowPrescription>} ></Route>


            <Route path='SummaryAlpha/:id' element={<MedicalRecForDoc></MedicalRecForDoc>} ></Route>
            <Route path='BloodandMeasurementsAlpha/:id' element={<HamzaBlood></HamzaBlood>} ></Route>
            <Route path='VitalSignsAlpha/:id' element={<HamzaVital></HamzaVital>} ></Route>
            <Route path='chat' element={<SingleChatPatient></SingleChatPatient>} ></Route> 
            <Route path='DoctorsList' element={<DoctorsListComponent></DoctorsListComponent>} ></Route>
            <Route path='PatientApp' element={<PatientAppComponent></PatientAppComponent>} ></Route>
            <Route path='addPrescription/:id' element={<AddPrescriptionComponent></AddPrescriptionComponent>}></Route>
            <Route path='listPrescriptionsForDoctor/:id' element={<ListPrescription></ListPrescription>}></Route>
            <Route path='updatePrescription/:id/:idPrescription' element={<UpdatePrescription></UpdatePrescription>}></Route>

        </Route>

        <Route path='/AddWorktime'>
          <Route path='WorktimeDoc'  element={<WorktimeDoc></WorktimeDoc>} ></Route>
          <Route path='AppointmentsList'  element={<SeeAppointments></SeeAppointments>} ></Route>
        </Route>
        <Route path='/PatientMedicalRecord/:id'  element={<MedicalRecForDoc></MedicalRecForDoc>} ></Route>
        
        
        <Route path='analyse-image'  element={<AnalyseImage/>} ></Route>
        
      </Routes> 
      <FooterComponent></FooterComponent> 
   </>
  );
}

export default App;