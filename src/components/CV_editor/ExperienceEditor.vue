<template>
  <v-layout wrap row editor_editor>
      <v-flex shrink position-icon arrow-box>
      <v-icon size='14'
              class='cv-icon'
              :color='order.first === "experience" ? "#FFFFFF" : ""'
              @click='$emit("blockUp", "experience")'>
        arrow_upward
      </v-icon>
      <v-icon size='14'
              :color='order.second === "experience" ? "#FFFFFF" : ""'
              class='cv-icon'
              @click='$emit("blockDown", "experience")'>
        arrow_downward
      </v-icon>
      </v-flex>
      <v-flex grow>
        <h3 :style='{"color": color}'>Опыт работы</h3>
        <div class='border' :style='{"background-color": color}'></div>
      </v-flex>
    <v-flex offset-xs3 xs12 add-box>
      <div style='color: #00A7F2;'>
          <v-icon @click='addExperience' color='#00A7F2' size='16'>add</v-icon>
          Место работы
      </div>
    </v-flex>
    <v-flex xs12 v-for='(position, index) in experience'>
      <ExperiencePositionEditor :color='color'
                                @deleteCompany='deleteCompanyPosition'
                                :position='position'
                                :index='index'
                                :positionInList='setPositionInList(index)'
                                @indexUp='indexUp'
                                @indexDown='indexDown'
                                @changeTip='changeTip'/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ExperiencePositionEditor from './ExperiencePositionEditor.vue'

export default {

  data () {
      return {
        defaultPosition: {
          monthFrom: '',
          monthTo: '',
          yearFrom: '',
          yearTo: '',
          company: '',
          companyDescription: '',
          dataStyle: 'year',
        },
        showEditor: false,
      }
  },
  mounted() {
  },
  computed: {
  },
  components: {
    ExperiencePositionEditor
  },
  methods: {
    addPosition(data, index) {
      console.log(index, data)
      for (let key of Object.keys(data)) {
        this.experience[index][key] = data[key]
      }
    },
    save() {
      const data = {careerHistory: this.experienceList};
      this.showEditor=false;
      this.$emit("cancelAndSave", data)
    },
    deleteCompanyPosition(index) {
      this.experience.splice(index, 1);
    },
    setPositionInList(index) {
      if (index === 0) {
        if (this.experience.length === 1) return 'only'
        else return 'first';
      }
      const indexNumber = this.experience.length - index;
      if (indexNumber === 1) return 'last';
      return 'middle';
    },
    indexUp(index) {
      const removed = this.experience.splice(index, 1);
      this.experience.splice(index-1, 0, removed[0]);
    },
    indexDown(index) {
      const removed = this.experience.splice(index, 1);
      this.experience.splice(index+1, 0, removed[0]);
    },
    addExperience() {
      const newPosition = Object.assign({}, this.defaultPosition);
      newPosition.positions = [];
      this.experience.splice(0, 0, newPosition);
    },
    changeTip(data) {
      this.$emit('changeTip', data)
    }
  },
  props: ['experience', 'color', 'order']
}
</script>

<style>
  .editor_editor .button {
    border: 1px solid #009654;
    box-sizing: border-box;
    border-radius: 2px;
    height: 30px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }

  .editor_editor .company-title-box .theme--light.v-input:not(.v-input--is-disabled) input, .editor_editor .v-select__selection--comma {
    font-size: 14px;
    line-height: 20px;
  }
</style>
