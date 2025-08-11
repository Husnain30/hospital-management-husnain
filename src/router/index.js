import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/register' },
    { path: '/login', name: 'UnifiedLogin', component: () => import('@/components/auth/UnifiedLogin.vue') },
    { path: '/register', name: 'UnifiedRegister', component: () => import('@/components/auth/UnifiedRegister.vue') },

    // ====== LEGACY AUTH REDIRECTS ======
    { path: '/patient/register', redirect: '/register' },
    { path: '/doctor/register', redirect: '/register' },
    { path: '/admin/register', redirect: '/register' },
    { path: '/pharmacist/register', redirect: '/register' },
    { path: '/receptionist/register', redirect: '/register' },
    { path: '/patient/login', redirect: '/login' },
    { path: '/doctor/login', redirect: '/login' },
    { path: '/admin/login', redirect: '/login' },
    { path: '/pharmacist/login', redirect: '/login' },
    { path: '/receptionist/login', redirect: '/login' },

    // ====== DASHBOARDS ======
    { path: '/patient', name: 'PatientDashboard', component: () => import('@/views/dashboard/PatientDashboard.vue') },
    { path: '/doctor', name: 'DoctorDashboard', component: () => import('@/views/dashboard/DoctorDashboard.vue') },
    { path: '/dashboard/pharmacist', name: 'PharmacistDashboard', component: () => import('@/views/dashboard/PharmacistDashboard.vue') },
    { path: '/dashboard/receptionist', name: 'ReceptionistDashboard', component: () => import('@/views/dashboard/ReceptionistDashboard.vue') },

    // ====== ADMIN DASHBOARD ======
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('@/views/dashboard/AdminDashboard.vue'),
    },

    // ====== ADMIN PATIENT ROUTES ======
    {
      path: '/admin/patients',
      name: 'AdminPatients',
      component: () => import('@/views/patients/PatientList.vue'),
    },
    {
      path: '/admin/patients/new',
      name: 'AdminPatientNew',
      component: () => import('@/views/patients/PatientForm.vue'),
    },
    {
      path: '/admin/patients/:id/edit',
      name: 'AdminPatientEdit',
      component: () => import('@/views/patients/PatientForm.vue'),
      props: true
    },

       // ====== ADMIN DOCTOR ROUTES ======
    {
      path: '/admin/doctors',
      name: 'AdminPatients',
      component: () => import('@/views/doctors/DoctorList.vue'),
    },
    {
      path: '/admin/doctors/new',
      name: 'AdminPatientNew',
      component: () => import('@/views/doctors/DoctorForm.vue'),
    },
    {
      path: '/admin/doctors/:id/edit',
      name: 'AdminPatientEdit',
      component: () => import('@/views/doctors/DoctorForm.vue'),
      props: true
    },

    // ====== DOCTORS ======
    { path: '/doctors', name: 'DoctorList', component: () => import('@/views/doctors/DoctorList.vue') },
    { path: '/doctors/new', name: 'DoctorForm', component: () => import('@/views/doctors/DoctorForm.vue') },
    { path: '/doctors/:id/edit', name: 'DoctorEdit', component: () => import('@/views/doctors/DoctorForm.vue') },

    // ====== APPOINTMENTS ======
    { path: '/appointments/request', name: 'AppointmentRequest', component: () => import('@/views/appointments/AppointmentRequest.vue') },
    { path: '/appointments/calendar', name: 'AppointmentCalendar', component: () => import('@/views/appointments/AppointmentCalendar.vue') },
    { path: '/appointments/approve', name: 'AppointmentApproval', component: () => import('@/views/appointments/AppointmentApproval.vue') },
    { path: '/appointments/status', name: 'AppointmentStatus', component: () => import('@/views/appointments/AppointmentStatus.vue') },

    // ====== INVENTORY ======
    { path: '/inventory', name: 'MedicineList', component: () => import('@/views/inventory/MedicineList.vue') },
    { path: '/inventory/new', name: 'MedicineForm', component: () => import('@/views/inventory/MedicineForm.vue') },
    { path: '/inventory/:id/edit', name: 'MedicineEdit', component: () => import('@/views/inventory/MedicineForm.vue') },
    { path: '/inventory/alerts', name: 'StockAlerts', component: () => import('@/views/inventory/StockAlerts.vue') },
    { path: '/inventory/export', name: 'InventoryExport', component: () => import('@/views/inventory/InventoryExport.vue') },

    // ====== BILLING & PRESCRIPTIONS ======
    { path: '/billing/new', name: 'BillingForm', component: () => import('@/views/billing/BillingForm.vue') },
    { path: '/billing/history', name: 'BillingHistory', component: () => import('@/views/billing/BillingHistory.vue') },
    { path: '/billing/prescriptions', name: 'PrescriptionList', component: () => import('@/views/billing/PrescriptionList.vue') },
    { path: '/billing/prescriptions/new', name: 'PrescriptionForm', component: () => import('@/views/billing/PrescriptionForm.vue') },
    { path: '/billing/prescriptions/:id/edit', name: 'PrescriptionEdit', component: () => import('@/views/billing/PrescriptionForm.vue') },

    // ====== 404 NOT FOUND ======
    { path: '*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
  ]
});


