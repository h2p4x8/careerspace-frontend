<template>
    <v-layout row wrap>
      <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 tariff_name v-if='!noTitle'>
              {{ tariff.name }}
            </v-flex>
            <v-flex xs12 tariff_price>
              <span class='price'> {{ getPrice.toLocaleString('ru-RU') }}</span> ₽{{ tariff.priceTitle }}
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
        <v-card class='tariff_card'>
        <v-card-text class='points'>
          <v-layout row wrap tariff_text align-center v-for='point in tariff.includes'>
            <v-flex xs12 plus>
              {{ point }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-btn depressed
             block
             class='button outlined'
             color="#E85218"
             :flat='index % 2 === 0'
             height='60'
             dark
             v-if=showButton
             @click='prepareToCheckout'>
              Инвестировать в себя
            </v-btn>
      </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data () {
    return {

    }
  },
  computed: {
    getPrice(){
      return this.discount ? Math.round(this.tariff.price.totalPrice -  (this.discount * this.tariff.price.totalPrice / 100)) : this.tariff.price.totalPrice;
    }
  },
  props: ['tariff', 'index', 'showButton', 'noTitle', 'discount', 'promocode'],
  methods: {
    ...mapActions('Chekout', [
      "makePayment",
    ]),

    async prepareToCheckout() {
      const data = {
        name: this.tariff.price.subscriptionName,
      }
      if (this.promocode) data.promocode = this.promocode;
      const result = await this.makePayment({ payload: data });
      console.log(result);
      if (result) document.location.assign(result)
    }
  }
}
</script>
