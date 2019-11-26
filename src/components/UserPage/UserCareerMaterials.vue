<template>
  <v-layout column career-materials align-space-around>
    <v-flex xs11 materials-box offset-xs1 v-if='subscriptionStatus_get&&subscriptionOptions_get.some(el => el === "webinars")'>
      <v-layout row wrap material-box v-for='el in materialsList_get'>
        <v-flex xs12 material-title>
          {{ el.name }}
        </v-flex>
        <v-flex xs12>
          <iframe :src='el.link' :height='$vuetify.breakpoint.mdAndUp ? "337" : "200"' :width='$vuetify.breakpoint.mdAndUp ? "599" : "350"' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs11 materials-box offset-xs1 v-else>
      <v-layout row wrap material-box>
        <v-flex xs12 material-title>
          Как найти работу
        </v-flex>
        <v-flex xs12 video-box>
          <v-img :src="require('@/assets/screenshot1.png')" :height='$vuetify.breakpoint.mdAndUp ? "337" : "200"' :width='$vuetify.breakpoint.mdAndUp ? "599" : "350"'>
          </v-img>
        </v-flex>
        <v-flex xs12 material-title>
          Как пройти интервью
        </v-flex>
        <v-flex xs12 video-box>
          <v-img :src="require('@/assets/screenshot2.png')" :height='$vuetify.breakpoint.mdAndUp ? "337" : "200"' :width='$vuetify.breakpoint.mdAndUp ? "599" : "350"'>
          </v-img>
        </v-flex>
        <v-flex xs12 material-title>
          Как спланировать карьеру
        </v-flex>
        <v-flex xs12 video-box>
          <v-img :src="require('@/assets/screenshot3.png')" :height='$vuetify.breakpoint.mdAndUp ? "337" : "200"' :width='$vuetify.breakpoint.mdAndUp ? "599" : "350"'>
          </v-img>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapActions, mapGetters } from "vuex";


export default {
  data() {
    return {

    }
  },
  components: {

  },
  computed: {
    ...mapGetters('CareerMaterials', [
      'materialsList_get',
    ]),
    ...mapGetters("UserPage", [
      'subscriptionStatus_get',
      'subscriptionOptions_get',
    ]),
  },
  methods: {
    ...mapActions('CareerMaterials', [
      'careerMaterialsGetAll',
    ])
  },
  async beforeMount(){
    this.careerMaterialsGetAll()
  }
}
</script>

<style>
  .material-box .button {
    width: 100%
  }

  .career-materials .materials-box {
    margin-top: 0;
  }

  .career-materials {
    margin-top: 55px;
  }

  .video-box {
    margin-bottom: 50px;
  }
</style>
