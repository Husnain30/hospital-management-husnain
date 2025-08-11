<template>
  <div class="container py-4">
    <h3>{{ isEditMode ? 'Edit Doctor' : 'Register New Doctor' }}</h3>

    <form @submit.prevent="saveDoctor" class="mt-3" enctype="multipart/form-data">
      <!-- Name -->
      <div class="form-group mb-3">
        <label>Name</label>
        <input v-model="form.name" type="text" class="form-control" required />
      </div>

      <!-- Email -->
      <div class="form-group mb-3">
        <label>Email</label>
        <input v-model="form.email" type="email" class="form-control" required />
      </div>

      <!-- Password -->
      <div class="form-group mb-3" v-if="!isEditMode">
        <label>Password</label>
        <input v-model="form.password" type="password" class="form-control" required />
      </div>

      <!-- Password Confirmation -->
      <div class="form-group mb-3" v-if="!isEditMode">
        <label>Confirm Password</label>
        <input v-model="form.password_confirmation" type="password" class="form-control" required />
      </div>

      <!-- Specialization -->
      <div class="form-group mb-3">
        <label>Specialization ID</label>
        <input v-model="form.specialization_id" type="number" class="form-control" required />
      </div>

      <!-- Profile Picture -->
      <div class="form-group mb-3">
        <label>Profile Picture</label>
        <input type="file" @change="handleFileUpload" class="form-control" />
      </div>

      <!-- Availability -->
      <div class="form-group mb-3">
        <label>Weekly Availability</label>
        <div v-for="day in daysOfWeek" :key="day.key" class="mb-2">
          <strong>{{ day.label }}</strong>
          <div class="row">
            <div class="col">
              <input type="time" v-model="form.availability[day.key][0].start" class="form-control" />
            </div>
            <div class="col">
              <input type="time" v-model="form.availability[day.key][0].end" class="form-control" />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success">{{ isEditMode ? 'Update' : 'Register' }}</button>
      <router-link to="/doctors" class="btn btn-secondary ms-2">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import doctorService from '@/api/services/doctorService'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        specialization_id: '',
        profile_picture: null,
        availability: {
          mon: [{ start: '', end: '' }],
          tue: [{ start: '', end: '' }],
          wed: [{ start: '', end: '' }],
          thu: [{ start: '', end: '' }],
          fri: [{ start: '', end: '' }],
          sat: [{ start: '', end: '' }],
          sun: [{ start: '', end: '' }],
        }
      },
      daysOfWeek: [
        { key: 'mon', label: 'Monday' },
        { key: 'tue', label: 'Tuesday' },
        { key: 'wed', label: 'Wednesday' },
        { key: 'thu', label: 'Thursday' },
        { key: 'fri', label: 'Friday' },
        { key: 'sat', label: 'Saturday' },
        { key: 'sun', label: 'Sunday' },
      ]
    }
  },
  computed: {
    isEditMode() {
      return this.$route.name === 'EditDoctor'
    },
  },
  methods: {
    handleFileUpload(event) {
      this.form.profile_picture = event.target.files[0]
    },
    async saveDoctor() {
      const formData = new FormData()
      Object.keys(this.form).forEach(key => {
        if (key === 'availability') {
          Object.keys(this.form.availability).forEach(day => {
            this.form.availability[day].forEach((slot, idx) => {
              formData.append(`availability[${day}][${idx}][start]`, slot.start)
              formData.append(`availability[${day}][${idx}][end]`, slot.end)
            })
          })
        } else {
          formData.append(key, this.form[key])
        }
      })

      if (this.isEditMode) {
        await doctorService.updateDoctor(this.$route.params.id, formData)
      } else {
        // changed to admin/doctors/new
        await doctorService.createDoctorAtNewEndpoint(formData)
      }
      this.$router.push('/doctors')
    }
  }
}
</script>


