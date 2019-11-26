<template>
  <svg :width="width" :height="height" class='carrer-track' >
    <path v-for="(path, index) in positionsPath" :d="path.d" stroke='#009954' stroke-width="1"
    :class='{
      "hover-circle" : path.type == "hover_horiz",
      "hover-up-circle" : path.type == "hover_up",
    }'/>
    <circle cx="13" :cy="height - (50 * index) - 13" r="12.5" stroke-width="1"
            v-for='(position, index) in historyPositions'
            class='simple-circle'
            @click = "$emit('backToPosition', {payload: { position}})"
            :class='{
              "last-circle" : position.type == "last",
              "hover-circle" : position.type == "hover_horiz",
              "hover-up-circle" : position.type == "hover_up",
            }'/>
    <text   x="40"
            :y="height / historyPositions.length * (historyPositions.length - index) - 13"
            v-for='(position, index) in historyPositions'
            @click = "$emit('backToPosition', {payload: { position}})"
            :class='{
              "last-text" : position.type == "last",
              "hover-text" : position.type == "hover_horiz",
              "hover-up-text" : position.type == "hover_up",
            }'>
        <tspan x="40"
               :y="height - (50 * index) - 13 - 2"
               class='simple-function-title'>
                    {{ getFunction(position.subfunction_id) }}
        </tspan>
        <tspan x="40"
               :y="height - (50 * index) - 2"
                class='simple-position-title'>
                    {{ position.title }}
        </tspan>
    </text>



  </svg>
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
    getFunction(subfunction_id) {
      const subfunction = this.subfunctionList.find(el => el.id === subfunction_id);
      const functionTitle = this.functionList.find( el => el.id === subfunction.function_id);

      return `${functionTitle.name}, ${subfunction.name} `
    }
  },
  computed: {
    positionsPath(){
      const path = [];
      for (let i = 0; i < this.historyPositions.length; i++ ) {
        path.push({
          d:`M 13 ${this.height - (50 * i) - 13} A 0 0 0 0 0 13 ${this.height - (50 * (i - 1)) - 13}`,
          type: this.historyPositions[i].type
        })
      }
      return path;
    }
  },
  props: ['height',
          'width',
          'positionOnHover',
          'historyPositions',
          'amountOfLevels',
          'subfunctionList',
          'functionList'
        ],
  mounted() {
  },
  beforeUpdate() {
    if (this.positionOnHover) {

    }
  }
};
</script>

<style>

.simple-circle {
  fill:#ffffff;
  stroke: #009954
}

.last-circle {
  fill:#009954;
}

.hover-circle {
  stroke-dasharray: 4;
}

.simple-function-title, .simple-position-title{
  fill: #9D9D9D
}

.simple-position-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
}

.last-text .simple-position-title{
  fill: #009954;
}

.last-text .simple-function-title {

  fill: #000000;
}

.hover-text .simple-position-title{
  fill:#009954;
}

.hover-up-text .simple-position-title{
  fill: #E85218;
}

.hover-up-text .simple-function-title{
  fill: #000000;
}

.hover-up-circle {
  stroke: #E85218;
  stroke-dasharray: 4;
}

.simple-function-title {
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  text-transform: capitalize;
}

</style>
