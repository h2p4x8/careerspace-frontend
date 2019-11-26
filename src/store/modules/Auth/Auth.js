import authApi from './authApi'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  //permissions: JSON.parse(localStorage.getItem('user-permissions')) || [],
}


const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  userPermissions_get: state => state.permissions
};

const mutations = {
  auth_success: (state, { payload }) => {
    state.status = "success";
    state.token = payload
  },

  auth_logout: (state) => {
    state.status = '';
    state.token = localStorage.getItem('user-token') || '';
  },

  userPermissions_set: (state, { payload }) => {
    state.permissions = payload;
  },
};

const actions = {
  async userRegister ({ state, commit }, { payload }) {
    const { data } = payload;
    const result = await authApi.userRegister({ data });
    console.log(result)
    if (!result) {
      console.log('error registration');
      return false;
    }
    console.log('1 ', result)
    localStorage.setItem('user-token', result.id);
    commit('auth_success', {payload: result.id})
    return true;

  },

  async userLogin ({ state, dispatch, commit, getters, rootGetters }, { payload }) {
    const { data } = payload;
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!pattern.test(data.email)) return false;
    const result = await authApi.userLogin({ data });

    if (!result) {
      console.log('error login');
      return false;
    }

    localStorage.setItem('user-token', result.id);
    localStorage.setItem('user-role', result.role);
    commit('auth_success', {payload: result.id});
    let userRole;

    if (result.role) {
      userRole = await dispatch('UserRole/userRoleGetById', { id: result.role }, { root: true });
      commit('userPermissions_set', {payload: userRole.permissionList});
      localStorage.setItem('user-permissions', JSON.stringify(userRole.permissionList)  );
    }

    return true;
  },

  async userLogout({ state, commit }) {
    const result = await authApi.userLogout();

    if (result) {
      commit('auth_logout')
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-permissions');
      localStorage.removeItem('user-role');
      return true;
    } else {
      console.log('error logout');
      return false;
    }
  },

  async registerByEmail({ state, commit, dispatch }, { payload }) {

    const {
      email
    } = payload;
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!pattern.test(email)) return false;
    const googlePattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@gmail.com$/
    if (googlePattern.test(email)&&email !== 'admin@gmail.com') {
      window.open('api/google-auth', "_self");
      return;
    }
    const result = await authApi.userRegisterByEmail({ email: email });

    if (result) return result.message;
    else return false;
  },

  async authByGoogle({ state, commit, dispatch, getters, rootGetters }) {
    const user = await dispatch('UserPage/refreshUserInfo', null, { root: true });
    console.log('user', user)
    if (user) {
      localStorage.setItem('user-token', user.id);
      commit('auth_success', {payload: user.id});
      return true;
    } else return false;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
