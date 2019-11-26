<template>
  <v-flex xs4 cv-tips>
    <v-layout ref='tipsBox' outer-tips-container v-show='tipToShow.section.commonInfo || tipToShow.input'>
      <div class='inner-tips-container'>
      <v-layout row wrap align-start>
        <v-flex xs12 cv-sector-title>
          <h2>{{ tipToShow.section.title }}</h2>
        </v-flex>
        <v-flex xs12 cv-sector-tip>
          {{ tipToShow.section.commonInfo }}
        </v-flex>
        <v-flex xs12 v-if='tipToShow.input'>
          <v-layout row wrap>
          <v-flex xs12 cv-sector-input-title>
            <h2>{{ tipToShow.input.title }}</h2>
          </v-flex>
          <v-flex xs12 cv-sector-input-tip>
            {{ tipToShow.input.tips }}
          </v-flex>
          <v-flex xs6 cv-sector-input-example>
            <div class='cv-sector-input-title-example-title good'>Хорошо</div>
            <div class='cv-sector-input-title-example-text' v-for='good in tipToShow.input.good'>{{ good }}</div>
          </v-flex>
          <v-flex xs6 cv-sector-input-example>
          <div class='cv-sector-input-title-example-title'>Плохо</div>
          <div class='cv-sector-input-title-example-text' v-for='bad in tipToShow.input.bad'>{{ bad }}</div>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-flex>
      </v-layout>
      </div>
    </v-layout>

  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import tipsText from './CV-Editor-Tips';
const tips = tipsText;

export default {
  components: {

  },
  data () {
      return {
      }
  },

  computed: {
    tipToShow(){
      return {
                section: tips[this.section.section],
                input: tips[this.section.section].inputs ? tips[this.section.section].inputs.find(el => el.name === this.section.input) : null,
            }
    }
  },

  methods: {

  },
  props: ['section'],
  mounted(){

      window.onscroll = () => {
      if (this.$route.name !== 'ResumeTool') return;
  		var scroll = document.documentElement.scrollTop || document.body.scrollTop;
  		if(scroll >= 70){
  			this.$refs.tipsBox.style.top = 130 + 'px';
        this.$refs.tipsBox.style.position = 'fixed';
        this.$refs.tipsBox.style.maxWidth = "360px";
  		} else {
        this.$refs.tipsBox.style = {};
      }
	  }

  }
}
</script>

<style>

.cv-tips {
  padding-left: 23px;
  font-size: 12px;
  line-height: 16px;
}


.cv-sector-title h2{
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  padding-bottom: 19px;
  text-transform: none;
}

.cv-sector-title{
  padding-bottom: 19px;
}

.cv-sector-input-title h2{
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}

.cv-sector-input-title{
  margin-top: 40px;
  margin-bottom: 15px;
}

.cv-sector-input-tip {
  margin-bottom: 27px;
}

.cv-sector-input-title-example-title {
  margin-bottom: 11px;
}

.cv-sector-input-title-example-text {
  font-style: italic;
  margin-bottom: 5px;
}

.cv-sector-input-example .good{
  color: #009654
}

.outer-tips-container {
  height: 543px;
}

.inner-tips-container {
  height: 100%;
  margin-bottom: -50px; /* maximum width of scrollbar */
  padding-bottom: 50px; /* maximum width of scrollbar */
  overflow-y: scroll;
  overflow-x: hidden;
}

.inner-tips-container::-webkit-scrollbar {
  display: none;
}
</style>
