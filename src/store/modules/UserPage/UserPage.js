import userInfoApi from './userInfoApi'

const state = {
  user: '',
  vacancyRepliedList: [],
  cvList: [],
  lockSidebar: true,
  subscriptionStatus: null,
  isFirstVisit: false,
  showAttention: false,
  showAttentionReason: null,
  showPrices: false,
  subscriptionOptions: [],
  subscriptionPrice: null,
  userProfile: {},
  jobList: [],
  toolsType: null,
  userProfileUrl: '',
  usersProfile: [],
  functionsList: [],
  industriesList: [],
  userProfileUrl: '',
  anotherUserProfile: {},
}

const getters = {
  getUserInfo: (state) => {
    return state.user;
  },
  getUserVacancyRepliedList: (state) => {
    return state.vacancyRepliedList;
  },
  getUserCVList: (state) => {
    return state.cvList;
  },
  is_lockSidebar: (state) => {
    return state.user ? state.lockSidebar : false;
  },
  subscriptionStatus_get: (state) => {
    return (state.subscriptionStatus === 'active')
  },
  isFirstVisit_get: (state) => {
    return state.isFirstVisit;
  },
  showAttention_get: (state) => {
    return state.showAttention;
  },
  showAttentionReason_get: (state) => {
    return state.showAttentionReason;
  },
  showPrices_get: (state) => {
    return state.showPrices;
  },
  subscriptionOptions_get: (state) => {
    return state.subscriptionOptions;
  },
  subscriptionPrice_get: (state) => {
    return state.subscriptionPrice;
  },
  userProfile_get: (state) => {
    return state.userProfile;
  },
  jobList_get: (state) => {
    return state.jobList;
  },
  toolsType_get: (state) => {
    return state.toolsType;
  },
  usersProfile_get: (state) => {
    return state.usersProfile;
  },
  functionsList_get: (state) => {
    return state.functionsList;
  },
  industriesList_get: (state) => {
    return state.industriesList;
  },
  userProfileUrl_get: (state) => {
    return state.userProfileUrl;
  },
  anotherUserProfile_get: (state) => {
    return state.anotherUserProfile;
  },
};

const mutations = {
  setUserInfo: (state, { payload }) => {
    state.user = payload;
    state.subscriptionStatus = payload.subscriptionStatus;
    if (payload.subscriptionStatus === 'active') {
      state.subscriptionOptions = payload.subscriptionOptions.map(el => el.name);
      state.subscriptionPrice = payload.subscriptionPrice;
    }
    if (payload.profile) state.userProfileUrl = payload.profile.url
  },
  setUserVacancyRepliedList: (state, { payload }) => {
    state.vacancyRepliedList = payload;
  },
  setUserCVList: (state, { payload }) => {
    state.cvList = payload;
  },

  lockSidebar_set: (state, { payload }) => {
    state.lockSidebar = payload;
  },
  subscriptionStatus_set: (state, { payload }) => {
    state.subscriptionStatus = payload;
  },
  firstVisit_set: (state, { payload }) => {
    state.isFirstVisit = payload;
  },
  showAttention_set: (state, { payload }) => {
    state.showAttention = payload;
  },
  showAttentionReason_set: (state, { payload }) => {
    state.showAttentionReason = payload;
  },
  showPrices_set: (state, { payload }) => {
    state.showPrices = payload;
  },
  userProfile_set: (state, { payload }) => {
    state.userProfile = payload;
  },
  jobList_set: (state, { payload }) => {
    state.jobList = payload;
  },
  toolsType_set: (state, { payload }) => {
    state.toolsType = payload;
  },
  usersProfile_set: (state, { payload }) => {
    state.usersProfile = payload;
  },
  functionsList_set: (state, { payload }) => {
    state.functionsList = payload;
  },
  industriesList_set: (state, { payload }) => {
    state.industriesList = payload;
  },
  anotherUserProfile_set: (state, { payload }) => {
    state.anotherUserProfile = payload;
  },
};

const actions = {
  refreshUserInfo: async ({ state, commit, dispatch, getters, rootGetters }) => {
    const userInfo = await userInfoApi.getUserInfo();
    if (userInfo) {
      commit('setUserInfo', { payload: userInfo });
      if (userInfo.profile) {
        dispatch('getUserProfile', { payload: userInfo.profile.url })
      }
      return userInfo;
    } else {
      commit('setUserInfo', { payload: { } });
      commit('userProfile_set', { payload: {} })
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-permissions');
      localStorage.removeItem('user-role');
      window.history.go()
    }

  },
  refreshUserVacancyList: async ({ state, commit, dispatch, getters, rootGetters }) => {
    const vacancyListReply = await userInfoApi.getUserVacancyReplyList();
    const cvList = await userInfoApi.getUserCVList();

    if (vacancyListReply) commit('setUserVacancyRepliedList', { payload: vacancyListReply })
    if (cvList) commit('setUserCVList', { payload: cvList })
  },
  updateUserInfo: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    const { data } = payload;
    const newInfo = await userInfoApi.updateUserInfo({ data });
    if (!state.user.profile) {
      await userInfoApi.createUserProfile({ data })
                       .then(async res => {
                         if (res) {
                           await dispatch('refreshUserInfo');
                         }
                       })
    } else if ( data.url || data.telegram ) {
      await dispatch('updateUserProfile', { payload: { data: { url: data.url, telegram: data.telegram }  }})
            .then(async res => {
              if (res) await dispatch('refreshUserInfo');
            })
    }
  },
  changeUserAvatar: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    const { file } = payload;
    return userInfoApi.userChangeAvatar({ file });
  },
  changeUserPass: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    const { data } = payload;
    const result = await userInfoApi.userChangePass({ data });
    return result;
  },
  generateUserPass: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    const { data } = payload;
    const result = await userInfoApi.userGeneratePass({ data });
    return result;
  },
  cancelSubscription: async ({ state, commit, dispatch, getters, rootGetters }) => {
    const result = await userInfoApi.cancelSubscription();
    if (result) dispatch('refreshUserInfo');
    return result;
  },
  makeSidebarLocked: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    commit('lockSidebar_set', { payload: payload })
    return;
  },
  showOnboarding: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    console.log('1', payload)
    commit('firstVisit_set', { payload: payload })
    return;
  },
  showAttention: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    commit('showAttention_set', { payload: payload })
    return;
  },
  showReason: async ({ state, commit, dispatch, getters, rootGetters }, {payload}) => {
    commit('showAttentionReason_set', { payload: payload })
    return;
  },
  showPrices: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const {
      isShow,
      type
    } = payload;
    console.log(type)
    commit('showPrices_set', { payload: isShow })
    if (type) commit('toolsType_set', { payload: type })
    return;
  },
  checkUrlAvailability: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const result = await userInfoApi.checkUrlAvailability({ urlName: payload })
    return result;
  },
  getUserProfile: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const result = await userInfoApi.readUserProfile({ urlName: payload })
    if (result.profile.url === state.userProfileUrl) {
      commit('userProfile_set', { payload: result.profile })
      const jobs = await userInfoApi.readAllUserJob()
      commit('jobList_set', { payload: jobs } )
      return result;
    } else if (result) commit('anotherUserProfile_set', { payload: result.profile })

    return result;
  },
  updateUserProfile: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const {
      data
    } = payload;
    console.log(payload)
    const result = await userInfoApi.updateUserProfile({ data })

    return result;
  },
  createNewJob: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const {
      data
    } = payload;
    const result = await userInfoApi.createNewJob({ data })

    return result;
  },

  readUserJob: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const result = await userInfoApi.readUserJob({ id: payload })

    return result;
  },

  updateJob: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const {
      data,
      id
    } = payload;
    const result = await userInfoApi.updateUserJob({ data, id })

    return result;
  },

  deleteJob: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const {
      id
    } = payload;
    const result = await userInfoApi.deleteUserJob({ id })

    return result;
  },

  changePersonalImage: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { file } = payload;
    console.log('2')
    return await userInfoApi.userChangePersonalImage({ file });
  },
  updateJobList: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    commit('jobList_set', { payload: payload })
    const list = payload.map((el, index) => {
        const data = {
          order: index,
          id: el.id
        }
        return data;
      })
      console.log(list)
      await userInfoApi.updateJobAll({ list });
  },

  readAllProfile: async ({ state, commit, dispatch, getters, rootGetters }) => {
    const result = await userInfoApi.readAllUserProfile()
    commit('usersProfile_set', { payload: result.profile })
    await dispatch('dataCreate');
    return result;
  },
  dataCreate: async ({ state, commit, dispatch, getters, rootGetters }) => {
    await dispatch('careerMapConfig/refreshFunctionList',  null, { root: true })
    await dispatch('careerMapConfig/refreshIndustryList',  null, { root: true })
      const userList = state.usersProfile;
      let functionSet = userList.reduce(
        function(accumulator, currentValue) {
          if (currentValue.functions) {
            currentValue.functions.forEach( el => {
              accumulator.add(el.id);
            })
          }
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
      commit("functionsList_set", {payload: finalFunctionList});

      let industrySet = userList.reduce(
        function(accumulator, currentValue) {
          if (currentValue.industry) {
            currentValue.industry.forEach( el => {
              accumulator.add(el.id);
            })
          }
          return accumulator;
        },
        new Set()
      );
      console.log(industrySet)
      let industryArray = [...industrySet];
      let industryList = rootGetters['careerMapConfig/industryList_get']
      const finalIndustryList = industryList.filter(el => {
        if (industryArray.some(id => id === el.id)) {
          return {
            name: el.name,
            id: el.id
          }
        }
      })
      commit("industriesList_set", {payload: finalIndustryList});
      return true;
  },

  getFilteredProfiles: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { selected } = payload;
    let result;
    if (selected !== null) {
      result  = await userInfoApi.usersProfileGetFiltered({ data: selected });
      commit('usersProfile_set', { payload: result.result.profileList })
      if (result.message) {
        return result.message;
      }
    } else {
      await dispatch('readAllProfile');
    }
    return true;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
