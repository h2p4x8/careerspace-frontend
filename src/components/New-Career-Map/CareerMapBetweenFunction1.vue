<template>
  <svg :width="width" :height="height" class='carrer-map-between' >
    <circle cx="50%" cy="50%" :r="raduis" :stroke="stroke" stroke-width="1" fill="none"
            />

    <path v-for='(line, index) in linesOnHover' :d="line.d" stroke-dasharray='2' stroke='#000000'
          :class='{
            "up": line.type === "up",
            "horiz": line.type === "horiz"
          }'/>
    <path v-for='(line, index) in linesOnSelect' :d="line.d" stroke='#000000' stroke-width="1"
        v-if='!positionHovered'
        :class='{
          "up": line.type === "up",
          "horiz": line.type === "horiz"
        }'/>

    <circle :cx="positions.cx" :cy="positions.cy" :r="positions.r" stroke-width="1" :fill="stroke"
            v-for='positions in positionsDefault'/>
    <path v-if='functionDefault' :d="functionDefault.d"
          id='functionDefault'/>
    <text v-if='functionDefault' text-anchor="middle"
          class='text-function'>
        <textPath href='#functionDefault' startOffset="50%">
            {{ functionDefault.title }}
        </textPath>
    </text>

    <circle :cx="positionHovered.cx" :cy="positionHovered.cy" :r="positionHovered.r" fill="#009954"
            v-if='positionHovered'
            />
    <circle :cx="positionSelected.cx" :cy="positionSelected.cy" :r="positionSelected.r" fill="#009954"
            v-if='!positionHovered && positionSelected'/>
    <!--<foreignObject :x="positionHovered.cx"
                   :y="position.cy - (position.r*0.9)"
                   :width="position.r*1.8"
                   :height="position.r*1.8"
                    class='simple-text'
                    v-if='positionHovered'/>
             <div xmlns="http://www.w3.org/1999/xhtml">
                 <div>
                  <p>{{ position.title }}</p>
                 </div>
             </div>
            </foreignObject>-->
    <path v-if='positionHovered' :d="positionHovered.d"
          id='positionHovered'/>
    <path :d="positionSelected.d"
          id='positionSelected'
          v-if='!positionHovered && positionSelected'/>
    <text v-if='positionHovered' text-anchor="middle"
          class='text-position'>
        <textPath href='#positionHovered' startOffset="50%">
            {{ positionHovered.title.slice(0, 12) + '...' }}
        </textPath>
    </text>
    <text v-if='!positionHovered && positionSelected' text-anchor="middle"
          class='text-position'>
        <textPath href='#positionSelected' startOffset="50%" >
            {{ positionSelected.title.slice(0, 12) + '...' }}
        </textPath>
    </text>



    <circle :cx="position.cx" :cy="position.cy" :r="position.r" stroke-width="1" :fill="stroke"
            v-for='position in positionsOnHover'
            />
    <circle :cx="position.cx" :cy="position.cy" :r="position.r" stroke-width="1" :fill="stroke"
            v-for='position in positionsOnSelect'
            v-if='!positionHovered'/>
    <path v-for='(func, index) in functionsOnHover' :d="func.d"
          :id='index+"-"+"func"'/>
    <path v-for='(func, index) in functionsOnSelect' :d="func.d"
          :id='index+"-"+"func"'
          v-if='!positionHovered'/>
    <text v-for='(func, index) in functionsOnHover' text-anchor="middle"
          class='text-function'>
        <textPath :href='"#"+index+"-func"' startOffset="50%">
            {{ func.title }}
        </textPath>
    </text>
    <text v-for='(func, index) in functionsOnSelect' text-anchor="middle"
          v-if='!positionHovered'
          class='text-function'>
        <textPath :href='"#"+index+"-func"' startOffset="50%">
            {{ func.title }}
        </textPath>
    </text>

    <circle :cx="position.cx" :cy="position.cy" :r="position.r" stroke="#009954" fill='#ffffff'
            v-for='position in positionsToOnHover' stroke-dasharray='2'
            :class='{
              "up": position.level_id > positionHovered.level_id,
              "horiz": position.level_id === positionHovered.level_id
            }'/>
    <circle :cx="position.cx" :cy="position.cy" :r="position.r" stroke="#009954" fill='#ffffff'
            v-for='position in positionsToOnSelect'
            v-if='!positionHovered'
            @click="$emit('changeFunction', position.id)"
            :class='{
              "up": position.level_id > positionSelected.level_id,
              "horiz": position.level_id === positionSelected.level_id
            }'
            />
    <path v-for='(pos, index) in positionsToOnHover' :d="pos.d"
            :id='index+"-"+"pos"'/>
    <path v-for='(pos, index) in positionsToOnSelect' :d="pos.d"
          :id='index+"-"+"pos"'
          v-if='!positionHovered'/>
    <text v-for='(pos, index) in positionsToOnHover' text-anchor="middle"
          class='text-position'
          :class='{
            "up-text": pos.level_id > positionHovered.level_id,
            "horiz-text": pos.level_id === positionHovered.level_id
          }'>
        <textPath :href='"#"+index+"-pos"' startOffset="50%">
              {{ pos.title.slice(0, 12) + '...' }}
        </textPath>
    </text>
    <text v-for='(pos, index) in positionsToOnSelect' text-anchor="middle"
          v-if='!positionHovered'
          class='text-position'
          @click="$emit('changeFunction', pos.id)"
          :class='{
            "up-text": pos.level_id > positionSelected.level_id,
            "horiz-text": pos.level_id === positionSelected.level_id
          }'>
        <textPath :href='"#"+index+"-pos"' startOffset="50%">
              {{ pos.title.slice(0, 12) + '...' }}
        </textPath>
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

  },
  computed: {

  },
  props: ['height',
          'width',
          'raduis',
          'stroke',
          'positionsDefault',
          'functionDefault',
          'positionHovered',
          'functionsOnHover',
          'positionsOnHover',
          'positionsToOnHover',
          'linesOnHover',

          'positionSelected',
          'functionsOnSelect',
          'positionsOnSelect',
          'positionsToOnSelect',
          'linesOnSelect',
        ],
  mounted() {
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
