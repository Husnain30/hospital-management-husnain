import api from '../index';

class DoctorService {
  // Get all doctors
  async getDoctors() {
    const response = await api.get('/admin/doctors');
    return response.data;
  }

  // Get single doctor by ID
  async getDoctor(id) {
    const response = await api.get(`/admin/doctors/${id}`);
    return response.data;
  }

  async createDoctorAtNewEndpoint(doctorData) {
  const response = await api.post('admin/doctors/new', doctorData)
  return response.data
}

  // Create new doctor (multipart/form-data for profile picture)
  async createDoctor(doctorData) {
    const formData = new FormData();
    for (const key in doctorData) {
      formData.append(key, doctorData[key]);
    }

    

    const response = await api.post('/admin/doctors', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  // Update doctor
  async updateDoctor(id, doctorData) {
    const formData = new FormData();
    for (const key in doctorData) {
      formData.append(key, doctorData[key]);
    }

    // Using POST with _method=PUT for Laravel-style backend
    const response = await api.post(`/admin/doctors/${id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  // Delete doctor
  async deleteDoctor(id) {
    const response = await api.delete(`/admin/doctors/${id}`);
    return response.data;
  }

  // Get doctor appointments
  async getDoctorAppointments(doctorId) {
    const response = await api.get(`/admin/doctors/${doctorId}/appointments`);
    return response.data;
  }

  // Get doctor patients
  async getDoctorPatients(doctorId) {
    const response = await api.get(`/admin/doctors/${doctorId}/patients`);
    return response.data;
  }

  // Get doctor schedule
  async getDoctorSchedule(doctorId) {
    const response = await api.get(`/admin/doctors/${doctorId}/schedule`);
    return response.data;
  }

  // Update doctor availability
  async updateDoctorAvailability(doctorId, availabilityData) {
    const response = await api.patch(`/admin/doctors/${doctorId}/availability`, availabilityData);
    return response.data;
  }
}

export default new DoctorService();

