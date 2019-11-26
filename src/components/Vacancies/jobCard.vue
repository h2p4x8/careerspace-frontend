<template >
        <v-card class='jobCard'>
          <v-layout row wrap to-fav align-center>
            <v-flex xs6 company-name>
              <h5 class="jobCard_text">{{job.companyName.name}}</h5>
            </v-flex>
            <v-flex xs6 text-xs-right>
              <v-card-text class='jobCard_date'>
                  <span>{{ getDate }}</span>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap @click="openJobDescription(job)" align-center justify-space-between jobDescription_info>
            <v-flex xs12 position-title>
              <v-card-title>
                <h4 class="jobCard_title">{{job.positionName}}</h4>
              </v-card-title>
            </v-flex>
            <v-flex xs12 salary-info>
              <v-card-text>
                {{ job.salaryInfo.toLowerCase() }}
              </v-card-text>
            </v-flex>
            <v-flex grow>
              <v-card-text>
                <h5 class="jobCard_text">
                  от {{job.salaryFrom.toLocaleString('ru-RU')}} до {{job.salaryTo.toLocaleString('ru-RU')}} <span v-if='$vuetify.breakpoint.mdAndUp'>₽/мес</span>
                </h5>
              </v-card-text>
            </v-flex>
            <v-flex shrink text-xs-right>
              <v-card-text>
                <h5 class="jobCard_text">
                  {{ job.city }}
                </h5>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
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
      console.log();
      this.$router.push({ name: `Jobs Desc`, params: { id: this.job.id_hash, name: `${this.job.positionName} в ${this.job.companyName.name}` } });
    },
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },

  },
  computed: {
    getDate() {
      const lastDay = new Date(this.job.createdAt),
            now = new Date();

      var daysLag = Math.ceil(Math.abs(now.getTime() - lastDay.getTime()) / (1000 * 3600 * 24));

      if (daysLag <= 1) return 'Сегодня';
      if (daysLag >= 1 && daysLag < 14) return `${daysLag} ${this.declOfNum(daysLag, ['день', 'дня', 'дней'])} назад`;
      if (daysLag >= 14 && daysLag < 28) return `Две недели назад`;
      if (daysLag >= 28 && daysLag < 35) return `Три недели назад`;
      if (daysLag >= 35) return `Четыре недели назад`;
    }
  },
  components: {
  }

};
</script>

<style>
.jobCard_text {
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
}

.jobCard {
  border-radius: 3px;
}

.jobCard:hover, .job-card:hover, .user-resume .resume-card:hover, .profile-card:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 3px;
}
</style>
