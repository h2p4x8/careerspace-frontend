import cvEditorApi from './CVEditorApi'

const state = {
};

const getters = {
  getJobsList: function (state) {
    return state.jobsList
  },
  getJobsListFiltered: function (state) {
    return state.filterJobsList;
  },
  getBisFunctions: function (state) {
    return state.bisFunctions
  },
  getBisIndustries: function (state) {
    return state.bisIndustries
  },
  getBisTypeofCompany: function (state) {
    return state.typeofCompany
  },
};

const mutations = {
  jobsList_set(state, { payload }) {
    state.jobsList = payload
  },
  filterJobsList_set(state, { payload }) {
    state.filterJobsList = payload;
  },
  setFunctionsList(state, value) {
    state.bisFunctions = value;
  },
  setIndustriesList(state, value) {
    state.bisIndustries = value;
  },
  setBisTypeofCompany(state, value) {
    state.typeofCompany = value;
  }
};

const actions = {
  async createCV ({ state, commit, dispatch, getters, rootGetters }, {payload}) {
    const { data } = payload;
    console.log(data)
    const result = await cvEditorApi.createNew({ data });
    return result.result;
  },
  async updateCV ({ state, commit, dispatch, getters, rootGetters }, {payload}) {
    const { data, id } = payload;
    const result = await cvEditorApi.updateOne({ data, id });
    return result.result;
  },
  async getUserCV ({ state, commit, dispatch, getters, rootGetters }, {payload}) {
    const { id } = payload;
    const result = await cvEditorApi.getUserCVbyId({ id });
    return result.userCV;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
