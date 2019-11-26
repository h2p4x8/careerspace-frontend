import vacancyApi from './vacancyApi'

const state = {
  vacancyList: [],
  vacancyListFiltered: [],
  vacancyListDyId: [],
};

const getters = {
  vacancyList_get: (state) => {
    return state.vacancyList;
  },
  vacancyListFiltered_get: (state) => {
    return state.vacancyListFiltered;
  },

  vacancyListDyId_get: state => {
    return state.vacancyListDyId;
  }
};

const mutations = {
  vacancyList_set (state, { payload }) {
    state.vacancyList = payload;
  },
  vacancyListFiltered_set (state, { payload }) {
    state.vacancyListFiltered = payload;
  },

  vacancyListDyId_set(state, { payload }) {
    state.vacancyListDyId = payload;
  },
};

const actions = {
  dataUpdate: async ({ state, commit }, payload) => {
    const vacancyList = await vacancyApi.vacancyListGetAll();

    if (vacancyList) commit('vacancyList_set', { payload: vacancyList })
    else console.log('failed')
  },

  vacancyGetById: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    return vacancyApi.vacancyGetById({ id: payload.id })
                                        .then( vacancyById => {
                                          if (vacancyById) return vacancyById;
                                          else return false;
                                        })
                                        .catch(err => {
                                          console.log(err);
                                          return false;
                                        });
  },

  newVacancyCreate: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { data } = payload;
    return vacancyApi.vacancyCreate({ data })
                      .then(newVacancy => {
                        if (newVacancy) return newVacancy;
                        else return false;
                      })
                      .catch(err => {
                        console.log(err);
                        return false;
                      });
  },

  vacancyUpdateById: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { id, data } = payload;
    return vacancyApi.vacancyUpdate({ id, data })
                      .then(updatedVacancy => {
                        if (updatedVacancy) return updatedVacancy;
                        else return false;
                      })
                      .catch(err => {
                        console.log(err);
                        return false;
                      });
  },

  vacancyDeleteById: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { id, data } = payload;
    return vacancyApi.vacancyDelete({ id })
                    .then(deletedVacancy => {
                      if (deletedVacancy) return deletedVacancy;
                      else return false;
                    })
                    .catch(err => {
                      console.log(err);
                      return false;
                    });
  },

  vacancyListGetByIdList: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { idList } = payload;
    return vacancyApi.vacancyListGetByIdList({ idList })
                    .then(vacancyListDyId => {
                      if (vacancyListDyId) {
                        commit('vacancyListDyId_set', { payload: vacancyListDyId })
                        return true;
                      } else return false;
                    })
                    .catch(err => {
                      console.log(err);
                      return false;
                    });
  },
  filterVacancies: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { search } = payload;
    if (search) {
      const filteredVacancies = getters.vacancyList_get.filter(el => {
        for (let key of Object.keys(el)) {
          if (typeof el[key] === 'string') el[key].toLowerCase()
          if (el[key] == search.toLowerCase()) {
            return el;
          }
          if (el.companyName.name.toLowerCase() === search.toLowerCase()) {
            return el;
          }
          if ((new Date(el.createdAt).getDate()) === search || (new Date(el.createdAt).getMonth() + 1) === search || (new Date(el.createdAt).getFullYear()) === search) {
            return el;
          }
        }
      })
      commit('vacancyListFiltered_set', { payload: filteredVacancies })
    } else {
      commit('vacancyListFiltered_set', { payload: getters.vacancyList_get })
    }


  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
