<template>
  <div class="container py-4">
    <h2 class="mb-4">Patients</h2>

    <div class="text-end mb-3">
      <router-link to="/admin/patients/new" class="btn btn-primary">
        Add New Patient
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <span>Loading patients...</span>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Medical History</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="patients.length === 0">
          <td colspan="8" class="text-center">No patients found</td>
        </tr>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.email }}</td>
          <td>{{ formatDate(patient.dob) }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.phone }}</td>
          <td>{{ patient.medical_history }}</td>
          <td>{{ formatDate(patient.created_at) }}</td>
          <td>
            <router-link
              :to="`/admin/patients/${patient.id}/edit`"
              class="btn btn-sm btn-warning me-2"
            >
              Edit
            </router-link>
            <button
              class="btn btn-sm btn-danger"
              @click="deletePatient(patient.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PatientService from '@/api/services/patientService';

export default {
  name: 'PatientList',
  data() {
    return {
      patients: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchPatients() {
      this.loading = true;
      this.error = null;
      try {
        const data = await PatientService.getPatients();

        console.log('Fetched patients:', data);
        this.patients = data.data || [];
      } catch (err) {
        this.error = 'Failed to load patients';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async deletePatient(id) {
      if (confirm('Are you sure you want to delete this patient?')) {
        try {
          await PatientService.deletePatient(id);
          this.fetchPatients();
        } catch (err) {
          alert('Failed to delete patient');
        }
      }
    },
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString();
    }
  },
  mounted() {
    this.fetchPatients();
  },
};
</script>




