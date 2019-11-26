<template>
  <v-layout wrap row editor_editor >
    <v-flex shrink position-icon arrow-box>
    <v-icon size='14'
            class='cv-icon'
            :color='order.first === "education" ? "#FFFFFF" : ""'
            @click='$emit("blockUp", "education")'>
      arrow_upward
    </v-icon>
    <v-icon size='14'
            :color='order.second === "education" ? "#FFFFFF" : ""'
            class='cv-icon'
            @click='$emit("blockDown", "education")'>
      arrow_downward
    </v-icon>
    </v-flex>
    <v-flex xs11>
        <h3 :style='{"color": color}'>Образование</h3>
        <div class='border' :style='{"background-color": color}'></div>
    </v-flex>

        <v-flex offset-xs3 xs12 add-box>
          <div style='color: #00A7F2;'>
              <v-icon @click='showEditor = true' color='#00A7F2' size='14'>add</v-icon>
              Место учебы
          </div>
        </v-flex>
        <EducationPositionEditor v-if='showEditor'
                                 @save='addPosition'/>
        <v-flex xs12 education-list-box>
            <v-layout row wrap v-for='(position, index) in education' education-list align-center>
            <v-flex shrink arrow-box>
                  <v-icon size='14'
                          class='cv-icon'
                          :color='positionInList(index) === "first" || positionInList(index) === "only" ? "#FFFFFF" : ""'
                          @click='indexUp(index)'>
                    arrow_upward
                  </v-icon>
                  <v-icon size='14'
                          class='cv-icon'
                          :color='positionInList(index) === "last" || positionInList(index) === "only" ? "#FFFFFF" : ""'
                          @click='indexDown(index)'>
                    arrow_downward
                  </v-icon>
            </v-flex>
              <v-flex shrink>
                {{ position.yearFrom }}-{{ position.yearTo }}
              </v-flex>
              <v-flex shrink>
                <v-icon size='14' @click='deletePosition(index)' class='cv-icon clear-icon'>
                  close
                </v-icon>
              </v-flex>
              <v-flex xs8>
                <span class='university-name'>{{ position.educationalInstitution }}</span>, {{ position.educationalDegree }}, {{ position.direction }}.
              </v-flex>
            </v-layout>
        </v-flex>
        </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EducationPositionEditor from './EducationPositionEditor.vue'

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
        },
        dataStyle: 'year',
        showEditor: false,
      }
  },
  mounted() {

  },
  computed: {

  },
  components: {
    EducationPositionEditor
  },
  methods: {
    addPosition(data) {
      console.log(data)
      this.education.splice(0, 0, data);
      this.showEditor=false;
    },
    deletePosition(index) {
      this.education.splice(index, 1);
    },
    positionInList(index) {
      if (index === 0) {
        if (this.education.length === 1) return 'only'
        else return 'first';
      }
      const indexNumber = this.education.length - index;
      if (indexNumber === 1) return 'last';
      return 'middle';
    },
    indexUp(index) {
      const removed = this.education.splice(index, 1);
      this.education.splice(index-1, 0, removed[0]);
    },
    indexDown(index) {
      const removed = this.education.splice(index, 1);
      this.education.splice(index+1, 0, removed[0]);
    },
  },
  props: ['education', 'color', 'order']
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

  .education-list .cv-icon.clear-icon{
    padding-left: 17px;
    padding-right: 15px;
  }
</style>
