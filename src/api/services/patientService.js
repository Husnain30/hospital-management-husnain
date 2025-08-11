import api from '../index' // uses your base axios instance

class PatientService {
  getPatients() {
    return api.get('admin/patients').then(res => res.data);
  }
  getPatient(id) {
    return api.get(`admin/patients/${id}`).then(res => res.data);
  }
  createPatient(formData) {
    return api.post('admin/patients', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  }
  updatePatient(id, formData) {
    return api.post(`admin/patients/${id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  }
  deletePatient(id) {
    return api.delete(`admin/patients/${id}`).then(res => res.data);
  }
}

export default new PatientService()



