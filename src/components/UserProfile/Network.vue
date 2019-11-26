<template>
    <v-container network>
      <v-layout row wrap>
        <v-expand-transition>
          <v-flex xs12 filter-sm filter hidden-md-and-up v-show='isFilter'>
              <v-card class='filter-card'>
                <v-layout row wrap fill-height align-center>
                  <v-flex xs12 text-xs-right>
                    <v-icon @click='isFilter = false' color='#9D9D9D' size='28'>clear</v-icon>
                  </v-flex>
                  <v-flex filter-title xs12>
                    Функция
                  </v-flex>
                  <v-flex xs12 chips-box>
                    <v-chip :color='selected.functions.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                            :dark='selected.functions.some(elem => el.id === elem)'
                            v-for='el in functionsList_get'
                            @click='choseFunction(el.id)'
                            :class='{"non-active" : !selected.functions.some(elem => el.id === elem)}'>
                      {{ el.name }}
                    </v-chip>
                  </v-flex>
                  <v-flex filter-title xs12 v-if='industriesList_get.length > 0'>
                    Индустрия
                  </v-flex>
                  <v-flex xs12 v-if='industriesList_get.length > 0' chips-box>
                    <v-chip :color='selected.industry.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                            :dark='selected.industry.some(elem => el.id === elem)'
                            v-for='el in industriesList_get'
                            @click='addIndustry(el.id)'
                            :class='{"non-active" : !selected.industry.some(elem => el.id === elem)}'>
                      {{ el.name }}
                    </v-chip>
                  </v-flex>
                  <v-flex xs10 v-if='showNoData' no-data-box>
                  <p>К сожалению, в выбраном пересечении функция/индустрия людей нет.</p>
                  <p>Посмотри тех, кто работает в функции {{ getFunction }} и индустрии {{ getIndustry }}</p>
                  </v-flex>
                </v-layout>
              </v-card>
          </v-flex>
        </v-expand-transition>
        <v-flex xs10 :md4='!is_lockSidebar' :md5='is_lockSidebar' :offset-md3='!is_lockSidebar' :offset-md2='is_lockSidebar' offset-xs1>
          <ProfileCard v-for="el in usersProfile_get"
                       :key="el.id"
                       :profile="el"/>
        </v-flex>
        <v-flex offset-md1 hidden-xs-only>
        <v-layout row wrap>
          <v-flex filter>
          <v-flex filter-title xs12>
            Функция
          </v-flex>
          <v-flex xs12 chips-box>
            <v-chip :color='selected.functions.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                    :dark='selected.functions.some(elem => el.id === elem)'
                    v-for='el in functionsList_get'
                    @click='choseFunction(el.id)'
                    :class='{"non-active" : !selected.functions.some(elem => el.id === elem)}'>
              {{ el.name }}
            </v-chip>
          </v-flex>
          <v-flex filter-title xs12 v-if='industriesList_get.length > 0'>
            Индустрия
          </v-flex>
          <v-flex xs12 v-if='industriesList_get.length > 0' chips-box>
            <v-chip :color='selected.industry.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                    :dark='selected.industry.some(elem => el.id === elem)'
                    v-for='el in industriesList_get'
                    @click='addIndustry(el.id)'
                    :class='{"non-active" : !selected.industry.some(elem => el.id === elem)}'>
              {{ el.name }}
            </v-chip>
          </v-flex>
          <v-flex xs10 v-if='showNoData' no-data-box>
            <p>К сожалению, в выбраном пересечении функция/индустрия людей нет.</p>
            <p>Посмотри тех, кто работает в функции {{ getFunction }} и индустрии {{ getIndustry }}</p>
          </v-flex>
          <!--/*<h2 class='vacancy-title'>Все вакансии</h2>
          <div class='filter-select-title'>Функция</div>
                <v-select     solo
                              flat
                              class='input-border select'
                              height='60'
                              hide-details
                              label="Функция"
                              :items="getBisFunctions"
                              item-text='name'
                              single-line
                              item-value='id'
                              v-model='selected.functions'
                              clearable
                              @click:clear='selected.functions = "", makefilter(functions)'>
                </v-select>
            <div class='filter-select-title'>Индустрия</div>
                <v-select
                              solo
                              flat
                              class='input-border select'
                              height='60'
                              hide-details
                              single-line
                              label="Отрасль"
                              :items="getBisIndustries"
                              item-text='name'
                              item-value='id'
                              v-model='selected.industry'
                              clearable
                              @click:clear='selected.industry = "", makefilter(industry)'></v-select>
              <!--/*<div class='filter-select-title'>Тип компании</div>
                <v-select
                  solo
                  flat
                  chips
                  multiple
                  attach
                  class='input-border select'
                  hide-details
                  height='60'
                  single-line
                  :items="getBisTypeofCompany"
                  item-text='name'
                  item-value='id'
                  v-model='selected.typeofCompany'
                >
                <template v-slot:selection="{ item }">
                  <v-chip color='#009954' dark label large class='chips'>
                    <div class='title-small'>{{ item }}</div>
                  </v-chip>
                </template>

                </v-select>
                <v-btn color="#E85218"
                       @click='filterVacancies'
                       block
                       depressed
                       large
                       class='button'>
                  <span class='header-info_button'>Найти вакансию</span>
                </v-btn*/-->
          </v-flex>
        </v-layout>
        </v-flex>
        <v-flex filter-button hidden-sm-and-up v-if='!isFilter'>
          <v-btn dark
                 block
                 class='button'
                 color="#009654"
                 v-show='!isFilter'
                 depressed
                 @click='isFilter = !isFilter'>
                 Фильтр
          </v-btn>
        </v-flex>
      </v-layout>




    </v-container>
</template>

<script>
import ProfileCard from "./profile-card.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Network",
  components: {
    ProfileCard
  },
  methods: {
    ...mapActions('UserPage', [
      'readAllProfile',
      'getFilteredProfiles'
    ]),
    async makefilter() {
      this.showNoData = false;
      let filter=''
      for (let key of Object.keys(this.selected)) {
        if (this.selected[key].length > 0) {
          filter += key + '=' + this.selected[key] + '&'
        }
      }
      this.$router.push({ path: `/network?${filter}` });
      const result = await this.getFilteredProfiles({ payload: {selected: this.selected} });
      if (result === 'no data') this.showNoData = true;
      console.log(this.usersProfile_get)
    },
    addIndustry(id){
      if (this.selected.industry.find(el => el === id)) {
        const index = this.selected.industry.findIndex(el => el === id);
        this.selected.industry.splice(index, 1)
      } else {
        this.selected.industry.push(id)
      }
      this.makefilter()
    },
    choseFunction(id){
      if (this.selected.functions.find(el => el === id)) {
        const index = this.selected.functions.findIndex(el => el === id);
        this.selected.functions.splice(index, 1)
      } else {
        this.selected.functions.push(id)
      }
      this.makefilter();
    },
    // updateSelectedBisFunction: function(event) {
    //   this.$store.dispatch("updateSelectedBisFunction", event.target.value);
    // },
    // updateSelectedBisIndustries: function(event) {
    //   this.$store.dispatch("updateSelectedBisIndustries", event.target.value);
    // },
    // updateCompanyTypes: function(event) {
    //   this.$store.dispatch("updateCompanyTypes", event.target.value);
    // },
    // updateFilteredJobs: function(event) {
    //   this.$store.dispatch("updateFilteredJobs", event.target.value);
    // }
  },
  computed: {
    ...mapGetters("UserPage", [
      'is_lockSidebar',
      'subscriptionStatus_get',
      'usersProfile_get',
      'functionsList_get',
      'industriesList_get'
    ]),

    getFunction(){
      const res = this.selected.functions.map(el => {
        return this.functionsList_get.find(func => func.id === el).name;
      })
      return res.join('/')
    },

    getIndustry(){
      const res = this.selected.industry.map(el => {
        return this.industriesList_get.find(func => func.id === el).name;
      })
      return res.join('/')
    }

  },
  async beforeMount() {
  document.title = 'Нетворк';
    await this.readAllProfile()
    if (Object.keys(this.$route.query).length > 0) {
      const selected = Object.assign({}, this.$route.query);
      if (selected.industry ? selected.industry.length > 0 : false) {
        selected.industry = selected.industry.split(',').map(el => Number.parseInt(el) );
      } else selected.industry = []
      if (selected.functions ? selected.functions.length > 0 : false) {
        selected.functions = selected.functions.split(',').map(el => Number.parseInt(el) );
      } else selected.functions = []
      this.selected = Object.assign({}, selected)
      const result = await this.getFilteredProfiles({ payload: {selected: this.selected} })
      if (result === 'no data') this.showNoData = true;
    }
  },
  data() {
    return {
      isFilter: false,
      selected: {
        industry: [],
        functions: [],
        //typeofCompany: '',
      },
      showNoData: false,
    }
  },
  beforeDestroy(){
  },
};
</script>

<style>
  .v-chip.non-active:hover {
    box-shadow: 0 0 0 1px #009954;
    color: #009954;
  }

  .v-chip {
    box-shadow: none;
    margin: 0 5px 5px 0;
  }

  .v-chip:active {
    background: #00723e;
    color: #e0e0e0;
  }

  .filter-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 29px;
    margin-bottom: 15px;
  }

  .chips-box {
    margin-bottom: 30px;
  }

  .v-chip {
    min-width: 100px;
  }

  .chips-box .v-chip:focus{
    box-shadow: none;
  }

  .v-chip .v-chip__content {
    margin: 0 auto;
  }
</style>
