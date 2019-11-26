<template>
      <v-layout row wrap>
        <v-flex shrink arrow-box>
          <v-icon size='14'
                  class='cv-icon'
                  :color='positionInList === "first" || positionInList === "only" ? "#FFFFFF" : ""'
                  @click='$emit("indexUp", index)'>
            arrow_upward
          </v-icon>
          <v-icon size='14'
                  class='cv-icon'
                  :color='positionInList === "last" || positionInList === "only"? "#FFFFFF" : ""'
                  @click='$emit("indexDown", index)'>
            arrow_downward
          </v-icon>
        </v-flex>
        <v-flex xs11>
          <v-layout row wrap>
            <v-flex xs12 :class='position.dataStyle === "year" ? "checked" : "unchecked"' class='radio-button' @click='position.dataStyle = "year"'>
              <v-icon size='10' :color='position.dataStyle === "year" ? "#009954" : "#9D9D9D"'>{{ position.dataStyle === "year" ? "radio_button_checked" : "radio_button_unchecked" }}</v-icon>
              <span>год</span>
            </v-flex>
            <v-flex xs12 :class='position.dataStyle === "monthAndYear" ? "checked" : "unchecked"' class='radio-button' @click='position.dataStyle = "monthAndYear"'>
              <v-icon size='10' :color='position.dataStyle === "monthAndYear" ? "#009954" : "#9D9D9D"'>{{ position.dataStyle === "monthAndYear" ? "radio_button_checked" : "radio_button_unchecked" }}</v-icon>
              <span>месяц / год</span>
            </v-flex>
            <v-flex xs3>
              <v-layout row wrap>
                <v-flex xs2>
                  c
                </v-flex>
                <v-flex xs5 v-if='position.dataStyle === "monthAndYear"'>
                  <v-select
                      solo
                      flat
                      v-model='position.monthFrom'
                      :items='months'
                      item-text='nameFrom'
                      item-value='value'
                      color='#009654'
                      hide-details
                      class='editor-input editor-select'
                    ></v-select>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field
                          label="2005"
                          type='number'
                          min='1950'
                          max='3000'
                          color='#009654'
                          step='1'
                          solo
                          flat
                          v-model='position.yearFrom'
                          hide-details
                          class='editor-input editor-select'
                        ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs2>
                  по
                </v-flex>
                <v-flex xs5 v-if='position.dataStyle === "monthAndYear"'>
                  <v-select
                      solo
                      flat
                      v-model='position.monthTo'
                      :items='months'
                      item-text='nameTo'
                      item-value='value'
                      color='#009654'
                      hide-details
                      class='editor-input editor-select'
                    ></v-select>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field
                          label="2005"
                          type='number'
                          min='1950'
                          max='3000'
                          color='#009654'
                          step='1'
                          solo
                          flat
                          v-model='position.yearTo'
                          hide-details
                          class='editor-input editor-select'
                        ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs1 text-xs-center @click='$emit("deletePosition", index)'>
              <v-icon size='14' class='cv-icon'>
                clear
              </v-icon>
            </v-flex>
            <v-flex xs8>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                        solo
                        flat
                        v-model='position.positionName'
                        label='Должность'
                        hide-details
                        color='#009654'
                        class='editor-input position-name'

                      ></v-text-field>
                </v-flex>
                <v-flex xs12 list-title v-if='position.duties.length > 0'>
                    <span class='list-title-text'>Обязанности:</span>
                    <ul class='list-positions' :style='{"color": color}'>
                       <li v-for='(el, index) in position.duties'>
                          <DutiesEditor :point='el' :index='index' :key='index' @save='savePointDuties' @delete='deletePointDuties' @changeTip='changeTip'/>
                       </li>
                    </ul>
                </v-flex>
                <v-flex addTitle minor xs12>
                  <v-icon color='#00A7F2' @click='position.duties.push(" "), $forceUpdate()' size='14'>add</v-icon>
                    Обязанность
                </v-flex>
                <v-flex xs12 key-achievements list-title v-if='position.progress.length > 0'>
                      <span class='list-title-text'>Достижения:</span>
                    <ul class='list-positions' :style='{"color": color}'>
                       <li v-for='el in position.progress'>
                        <DutiesEditor :point='el' :index='index' :key='index' @save='saveProgressDuties' @delete='deleteProgressDuties' @changeTip='changeTip'/>
                      </li>
                    </ul>
                </v-flex>
                <v-flex xs12 addTitle minor>
                  <v-icon color='#00A7F2' @click='position.progress.push(""), $forceUpdate()' size='14'>add</v-icon>
                  Достижение
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DutiesEditor from './DutiesEditor.vue';

export default {

  data () {
      return {
        editedProgressItem: '',
        editedDutieItem: '',
        progressInput: false,
        dutiesInput: false,
        editedPosition: {
          positionName: '',
          monthFrom: '',
          monthTo: '',
          yearFrom: '',
          yearTo: '',
          dataStyle: 'year',
        },
        months: [
          {nameFrom: 'января', nameTo: 'январь', value: '01'},
          {nameFrom: 'февраля', nameTo: 'февраль', value: '02'},
          {nameFrom: 'марта', nameTo: 'март', value: '03'},
          {nameFrom: 'апреля', nameTo: 'апрель', value: '04'},
          {nameFrom: 'мая', nameTo: 'май', value: '05'},
          {nameFrom: 'июня', nameTo: 'июня', value: '06'},
          {nameFrom: 'июля', nameTo: 'июль', value: '07'},
          {nameFrom: 'августа', nameTo: 'август', value: '08'},
          {nameFrom: 'сентября', nameTo: 'сентябрь', value: '09'},
          {nameFrom: 'октября', nameTo: 'октябрь', value: '10'},
          {nameFrom: 'ноября', nameTo: 'ноябрь', value: '11'},
          {nameFrom: 'декабря', nameTo: 'декабрь', value: '12'},
          {nameFrom: 'сегодня', nameTo: 'сегодня', value: '0'}
        ],
        editedInput: '',
      }
  },
  computed: {
    showDuties(){
      return this.position.duties.length > 0;
    }
  },
  methods: {
    addToList(item, list) {
      console.log(this[item])
      list.push(this[item]);
      this[item] = '';
      this.progressInput=false;
      this.dutiesInput=false;
    },
    savePointDuties(text, index) {
      this.position.duties.splice(index, 1, text)
    },
    deletePointDuties(index) {
      this.position.duties.splice(index, 1);
      this.$forceUpdate()
    },
    saveProgressDuties(text, index) {
      this.position.progress.splice(index, 1, text)
    },
    deleteProgressDuties(index) {
      this.position.progress.splice(index, 1);
      this.$forceUpdate()
    },
    changeTip(data) {
      this.$emit('changeTip', data)
    }
  },
  props: ['position','index', 'color', 'positionInList'],
  components: {
    DutiesEditor
  }
}
</script>

<style>
</style>
