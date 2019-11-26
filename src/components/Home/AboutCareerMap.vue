<template>
    <v-container about-section>
      <v-layout row wrap v-for='title in titles' actions>
        <v-flex offset-md2
                md8
                offset-xs1
                xs10 main-title
                text-xs-center
                v-html='title.title'>
        </v-flex>
        <v-flex md7 offset-xs0 offset-md2 xs12 align-self-center image-box text-xs-center>
            <v-img :src='require("@/assets/ResumeMockUp.png")'
                    v-if='title.mockup === "ResumeMockUp"'
                    aspect-ratio="1"
                    contain
                    :width='$vuetify.breakpoint.mdAndUp ? 951 : "100%"'
                    :height='$vuetify.breakpoint.mdAndUp ? 624 : 273'

                    ></v-img>
                <v-img :src='require("@/assets/CareerMap.png")'
                        aspect-ratio="1"
                        contain
                        v-if='title.mockup === "CareerMap"'
                        :width='$vuetify.breakpoint.mdAndUp ? 951 : "100%"'
                        :height='$vuetify.breakpoint.mdAndUp ? 624 : 273'
              ></v-img>
              <v-img :src='require("@/assets/Vacancies.png")'
                      aspect-ratio="1"
                      v-if='title.mockup === "Vacancies"'
                      contain
                      :width='$vuetify.breakpoint.mdAndUp ? 951 : "100%"'
                      :height='$vuetify.breakpoint.mdAndUp ? 624 : 273'
            ></v-img>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      titles: [
        {
          title: 'Узнавай о профессиях от людей, которые в них работают',
          mockup: 'CareerMap',
        },
        {
          title: 'Мониторь вакансии с прямыми контактами <br> в лучших компаниях',
          mockup: 'Vacancies',
        },
        {
          title: 'Найди работу с карьерным ростом в интересующей  функции',
          mockup: 'ResumeMockUp',
        }
      ],
    };
  },

  computed: {
    ...mapGetters("careerMapConfig", ["positionList_get"]),


  },
  methods: {
    ...mapActions("careerMap", ["selectedPosition_update"]),
    toCareerMapByPosition (){
      console.log('test: ', this.position);
      this.$router.push({path:`/career-map/${this.position.id}`});
    },

    show(action) {
      this.activeTitle = Object.assign({}, this.actions[action])
    },

    checkActive(title) {
      return title === this.activeTitle.title
    }
  },
  beforeMount(){
    this.activeTitle = Object.assign({}, this.actions.showMap);

  }
};
</script>

<style>

</style>
