<template>
  <v-layout row wrap @mouseover.stop='$emit("changeTip", { section: "extra", input: el.name })'>
    <v-flex shrink add-box>
      <v-icon size='14'
              class='cv-icon'
              @click='$emit("delete", {el, index})'>
        clear
      </v-icon>
    </v-flex>
    <v-flex xs2 extra-title>
      {{ el.title }}:
    </v-flex>
    <v-flex xs8 offset-xs1 v-if='el.string' style='padding-left: 5px;'>
      <span  class='pointer' v-if='!input' @click='editedItem = el.list, input = true'> {{ el.list }}</span>
      <v-text-field
            v-if='input'
            solo
            flat
            hide-details
            v-model='editedItem'
            class='editor-input'
            @change='save'
            :autofocus='input'
            @keyup.esc='editedItem = "", input=false, editedIndex=-1'
          ></v-text-field>
    </v-flex>
    <v-flex xs8 offset-xs1 v-if='!el.string'>
      <ul>
        <li v-for='(point, index) in el.list' @click='editedItem = point, input = true, editedIndex = index' class='pointer'>
          {{ point }}
        </li>
      </ul>

    </v-flex>
    <v-flex xs8 offset-xs4 addTitle>
    <v-text-field
          v-if='input&&!el.string'
          solo
          flat
          hide-details
          v-model='editedItem'
          class='editor-input'
          @change='save'
          :autofocus='input'
          @keyup.esc='editedItem = "", input=false, editedIndex=-1'
        ></v-text-field>
      <v-flex v-if='!input&&el.list.length === 0'>
        <v-icon color='#00A7F2' @click='input=true, editedIndex = -1' size='14'>add</v-icon>
        {{ el.addTitle }}
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data () {
      return {
        editedItem: '',
        input: false,
        showEditor: false,
        editedIndex: -1,
      }
  },
  mounted() {
  },
  computed: {
  },
  components: {
  },
  methods: {
    save() {
      if (this.el.string) {
          this.el.list = this.editedItem;
          this.$emit('changeValue', this.editedItem, this.el.name)
      } else {
        if (this.editedIndex === -1) {
          this.el.list.push(this.editedItem);
          this.editedItem="";
          this.input=false;
        } else {
            this.el.list.splice(this.editedIndex, 1, this.editedItem);
            this.editedItem="";
            this.input=false;
        }
      }

    }
  },
  props: ['el', 'index']
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
