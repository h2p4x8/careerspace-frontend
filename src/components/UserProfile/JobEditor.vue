<template>
    <v-layout row wrap job-editor text-xs-left>
     <v-flex xs12 info-input>
      <div class='filter-select-title'>Позиция</div>
      <v-text-field
        label="Введи название позиции"
        solo
        flat
        height='30'
        hide-details
        class='settings-input input-border'
        v-model='currentJob.positionName'
      ></v-text-field>
      <div class='filter-select-title tip' v-if='!currentJob.positionName&&tips'>Введи название позиции</div>
    </v-flex>
    <v-flex xs12 info-input chips-box :add-titles='addTitles&&currentJob.functions.length===0'>
      <div class='filter-select-title'>Функция</div>
      <v-chip :color='currentJob.functions.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
              :dark='currentJob.functions.some(elem => el.id === elem)'
              v-for='el in functions'
              @click='addFunctions(el.id)'
              :class='{"non-active" : !currentJob.functions.some(elem => el.id === elem)}'>
        {{ el.name }}
      </v-chip>
      <div class='filter-select-title tip' v-if='currentJob.functions.length === 0&&tips'>Выбери как минимум 1 функцию</div>
    </v-flex>
    <v-flex xs12 info-input>
      <div class='filter-select-title'>Компания</div>
      <v-text-field
        label="Введи название компании"
        solo
        flat
        height='30'
        hide-details
        class='settings-input input-border'
        v-model='currentJob.companyName'
      ></v-text-field>
      <div class='filter-select-title tip' v-if='!currentJob.companyName&&tips'>Введи название компании</div>
    </v-flex>
    <v-flex xs12 info-input chips-box :add-titles='addTitles&&currentJob.industry.length===0&&tips'>
      <div class='filter-select-title'>Индустрия</div>
      <v-chip :color='currentJob.industry.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
              :dark='currentJob.industry.some(elem => el.id === elem)'
              v-for='el in industry'
              @click='addIndustry(el.id)'
              :class='{"non-active" : !currentJob.industry.some(elem => el.id === elem)}'>
        {{ el.name }}
      </v-chip>
      <div class='filter-select-title tip' v-if='currentJob.industry.length === 0&&tips'>Выбери как минимум 1 индустрию</div>
    </v-flex>
    <v-flex xs8 description-save>
    <v-btn class='button' depressed color='#009954'  block dark @click='save' >
      Сохранить
    </v-btn>
    </v-flex>
    <v-flex xs4 description-return>
    <v-btn class='button' depressed color='#009954' outline block dark @click='cancel' >
      Отмена
    </v-btn>
    </v-flex>
    </v-layout>
</template>

<script>

export default {
  data() {
    return {
      currentJob: {
        functions: [],
        industry: [],
        companyName: '',
        positionName: ''
      },
      defaultJob: {
        companyName: '',
        positionName: ''
      },
      addTitles: false,
      tips: false,
    };
  },
  components: {

  },
  methods: {
    addFunctions(id) {
      if (this.currentJob.functions.find(el => el === id)) {
        const index = this.currentJob.functions.findIndex(el => el === id);
        this.currentJob.functions.splice(index, 1)
      } else {
        this.currentJob.functions.push(id)
      }
    },
    addIndustry(id) {
      if (this.currentJob.industry.find(el => el === id)) {
        const index = this.currentJob.industry.findIndex(el => el === id);
        this.currentJob.industry.splice(index, 1)
      } else {
        this.currentJob.industry.push(id)
      }
    },

    save(){
      if (!this.isActive) {
        this.tips = true;
        return;
      }
      this.tips = false;
      this.$emit("save", this.currentJob )
      this.currentJob = Object.assign({}, this.defaultJob)
    },

    cancel(){
      this.$emit("close")
      this.currentJob = Object.assign({}, this.defaultJob)
    }
  },
  beforeMount() {
    if (this.job) {
      this.currentJob = Object.assign({}, this.job)
      this.currentJob.functions = this.job.functions.map(el => el.id);
      this.currentJob.industry = this.job.industry.map(el => el.id);

      if (this.currentJob.functions.length === 0||this.currentJob.industry.length === 0) this.addTitles = true;
    }
  },
  watch: {
  },
  computed: {
    isActive(){
      return this.currentJob.functions.length > 0 && this.currentJob.industry.length > 0 && this.currentJob.companyName && this.currentJob.positionName ? true : false;
    }
  },
  props: ['functions', 'industry', 'job']
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

.add-titles .filter-select-title {
  color:#E85218
}

.job-editor .v-text-field > .job-editor .v-input__control > .v-input__slot > .v-text-field__slot,.job-editor .theme--light.v-input:not(.v-input--is-disabled) input, .job-editor .theme--light.v-input:not(.v-input--is-disabled) textarea {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
}
</style>
