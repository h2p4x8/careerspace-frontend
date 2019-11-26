import vacancyApi from './vacancyApi'

const state = {
  jobsList: [],
  filterJobsList: [],
  bisFunctions: [],
  bisIndustries: [],
  typeofCompany: [],
  selectedBisFunction: '',
  selectedBisIndustry: '',
  selectedCompanyType: '',
  skip: 1,
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
  },
  skip_set(state, value) {
    state.skip = value;
  },
};

const actions = {
  async dataCreate ({ state, commit, dispatch, getters, rootGetters }, payload) {
    await dispatch('careerMapConfig/refreshPositionList',  null, { root: true })
    await dispatch('careerMapConfig/refreshFunctionList',  null, { root: true })
    await dispatch('careerMapConfig/refreshIndustryList',  null, { root: true })
      const vacancyList = state.jobsList;
      let functionSet = vacancyList.reduce(
        function(accumulator, currentValue) {
          accumulator.add(currentValue.mapFunction);
          return accumulator;
        },
        new Set()
      );



      let functionArray = [...functionSet];
      let functionList = rootGetters['careerMapConfig/functionList_get']
      const finalFunctionList = functionList.filter(el => {
        if (functionArray.some(id => id === el.id)) {
          return {
            name: el.name,
            id: el.id
          }
        }
      })
      commit("setFunctionsList", finalFunctionList);

      let companiesSet = vacancyList.reduce((accumulator, currentValue) => {
                accumulator.add(currentValue.companyName.id);
                return accumulator;
              },
              new Set()
            );
      let companiesArray = [...companiesSet];
      const finalIndustryList = await vacancyApi.getIndustriesByCompany({ data: { companies: companiesArray } })
      console.log(finalIndustryList)
      // let industrySet = vacancyList.reduce(
      //   function(accumulator, currentValue) {
      //     if (currentValue.industryMap) {
      //       currentValue.industryMap.forEach( el => {
      //         accumulator.add(el.id);
      //       })
      //     }
      //     return accumulator;
      //   },
      //   new Set()
      // );
      // console.log(industrySet)
      // let industryArray = [...industrySet];
      // let industryList = rootGetters['careerMapConfig/industryList_get']
      // const finalIndustryList = industryList.filter(el => {
      //   if (industryArray.some(id => id === el.id)) {
      //     return {
      //       name: el.name,
      //       id: el.id
      //     }
      //   }
      // })
      commit("setIndustriesList", finalIndustryList);

      if (state.typeofCompany.length === 0) {
        console.log('1')
        let typeofCompanySet = vacancyList.reduce(
          function(accumulator, currentValue) {
            console.log(currentValue)
            accumulator.add(currentValue.companyName.typeOfCompany);
            return accumulator;
          },
          new Set()
        );
        let typeofCompanyArray = [...typeofCompanySet];
        /*let typeofCompanyList = rootGetters['careerMapConfig/positionList_get']
        const finalPositionList = positionList.filter(el => {
          if (positionArray.some(id => id === el.id)) {
            return {
              name: el.name,
              id: el.id
            }
          }
        })*/
      commit("setBisTypeofCompany", typeofCompanyArray);
    }
    return true;
  },

  async refreshData({ state, commit, dispatch, getters, rootGetters }) {
    const result  = await vacancyApi.vacancyListGetAll();
    commit('jobsList_set', { payload: result });
    if (result.length > 0) {
        const data = await dispatch('dataCreate')
    };
  },

  async getFilteredVacancies({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const { selected, byId } = payload;
    let result;
    if (byId) {
      if (rootGetters['UserPage/subscriptionStatus_get']) {
        result = rootGetters['VacancyCreator/vacancyListDyId_get']
      } else result = []
      commit('jobsList_set', { payload: result })
      return;
    }
    if (selected !== null) {
      result  = await vacancyApi.vacancyListGetFiltered({data: selected });
      commit('jobsList_set', { payload: result.result.vacancyList })
      if (result.message) {
        return result.message;
      }
    } else {
      const result  = await vacancyApi.vacancyListGetAll();
      commit('jobsList_set', { payload: result });
    }
    return true;
  },

  filterJobsList({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const {
      selected
    } = payload;
    let jobListFiltered = state.jobsList.filter(job => {
      if (selected.industry) {
        if (job.industry !== selected.industry) return;
      }
      if (selected.function) {
        if (job.mapFunction !== selected.function) return;
      }
      if (selected.typeofCompany.length > 0) {
        let allowedJob = false;
        for (let el of selected.typeofCompany) {
          if (job.companyName.typeofCompany === el) allowedJob = true;
        }
        if (!allowedJob) return;
      }
      return job;

    })
    commit('filterJobsList_set', {payload: jobListFiltered});
  },

  async vacancyGetById ({ state, commit, dispatch, getters, rootGetters }, { payload }) {
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

  async addToFavorite ({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const { vacancyId} = payload;
    console.log(vacancyId)
    const result = await vacancyApi.addToFavorite({ vacancyId });

    return result;
  },
  async removeFromFavorite ({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const { vacancyId } = payload;

    const result = await vacancyApi.removeFromFavorite({ vacancyId });

    return result;
  },

  async makeReplyToVacancy ({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const { data, vacancyId } = payload;

    const result = await vacancyApi.makeReply({ data, vacancyId });

    return result;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};














/*
export default new Vuex.Store({
  state: {
    jobsList: jobs,
    filterJobsList: [],
    bisFunctions: [],
    bisIndustries: [],
    companyTypes: [],
    selectedBisFunction: '',
    selectedBisIndustry: '',
    selectedCompanyType: ''
  },
  getters: {
    getJobsList: function (state) {
      return state.jobsList
    },
    getJobsListFiltered: function (state) {
      let jobListFiltered = state.jobsList.filter(
        function(job) {
          return (job.bis_function.includes(state.selectedBisFunction)) &&
            (job.bis_industry.includes(state.selectedBisIndustry)) &&
            (job.company_type.includes(state.selectedCompanyType))
        }
      )
      return jobListFiltered;
    },
    getBisFunctions: function (state) {
      return state.bisFunctions
    },
    getBisIndustries: function (state) {
      return state.bisIndustries
    },
    getCompanyTypes: function (state) {
      return state.companyTypes
    },
    getSelectedBisFunction: function (state) {
      return state.selectedBisFunction
    },
    getSelectedBisIndustry: function (state) {
      return state.selectedBisIndustry
    },
    getSelectedCompanyType: function (state) {
      return state.selectedCompanyType
    }
  },
  mutations: {
    jobsList_set(state, { payload }) {
      state.jobsList = payload
    },
    setSelectedBisFunction(state, value) {
      state.selectedBisFunction = value
    },
    setSelectedBisIndustry(state, value) {
      state.selectedBisIndustry = value
    },
    setSelectedCompanyType(state, value) {
      state.selectedCompanyType = value
    },
    setFunctionsList(state, value) {
      state.bisFunctions = value;
    },
    setIndustriesList(state, value) {
      state.bisIndustries = value;
    },
    setCompanyTypes(state, value) {
      state.companyTypes = value;
    }
  },
  actions: {
    updateSelectedBisFunction(context, value) {
      if (!value) value = '';
      context.commit('setSelectedBisFunction', value)
    },
    updateSelectedBisIndustry(context, value) {
      if (!value) value = '';
      context.commit('setSelectedBisIndustry', value)
    },
    updateSelectedCompanyType(context, value) {
      if (!value) value = '';
      context.commit('setSelectedCompanyType', value)
    },
    dataInit(context) {
      let functionSet = jobs.reduce(
        function(accumulator, currentValue) {
          accumulator.add(currentValue.bis_function);
          return accumulator;
        },
        new Set()
      );
      let functionArray = [...functionSet];
      context.commit("setFunctionsList", functionArray);

      let industrySet = jobs.reduce(
        function(accumulator, currentValue) {
          accumulator.add(currentValue.bis_industry);
          return accumulator;
        },
        new Set()
      );
      let industryArray = [...industrySet];
      context.commit("setIndustriesList", industryArray);

      let companyTypeSet = jobs.reduce(
        function(accumulator, currentValue) {
          accumulator.add(currentValue.company_type);
          return accumulator;
        },
        new Set()
      );
      let companyTypeArray = [...companyTypeSet];
      context.commit("setCompanyTypes", companyTypeArray);
    }
  }
})
*/
