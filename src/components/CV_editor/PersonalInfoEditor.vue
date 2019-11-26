<template>
  <v-layout wrap row editor_editor>
    <v-flex xs4 editor-box personalInfoTitle>
      <v-icon color='#00A7F2' v-if='!placeInput' @click='placeInput=true' size='14'>add</v-icon>
      <v-icon class='show' v-if='placeInput' @click='editedItem.livingPlace = "", placeInput=false, save()' size='14'>clear</v-icon>
      <span :style='!placeInput ? "color: #00A7F2" : null'>Место проживания<span v-if='placeInput'>:</span></span>
    </v-flex>
    <v-flex xs8>
    <v-text-field
          solo
          flat
          v-model='editedItem.livingPlace'
          hide-details
          class='editor-input'
          @change='save'
          v-if='placeInput'
          :autofocus='placeInput'
          ref='placeInput'
        ></v-text-field>
    </v-flex>
    <v-flex xs4 personalInfoTitle editor-box>
      <v-icon color='#00A7F2' v-if='!phoneInput' @click='phoneInput=true' size='14'>add</v-icon>
      <v-icon class='show' v-if='phoneInput' @click='editedItem.phone = "", phoneInput=false, save()' size='14'>clear</v-icon>
      <span :style='!phoneInput ? "color: #00A7F2" : null'>Телефон<span v-if='phoneInput'>:</span></span>
    </v-flex>
    <v-flex xs8>
    <v-text-field
          solo
          flat
          v-model='editedItem.phone'
          hide-details
          @change='save'
          :autofocus='phoneInput'
          class='editor-input small-input'
          v-if='phoneInput'
        ></v-text-field>
    </v-flex>
    <v-flex xs4 personalInfoTitle editor-box>
      <v-icon color='#00A7F2' v-if='!emailInput' @click='emailInput=true' size='14'>add</v-icon>
      <v-icon class='show' v-if='emailInput' @click='editedItem.email = "", emailInput=false, save()' size='14'>clear</v-icon>
      <span :style='!emailInput ? "color: #00A7F2" : null'>Email<span v-if='emailInput'>:</span></span>
    </v-flex>
    <v-flex xs8>
    <v-text-field
          solo
          flat
          @change='save'
          v-model='editedItem.email'
          @mouseover.stop='$emit("changeTip", { section: "personalInfo", input: "mail" })'
          hide-details
          :autofocus='emailInput'
          class='editor-input'
          v-if='emailInput'
        ></v-text-field>
    </v-flex>
    <v-flex xs4 editor-box personalInfoTitle>
      <v-icon color='#00A7F2' v-if='!ageInput' @click='ageInput=true' size='14'>add</v-icon>
      <v-icon class='show' v-if='ageInput' @click='editedItem.age = "", ageInput=false, save()' size='14'>clear</v-icon>
      <span :style='!ageInput ? "color: #00A7F2" : null'>Возраст<span v-if='ageInput'>:</span></span>
    </v-flex>
    <v-flex xs8>
    <v-text-field
          v-if='ageInput'
          solo
          flat
          @change='save'
          v-model='editedItem.age'
          hide-details
          :autofocus='ageInput'
          class='editor-input'
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
          age: this.age,
          livingPlace: this.livingPlace,
          phone: this.phone,
          email: this.email,
        },
        ageInput: this.age ? true : false,
        emailInput: this.email ? true : false,
        phoneInput: this.phone ? true : false,
        placeInput: this.livingPlace ? true : false,
      }
  },
  mounted() {

  },
  computed: {

  },

  methods: {
    save() {
      const data = {};
      if (this.editedItem.age !== this.age) data.age = this.editedItem.age;
      if (this.editedItem.livingPlace !== this.livingPlace) data.livingPlace = this.editedItem.livingPlace;
      if (this.editedItem.phone !== this.phone) data.phone = this.editedItem.phone;
      if (this.editedItem.email !== this.email) data.email = this.editedItem.email;
      console.log('2', data)
      this.$emit("save", data)
    },
  },
  props: ['age', 'livingPlace', 'phone', 'email', 'font']
}
</script>

<style>

.delete-button {
  position: relative;
  top: 0;
  left: 0;
}

.editor-input div, .editor-input input{
  margin: 0;
  padding: 0;
}

.editor-input, .editor-input div, .editor-input.v-text-field.v-text-field--solo .v-input__control {
  min-height: 15px;
}

.editor-input.v-text-field.v-text-field--enclosed .v-text-field__details, .editor-input.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0;
}

.editor-box .show {
  color: #ffffff;
}

.editor-box:hover .show {
  color: rgba(0, 0, 0, 0.54);
}

.personal-info-box .theme--light.v-input:not(.v-input--is-disabled) input{
  font-size: 10px;
  line-height: 14px;
}
</style>
