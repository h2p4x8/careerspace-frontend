import userRoleApi from './userRoleApi'

const state = {
  userRoleList: [],
  permissionList: []
};

const getters = {
  userRoleList_get: (state) => {
    return state.userRoleList;
  },
};

const mutations = {
  userRoleList_set (state, { payload }) {
    state.userRoleList = payload;
  },
};

const actions = {
  userRoleListGetAll: async ({ state, commit }, payload) => {
    const userRoleList = await userRoleApi.objectListGetAll({ title: 'userRole' });

    if (userRoleList) commit('userRoleList_set', { payload: userRoleList })
    else console.log('failed')
  },
  newUserRoleCreate: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { data } = payload;
    return userRoleApi.objectCreate({ data, title: 'userRole' })
                      .then(newRole => {
                        if (newRole) return newRole;
                        else return false;
                      })
                      .catch(err => {
                        console.log(err);
                        return false;
                      });
  },
  userRoleUpdateById: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { id, data } = payload;
    return userRoleApi.objectUpdate({ id, data, title: 'userRole' })
                      .then(updatedRole => {
                        if (updatedRole) return updatedRole;
                        else return false;
                      })
                      .catch(err => {
                        console.log(err);
                        return false;
                      });
  },
  userRoleDeleteById: async ({ state, commit, dispatch, getters, rootGetters }, { payload }) => {
    const { id } = payload;
    return userRoleApi.objectDelete({ id, title: 'userRole' })
                    .then(deletedRole => {
                      if (deletedRole) return deletedRole;
                      else return false;
                    })
                    .catch(err => {
                      console.log(err);
                      return false;
                    });
  },
  userRoleGetById: async ({ state, commit }, payload) => {
    const { id } = payload;

    const userRole = await userRoleApi.objectListGetById({ title: 'userRole', id });

    if (userRole) return userRole;
    else console.log('failed')
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
