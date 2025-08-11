<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="register-card shadow-sm">
          <div class="card-body p-4">
            <h3 class="text-center mb-3 fw-bold">Sign Up</h3>

            <div v-if="registerStatus.message" :class="`alert alert-${registerStatus.type} mt-3`">
              {{ registerStatus.message }}
            </div>

            <form @submit.prevent="register">
              <!-- Name -->
              <div class="mb-2">
                <label class="form-label">Name</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.name }"
                  placeholder="John Doe"
                  required 
                />
                <div v-if="errors.name" class="invalid-feedback">
                  {{ errors.name }}
                </div>
              </div>

              <!-- Email -->
              <div class="mb-2">
                <label class="form-label">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.email }"
                  placeholder="example@email.com"
                  required 
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>

              <!-- Password -->
              <div class="mb-2">
                <label class="form-label">Password</label>
                <input 
                  v-model="form.password" 
                  type="password" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.password }"
                  placeholder="******"
                  required 
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="mb-2">
                <label class="form-label">Confirm Password</label>
                <input 
                  v-model="form.confirmPassword" 
                  type="password" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.confirmPassword }"
                  placeholder="******"
                  required 
                />
                <div v-if="errors.confirmPassword" class="invalid-feedback">
                  {{ errors.confirmPassword }}
                </div>
              </div>

              <!-- Role -->
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select 
                  v-model="form.role" 
                  class="form-select"
                  :class="{ 'is-invalid': errors.role }"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="admin" disabled>Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="receptionist">Receptionist</option>
                </select>
                <div v-if="errors.role" class="invalid-feedback">
                  {{ errors.role }}
                </div>
              </div>

              <!-- Submit -->
              <button 
                type="submit" 
                class="btn btn-success w-100"
                :disabled="isRegistering"
              >
                <span v-if="isRegistering" class="spinner-border spinner-border-sm me-2"></span>
                {{ isRegistering ? 'Creating account...' : 'Sign Up' }}
              </button>
            </form>

            <!-- Already have account -->
            <div class="text-center mt-3 already-account">
              <p class="mb-1">Already have an account?</p>
              <router-link to="/login" class="btn btn-outline-secondary btn-sm">Sign In</router-link>
              <div class="mt-1">
                <router-link to="/" class="btn btn-link text-muted small">Back to Home</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnifiedRegister',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      },
      errors: {},
      isRegistering: false,
      registerStatus: {
        type: '',
        message: ''
      }
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      
      if (!this.form.name) {
        this.errors.name = 'Name is required';
      } else if (this.form.name.length < 3) {
        this.errors.name = 'Name must be at least 3 characters';
      }

      if (!this.form.email) {
        this.errors.email = 'Email is required';
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address';
      }

      if (!this.form.password) {
        this.errors.password = 'Password is required';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters';
      }

      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password';
      } else if (this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = 'Passwords do not match';
      }

      if (!this.form.role) {
        this.errors.role = 'Please select a role';
      }

      return Object.keys(this.errors).length === 0;
    },

    async register() {
      if (!this.validateForm()) {
        return;
      }

      this.isRegistering = true;
      this.registerStatus = { type: '', message: '' };

      try {
        await this.$store.dispatch('auth/register', this.form);

        this.registerStatus = {
          type: 'success',
          message: 'Account created successfully! Redirecting to login...'
        };

        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } catch (err) {
        console.error('Registration error:', err);
        this.registerStatus = {
          type: 'danger',
          message: err.message || err.response?.data?.message || 'Registration failed. Please try again.'
        };
      } finally {
        this.isRegistering = false;
      }
    }
  }
};
</script>

<style scoped>
.register-card {
  border-radius: 8px;
  border: none;
  background: #fff;
}

.form-label {
  font-weight: 500;
  font-size: 0.9rem;
}

.btn-success {
  background-color: #4CAF50;
  border: none;
}

.btn-success:hover {
  background-color: #43a047;
}

.already-account p {
  font-size: 0.85rem;
  color: #555;
}

.btn-outline-secondary {
  border-radius: 20px;
  font-size: 0.8rem;
  padding: 3px 12px;
}

.btn-link {
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>