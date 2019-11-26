<template>
  <v-layout row wrap v-if='subscriptionStatus' user-tariff-info>
    <v-flex xs11 offset-xs1>
      <div class='tariff-title'>
        Моя подписка
      </div>
      <div class='tariff-name-info'>
        {{ tariffPrice }} ₽/{{ getPeriod }}
      </div>
      <div class='tariff-date-info' v-if='getTariffDate'>
        Следующее списание: {{ getTariffDate }}
      </div>
    </v-flex>
    <v-flex md3  xs11 offset-md1>
      <v-btn color="#009954" outline depressed @click='$emit("cancelSubscription")' class='button' block >Отменить</v-btn>
    </v-flex>
  </v-layout>
  <v-layout row wrap v-else>
    <v-flex md4 xs9 offset-xs1 tariff-box >

            <v-flex xs12>
              <TariffConstructor :options='tariffOptions_get' :discount='discount' @makePayment='prepareToCheckout'/>
            </v-flex>
      <!--/*<TariffCard :discount='discount'
                  :promocode='promocode'
                  :tariff='tariffs.find(el => el.price.months === selectedOption.period)'
                  index='1'
                  showButton='true'
                  noTitle='true'/>
    </v-flex>
    <!--/*<v-flex md5 xs12 tariff-box offset-md1>
      <TariffCard :tariff='tariffs.find(el => el.name === "Навсегда")' index='2' showButton='true'/>
    </v-flex>*/-->
    </v-flex>
    <v-flex  md4 offset-md1 xs9 offset-xs1 >
      <v-layout row wrap promo-box :justify-center='$vuetify.breakpoint.smAndDown'>
        <v-flex shrink action-box :class='{"active": showPromo}' @click='showPromo = !showPromo'>
          Промокод
        </v-flex>
        <v-flex xs12 v-if='showPromo'>
          <div class='filter-select-title'>Промокод</div>
          <div ></div>
          <v-text-field
            label="Введи промокод"
            solo
            flat
            height='60'
            hide-details
            class='settings-input input-border'
            @keyup.native.enter='checkPromo'
            @input='errorMessage = null'
            v-model='promocode'
          ></v-text-field>
          <v-flex xs10 promocode-text v-if='!errorMessage'>
            Мы раздаем промокоды редко и в ограниченных количествах.  Не расстраивайся, вот промокод на 30% скидки, потести первый месяц — NOVEMBER19
          </v-flex>
          <v-flex xs10 filter-select-title error-message v-else>
            {{ errorMessage }}
          </v-flex>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>


<script>
import tariffs from '../tariffsDesc.js';
import TariffCard from '../Home/TariffCard.vue';
import TariffConstructor from './TariffConstructor.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      tariffs: tariffs.slice(0, 1),
      showPromo: false,
      promocode: '',
      errorMessage: null,
      discount: null,
    }
  },
  computed: {
    ...mapGetters('Chekout', [
      "tariffOptions_get",
    ]),
    getTariffTitle(){
      const result = this.tariffs.find(el => el.price.months === this.userPeriod);
      if (!result) return ''
      return `${result.secondName} подписка за ${result.price.totalPrice} ₽${result.priceTitle}`
    },
    getTariffDate(){
      if (!this.userDate) return null;
      const date = new Date(this.userDate)
      return date.toLocaleDateString('en-US')
    },
    getPeriod(){
      return this.userPeriod > 1 ? 'год' : 'месяц'
    }
  },
  components: {
    TariffCard,
    TariffConstructor
  },
  methods: {
    ...mapActions('Chekout', [
      "checkPromocode",
      'dataInit',
      'makePayment'
    ]),
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },
    async checkPromo(){
      const result = await this.checkPromocode({ payload: { name: this.promocode } })
      if (result.result) {
        this.discount = result.result.discount;
      } else {
        this.errorMessage = result.message;
      }
    },
    async prepareToCheckout(options, period){
      const data = {
        options,
        period
      }
      if (this.promocode) data.promocode = this.promocode;
      const result = await this.makePayment({ payload: data });
      console.log(result);
      if (result) document.location.assign(result)
    }
  },
  mounted() {

  },
  beforeMount(){
    this.dataInit()
  },
  beforeUpdate() {

  },
  beforeDestroy() {
    this.discount = null;
  },
  props: ["userPeriod", 'subscriptionStatus', 'userDate', 'tariffPrice', 'subscriptionOptions']
};
</script>
