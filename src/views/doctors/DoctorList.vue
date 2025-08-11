<template>
  <div class="container py-4">
    <h3>All Doctors</h3>

    <table class="table table-hover mt-3">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Specialization</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor, index) in doctors" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ doctor.name }}</td>
          <td>{{ doctor.email }}</td>
          <td>{{ doctor.specialization }}</td>
          <td>
            <ul class="mb-0">
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
              @click="editDoctor(index)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteDoctor(index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link to="/doctors/new" class="btn btn-primary mt-3">
      + Add New Doctor
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    doctors() {
      return this.$store.state.doctors.list || [];
    },
  },
  methods: {
    editDoctor(index) {
      this.$router.push({ name: 'EditDoctor', params: { id: index } });
    },
    deleteDoctor(index) {
      this.$store.commit('doctors/DELETE_DOCTOR', index);
    },
    formatDay(day) {
      const daysMap = {
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      };
      return daysMap[day] || day;
    }
  },
};
</script>

