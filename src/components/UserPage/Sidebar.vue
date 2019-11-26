<template>
    <v-container sidebar
    :sidebar-flow='flowSidebar'>
      <v-layout wrap row>
        <v-flex xs12>
        <v-layout row wrap personal-info @click='$router.push({ name: "UserProfile", params: { profileUrl: userUrl } })'>
          <v-flex shrink>
            <v-avatar class='avatar' size='50'>
            <v-img :src="avatar||require('@/assets/Ellipse.png')"></v-img>
            </v-avatar>
          </v-flex>
          <v-flex grow align-self-center name-box>
            {{ userName }}
          </v-flex>
          <v-flex shrink  align-self-center show-sidebar-icon @click.stop='$emit("flow")' v-if='lockSidebar'>
            <v-icon :size='$vuetify.breakpoint.mdAndUp ? "26px" : "35px"'>
              mdi-chevron-double-left
            </v-icon>
          </v-flex>
        </v-layout>
        </v-flex>
        <v-flex xs12 v-for='link in navLinks' action-box @click='$emit("makeAction", link.action)' :class='{"active": $route.name === link.action}'>
          {{ link.title }}
        </v-flex>
        <v-flex xs12 action-box @click='$emit("showTools")' style='margin-top: 60px'>
          Настройки
        </v-flex>
        <v-flex xs12 action-box @click='openLink()'>
          Поддержка
        </v-flex>
        <v-spacer>
        </v-spacer>
      </v-layout>

    </v-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      navLinks: [
          {
            title: "Вакансии",
            action: "JobsFlow"
          },
          {
           title: 'Нетворк',
           action: 'Network'
          },
          {
           title: 'Карта',
           action: 'CareerMap'
          },
          {
            title: "Резюме",
            action: 'ResumeTool'
          },
          {
           title: 'Видео',
           action: 'UserCareerMaterails'
          },
        ],
      dialog: false,
      sidebarFull: true,
    }
  },
  components: {
  },
  methods: {
    openLink(){
      window.open("https://t.me/CareerspaceSupportBot", "_blank")
    },
  },
  computed: {

  },
  props: ['lockSidebar', 'id', 'flowSidebar', 'userName', 'avatar', 'userUrl' ],
  beforeMount() {

  }
};
</script>
