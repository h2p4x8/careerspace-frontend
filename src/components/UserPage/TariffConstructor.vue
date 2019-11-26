<template>
  <v-layout row wrap tariff-constructor>
          <v-flex xs12 tariff_name>
            Собери свою подписку
          </v-flex>
          <v-flex xs12 tariff_price>
            <span class='price'> {{ getPrice.toLocaleString('ru-RU') }}</span> ₽/{{ getPeriod }}
          </v-flex>
          <v-layout row wrap justify-center>
          <v-flex toogle-box :hover='hover' xs12 text-xs-center>
                    <div class='custom-toogle'
                          :class='selectedPerid.name === el.name ? "active" : "non-active"'
                          v-for='el in tariffPeriods'
                          @click='selectedPerid = el'
                          @mouseover='selectedPerid === el ? "" : hover = true'
                          @mouseout='selectedPerid === el ? "" : hover = false'
                          >
                            {{ el.name }}
                          </div>
          </v-flex>
          <v-flex xs12 text-xs-center chips-box>
          <v-chip :color='selectedOptions.some(elem => el.id === elem) ? "#009954" : "#F9F9F9"'
                  :dark='selectedOptions.some(elem => el.id === elem)'
                  v-for='el in options'
                  @click='choseTariff(el.id)'
                  :class='{"non-active" : !selectedOptions.some(elem => el.id === elem)}'>
            {{ el.title }}
          </v-chip>
          </v-flex>
          </v-layout>

      <v-flex xs12>

    <v-btn depressed
           block
           class='button outlined'
           color="#E85218"
           height='60'
           @click='$emit("makePayment", selectedOptions, selectedPerid.period)'
           dark>
            Инвестировать в себя
          </v-btn>
    </v-flex>
  </v-layout>
</template>


<script>


export default {
  data() {
    return {
      hover: false,
      tariffPeriods: [
        {
          name: 'Месяц',
          period: 1
        },
        {
          name: 'Год',
          period: 10
        }
      ],
      selectedPerid: {
        name: 'Месяц',
        period: 1
      },
      selectedOptions: [],
    }
  },
  computed: {

    getPrice(){
      let res = 0;
      if (this.selectedOptions.length > 1) {
          this.selectedOptions.forEach((el, index) => {
            if (index === 0) return;
            res += this.options[0].price - (this.options[0].price * 10 * index / 100 );
          })
      };
      const pricePerMonth = this.selectedOptions.length > 0 ? (this.selectedOptions.length > 1) ? this.options[0].price + res : this.options[0].price : 0;
      return pricePerMonth * this.selectedPerid.period - (this.discount ? (pricePerMonth * this.selectedPerid.period) * this.discount / 100 : 0);
    },

    getPeriod(){
      return this.selectedPerid.name.toLowerCase()
    }
  },
  components: {

  },
  methods: {
    choseTariff(id){
        if (this.selectedOptions.find(el => el === id)) {
          const index = this.selectedOptions.findIndex(el => el === id);
          this.selectedOptions.splice(index, 1)
        } else {
          this.selectedOptions.push(id)
        }
    }
  },
  mounted() {

  },
  beforeUpdate() {

  },
  beforeDestroy() {

  },
  props: ["discount", 'options',]
};
</script>
