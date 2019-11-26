<template>
    <v-container jobs-flow>
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
                    <v-chip :color='selected.mapFunction.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                            :dark='selected.mapFunction.some(elem => el.id === elem)'
                            v-for='el in getBisFunctions'
                            @click='choseFunction(el.id)'
                            :class='{"non-active" : !selected.mapFunction.some(elem => el.id === elem)}'>
                      {{ el.name }}
                    </v-chip>
                  </v-flex>
                  <v-flex filter-title xs12 v-if='getBisIndustries.length > 0'>
                    Индустрия
                  </v-flex>
                  <v-flex xs12 v-if='getBisIndustries.length > 0' chips-box>
                    <v-chip :color='selected.industry.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                            :dark='selected.industry.some(elem => el.id === elem)'
                            v-for='el in getBisIndustries'
                            @click='addIndustry(el.id)'
                            :class='{"non-active" : !selected.industry.some(elem => el.id === elem)}'>
                      {{ el.name }}
                    </v-chip>
                  </v-flex>
                  <v-flex xs10 v-if='showNoData' no-data-box>
                    <p>К сожалению, в выбраном пересечении функция/индустрия вакансий нет.</p>
                    <p>Посмотри другие вакансии из функции {{ getFunction }} и индустрии {{ getIndustry }}</p>
                  </v-flex>
                </v-layout>
              </v-card>
          </v-flex>
        </v-expand-transition>
        <v-flex xs10 :md4='!is_lockSidebar' :md5='is_lockSidebar' :offset-md3='!is_lockSidebar' :offset-md2='is_lockSidebar' offset-xs1>
          <JobCard v-for="job in getJobsList" :key="job.id" :job="job"/>
        </v-flex>
        <v-flex offset-md1 hidden-xs-only>
        <v-layout row wrap>
          <v-flex filter>
          <v-flex filter-title xs12>
            Функция
          </v-flex>
          <v-flex xs12 chips-box>
            <v-chip :color='selected.mapFunction.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                    :dark='selected.mapFunction.some(elem => el.id === elem)'
                    v-for='el in getBisFunctions'
                    @click='choseFunction(el.id)'
                    :class='{"non-active" : !selected.mapFunction.some(elem => el.id === elem)}'>
              {{ el.name }}
            </v-chip>
          </v-flex>
          <v-flex filter-title xs12 v-if='getBisIndustries.length > 0'>
            Индустрия
          </v-flex>
          <v-flex xs12 v-if='getBisIndustries.length > 0' chips-box>
            <v-chip :color='selected.industry.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                    :dark='selected.industry.some(elem => el.id === elem)'
                    v-for='el in getBisIndustries'
                    @click='addIndustry(el.id)'
                    :class='{"non-active" : !selected.industry.some(elem => el.id === elem)}'>
              {{ el.name }}
            </v-chip>
          </v-flex>
          <v-flex xs10 v-if='showNoData' no-data-box>
            <p>К сожалению, в выбраном пересечении функция/индустрия вакансий нет.</p>
            <p>Посмотри другие вакансии из функции {{ getFunction }} и индустрии {{ getIndustry }}</p>
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
                              v-model='selected.mapFunction'
                              clearable
                              @click:clear='selected.mapFunction = "", makefilter(mapFunction)'>
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
                 Фильтровать вакансии
          </v-btn>
        </v-flex>
      </v-layout>




    </v-container>
</template>

<script>
import JobCard from "@/components/Vacancies/jobCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "jobsflow",
  components: {
    JobCard
  },
  methods: {
    ...mapActions('VacancyFlow', [
      'dataCreate',
      'dataInit',
      'filterJobsList',
      'getFilteredVacancies',
      'refreshData'
    ]),
    ...mapActions("UserPage", ['showAttention']),
    async filterVacancies() {
      this.showNoData = false;
      let filter=''
      for (let key of Object.keys(this.selected)) {
        if (this.selected[key].length > 0) {
          filter += key + '=' + this.selected[key] + '&'
        }
      }
      this.$router.push({ path: `/jobs?${filter}` });
      const result = await this.getFilteredVacancies({ payload: {selected: this.selected} });
      if (result === 'no data') this.showNoData = true;
      //console.log(this.getJobsListFiltered)
    },
    makefilter(){
      this.filterVacancies()
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
      if (this.selected.mapFunction.find(el => el === id)) {
        const index = this.selected.mapFunction.findIndex(el => el === id);
        this.selected.mapFunction.splice(index, 1)
      } else {
        this.selected.mapFunction.push(id)
      }
      this.makefilter();
    }
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
    ...mapGetters('VacancyFlow', [
      "getBisFunctions",
      "getBisIndustries",
      "getBisTypeofCompany",
      "getJobsList",
      "getJobsListFiltered"
    ]),
    ...mapGetters("UserPage", [
      'is_lockSidebar',
      'subscriptionStatus_get'
    ]),
    ...mapGetters('VacancyCreator', ['vacancyListDyId_get']),

    getFunction(){
      const res = this.selected.mapFunction.map(el => {
        return this.getBisFunctions.find(func => func.id === el).name;
      })
      return res.join('/')
    },

    getIndustry(){
      const res = this.selected.industry.map(el => {
        return this.getBisIndustries.find(func => func.id === el).name;
      })
      return res.join('/')
    }

  },
  async beforeMount() {
    await this.refreshData();
    if (Object.keys(this.$route.query).length > 0) {
      console.log('1')
      const selected = Object.assign({}, this.$route.query);
      if (selected.industry ? selected.industry.length > 0 : false) {
        selected.industry = selected.industry.split(',').map(el => Number.parseInt(el) );
      } else selected.industry = []
      if (selected.mapFunction ? selected.mapFunction.length > 0 : false) {
        selected.mapFunction = selected.mapFunction.split(',').map(el => Number.parseInt(el) );
      } else selected.mapFunction = []
      this.selected = Object.assign({}, selected)

      this.getFilteredVacancies({ payload: {selected: this.selected} })
    } else if (this.$route.params.byId) {
      this.getFilteredVacancies({ payload: {selected: null, byId: true} })
    }
  },
  data() {
    return {
      isFilter: false,
      selected: {
        industry: [],
        mapFunction: [],
        //typeofCompany: '',
      },
      showNoData: false,
    }
  },
  beforeDestroy(){
    this.showAttention({ payload: false })
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

  .outer-container {
    height: 550px;
    overflow: hidden;
  }

  .inner-container {
    height: 100%;
    margin-right: -50px;
    padding-right: 50px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
