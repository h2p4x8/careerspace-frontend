<template>
  <v-container tariffs>
    <v-layout row wrap >
      <!--<v-flex xs8 offset-xs2 offset-md2 md8>
        <v-layout row wrap justify-center>
          <v-flex md3 xs12 tariff-box v-for='(tariff, index) in tariffs' :text-xs-center='$vuetify.breakpoint.smAndDown'>
            <TariffCard :tariff='tariff' :index='index' @continue='makeCheckout'/>
          </v-flex>
        </v-layout>
      </v-flex>-->

      <v-flex xs10 offset-xs1 offset-md2 md8 main-title text-xs-center>
        Начни строить карьеру правильно
      </v-flex>

      <v-flex md4 offset-md4 offset-xs1 xs10 :align-self-center='$vuetify.breakpoint.mdAndUp' registration>
        <v-layout row wrap>
          <v-flex xs12 md12 section-registration input>
            <v-text-field   solo
                            flat
                            height='60'
                            single-line
                            hide-details
                            class='select input-border'
                            label="Введи свой email..."
                            v-model='email'
                            clearable>
            </v-text-field>
          </v-flex>
          <v-flex md12 xs12 align-self-end>
              <v-btn color="#F0652F"
                     large
                     depressed
                     height='62'
                     block
                     @click='userRegisterByEmail'
                     class='button'>
                <span class='header-info_button'>Начать</span>
              </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TariffCard from './TariffCard.vue';
import tariffsDesc from '../tariffsDesc';
import LoginForm from '../LoginForm.vue'

export default {
  data () {
    return {
      email: '',
    }
  },
  components: {
    TariffCard,
    LoginForm
  },
  methods: {
    ...mapActions('Chekout', [
      "makePayment",
    ]),

    ...mapActions("Auth", ["registerByEmail", 'userLogin']),

    async userRegisterByEmail(){
      if (this.isAuthenticated) return;
      const result = await this.registerByEmail({ payload: { email: this.email } })
      if (result === 'login') this.$router.push({ name: 'AuthPage', params: { email: this.email }, query: { type: 'login' } })
      else this.$router.push({ name: 'AuthPage', params: {  email: this.email }, query: { type: 'signup' } })
    },
  },
  computed: {
    ...mapGetters('Auth', [
      "isAuthenticated",
    ]),
  }
}
</script>
