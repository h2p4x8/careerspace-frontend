<template>
     <v-textarea append-outer-icon='clear'
                 @click:append-outer='$emit("delete", index)'
                 color='#009654'
                 v-model='editedInput'
                 rows='1'
                 row-height='12'
                 auto-grow
                 hide-details
                 single-line
                 solo
                 flat
                 @mouseover.stop='$emit("changeTip", { section: "experience", input: "positionAchivment" })'
                 @input='$emit("save", editedInput, index)'
                 class='textarea-summary'
       ></v-textarea>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data () {
      return {
        editedInput: ''
      }
  },
  mounted() {
    this.editedInput = this.point
  },
  updated(){
  },
  computed: {
  },
  methods: {
  },
  props: ['point', 'index']
}
</script>

<style>
</style>
