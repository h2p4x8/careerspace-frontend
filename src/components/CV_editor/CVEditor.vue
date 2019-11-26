<template>
  <v-container CV-editor-main>
    <v-layout CV-main-card row wrap>
      <!--/*<v-flex xs1>
        <v-layout cv-style-editor wrap :class='editorVertical ? "row" : "column"'>
            <v-flex xs3>
              <v-btn flat fab large class='editor-button' color='#DADADA' @click='showSettingMenu("showColors")'>
                <v-icon size='40' :style='showColors ? "color: #009654" : ""'>mdi-palette-outline</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3>
            <v-btn flat fab large class='editor-button' color='#DADADA' @click='showSettingMenu("showFonts")'>
              <v-icon size='40' :style='showFonts ? "color: #009654" : ""'>mdi-format-title</v-icon>
            </v-btn>
            </v-flex>
            <v-flex xs3>
            <v-btn flat fab large class='editor-button' color='#DADADA' @click='showSettingMenu("showSave")'>
              <v-icon size='40' :style='showSave ? "color: #009654" : ""'>mdi-content-save</v-icon>
            </v-btn>
            </v-flex>
            <v-flex xs12 row wrap cv-editor-menu>
              <v-btn v-for='colorExample in colors' v-if='showColors' fab :color="colorExample" depressed class='color-button' @click='() => choseColor(colorExample)'>
                <v-icon v-show='color === colorExample' style='color: #FFFFFF'>check</v-icon>
              </v-btn>
              <div v-for='fontExample in fonts'
                  v-if='showFonts'
                  class='font-name'
                  :style='{"font-family": fontExample}'
                  :class='font === fontExample ? "font-chosen" : ""'
                  @click='() => choseFont(fontExample)'>
              {{ fontExample }} <v-icon color='#009654' class='check-icon'>check</v-icon>
              </div>

                <v-text-field
                  solo
                  flat
                  class='input-border'
                  label="Основное резюме"
                  height='50'
                  hide-details
                ></v-text-field>
                <div class='hint-text'>Так оно будет называться у тебя в профиле</div>
                <v-btn class='button' block color="#009654" depressed dark @click='show'>Сохранить</v-btn>
              </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>*/-->
      <v-flex xs3 offset-xs8 editor-switch>
        <v-btn dark
              depressed
              class='button preview'
              :class='previewMod ? "active-button" : "non-active-button"'
              :color='previewMod ? "#009954" : "#FFFFFF"'
              @click='previewMod=true, editorMod=false'
              style='border: 1px solid #9D9D9D;'>
                Посмотреть
        </v-btn>
        <v-btn dark
              depressed
              class='button editor'
              :class='editorMod ? "active-button" : "non-active-button"'
              @click='editorMod=true, previewMod=false'
              :color='editorMod ? "#009954" : "#FFFFFF"'
              style='border: 1px solid #9D9D9D;'>
              Изменить
        </v-btn>
      </v-flex>


      <!--<v-flex :class='showSave || previewMod ? "xs2" : "xs1"' offset-xs1 settings>
        <v-layout cv-style-editor wrap column>
            <v-flex>
              <v-btn flat fab large class='editor-button' color='#DADADA' @click='previewMod=true, editorMod=false, showSave=false'>
                <v-icon size='40' :style='previewMod && !showSave ? "color: #009654" : ""' class='material-icons-outlined'>find_in_page</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
            <v-btn flat fab large class='editor-button' color='#DADADA' @click='editorMod=true, previewMod=false, showSave=false'>
              <v-icon size='40' :style='editorMod ? "color: #009654" : ""' class='material-icons-outlined'>mode</v-icon>
            </v-btn>
            </v-flex>
            <v-flex>
            <v-btn flat fab large class='editor-button' color='#DADADA' @click='showSettingMenu("showSave")'>
              <v-icon size='40' :style='showSave ? "color: #009654" : ""' class='material-icons-outlined'>save</v-icon>
            </v-btn>
            </v-flex>
            <v-flex xs12 v-if='showSave && !showSuccess' CV-save-box>
                <div class='CV-title'>Название резюме</div>
                <v-text-field
                  solo
                  flat
                  class='input-border'
                  label="Основное резюме"
                  height='50'
                  hide-details
                  v-model='editedCV.name'
                ></v-text-field>
                <div class='hint-text'>Так оно будет называться у тебя в профиле</div>
                <v-btn class='button' block color="#009654" depressed  @click='show' :disabled='!editedCV.name' dark>Сохранить</v-btn>
            </v-flex>
            <v-flex xs12 saved-cv-box reply-made-box text-xs-center v-if='showSuccess'>
              <v-btn color='#009954' flat dark class='button-done' outlined icon >
                <v-icon dark size='25'>check</v-icon>
              </v-btn>
              <div success-text>
                Резюме успешно сохранено. Можешь всегда найти его в разделе резюме в личном кабинете
              </div>
            </v-flex>
        </v-layout>
      </v-flex>-->
      <CVEditorExample :color='color' :font='font' :editedCV='editedCV' :editorMod='editorMod' :previewMod='previewMod' @changeTip='changeTip'/>
      <CVEditorTips v-show='editorMod' :section='section'/>
      <v-flex xs3 v-if='previewMod' CV-save-box>
        <v-layout row wrap>
        <v-flex xs12 v-if='showSave&&!saveSuccess'>
          <div class='CV-title'>Название резюме</div>
          <v-text-field
            solo
            flat
            class='input-border'
            label="Введи название резюме..."
            height='60'
            hide-details
            v-model='editedCV.name'
          ></v-text-field>
        </v-flex>
        <v-flex xs12 v-if='!saveSuccess'>
            <v-btn class='button' block color="#009654" depressed  @click='showSave ? show() : showSave = true'  :loading="loading" dark>Сохранить</v-btn>
        </v-flex>
        <v-flex xs12 v-if='editedCV.cvFd'>
          <v-btn class='button' block color="#E85218" depressed  @click='openResumeInPdf' dark>Скачать</v-btn>
        </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CVEditorExample from './CVEditorExample.vue';
import CVEditorTips from './CVEditorTips.vue';
import defaultCV from './defaultCV'

export default {
  components: {
    CVEditorExample,
    CVEditorTips
  },
  data () {
      return {
        editedCV: {
          name: '',
          fullName: '',
          livingPlace: '',
          age: '',
          phone: '',
          email: '',
          summary: '',
          careerHistory: [],
          education: [],
          extra: {
            languages: [],
            skills: [],
            hobbies: [],
            curses: []
          },
          order: {
            first: '',
            second: ''
          }
        },
        drawer: false,
        editorVertical: false,
        showColors: false,
        showFonts: false,
        showIcon: false,
        showSave: false,
        colors: [
          '#009654',
          '#1491C9',
          '#B5545A',
          '#323A63',
          '#000000'
        ],
        fonts: [
          'Open Sans',
          'Brutal Type',
          'Circe',
          'Montserrat'
        ],
        color: '#009654',
        font: 'Open Sans',
        editorMod: false,
        previewMod: true,
        saveSuccess: false,
        section: {
          section: 'personalInfo',
          input: ''
        },
        loading: false,
      }
  },

  computed: {
    showSuccess(){
      if (this.previewMod && this.saveSuccess) return true;
      else return false;
    }
  },

  methods: {
    ...mapActions('CVEditor', [
      'createCV',
      'updateCV',
      'getUserCV'
    ]),
    choseColor(color) {
      this.color = color;
    },
    choseFont(font){
      this.font = font;
    },
    showSettingMenu(section) {
      if (this.editorVertical) {
        if (this[section]) {
          this.editorVertical = false;
          this[section] = false;
        } else {
          if (this.showColors) this.showColors = false;
          if (this.showFonts) this.showFonts = false;
          if (this.showSave) this.showSave = false;
          this[section] = true;
        }
      } else {
        this.editorVertical = true;
        this[section] = true;
      }
      this.editorMod = false;
      this.previewMod = true;
    },
    async show(){
      this.loading = true;
      const data = this.editedCV;
      let result;
      if (this.id === 'new') result = await this.createCV({ payload: { data } })
      else result = await this.updateCV({ payload: { data, id: this.id } })
      if (result) {
        this.$router.push({ name: 'ResumeTool', query: { id: result.id }, params: { name: result.name } })
        await this.getUserCV({ payload: { id: result.id} })
            .then(res => {
              if(res) {
                this.editedCV = Object.assign({}, res)
              } else {
                this.editedCV = Object.assign({}, defaultCV)
              }
              this.loading = false;
              this.showSave = false;
              this.$emit('refresh')
            })
        }
    },
    changeTip(name){
      if (name === this.section) return;
      this.section = name;
    },
    openResumeInPdf() {
      window.open(this.editedCV.cvFd, "_blank");
    },
    async refreshCV(){
      if (this.id === 'new') {
        this.editedCV = Object.assign({}, defaultCV)
      } else {
        await this.getUserCV({ payload: { id: this.id } })
            .then(res => {
              if(res) {
                this.editedCV = Object.assign({}, res)
              } else {
                this.editedCV = Object.assign({}, defaultCV)
              }
            })
      }
    }
  },
  props: ['id'],
  async mounted() {
    this.refreshCV()
  },
}
</script>

<style>

.CV-editor-main {
  padding: 0;
  margin-bottom: 50px;
}

.CV-editor-main .saved-cv-box  {
  margin-top: 7px;
  margin-left: 4px;
}

.cv-editor-menu {
  padding-top: 60px;
  padding-left: 23px;
}

.color-button {
  width: 31px;
  height: 31px;
}
.color-button:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
}

.font-chosen {
  color: #009654;
}

.check-icon {
  display: none;
}

.font-name:hover > i {
  display: inline;
}

.cv-style-editor .button {
  font-size: 14px;
  line-height: 19px;
}

.hint-text{
  padding-top: 7px;
  padding-bottom: 30px;
  font-size: 14px;
  line-height: 19px;
  color: #9D9D9D;
}



.CV-editor-main .settings.xs2 {
  margin-right: 4%;
}

.CV-save-box .CV-title {
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 10px;
}

.CV-save-box {
  padding-left: 23px;
}

.textarea-summary textarea {
  font-size: 13px;
  line-height: 18px;
}

.list-positions .textarea-summary textarea {
  font-size: 12px;
  line-height: 16px;
}

.company-title-box .textarea-summary textarea {
  font-size: 11px;
  line-height: 15px;
}

.editor_editor .career-history-box .list-title li .v-text-field.v-text-field--enclosed .v-text-field__details, .editor_editor .career-history-box .list-title li .v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
    padding: 0 12px 0 0;
}

.CV-editor-main .saved-cv-box .success-text{
    margin-top: 14px;
    font-size: 14px;
    line-height: 17px;
}

 .CV-save-box .theme--light.v-input:not(.v-input--is-disabled) input,  .CV-save-box .v-text-field.v-text-field--solo .v-label {
   font-size: 14px;
   line-height: 17px;
   font-weight: 300;
 }

 .pointer {
  cursor: pointer;
 }
</style>
