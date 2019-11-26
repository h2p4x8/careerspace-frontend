<template >
      <v-flex sm12 lg12 jobCard_CareerMap>
        <v-card class='job-card'>
          <v-layout row wrap @click="openJobDescription(job)">
            <v-flex lg12>
              <v-card-title class='position-title'>
                <h4 class="jobCard_title_careerMap">{{job.positionName}}</h4>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3>
              <v-card-text class='other-info'>
                <h5 class="jobCard_text_careerMap">{{job.companyName.name}}</h5>
              </v-card-text>
            </v-flex>
            <v-flex xs6 text-xs-center>
              <v-card-text class='other-info'>
                <h5 class="jobCard_text_careerMap">
                  {{job.salaryFrom.toLocaleString('ru-RU')}} – {{job.salaryTo.toLocaleString('ru-RU')}}
                </h5>
              </v-card-text>
            </v-flex>
            <v-flex xs3 text-xs-right>
              <v-card-text class='other-info'>
                <h5 class="jobCard_text_careerMap">
                  {{ job.city }}
                </h5>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
</template>

<script>
export default {
  name: "jobCard",
  data () {
      return {

      }
  },
  props: {
    job: Object
  },
  methods: {
    openJobDescription: function(job) {
      console.log(job.id);
      this.$router.push({ path: `/job/${job.id}` });
    },
    getDate(date) {
      const pubDate = new Date(date).getDate(),
            now = new Date().getDate();

      const diff = now - pubDate;
      if (diff <= 1) return 'сегодня';
      if (diff >= 1 && diff < 14) return `${diff} дней назад`;
      if (diff >= 14) return `больше недели назад`;
    }
  },

};
</script>

<style>
  .job-card div {
    padding: 0
  }

  .job-card {
    padding: 20px 9px 21px 8px;
  }

  .job-card .position-title {
    margin-bottom: 21px;
  }

  .jobCard_title_careerMap {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
  }

  .jobCard_text_careerMap {
    font-size: 13px;
    line-height: 15px;
    font-weight: normal;
  }

  .jobCard_CareerMap {
    margin-bottom: 10px
  }
</style>
