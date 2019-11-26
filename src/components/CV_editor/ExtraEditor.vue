<template>
  <v-layout wrap row editor_editor>
    <v-flex xs12 title-box>
      <h3 :style='{"color": color}'>Дополнительная информация</h3>
      <div class='border' :style='{"background-color": color}'></div>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 v-for='(el, index) in editedExtra'>
        <ExtraPositionEditor :el='el'
                             @delete='deleteExtra'
                             :index='index'
                             @changeTip='changeTip'
                             @changeValue='changeValue'/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ExtraPositionEditor from './ExtraPositionEditor.vue';

export default {

  data () {
      return {
        input: false,
        showEditor: false,
        editedExtra: [
          {
            title: 'Языки',
            addTitle: 'Язык',
            list: this.extra.languages,
            string: true,
            name: 'languages',
          },
          {
            title: 'Технические навыки',
            addTitle: 'Навык',
            list: this.extra.skills,
            string: true,
            name: 'skills'
          },
          {
            title: 'Хобби',
            addTitle: 'Хобби',
            list: this.extra.hobbies,
            string: true,
            name: 'hobbies'
          },
          {
            title: 'Курсы',
            addTitle: 'Курс',
            list: this.extra.curses,
            string: false,
            name: 'curses'
          }
        ],
        showCurses: this.extra.curses ? false : true,
        showHobbies: this.extra.hobbies ? false : true,
      }
  },
  computed: {

  },
  components: {
  },
  methods: {
    deleteExtra({ el }) {

      if (el.string) {
        this.extra[el.name] = '';
        el.list = this.extra[el.name]
      }
      else el.list.splice(0);
    },
    changeTip(data) {
      this.$emit('changeTip', data)
    },
    changeValue(value, type) {
      this.extra[type] = value;
    }
  },
  props: ['extra', 'color'],
  components: {
    ExtraPositionEditor
  }
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
</style>
