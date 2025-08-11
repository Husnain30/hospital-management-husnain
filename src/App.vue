<template>
  <div id="app">
    <!-- Navbar (optional) -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <router-link class="navbar-brand" to="/">🏥 Hospital System</router-link>
        <div class="ml-auto d-flex align-items-center">
          
          
        </div>
      </div>
    </nav>

    <!-- Alerts or notifications -->
    <NotificationToast />

    <!-- Route View -->
    <div class="container py-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import NotificationToast from "./components/common/NotificationToast.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    NotificationToast,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "currentUser"]),
    userRole() {
      return this.currentUser ? this.currentUser.role : '';
    },
    userName() {
      return this.currentUser ? this.currentUser.name || this.currentUser.username || this.currentUser.email : '';
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
  background-image: url('@/assets/hospital-building-modern-parking-lot-59693686.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  position: relative;
}

body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(248, 249, 250, 0.8);
  z-index: -1;
}

nav {
  background: linear-gradient(rgb(7, 146, 111), #1b9671, #63df9b);
  border-bottom: 1px soild #1b9671
}

#app {
  min-height: 100vh;
}

.main-content {
  transition: margin-left 0.3s ease;
  min-height: 100vh;
}

.main-content.has-sidebar {
  margin-left: 250px;
}

.main-content.has-sidebar.collapsed {
  margin-left: 70px;
}

.content-wrapper {
  min-height: calc(100vh - 56px);
}

@media (max-width: 768px) {
  .main-content.has-sidebar {
    margin-left: 0;
  }
}
</style>
