<template>
  <v-layout wrap row editor_editor editor-box>
  <v-flex shrink v-if='!summaryInput' offset-xs2 add-box>
    <div style='color: #00A7F2;'><v-icon color='#00A7F2' @click='summaryInput=true' size='14'>add</v-icon> Краткое описание</div>
  </v-flex>
  <v-flex shrink>
    <v-icon color='#9D9D9D' v-if='summaryInput' @click='editedItem.summary = "", summaryInput=false, save()' size='14'>clear</v-icon>
  </v-flex>
  <v-flex>
    <v-textarea
      color='#00A7F2'
      hide-details
      row-height='14'
      auto-grow
      flat
      solo
      single-line
      v-if='summaryInput'
      class='textarea-summary'
      v-model='editedItem.summary'
      @change='save'
      ></v-textarea>
  </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data () {
      return {
        editedItem: {
          summary: this.summary,
        },
        summaryInput: this.summary ? true : false,
      }
  },
  mounted() {

  },
  computed: {

  },

  methods: {
    save() {
      const data = {};
      if (this.editedItem.summary !== this.summary) data.summary = this.editedItem.summary;
      console.log('2', data)
      this.$emit("save", data)
    }
  },
  props: ['dialog', 'height', 'width', 'top', 'summary']
}
</script>

<style>
.textarea-summary textarea{
  line-height: 24px
}

.textarea-summary div, .textarea-summary, .textarea-summary textarea {
  padding: 0;
  margin: 0;
  font-size: 11px;
  line-height: 15px;
}

.personal-description .add-box {
  padding-left: 11px
}

.add-box {
  font-size: 14px;
  line-height: 20px;
}
</style>
