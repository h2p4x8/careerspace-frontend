<template>
    <v-layout education-position-editor row wrap @keyup.enter.stop='$emit("save", defaultPosition)' @keyup.esc='$emit("close")'>
      <v-flex xs12 :class='defaultPosition.dataStyle === "year" ? "checked" : "unchecked"' class='radio-button' @click='defaultPosition.dataStyle = "year"'>
        <v-icon size='10' :color='defaultPosition.dataStyle === "year" ? "#009954" : "#9D9D9D"'>{{ defaultPosition.dataStyle === "year" ? "radio_button_checked" : "radio_button_unchecked" }}</v-icon>
        <span>год</span>
      </v-flex>
      <v-flex xs12 :class='defaultPosition.dataStyle === "monthAndYear" ? "checked" : "unchecked"' class='radio-button' @click='defaultPosition.dataStyle = "monthAndYear"'>
        <v-icon size='10' :color='defaultPosition.dataStyle === "monthAndYear" ? "#009954" : "#9D9D9D"'>{{ defaultPosition.dataStyle === "monthAndYear" ? "radio_button_checked" : "radio_button_unchecked" }}</v-icon>
        <span>месяц / год</span>
      </v-flex>
      <v-flex xs3>
        <v-layout row wrap>
          <v-flex xs2>
            c
          </v-flex>
          <v-flex xs5 v-if='defaultPosition.dataStyle === "monthAndYear"'>
            <v-select
                solo
                flat
                v-model='defaultPosition.monthFrom'
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
                    v-model='defaultPosition.yearFrom'
                    hide-details
                    class='editor-input'
                  ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            по
          </v-flex>
          <v-flex xs5 v-if='defaultPosition.dataStyle === "monthAndYear"'>
            <v-select
                solo
                flat
                v-model='defaultPosition.monthTo'
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
                    v-model='defaultPosition.yearTo'
                    hide-details
                    class='editor-input'
                  ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2 institution-box>
      <v-text-field
            solo
            flat
            hide-details
            label='Вуз'
            v-model='defaultPosition.educationalInstitution'
            class='editor-input'
          ></v-text-field>
      </v-flex>
      <v-flex xs4>
      <v-select
            solo
            flat
            v-model='defaultPosition.educationalDegree'
            :items='educationDegrees'
            hide-details
            label='Степень образования'
            class='editor-input'
          ></v-select>
      </v-flex>
      <v-flex xs3>
      <v-text-field
            solo
            flat
            v-model='defaultPosition.direction'
            hide-details
            label='Направление'
            class='editor-input'
          ></v-text-field>
      </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data () {
      return {
        defaultPosition: {
          educationalInstitution: '',
          educationalDegree: '',
          direction: '',
          monthFrom: '',
          monthTo: '',
          yearFrom: '',
          yearTo: '',
          dataStyle: 'year',
        },
        educationDegrees: [
          'Специалитет',
          "Бакалавриат",
          "Магистратура"
        ],
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
        ]
      }
  },
  mounted() {

  },
  computed: {
    style() {
      return {width: this.width + 'px', minHeight: this.height + 'px', top: this.top + 'px', left: this.left+ 'px'}
    }
  },

  methods: {
  },
  props: ['position']
}
</script>

<style>
.editor_editor .theme--light.v-input:not(.v-input--is-disabled) input, .editor_editor .v-select__selection--comma {
  font-size: 13px;
  line-height: 18px;
}

.position-name.theme--light.v-input:not(.v-input--is-disabled) input {
  font-size: 14px;
  line-height: 20px;
}

.editor_editor .v-select__slot {
  height: 15px;
}
</style>
