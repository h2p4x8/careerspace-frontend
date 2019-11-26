<template>
  <div class='home-page'>
    <GreetingSection />
    <AboutCareerMap />
    <AboutVacancy />
  </div>
</template>

<script>
import GreetingSection from "../components/Home/GreetingSection";
import AboutCareerMap from "../components/Home/AboutCareerMap";
import AboutVacancy from '../components/Home/AboutVacancy.vue';

export default {
  name: 'App',
  components: {
    GreetingSection,
    AboutCareerMap,
    AboutVacancy
  },
  data () {
    return {
      //
    }
  },
  mounted(){
    document.title = 'careerspace — всё что нужно для карьеры мечты'
  }
}
</script>
