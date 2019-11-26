<template>
  <v-card class='resume-card'>
    <v-layout row wrap fill-height>
      <v-flex resume-title xs12>
          <v-layout fill-height row wrap align-center>
            <v-flex>
              {{ cv.name }}
            </v-flex>
          </v-layout>
      </v-flex>
      <v-flex date-title xs12>
        Обновлено {{ daysLeft }} {{ declOfNum(daysLeft, ['день', 'дня', 'дней']) }} назад
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import translit from '../translit'

export default {
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },
  },
  mounted() {

  },
  props: ['cv'],
  computed: {
      daysLeft() {
        const lastDay = new Date(this.cv.updatedAt),
              now = new Date();
        var daysLag = Math.ceil(Math.abs(now.getTime() - lastDay.getTime()) / (1000 * 3600 * 24));
        return daysLag;
      }
  },

}
</script>

<style>

</style>
