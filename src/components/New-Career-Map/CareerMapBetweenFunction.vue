<template>
  <v-layout row wrap positions-to>
    <div class='track-title' v-if='positions.length > 0'>Как сменить функцию</div>
    <v-flex xs12 v-for='pos in positions' position-box @click='$emit("changeFunction", pos.id)'>
      <v-layout row wrap>
        <v-flex shrink align-self-center>
          <div class ='circle' :class='{ "up" : pos.type === "up", "horiz" : pos.type === "horiz" }'>
          </div>
        </v-flex>
        <v-flex grow>
          <v-layout column>
            <v-flex function-title>
              {{ pos.function }}, {{ pos.subfunction }}
            </v-flex>
            <v-flex position-title :class='{ "up" : pos.type === "up", "horiz" : pos.type === "horiz" }'>
              {{ pos.name }}
            </v-flex>
          </v-layout>
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
    };
  },
  components: {

  },
  methods: {
    
  },
  computed: {
    positions(){
      return this.positionsToOnHover.length > 0 ? this.positionsToOnHover : this.positionsToOnSelect
    }
  },
  props: [
          'positionsToOnHover',
          'positionsToOnSelect',
        ],
  mounted() {
  },
  updated(){

  }
};
</script>

<style>
.text-position {
  font-weight: 500;
  font-size: 8px;
  line-height: 14px;
  text-transform: uppercase;
  fill: #009954;
  cursor: pointer;
}

.up {
  stroke: #E85218
}
.horiz {
  stroke: #009954
}

.up-text {
  fill: #E85218
}
.horiz-text {
  fill: #009954
}

.text-function {
  font-weight: 600;
  font-size: 8px;
  line-height: 14px;
  fill: #9D9D9D;
  text-transform: uppercase;
  font-weigth: 400;
}

</style>
