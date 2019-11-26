<template>
    <v-layout row wrap description-editor>
      <v-flex xs12 description-title filter-select-title>
        Короткий рассказ о себе
      </v-flex>
      <v-flex xs12 description-textarea>
        <v-textarea
          solo
          flat
          rows='6'
          class='input-border'
          v-model='text'
          row-height='17'
          auto-grow
          label='Кратко расскажи о себе.'
          @keyup.native.enter='$emit("save", { description: text })'
        ></v-textarea>
      </v-flex>
      <v-flex xs12 counter text-xs-right :error-orange='getTextCount > 150'>
        {{ getTextCount }}/150
      </v-flex>
      <v-flex xs8 description-save>
      <v-btn class='button' :disabled='getTextCount > 150' depressed color='#009954'  block :dark='getTextCount <= 150' :light='getTextCount > 150' @click='$emit("save", { description: text })' >
        Сохранить
      </v-btn>
      </v-flex>
      <v-flex xs4 description-return>
      <v-btn class='button' depressed color='#009954' outline block dark @click='$emit("close")' >
        Отмена
      </v-btn>
      </v-flex>
    </v-layout>
</template>

<script>

export default {
  data() {
    return {
      text: ''
    };
  },
  components: {

  },
  methods: {

  },
  beforeMount() {
    if (this.description) this.text = this.description
  },
  watch: {
  },
  computed: {
    getTextCount(){
      return this.text.length;
    }
  },
  props: ['description']
};
</script>

<style>

.personal-ids {
  padding-left: 10px;
}

.personal-name {
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
}

.personal-url {
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
}

.profile-page .profile-image{
  padding: 5px;
  border-radius: 100px;
}



.profile-page  .description {
  padding: 10px;
  border-radius: 3px;
  font-weight: 300;
}

.profile-page  .description.no-text{
  color: #9D9D9D;
}

.profile-page .add-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: #9D9D9D;
  padding: 10px;
  border-radius: 3px;
}



.profile-page .grey-hover:hover {
  background: rgba(196, 196, 196, 0.4);
  color: #414141;
  cursor: pointer;
}

.need-to-fill .fill-title {
  margin-bottom: 10px;
}

.profile-head-box {
  margin-bottom: 34px;
  margin-top: 100px;
}

.counter {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  margin: 5px 0;
}

.counter.error-orange {
  color: #E85218;
}
</style>
