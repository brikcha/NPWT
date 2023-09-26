import Dashboard from "views/Dashboard/Dashboard.js";
import TablesUser from "views/UserComponent/TablesUser";
import  AddUser from "views/UserComponent/AddUser"
import TablesPatient from "views/MedicalRecordComponent/Patients/TablesPatient";
import TablesMedical from "views/MedicalRecordComponent/Dossier Medical/TabelsMedical";
import TableMachine from "views/Machine/TableMachine";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fa fa-chart-line text-primary",
    component: <Dashboard/>,
    layout: "/admin",
  },
  {
    path: "/utilisateur/table",
    name: "Responsables",
    icon: "fa-solid fa-users text-primary",
    component: <TablesUser/>,
    layout: "/admin",
  },
  {
    path: "/medical-record/patients-table",
    name: "Patients",
    icon: "fa-solid fa-hospital-user text-primary",
    component: <TablesPatient/>,
    layout: "/admin",
  },
  {
    path: "/utilisateur/ajouter",
   name: "Add",
   icon: "ni ni-single-02 text-yellow",
    component: < AddUser />,
    layout: "/admin",
    styled:"none"
  },
  
  {
    path: "/medical-record/medicals-table",
    name: "Liste des consultations",
    icon: "fa-solid fa-file-medical text-primary",
    component: <TablesMedical/>,
    layout: "/admin",
  },
  {
    path: "/machines/table",
    name: "Machines",
    icon: "fa-solid fa-kit-medical text-primary",
    component: <TableMachine/>,
    layout: "/admin",
  },
];
export default routes;
