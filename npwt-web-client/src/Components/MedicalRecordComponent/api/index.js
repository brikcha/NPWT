import axios from 'axios';
const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});
export const listMedical = () => API.get(`/medical/listMedical`);
export const getAllDoctor = () => API.get(`/medical/getAllDoctor`);
export const deleteMedical = (id) => API.delete(`/medical/deleteMedical/${id}`);
export const addMedical = (formData) => API.post('/medical/addMedical', formData);
export const updateMedical = (id, updateMedical) => API.put(`/medical/updateMedical/${id}`, updateMedical);
export const paginatedMedical = (currentPage, limit) => API.get(`/medical/paginatedMedicals?currentPage=${currentPage.current}&limit=${limit}`);
export const search = (key) => API.get(`/medical/search/${key}`);
export const update =(id) =>  API.update(`/medical/update`);
//export const getDetails = (id) => API.get(`/get/${id}`);
export const getDetails = (id) => API.get(`/medical/get/${id}`);

// patient
export const listePatient = () => API.get(`/medical-patient/getAllMedicalRecordPatient`);
export const deletePatient = (id) => API.delete(`/medical-patient/deleteMedicalRecordPatient/${id}`);
export const addPatient = (formData) => API.post('/addMedicalRecordPatient', formData);
export const updatePatient = (id, updatePatient) => API.put(`/medical-patient/updateMedicalRecordPatient/${id}`, updatePatient);

export const getPatientByExaminationDate = () => API.get(`/medical-patient/getMedicalRecordPatientsByExaminationDate`);
export const getMedicalRecordPatientDetails = (id) => API.get(`/medical-patient/getMedicalRecordPatientDetails/${id}`);
export const archiveMedicalRecordPatient = (id) => API.put(`/medical-patient/archiveMedicalRecordPatient/${id}/archive`);
export const unArchiveMedicalRecordPatient = (id) => API.put(`/medical-patient/unArchiveMedicalRecordPatient/${id}/unarchive`);


export const paginatedPatients = (currentPage, limit) => API.get(`/medical-patient/paginatedPatient?currentPage=${currentPage.current}&limit=${limit}`);

