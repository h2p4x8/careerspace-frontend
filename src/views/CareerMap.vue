<template>
  <div class="careerMapViewContainer">
      <CareerMap :posId="this.posId||false"/>
  </div>
</template>

<script>
import CareerMap from "@/components/careerMap/index";
import { setTimeout } from "timers";

export default {
  name: "App",
  components: {
    CareerMap
  },
  props: ["posId"],

  data() {
    return {
      loading_state: true
    };
  },
  beforeMount() {
    this.loading_state = true;
  },
  mounted() {
    let self = this;
    setTimeout(() => {
      self.loading_state = false;
    }, 1000);
  }
};
</script>
<style scoped lang="scss">
.careerMapViewContainer {
  overflow: scroll;
}
</style>