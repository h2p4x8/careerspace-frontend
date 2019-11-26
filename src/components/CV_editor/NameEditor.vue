<template>
  <v-layout wrap row @keyup.enter='save'>
    <v-flex xs12 editor-box>
      <v-text-field
            solo
            flat
            v-model='editedItem.fullName'
            hide-details
            class='editor-input name-input'
            @change='save'
          ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data () {
      return {
        editedItem: {
          fullName: this.fullName,
        },
      }
  },
  mounted() {

  },
  computed: {

  },

  methods: {
    save() {
      const data = {};
      if (this.editedItem.fullName !== this.fullName) data.fullName = this.editedItem.fullName;
      this.$emit("save", data)
    }
  },
  props: ['fullName']
}
</script>

<style>

.name-input {
  width: 100%;
}
</style>
