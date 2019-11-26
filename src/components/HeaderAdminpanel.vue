<template>
  <v-toolbar class='adminpanel-navigation' height='30px'>
    <v-toolbar-title>Панель администратора:</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-for='route in getRoutes'>
      <router-link :to="route" class="link"> {{ getPathName(route)}}</router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  computed: {
    getRoutes(){
      return JSON.parse(localStorage.getItem("user-permissions"));
    },
  },
  methods: {
    getPathName(path) {
      if (path === '/adminpanel/vacancy-editor') return;
      return this.$router.options.routes.find(el => {
        if (el) {
          if (el.path === path) return el;
        }
      }).name
    }
  }
}

</script>

<style>
  .adminpanel-navigation .link {
    text-align: center;
    margin: auto;
    padding-left: 20px;
    font-size: 14px;
    color: #009654;
  }

</style>
