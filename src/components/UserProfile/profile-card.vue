<template >
        <v-card class='profile-card' @click='openProfile'>
          <v-layout row wrap>
            <v-flex xs4 profile-image text-xs-center>
                <v-avatar class='avatar is-image' :size='$vuetify.breakpoint.smAndDown ? "52" : "83"'>
                <v-img :src="profile.user.avatarUrl" ></v-img>
                </v-avatar>
            </v-flex>
            <v-flex xs7 align-self-center>
                <v-layout row wrap profile-info>
                  <v-flex xs12 profile-name>
                    {{ profile.user.fullName }}
                  </v-flex>
                  <v-flex xs12 profile-job v-for='job in profile.jobList.slice(0,3)'>
                    {{ getJobPosition(job) + ' в ' + getCompanyName(job) }}
                  </v-flex>
                </v-layout>
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
    profile: Object
  },
  methods: {
    openProfile() {
      this.$router.push({ name: `UserProfile`, params: { profileUrl: this.profile.url, name: `${this.profile.url}` } });
    },
    getJobPosition(job){
      return job.positionName.length > 13 ? job.positionName.slice(0, 13) + '...' : job.positionName
    },
    getCompanyName(job){
      return job.companyName.length > 13 ? job.companyName.slice(0, 13) + '...' : job.companyName
    }

  },
  computed: {

  },
  components: {
  }

};
</script>

<style>




</style>
