<template>
  <div class="container py-5">
    <h2 class="mb-4 fw-bold text-center">Admin Dashboard</h2>
    <div class="row g-4">
      <div class="col-md-4" v-for="card in cards" :key="card.title">
        <div class="dashboard-card text-center">
          <h5 class="fw-bold">{{ card.title }}</h5>
          <p class="text-muted mb-3">{{ card.description }}</p>
          <button
            class="manage-btn"
            @click="handleManage(card.title)"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { title: 'Patients', description: 'Register and view patient information' },
        { title: 'Doctors', description: 'Manage doctor profiles and availability' },
        { title: 'Appointments', description: 'Review and approve appointments' },
        { title: 'Inventory', description: 'Track medicine and stock levels' },
        { title: 'Billing', description: 'Generate and view billing records' },
        { title: 'Prescriptions', description: 'Manage prescriptions and downloads' },
      ],
    }
  },
  methods: {
    handleManage(title) {
      switch (title) {
        case 'Patients':
          this.$router.push('/admin/patients')
          break
        case 'Doctors':
          this.$router.push('admin/doctors')
          break
        case 'Appointments':
          this.$router.push('/appointments/calendar')
          break
        case 'Inventory':
          this.$router.push('/inventory')
          break
        case 'Billing':
          this.$router.push('/billing/history')
          break
        case 'Prescriptions':
          this.$router.push('/billing/prescriptions')
          break
      }
    },
  },
}
</script>

<style scoped>
.dashboard-card {
  background: rgb(253, 251, 251);
  border-radius: 10px; /* Smaller radius for sharper look */
  padding: 25px 18px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}
.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.manage-btn {
background: linear-gradient(rgb(7, 146, 111), #1b9671, #63df9b);
  color: white;
  border: none;
  padding: 5px 14px; /* Smaller size */
  border-radius: 4px; /* Matches sharper card style */
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}
.manage-btn:hover {
 background: linear-gradient(rgb(7, 146, 111), #1b9671, #63df9b);
  box-shadow:linear-gradient(rgb(7, 146, 111), #1b9671, #63df9b);
}
</style>



