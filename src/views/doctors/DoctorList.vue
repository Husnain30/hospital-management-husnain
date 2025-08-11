<template>
  <div class="container py-4">
    <h3>All Doctors</h3>

    <table class="table table-hover mt-3" v-if="doctors.length">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Specialization</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor, index) in doctors" :key="doctor.id || index">
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="doctor.profile_picture_url || '/default-avatar.png'"
              alt="Profile"
              class="rounded-circle"
              style="width: 50px; height: 50px; object-fit: cover;"
            />
          </td>
          <td>{{ doctor.name }}</td>
          <td>{{ doctor.email }}</td>
          <td>{{ doctor.specialization?.name || doctor.specialization }}</td>
          <td>
            <ul class="mb-0" v-if="doctor.availability">
              <li v-for="(slots, day) in doctor.availability" :key="day">
                <strong>{{ formatDay(day) }}:</strong>
                <span v-for="slot in slots" :key="slot.start">
                  {{ slot.start }} - {{ slot.end }}
                </span>
              </li>
            </ul>
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning me-1"
              @click="editDoctor(doctor.id)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteDoctor(doctor.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="mt-3">No doctors found.</div>

    <router-link to="/admin/doctors/new" class="btn btn-primary mt-3">
      + Add New Doctor
    </router-link>
  </div>
</template>

<script>
import doctorService from '@/api/services/doctorService'

export default {
  data() {
    return {
      doctors: []
    }
  },
  methods: {
    async fetchDoctors() {
      try {
        const data = await doctorService.getDoctors()
        this.doctors = data.data;
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    },
    editDoctor(id) {
      this.$router.push({ name: 'EditDoctor', params: { id } })
    },
    async deleteDoctor(id) {
      if (confirm('Are you sure you want to delete this doctor?')) {
        try {
          await doctorService.deleteDoctor(id)
          this.doctors = this.doctors.filter(doc => doc.id !== id)
        } catch (error) {
          console.error('Error deleting doctor:', error)
        }
      }
    },
    formatDay(day) {
      const daysMap = {
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday'
      }
      return daysMap[day] || day
    }
  },
  mounted() {
    this.fetchDoctors()
  }
}
</script>


