<template>
  <div class="container py-4">
    <h2>{{ isEdit ? 'Edit Patient' : 'Add Patient' }}</h2>

    <div v-if="loading" class="text-center py-5">
      <span>Loading...</span>
    </div>

    <form v-else @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <!-- Name -->
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="form.email" class="form-control" required />
      </div>

      <!-- Password -->
      <div class="mb-3" v-if="!isEdit">
        <label class="form-label">Password</label>
        <input type="password" v-model="form.password" class="form-control" required />
      </div>

      <div class="mb-3" v-if="!isEdit">
        <label class="form-label">Confirm Password</label>
        <input type="password" v-model="form.password_confirmation" class="form-control" required />
      </div>

      <!-- DOB -->
      <div class="mb-3">
        <label class="form-label">Date of Birth</label>
        <input type="date" v-model="form.dob" class="form-control" />
      </div>

      <!-- Gender -->
      <div class="mb-3">
        <label class="form-label">Gender</label>
        <select v-model="form.gender" class="form-select">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <!-- Address -->
      <div class="mb-3">
        <label class="form-label">Address</label>
        <textarea v-model="form.address" class="form-control"></textarea>
      </div>

      <!-- Phone -->
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input v-model="form.phone" class="form-control" />
      </div>

      <!-- Profile Picture -->
      <div class="mb-3">
        <label class="form-label">Profile Picture</label>
        <input type="file" @change="handleFileUpload($event, 'profile_picture')" class="form-control" />
      </div>

      <!-- Medical History Description -->
      <div class="mb-3">
        <label class="form-label">Medical History Description</label>
        <input v-model="form.medical_history_description" class="form-control" />
      </div>

      <!-- Medical History Document -->
      <div class="mb-3">
        <label class="form-label">Medical History Document</label>
        <input type="file" @change="handleFileUpload($event, 'medical_history_document')" class="form-control" />
      </div>

      <!-- Submit -->
      <button class="btn btn-primary" type="submit">
        {{ isEdit ? 'Update' : 'Create' }}
      </button>
      <router-link to="/admin/patients" class="btn btn-secondary ms-2">
        Cancel
      </router-link>
    </form>
  </div>
</template>

<script>
import PatientService from '@/api/services/patientService';

export default {
  name: 'PatientForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        dob: '',
        gender: '',
        address: '',
        phone: '',
        profile_picture: null,
        medical_history_description: '',
        medical_history_document: null,
      },
      loading: false,
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    handleFileUpload(event, field) {
      this.form[field] = event.target.files[0];
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('email', this.form.email);
        if (!this.isEdit) {
          formData.append('password', this.form.password);
          formData.append('password_confirmation', this.form.password_confirmation);
        }
        formData.append('dob', this.form.dob);
        formData.append('gender', this.form.gender);
        formData.append('address', this.form.address);
        formData.append('phone', this.form.phone);
        if (this.form.profile_picture) {
          formData.append('profile_picture', this.form.profile_picture);
        }
        formData.append('medical_histories[0][description]', this.form.medical_history_description);
        if (this.form.medical_history_document) {
          formData.append('medical_histories[0][document]', this.form.medical_history_document);
        }

        if (this.isEdit) {
          await PatientService.updatePatient(this.$route.params.id, formData);
        } else {
          await PatientService.createPatient(formData);
        }

        this.$router.push('/admin/patients');
      } catch (err) {
        console.error(err);
        alert('Failed to save patient');
      }
    },
  },
};
</script>




