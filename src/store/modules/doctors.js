import DoctorService from '@/api/services/doctorService';

const state = {
  list: [],
  loading: false,
  error: null
};

const mutations = {
  SET_DOCTORS(state, doctors) {
    state.list = doctors;
  },
  ADD_DOCTOR(state, doctor) {
    state.list.push(doctor);
  },
  UPDATE_DOCTOR(state, updatedDoctor) {
    const index = state.list.findIndex(d => d.id === updatedDoctor.id);
    if (index !== -1) {
      state.list.splice(index, 1, updatedDoctor);
    }
  },
  REMOVE_DOCTOR(state, id) {
    state.list = state.list.filter(d => d.id !== id);
  },
  TOGGLE_DOCTOR_STATUS(state, id) {
    const doctor = state.list.find(d => d.id === id);
    if (doctor) {
      doctor.active = !doctor.active;
    }
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchDoctors({ commit }) {
    commit('SET_LOADING', true);
    try {
      const doctors = await DoctorService.getDoctors();
      commit('SET_DOCTORS', doctors);
    } catch (error) {
      commit('SET_ERROR', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async addDoctor({ commit }, doctorData) {
    try {
      const doctor = await DoctorService.createDoctor(doctorData);
      commit('ADD_DOCTOR', doctor);
    } catch (error) {
      commit('SET_ERROR', error);
    }
  },

  async updateDoctor({ commit }, { id, data }) {
    try {
      const updatedDoctor = await DoctorService.updateDoctor(id, data);
      commit('UPDATE_DOCTOR', updatedDoctor);
    } catch (error) {
      commit('SET_ERROR', error);
    }
  },

  async deleteDoctor({ commit }, id) {
    try {
      await DoctorService.deleteDoctor(id);
      commit('REMOVE_DOCTOR', id);
    } catch (error) {
      commit('SET_ERROR', error);
    }
  },

  async toggleDoctorStatus({ commit }, id) {
    try {
      await DoctorService.updateDoctorAvailability(id, { active: false }); // adjust if API expects another field
      commit('TOGGLE_DOCTOR_STATUS', id);
    } catch (error) {
      commit('SET_ERROR', error);
    }
  }
};

const getters = {
  doctors: (state) => state.list,
  activeDoctors: (state) => state.list.filter(d => d.active),
  loading: (state) => state.loading,
  error: (state) => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};


