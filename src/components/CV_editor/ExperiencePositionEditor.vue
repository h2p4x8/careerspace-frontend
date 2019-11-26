<template>
    <v-layout row wrap career-history-box>
      <v-flex shrink arrow-box company-arrow>
        <v-icon size='14'
                class='cv-icon'
                :color='positionInList === "first" || positionInList === "only" ? "#FFFFFF" : ""'
                @click='$emit("indexUp", index)'>
          arrow_upward
        </v-icon>
        <v-icon size='14'
                :color='positionInList === "last" || positionInList === "only" ? "#FFFFFF" : ""'
                class='cv-icon'
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
                              class='editor-input'
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
                              class='editor-input'
                            ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs1 text-xs-center @click='$emit("deleteCompany", index )'>
                  <v-icon size='14' class='cv-icon'>
                    clear
                  </v-icon>
                </v-flex>
                <v-flex xs8 position-description>
                  <v-flex company-title-box>
                    <v-text-field
                          solo
                          flat
                          v-model='position.company'
                          label='Компания'
                          hide-details
                          color='#009654'
                          class='editor-input company-name'
                          @mouseover.stop='$emit("changeTip", { section: "experience", input: "companyName" })'
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if='!descriptionCompanyInput' addTitle company-title-box>
                      <v-icon color='#00A7F2'  @click='position.companyDescription = " "' size='14'>add</v-icon>
                      Описание компании
                    </v-flex>
                        <v-flex v-if='descriptionCompanyInput' company-title-box>
                          <v-textarea
                            solo
                            flat
                            rows='1'
                            row-height='12'
                            auto-grow
                            label='Описание компании'
                            color='#009654'
                            v-model='position.companyDescription'
                            hide-details
                            single-line
                            class='editor-input textarea-summary'
                            @mouseover.stop='$emit("changeTip", { section: "experience", input: "companyDesc" })'
                            ></v-textarea>
                        </v-flex>
                        <v-flex add-box xs12 company-title-box>
                          <v-icon color='#00A7F2' @click='addPosition' size='16'>add</v-icon>
                          Должность
                        </v-flex>
                </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 positions-box>
        <ExperiencePositionInCompanyEditor v-for='(positionEl, index) in position.positions'
                                          :index='index'
                                          @deletePosition="deletePositionInCompany"
                                          :position='positionEl'
                                          :color='color'
                                          :positionInList='setPositionInList(index)'
                                          @indexUp='indexUp'
                                          @indexDown='indexDown'
                                          @changeTip='changeTip'/>
      </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ExperiencePositionInCompanyEditor from './ExperiencePositionInCompanyEditor.vue'

export default {

  data () {
      return {
        editedPosition: {
          monthFrom: '',
          monthTo: '',
          yearFrom: '',
          yearTo: '',
          company: '',
          companyDescription: '',
          dataStyle: 'year',
        },
        defaultPosition: {
          positionName: '',
          monthFrom: '',
          monthTo: '',
          yearFrom: '',
          yearTo: '',
          dataStyle: 'year',
        },
        editedProgressItem: '',
        editedDutieItem: '',
        progressInput: false,
        dutiesInput: false,
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
  computed: {
    descriptionCompanyInput(){
      return this.position.companyDescription;
    }
  },
  methods: {
    save() {
      const data = {};
      for (let key of Object.keys(this.editedPosition)) {
        if (this.editedPosition[key] !== this.position[key]) data[key] = this.editedPosition[key];
      }
      console.log('2', data)
      this.$emit("save", data, this.index)
    },
    addToList(item, list) {
      console.log(this[item])
      list.push(this[item]);
      this[item] = '';
      this.progressInput=false;
      this.dutiesInput=false;
    },
    deletePositionInCompany(index) {
      this.position.positions.splice(index, 1);
    },
    indexUp(index) {
      const removed = this.position.positions.splice(index, 1);
      this.position.positions.splice(index-1, 0, removed[0]);
    },
    indexDown(index) {
      const removed = this.position.positions.splice(index, 1);
      this.position.positions.splice(index+1, 0, removed[0]);
    },
    setPositionInList(index) {
      if (index === 0) {
        if (this.position.positions.length === 1) return 'only'
        else return 'first';
      }
      const indexNumber = this.position.positions.length - index;
      if (indexNumber === 1) return 'last';
      return 'middle';
    },
    addPosition(){
      const newPosition = Object.assign({}, this.defaultPosition);
      newPosition.duties = [];
      newPosition.progress = [];
      this.position.positions.splice(0, 0, newPosition)
    },
    changeTip(data) {
      this.$emit('changeTip', data)
    }
  },
  props: ['position', 'color', 'index', 'positionInList'],
  components: {
    ExperiencePositionInCompanyEditor
  },
}
</script>

<style>
.addTitle {
  color: #00A7F2
}

.editor_editor .editor-input.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0
}

.textarea-summary .v-icon {
  font-size: 14px;
}

.radio-button {
  font-size: 10px;
  line-height: 14px;
  color: #9D9D9D;
  cursor: pointer;
}

.radio-button .v-icon {
  padding-right: 7px;
}

.radio-button.checked {
  color: #009954;
}

.CV-card .career-history-box .arrow-box.company-arrow {
  margin-left: 0;
  margin-right: 24px
}
</style>
