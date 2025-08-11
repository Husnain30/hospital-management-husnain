import PatientService from '@/api/services/patientService';

const state = {
  list: [],
  loading: false,
  error: null
}

const mutations = {
  SET_PATIENTS(state, patients) {
    state.list = patients
  },
  ADD_PATIENT(state, patient) {
    state.list.push(patient)
  },
  UPDATE_PATIENT(state, patient) {
    const idx = state.list.findIndex(p => p.id === patient.id)
    if (idx !== -1) state.list.splice(idx, 1, patient)
  },
  DELETE_PATIENT(state, id) {
    state.list = state.list.filter(p => p.id !== id)
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchPatients({ commit }) {
    commit('SET_LOADING', true)
    try {
      const data = await PatientService.getPatients()
      commit('SET_PATIENTS', data)
    } catch (err) {
      commit('SET_ERROR', err)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async addPatient({ commit }, patient) {
    const newPatient = await PatientService.createPatient(patient)
    commit('ADD_PATIENT', newPatient)
  },
  async updatePatient({ commit }, { id, data }) {
    const updated = await PatientService.updatePatient(id, data)
    commit('UPDATE_PATIENT', updated)
  },
  async deletePatient({ commit }, id) {
    await PatientService.deletePatient(id)
    commit('DELETE_PATIENT', id)
  }
}

const getters = {
  patients: s => s.list,
  loading: s => s.loading,
  error: s => s.error
}

export default { namespaced: true, state, mutations, actions, getters }

