import Vue from 'vue';
import Vuex from 'vuex';
import VacancyFlow from './modules/VacancyFlow/VacancyFlow';
import Auth from './modules/Auth/Auth';
import VacancyCreator from './modules/Vacancy-adminpanel/VacancyCreator.js';
import careerMapConfig from './modules/careerMapConfig/index';
import careerMap from './modules/careerMap/index';
import UserPage from './modules/UserPage/UserPage';
import UserRole from './modules/UserRoleAdminpanel/UserRole'
import UserEditor from './modules/UserAdminpanel/UsersEditor';
import CompanyEditor from './modules/CompanyAdminpanel/CompanyEditor'
import Chekout from './modules/Checkout/Checkout';
import CVEditor from './modules/CV-editor/CV-editor';
import CareerMapNew from './modules/careerMapNew/index';
import CareerMaterials from './modules/CareerMaterials-adminpanel/CareerMaterials';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    VacancyFlow,
    Auth,
    VacancyCreator,
    careerMapConfig,
    careerMap,
    UserPage,
    UserRole,
    UserEditor,
    CompanyEditor,
    Chekout,
    CVEditor,
    CareerMapNew,
    CareerMaterials
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
