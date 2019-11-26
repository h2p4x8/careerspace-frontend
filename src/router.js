import Vue from "vue";
import Router from "vue-router";
import store from './store/store';
import Home from "./views/Home.vue";
import JobsFlow from './views/JobsFlow.vue'
import JobDescription from './views/JobDescription.vue';
import CareerMap from './views/CareerMap.vue';
import UserPage from './views/UserPage.vue';
import TariffsPage from './views/TariffsPage.vue';
import ResumeTool from './views/ResumeTool.vue';
import CareerMapNew from './views/NewCareerMap.vue';
import AuthPage from './views/AuthPage.vue'
import UserCareerMaterails from './views/CareerMaterails.vue'
import UserProfile from './views/UserProfile.vue'
import Network from './views/Network.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/jobs",
      name: "JobsFlow",
      component: JobsFlow,
      props: true
    },
    {
      path: "/job/:id",
      name: "Jobs Desc",
      component: JobDescription,
      props: true
    },
    {
      path: "/map",
      name: "CareerMap",
      component: CareerMapNew,
      props: true
    },
    {
      path: "/pricing",
      name: "TariffsPage",
      component: TariffsPage,
      props: true
    },
    {
      path: "/cv",
      name: "ResumeTool",
      component: ResumeTool,
      props: true
    },
    {
      path: "/auth",
      name: "AuthPage",
      component: AuthPage,
      props: true
    },
    {
      path: "/career-materals",
      name: "UserCareerMaterails",
      component: UserCareerMaterails,
      props: true
    },
    {
      path: "/@:profileUrl",
      name: "UserProfile",
      component: UserProfile,
      props: true
    },
    {
      path: "/network",
      name: "Network",
      component: Network,
      props: true
    },
    /*{
      path:'/new-map',
      name: 'NewCareerMap',
      component: CareerMapNew,
      props: true
    }*/
    {
       path: '*',
       redirect: '/'
     }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    if (store.getters['Auth/isAuthenticated']) {
      next({ name: 'JobsFlow' })
      return;
    }
  }
  if (to.name === 'CareerMap'||to.name === 'ResumeTool'||to.name === 'Job Desc'||to.name === 'UserCareerMaterails') {
    if (!store.getters['Auth/isAuthenticated']) {
      next({ name: 'AuthPage', query: { type: 'login' } })
      return;
    }
  }
  next();
});

export default router;
