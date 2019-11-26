<template>
  <v-container>
    <v-layout row wrap fill-height justify-center onboarding-box>
      <v-flex md4 xs10>
        <v-layout row wrap>
            <v-flex xs12 greating-title text-xs-center>
              Добро пожаловать!
            </v-flex>
            <v-flex xs12 greating-text text-xs-center>
              Заполни базовую информацию о себе, чтобы не вводить её по несколько раз.
            </v-flex>
            <v-flex xs6 progress-rectangle pr-1 active>
              <div></div>
            </v-flex>
            <v-flex xs6 progress-rectangle pl-1 :active='careerInfoSetting'>
              <div></div>
            </v-flex>
            <v-flex xs12 personal-info-onboarding v-if='profileInfoSetting'>
              <v-layout row wrap>
              <v-flex xs12 info-input>
                <div class='filter-select-title'>Имя</div>
                <v-text-field
                  label="Иван"
                  solo
                  flat
                  height='60'
                  type='name'
                  hide-details
                  class='settings-input input-border'
                  v-model='name'
                ></v-text-field>
              </v-flex>
              <v-flex xs12 info-input>
                <div class='filter-select-title'>Фамилия</div>
                <v-text-field
                  label="Иванов"
                  solo
                  flat
                  height='60'
                  hide-details
                  class='settings-input input-border'
                  v-model='surname'
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <div class='filter-select-title'>Ссылка на твой профиль (URL)</div>
              </v-flex>
              <v-flex shrink align-self-center url-title>
                careerspace.app/@
              </v-flex>
              <v-flex grow profile-url-input>
                <v-text-field
                  label="ivanov"
                  solo
                  flat
                  height='60'
                  hide-details
                  class='settings-input input-border'
                  v-model='url'
                  :rules="[rules.latin]"
                  @change='$emit("check-availability", url)'
                ></v-text-field>
              </v-flex>
              <v-flex xs6 offset-xs5 filter-select-title error-message v-if='!urlAvailabile' text-xs-rigth>
                Такой url уже занят
              </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 career-info-box v-else>
              <v-layout row wrap>
              <v-flex xs12 info-input>
                <div class='filter-select-title'>Позиция</div>
                <v-text-field
                  label="Аналитик"
                  solo
                  flat
                  height='60'
                  hide-details
                  class='settings-input input-border'
                  v-model='position'
                ></v-text-field>
              </v-flex>
              <v-flex xs12 info-input chips-box>
                <div class='filter-select-title'>Функция</div>
                <v-chip :color='functions.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                        :dark='functions.some(elem => el.id === elem)'
                        v-for='el in functionList'
                        @click='addFunctions(el.id)'
                        :class='{"non-active" : !functions.some(elem => el.id === elem)}'>
                  {{ el.name }}
                </v-chip>
              </v-flex>
              <v-flex xs12 info-input>
                <div class='filter-select-title'>Компания</div>
                <v-text-field
                  label="careerspace"
                  solo
                  flat
                  height='60'
                  hide-details
                  class='settings-input input-border'
                  v-model='company'
                ></v-text-field>
              </v-flex>
              <v-flex xs12 info-input chips-box>
                <div class='filter-select-title'>Индустрия</div>
                <v-chip :color='industry.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                        :dark='industry.some(elem => el.id === elem)'
                        v-for='el in industryList'
                        @click='addIndustry(el.id)'
                        :class='{"non-active" : !industry.some(elem => el.id === elem)}'>
                  {{ el.name }}
                </v-chip>
              </v-flex>
              </v-layout>
            </v-flex>
          <v-flex xs12 button-box>
            <v-btn class='button' block depressed :disabled='!url' color="#009654" :dark='url ? true : false' outline @click='makeProgress'>{{ profileInfoSetting ?  'Продолжить' : 'Готово'}}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import translit from '../translit'

export default {
  data() {
    return {
      name: '',
      surname: '',
      position: '',
      company: '',
      url: '',
      profileInfoSetting: true,
      careerInfoSetting: false,
      functions: [],
      industry: [],
      rules: {
        latin: value => {
          const pattern = /\w$/;
          return pattern.test(value) || "Неправильное значение.";
        }
      },
    }
  },
  components: {

  },
  methods: {
    update() {
      const date = {};

      if (this.name || this.surname)
        date.fullName = `${this.name} ${this.surname}`;
      if (this.company) date.company = this.company;
      if (this.email) date.email = this.email;
      if (this.position) date.position = this.position;
      if (this.url) date.url = this.url;
      if (this.functions.length > 0) date.functions = this.functions;
      if (this.industry.length > 0) date.industry = this.industry;
      this.$emit("userInfoSave", date);

    },

    makeProgress(){
      if (this.profileInfoSetting) {
        this.profileInfoSetting = false;
        this.careerInfoSetting = true;
      } else this.update()
    },

    addFunctions(id) {
      if (this.functions.find(el => el === id)) {
        const index = this.functions.findIndex(el => el === id);
        this.functions.splice(index, 1)
      } else {
        this.functions.push(id)
      }
    },
    addIndustry(id) {
      if (this.industry.find(el => el === id)) {
        const index = this.industry.findIndex(el => el === id);
        this.industry.splice(index, 1)
      } else {
        this.industry.push(id)
      }
    },

    createUrl(){

    }
  },
  watch: {
    name(oldVal, newVal) {
      if (newVal !== oldVal) {
        if (this.surname) {
          const name = translit.rus_to_latin(this.name).slice(0,1).toLowerCase();
          const surname = translit.rus_to_latin(this.surname).toLowerCase();
          this.url = `${name}.${surname}`
        }
      }
    },

    surname(oldVal, newVal) {
      if (newVal !== oldVal) {
        if (this.name) {
          const name = translit.rus_to_latin(this.name).slice(0,1).toLowerCase();
          const surname = translit.rus_to_latin(this.surname).toLowerCase();
          this.url = `${name}${surname}`
        }
      }
    },
    url(oldVal, newVal){
      if (newVal !== oldVal) {
        this.$emit("check-availability", this.url)
      }
    }
  },
  mounted() {
    console.log(this.user)
    if (this.user) {
      if (this.user.fullName) {
        this.name = this.user.fullName.split(" ")[0];
        this.surname = this.user.fullName.split(" ")[1];
      }
      this.position = this.user.position;
      this.company = this.user.company;
    }
  },
  computed: {

  },
  props: [ 'user', 'functionList', 'industryList', 'urlAvailabile' ],
  beforeMount() {

  }
};
</script>
