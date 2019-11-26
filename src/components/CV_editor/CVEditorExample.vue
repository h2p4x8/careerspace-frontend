<template>
  <v-flex xs8 v-if='previewMod' >
      <v-card :style='{"font-family": font}'>
        <v-layout wrap row class='CV-card example'>
          <v-flex xs12 name-box>
            <h1 :style='{"color": color}'>{{editedCV.fullName}}</h1>
          </v-flex>
          <v-layout wrap row personal-info-box>
            <v-flex xs4 personalInfoTitle  v-if='editedCV.livingPlace'>
              Место проживания:
            </v-flex>
            <v-flex xs8 v-if='editedCV.livingPlace'>
            {{ editedCV.livingPlace }}
            </v-flex>
            <v-flex xs4 personalInfoTitle v-if='editedCV.phone'>
              Телефон:
            </v-flex>
            <v-flex xs8 v-if='editedCV.phone'>
            {{ editedCV.phone }}
            </v-flex>
            <v-flex xs4 personalInfoTitle v-if='editedCV.email'>
              Email:
            </v-flex>
            <v-flex xs8 v-if='editedCV.email'>
            {{ editedCV.email }}
            </v-flex>
            <v-flex xs4 v-if='editedCV.age' personalInfoTitle>
              Возраст
            </v-flex>
            <v-flex xs8 v-if='editedCV.age'>
            {{ editedCV.age }}
            </v-flex>
          </v-layout>
          <v-layout wrap row personal-description >
            <v-flex xs12 >
              {{ editedCV.summary}}
            </v-flex>
          </v-layout>
          <v-layout wrap row education-box v-if='editedCV.order.first === "education"'>
            <v-flex xs12>
              <h3 :style='{"color": color}'>Образование</h3>
              <div class='border' :style='{"background-color": color}'></div>
            </v-flex>
            <v-layout row wrap v-for='position in editedCV.education' education-list>
              <v-flex xs2 v-if='position.dataStyle === "year"'>
                {{ position.yearFrom }}-{{ position.yearTo == yearNow ? 'наст.вр.' : position.yearTo }}
              </v-flex>
              <v-flex xs2 v-else>
                {{ position.monthFrom}}/{{ position.yearFrom }} – {{ position.monthTo == monthNow && position.yearTo == yearNow ? 'наст.вр.' : `${position.monthTo}/${position.yearTo}`}}
              </v-flex>
              <v-flex xs9 education-info>
                <span class='university-name'>{{ position.educationalInstitution }}</span>, {{ position.educationalDegree }}, {{ position.direction }}.
              </v-flex>
            </v-layout>
        </v-layout>
        <v-layout wrap row v-else>
          <v-flex xs12 >
            <h3 :style='{"color": color}'>Опыт работы</h3>
            <div class='border' :style='{"background-color": color}'></div>
          </v-flex>
          <v-layout row wrap career-history-box style='width: 100%' v-for='el in editedCV.careerHistory'>
            <v-flex xs2 v-if='el.dataStyle === "year"' date-box>
              {{ el.yearFrom }}-{{ el.yearTo == yearNow ? 'наст.вр.' : el.yearTo }}
            </v-flex>
            <v-flex xs2 date-box v-else>
              {{ el.monthFrom}}/{{ el.yearFrom }} – {{ el.monthTo == monthNow && el.yearTo == yearNow ? 'наст.вр.' : `${el.monthTo}/${el.yearTo}` }}
            </v-flex>
            <v-flex xs9 position-description>
              <div class='company-name'>{{ el.company }}</div>
              <div class='company-description' v-if='el.companyDescription'>{{ el.companyDescription }}</div>
            </v-flex>
            <v-flex xs12 v-for='(position, index) in el.positions' :key='index' position-per-company-description>
              <v-layout row wrap>
                      <v-flex xs2 v-if='position.dataStyle === "year"'>
                        {{ position.yearFrom }}-{{ position.yearTo == yearNow ? 'наст.вр.' : position.yearTo }}
                      </v-flex>
                      <v-flex xs2 v-else>
                        {{ position.monthFrom}}/{{ position.yearFrom }} – {{ position.monthTo == monthNow && position.yearTo == yearNow ? 'наст.вр.' : `${position.monthTo}/${position.yearTo}` }}
                      </v-flex>
                      <v-flex xs9 position-description >
                        <div class='position'>{{ position.positionName }}</div>
                        <div class='list-title' v-if='position.duties ? position.duties.length > 0 : false'>
                          <span class='list-title-text'>Обязанности:</span>
                          <ul class='list-positions' :style='{"color": color}'>
                             <li v-for='dutieEl in position.duties'><span class='list-position-text'>{{ dutieEl }}</span></li>
                          </ul>
                        </div>
                        <div class='key-achievements list-title'  v-if='position.progress ? position.progress.length > 0 : false'>
                            <span class='list-title-text'>Достижения:</span>
                          <ul class='list-positions' :style='{"color": color}' >
                             <li v-for='progressEl in position.progress'><span class='list-position-text' >{{ progressEl }}</span></li>
                          </ul>
                        </div>
                      </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-layout>
        <v-layout wrap row education-box v-if='editedCV.order.first === "experience"'>
          <v-flex xs12>
            <h3 :style='{"color": color}'>Образование</h3>
            <div class='border' :style='{"background-color": color}'></div>
          </v-flex>
          <v-layout row wrap v-for='position in editedCV.education' education-list>
            <v-flex xs2 v-if='position.dataStyle === "year"'>
              {{ position.yearFrom }}-{{ position.yearTo == yearNow ? 'наст.вр.' : position.yearTo }}
            </v-flex>
            <v-flex xs2 v-else>
              {{ position.monthFrom}}/{{ position.yearFrom }} – {{ position.monthTo == monthNow && position.yearTo == yearNow ? 'наст.вр.' : `${position.monthTo}/${position.yearTo}`}}
            </v-flex>
            <v-flex xs9 education-info>
              <span class='university-name'>{{ position.educationalInstitution }}</span>, {{ position.educationalDegree }}, {{ position.direction }}.
            </v-flex>
          </v-layout>
      </v-layout>
      <v-layout wrap row v-else>
        <v-flex xs12 >
          <h3 :style='{"color": color}'>Опыт работы</h3>
          <div class='border' :style='{"background-color": color}'></div>
        </v-flex>
        <v-layout row wrap career-history-box style='width: 100%' v-for='el in editedCV.careerHistory'>
          <v-flex xs2 v-if='el.dataStyle === "year"' date-box>
            {{ el.yearFrom }}-{{ el.yearTo == yearNow ? 'наст.вр.' : el.yearTo }}
          </v-flex>
          <v-flex xs2 date-box v-else>
            {{ el.monthFrom}}/{{ el.yearFrom }} – {{ el.monthTo == monthNow && el.yearTo == yearNow ? 'наст.вр.' : `${el.monthTo}/${el.yearTo}` }}
          </v-flex>
          <v-flex xs9 position-description>
            <div class='company-name'>{{ el.company }}</div>
            <div class='company-description' v-if='el.companyDescription'>{{ el.companyDescription }}</div>
          </v-flex>
          <v-flex xs12 v-for='(position, index) in el.positions' :key='index' position-per-company-description>
            <v-layout row wrap>
                    <v-flex xs2 v-if='position.dataStyle === "year"'>
                      {{ position.yearFrom }}-{{ position.yearTo == yearNow ? 'наст.вр.' : position.yearTo }}
                    </v-flex>
                    <v-flex xs2 v-else>
                      {{ position.monthFrom}}/{{ position.yearFrom }} – {{ position.monthTo == monthNow && position.yearTo == yearNow ? 'наст.вр.' : `${position.monthTo}/${position.yearTo}` }}
                    </v-flex>
                    <v-flex xs9 position-description >
                      <div class='position'>{{ position.positionName }}</div>
                      <div class='list-title' v-if='position.duties ? position.duties.length > 0 : false'>
                        <span class='list-title-text'>Обязанности:</span>
                        <ul class='list-positions' :style='{"color": color}'>
                           <li v-for='dutieEl in position.duties'><span class='list-position-text'>{{ dutieEl }}</span></li>
                        </ul>
                      </div>
                      <div class='key-achievements list-title'  v-if='position.progress ? position.duties.progress > 0 : false'>
                          <span class='list-title-text'>Достижения:</span>
                        <ul class='list-positions' :style='{"color": color}' >
                           <li v-for='progressEl in position.progress'><span class='list-position-text' >{{ progressEl }}</span></li>
                        </ul>
                      </div>
                    </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
        <v-layout wrap row extra-info v-if='!isShowBlock'>
          <v-flex xs12>
            <h3 :style='{"color": color}'>Дополнительная информация</h3>
            <div class='border' :style='{"background-color": color}'></div>
          </v-flex>
          <v-layout row wrap extra-info-points>
            <v-flex xs2 extra-info-title v-if='editedCV.extra.languages'>
              Языки
            </v-flex>
            <v-flex xs9 extra-info-position v-if='editedCV.extra.languages'>
              {{ editedCV.extra.languages }}
            </v-flex>
            <v-flex xs2 extra-info-title v-if='editedCV.extra.skills'>
              Технические навыки
            </v-flex>
            <v-flex xs9 extra-info-position v-if='editedCV.extra.skills'>
              {{ editedCV.extra.skills }}
            </v-flex>
            <v-flex xs2 extra-info-title v-if='editedCV.extra.curses.length > 0'>
              Курсы
            </v-flex>
            <v-flex xs9 extra-info-position v-if='editedCV.extra.curses.length > 0'>
              <ul>
                <li v-for='el in editedCV.extra.curses'>
                  {{ el }}
                </li>
              </ul>
            </v-flex>
            <v-flex xs2 extra-info-title v-if='editedCV.extra.hobbies'>
              Хобби
            </v-flex>
            <v-flex xs9  extra-info-position v-if='editedCV.extra.hobbies'>
              {{ editedCV.extra.hobbies }}
            </v-flex>
          </v-layout>
        </v-layout>
      </v-layout>
    </v-card>
  </v-flex>
  <v-flex xs8 v-else>
      <v-card :style='{"font-family": font}'>
        <v-layout wrap row class='CV-card'>
          <v-flex xs12 name-box @mouseover="$emit('changeTip', {section: 'personalInfo', input: ''})">
            <NameEditor   @save='save'
                          :fullName='editedCV.fullName'
                          :color='color'/>
          </v-flex>
          <v-layout wrap row personal-info-box no-padding-editor>
            <PersonalInfoEditor @save='save'
                                :livingPlace='editedCV.livingPlace'
                                :age='editedCV.age'
                                :phone='editedCV.phone'
                                :email='editedCV.email'
                                @changeTip="changeTip"/>
          </v-layout>
          <v-layout wrap row personal-description @mouseover="$emit('changeTip', {section: 'personalInfo', input: ''})">
            <SummaryEditor @save='save'
                           :summary='editedCV.summary'/>
          </v-layout>
          <v-layout row wrap experience-editor no-padding-editor v-if='editedCV.order.first === "experience"'  @mouseover="$emit('changeTip', {section: 'experience', input: ''})">
            <ExperienceEditor     :experience="editedCV.careerHistory"
                                  :color='color'
                                  :order='editedCV.order'
                                  @blockUp='blockUp'
                                  @blockDown='blockDown'
                                  @changeTip='changeTip'/>
          </v-layout>
          <v-layout row education-box no-padding-editor v-else @mouseover="$emit('changeTip', {section: 'education', input: ''})">
              <EducationEditor :education='editedCV.education'
                               :color='color'
                               :order='editedCV.order'
                               @blockUp='blockUp'
                               @blockDown='blockDown'/>
          </v-layout>
          <v-layout row wrap experience-editor no-padding-editor v-if='editedCV.order.first === "education"' @mouseover="$emit('changeTip', {section: 'experience', input: ''})">
            <ExperienceEditor     :experience="editedCV.careerHistory"
                                  :color='color'
                                  :order='editedCV.order'
                                  @blockUp='blockUp'
                                  @blockDown='blockDown'
                                  @changeTip='changeTip'/>
          </v-layout>
          <v-layout row education-box no-padding-editor v-else @mouseover="$emit('changeTip', {section: 'education', input: ''})">
              <EducationEditor :education='editedCV.education'
                               :color='color'
                               :order='editedCV.order'
                               @blockUp='blockUp'
                               @blockDown='blockDown'
                              />
          </v-layout>
          <v-layout wrap row extra-info no-padding-editor >
            <ExtraEditor    :extra='editedCV.extra'
                            :color='color'
                            @changeTip="changeTip"/>
          </v-layout>
      </v-layout>
      </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PersonalInfoEditor from './PersonalInfoEditor.vue';
import SummaryEditor from './SummaryEditor.vue';
import NameEditor from './NameEditor.vue';
import EducationEditor from './EducationEditor.vue';
import ExperienceEditor from './ExperienceEditor.vue';
import ExtraEditor from './ExtraEditor.vue';

export default {

  data () {
      return {
        personalInfo: false,
        summary: false,
        nameEditor: false,
        educationEditor: false,
        experienceEditor: false,
        extraEditor: false,
        editorWidth: 0,
        editorHeight: 0,
        editorTop: 0,
      }
  },
  mounted: function() {
    this.educationList = this.education;
  },

  methods: {
    save(data) {
      console.log('2', data)
      for (let key of Object.keys(data)) {
        this.editedCV[key] = data[key]
      }
    },
      blockDown(title) {
        this.editedCV.order.first = this.editedCV.order.second;
        this.editedCV.order.second = title;
      },
      blockUp(title) {
        this.editedCV.order.second = this.editedCV.order.first;
        this.editedCV.order.first = title;
      },
      changeTip(data) {
        this.$emit('changeTip', data)
      }
  },
  props: ['color', 'font', 'editedCV', 'previewMod', 'editorMod'],
  components: {
    PersonalInfoEditor,
    SummaryEditor,
    NameEditor,
    EducationEditor,
    ExperienceEditor,
    ExtraEditor,
  },
  computed: {
    monthNow() {
      const now = new Date();
      return now.getMonth() + 1
    },
    yearNow(){
      const now = new Date();
      return now.getFullYear()
    },
    isShowBlock() {
      return this.editedCV.extra.hobbies.length === 0 && this.editedCV.extra.languages.length === 0 && this.editedCV.extra.curses.length === 0 && this.editedCV.extra.skills.length === 0;
    }
  }
}
</script>

<style>
.box {
  width: 100%
}
.personalInfoTitle {
  font-weight: bold
}

.education-list {
  width: 100%;
  margin-bottom: 5px;
}

.editor_editor .v-input .v-label {
  font-size: 12px;
  line-height: 17px;
  color: #9D9D9D;
  font-weight: normal;
}

.position-icon {
  padding-top: 8px;
  padding-right: 25px;
}

.CV-card.example .personal-info-box .personalInfoTitle {
  padding-left: 0;
  padding-right: 0;
}

.CV-card.example .position-description, .CV-card.example .education-info, .CV-card.example .extra-info-position {
  margin-left: 25px;
}

.CV-card.example .extra-info-points > div {
  margin-bottom: 10px;
}

.CV-card.example .date-box {
  font-weight: bold;
}

.extra-info .addTitle {
  padding: 5px 0;
}

.extra-info-title, .extra-title {
  font-weight: 600;
}

.CV-editor-main .v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix, .CV-editor-main  .v-textarea.v-text-field--enclosed.v-text-field--single-line .v-text-field__prefix, .v-textarea.v-text-field--box.v-text-field--single-line textarea, .CV-editor-main  .v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
  margin: 0
}

.position-per-company-description {
  margin-top: 7px;
}

.career-history-box {
  margin-bottom: 15px
}
</style>
