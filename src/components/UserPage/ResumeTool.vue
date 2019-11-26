<template>
  <v-layout wrap row user-resume v-if='Object.keys($route.query).length === 0'>
    <v-flex resume-card-box v-for='cv in getUserCVList' @click.stop='openResume(cv.id, cv.name)'>
      <ResumeCard :cv='cv'/>
      <v-btn class='button' block depressed color="#009654" dark @click.stop='openResumeInPdf(cv.cvFd)' v-if='$vuetify.breakpoint.smAndDown'>Скачать</v-btn>
    </v-flex>
    <v-flex resume-card-box @click='openResume("new", "Новое резюме")' text-xs-center v-if='$vuetify.breakpoint.mdAndUp'>
      <div class='new-resume-box'>
      <v-layout row wrap align-center style='height: -webkit-fill-available;'>
        <v-flex>
          Создать резюме
        </v-flex>
      </v-layout>
      </div>
    </v-flex>
    <v-flex v-if='$vuetify.breakpoint.smAndDown && getUserCVList.length === 0' xs8>
      <p>Зайди на сайт с ноутбука или со стационарного компьютера. С телефона редактировать резюме неудобно, мы пробовали.</p>
      <p>С телефона ты можешь скачать резюме, после того как создашь его.</p>
    </v-flex>
  </v-layout>
  <v-layout wrap row v-else>
    <v-flex xs12 v-if='(subscriptionStatus_get&&subscriptionOptions_get.some(el => el === "unlimitedResume"))||getUserCVList.length === 0||$route.query.id !== "new"'>
      <CVEditor :id='$route.query.id' @refresh='refreshUserVacancyList'/>
    </v-flex>
  </v-layout>
</template>

<script>
import ResumeCard from './ResumeCard.vue'
import CVEditor from '../CV_editor/CVEditor.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
    }
  },
  components: {
    ResumeCard,
    CVEditor
  },
  methods: {
    ...mapActions("UserPage", [
      "refreshUserVacancyList",
      'showAttention'
    ]),

    openResume(id, name) {
      if (this.$vuetify.breakpoint.smAndDown) return;
      if (id === 'new') {
        if ((this.subscriptionStatus_get&&this.subscriptionOptions_get.some(el => el === "unlimitedResume"))||this.getUserCVList.length === 0) {
          this.$router.push({ name: 'ResumeTool', query: { id }, params: { name } })
        } else {
          this.showAttention({ payload: true })
          return;
        }
      } else this.$router.push({ name: 'ResumeTool', query: { id }, params: { name } });

    },
    openResumeInPdf(src){
      window.open(src, "_blank")
    }
  },
  computed: {
    ...mapGetters("UserPage", [
      'getUserCVList',
      'subscriptionStatus_get',
      'subscriptionOptions_get'
    ]),
  },
  async beforeMount() {
    this.refreshUserVacancyList();
  },
  beforeDestroy(){
    this.showAttention({ payload: false })
  }

}
</script>
