<template>
  <div class='inner-container-map' ref='inner'>
  <svg :width="width" :height="height" class='carrer-map-main' >

    <circle :cx="circle.cx" :cy="circle.cy" :r="circle.r" :stroke="circle.stroke" stroke-width="1" fill="none"
            v-for='circle in circles' />


    <line :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" :stroke="line.stroke"
            v-for='line in lines'/>
    <path v-for="link in historyLinks" :d="link.d" fill="none"

          stroke-width="2"
          :class='{
            "up-line": link.type === "up",
            "horiz-line": link.type === "horiz"
          }'/>
    <path v-for="link in linksArcOnHover" :d="link.d" fill="none"
                stroke-dasharray='4'
                stroke-width="2"
                :class='{
                "up-line": link.type === "up",
                "horiz-line": link.type === "horiz"
          }'/>
    <circle :cx="position.cx" :cy="position.cy"
            :r="position.r"
            v-for='position in positions'

            class='simple-position'
            id='wrap'
            :class="{
              'up-position' : positionOnHover ? filteredPositionsUpOnHover.find(el => el.id === position.id) : filteredPositionsUpOnPosSelected.find(el => el.id === position.id),
              'horiz-position':  positionOnHover ? filteredPositionsHorizOnHover.find(el => el.id === position.id) : filteredPositionsHorizOnPosSelected.find(el => el.id === position.id),
              'disabled-position' : positionOnHover ? filteredPositionsDisabledOnHover.find(el => el.id === position.id) : filteredPositionsDisabledOnPosSelected.find(el => el.id === position.id),
              'selected-position' : selectedPosition ? selectedPosition.id === position.id : false,
              'hover-position': positionOnHover ? positionOnHover.id === position.id : false,
              'up-hover-position' : filteredPositionsUpOnPosSelected.find(el => el.id === position.id),
              'disabled-hover-position': historyPositions.find(el => el.id === position.id) ? false : filteredPositionsDisabledOnPosSelected.find(el => el.id === position.id),
              'history-position' : historyPositions.find(el => el.id === position.id),
              'no-display': positionsNoDisplayOnHover.find(el => el.id === position.id) || positionsNoDisplay.find(el => el.id === position.id),
              'blur': positionsOnBlurHover.find(el => el.id === position.id) || positionsOnBlurSelect.find(el => el.id === position.id),
            }"/>
      <path v-for="(path, index) in subfunctionTitlesPath" :d="path.d"
        :id='index+"-path"'/>
     <text v-for='(path, index) in subfunctionTitlesPath' text-anchor="middle" class='subfunctionTitle'>
       <textPath :href='"#"+index+"-path"' startOffset="50%">
         {{ path.title }}
       </textPath>
     </text>

     <foreignObject :x="position.cx - (position.r*0.9)"
                    :y="position.cy - (position.r*0.9)"
                    :width="position.r*1.8"
                    :height="position.r*1.8"
                    v-for='position in positions'
                    @click="$emit('selectedPosition', {payload: {position: position}})"
                    @mouseover="$emit('mouseOverPosition', {payload: {position: position}})"
                    @mouseout="$emit('mouseOutPosition')"
                    class='simple-text'
                    :class="{
                      'up-text' : positionOnHover ? filteredPositionsUpOnHover.find(el => el.id === position.id) : filteredPositionsUpOnPosSelected.find(el => el.id === position.id),
                      'horiz-text':  positionOnHover ? filteredPositionsHorizOnHover.find(el => el.id === position.id) : filteredPositionsHorizOnPosSelected.find(el => el.id === position.id),
                      'disabled-text  ' : positionOnHover ? filteredPositionsDisabledOnHover.find(el => el.id === position.id) : filteredPositionsDisabledOnPosSelected.find(el => el.id === position.id),
                      'selected-text' : selectedPosition ? selectedPosition.id === position.id : false,
                      'hover-text' : positionOnHover ? positionOnHover.id === position.id : false,
                      'history-text' : historyPositions.find(el => el.id === position.id),
                      'no-display': positionsNoDisplayOnHover.find(el => el.id === position.id) || positionsNoDisplay.find(el => el.id === position.id),

                    }">
      <div xmlns="http://www.w3.org/1999/xhtml">
          <div>
           <p>{{ position.title }}</p>
          </div>
      </div>
     </foreignObject>


    <!--<text :x="position.cx"
          :y="position.cy"
          text-anchor="middle"
          v-for='position in positions'
          alignment-baseline="central"
          class='simple-text'
          :class="{
            'up-text' : positionOnHover ? filteredPositionsUpOnHover.find(el => el.id === position.id) : filteredPositionsUpOnPosSelected.find(el => el.id === position.id),
            'horiz-text':  positionOnHover ? filteredPositionsHorizOnHover.find(el => el.id === position.id) : filteredPositionsHorizOnPosSelected.find(el => el.id === position.id),
            'disabled-text  ' : positionOnHover ? filteredPositionsDisabledOnHover.find(el => el.id === position.id) : filteredPositionsDisabledOnPosSelected.find(el => el.id === position.id),
            'selected-text' : selectedPosition ? selectedPosition.id === position.id : false,
            'hover-text' : positionOnHover ? positionOnHover.id === position.id : false,
            'history-text' : historyPositions.find(el => el.id === position.id),
            'no-display': positionsNoDisplayOnHover.find(el => el.id === position.id) || positionsNoDisplay.find(el => el.id === position.id)
          }">
      {{ position.title }}
    </text>-->
   Sorry, your browser does not support inline SVG.
  </svg>
  </div>
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
    getMargin(title) {
      const titleArray = title.split(' ');
      //console.log(title);

      if (title.length >= 23) {
        console.log(title.match(/\s/g))
        if (title.match(/\s/g).length > 3) {
          return {"margin-top": "37%"}
        }
        return {"margin-top": "30%"}
      }
      if (titleArray.length === 1 ) return {"margin-top": "45%"}
      if (title.length <= 14) return {"margin-top": "40%"}
      return {"margin-top": "35%"}
      /*} else if (titleArray.length >= 3) {
        return {"margin-top": "0"}
      } else return {"margin-top": "12%"}*/
    }
  },
  computed: {
    isUpHorizon() {

    }
  },
  props: ['height',
          'width',
          'circles',
          'lines',
          'positions',
          'filteredPositionsUpOnHover',
          'filteredPositionsHorizOnHover',
          'filteredPositionsDisabledOnHover',
          'selectedPosition',
          'filteredPositionsUpOnPosSelected',
          'filteredPositionsHorizOnPosSelected',
          'filteredPositionsDisabledOnPosSelected',
          'positionOnHover',
          'linksArcOnHover',
          'linkLinesOnHover',
          'historyLinks',
          'historyPositions',
          'positionSelected',
          'subfunctionTitlesPath',
          'positionsNoDisplayOnHover',
          'positionsNoDisplay',
          'positionsOnBlurHover',
          'positionsOnBlurSelect'
        ],
  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      console.log('scroooll')
      this.$refs.inner.scrollLeft = document.documentElement.clientWidth / 2.8;
    }
  }
};
</script>

<style>
.carrer-map-main {
  margin-top: 30px;
}

.carrer-map-main .simple-position {
  fill: #ffffff;
  stroke: #00A7F2;
  stroke-width: 1;
  cursor: pointer;
}

.carrer-map-main .blur {
  backdrop-filter: alpha;
  opacity: 0.8;
}


.carrer-map-main .simple-text {
  color: #00A7F2;
  font-weight: 600;
  font-size: 7px;
  line-height: 10px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
}

.carrer-map-main .simple-text div {
  display: table;
  width: 100%;
  height: 100%;
}

.carrer-map-main .simple-text p {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.carrer-map-main .simple-position.hover-position {
  fill: #009954;
  stroke:#009954;
  stroke-width: 1;
}

.carrer-map-main .horiz-position {
  stroke: #009954;
}

.carrer-map-main .horiz-text {
  color: #009954;
}

.carrer-map-main .up-text {
  color: #E85218;
}

.carrer-map-main .up-position {
  stroke: #E85218;
}

.carrer-map-main .disabled-position {
  fill: #EFEFEF;
  stroke: #9D9D9D;
}

.carrer-map-main .disabled-text {
  color: #9D9D9D;
}

.carrer-map-main .selected-position, .carrer-map-main .history-position{
  fill: #009954;
  stroke:#009954;
  stroke-width: 1;
}

.carrer-map-main .selected-text {
  color: #FFFFFF;
}

.carrer-map-main .up-hover-position.hover-position {
  fill: #E85218;
  stroke: #E85218;
}

.carrer-map-main .hover-text {
  color: #FFFFFF
}

.carrer-map-main .disabled-hover-position.hover-position {
  fill: #EFEFEF;
  stroke: #9D9D9D;
}

.carrer-map-main .up-line {
  stroke: #E85218;
}

.carrer-map-main .horiz-line {
  stroke: #009954;
}

.carrer-map-main .history-text {
  color: #FFFFFF;
}

.carrer-map-main .subfunctionTitle {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  fill: #9D9D9D
}

.carrer-map-main .no-display {
  display: none;
}

</style>
