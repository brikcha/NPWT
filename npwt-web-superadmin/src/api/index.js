import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
//users
export const verifyUser = (id) => API.get(`/verifyUser/${id}`);
export const unverifyUser = (id) => API.get(`/unverifyUser/${id}`);
export const deleteUser = (id) => API.delete(`/deleteUser/${id}`);
export const addUser = (formData) => API.post('/addUser', formData);
export const updateUser = (id, updateUser) => API.put(`/updateUser/${id}`, updateUser);
export const paginatedUsers = (currentPage, limit, search,role) => API.get(`/paginatedUsers?currentPage=${currentPage.current}&limit=${limit}&search=${search}&role=${role}`);
export const search = (key) => API.get(`/search/${key}`);
export const update =(id) =>  API.update(`/update`);
export const getDetails = (id) => API.get(`/get/${id}`);

// patient
export const deletePatient = (id) => API.delete(`/medical-patient/deleteMedicalRecordPatient/${id}`);
export const addPatient = (formData) => API.post('/addMedicalRecordPatient', formData);
export const updatePatient = (id, updatePatient) => API.put(`/medical-patient/updateMedicalRecordPatient/${id}`, updatePatient);

export const getPatientByExaminationDate = () => API.get(`/medical-patient/getMedicalRecordPatientsByExaminationDate`);
export const getMedicalRecordPatientDetails = (id) => API.get(`/medical-patient/getMedicalRecordPatientDetails/${id}`);
export const archiveMedicalRecordPatient = (id) => API.put(`/medical-patient/archiveMedicalRecordPatient/${id}/archive`);
export const unArchiveMedicalRecordPatient = (id) => API.put(`/medical-patient/unArchiveMedicalRecordPatient/${id}/unarchive`);
export const paginatedPatients = (currentPage, limit, search) => API.get(`/medical-patient/paginatedPatient?currentPage=${currentPage.current}&limit=${limit}&search=${search}`);


export const getAllMedicalRecords = () => API.get(`/medical/getAllMedicalRecords`);
export const getAllDoctor = () => API.get(`/medical/getAllDoctor`);
export const deleteMedical = (id) => API.delete(`/medical/deleteMedical/${id}`);
export const addMedical = (formData) => API.post('/medical/addMedical', formData);
export const updateMedical = (id, updateMedical) => API.put(`/medical/updateMedical/${id}`, updateMedical);
export const paginatedMedicals = (currentPage, limit) => API.get(`/medical/paginatedMedicals?currentPage=${currentPage.current}&limit=${limit}`);
export const getMedicalDetails = (id) => API.get(`/medical/getMedicalRecordById/${id}`);



// machine
export const paginatedMachines = (currentPage, limit, search) => API.get(`/machine/paginatedFilteredMachine?currentPage=${currentPage.current}&limit=${limit}&search=${search}`);
export const deleteMachine = (id) => API.delete(`/machine/deleteMachine/${id}`);
export const addMachine = (formData) => API.post('/machine/addMachine', formData);
export const updateMachine = (id, updateMachine) => API.put(`/machine/updateMachine/${id}`, updateMachine);
export const getMachineDetails = (id) => API.get(`/machine/getMachineDetails/${id}`);
