<template>
  <v-container greeting-section>
          <v-layout row wrap :fill-height='$vuetify.breakpoint.mdAndUp' >
            <v-flex md6 offset-md3 xs12 text-xs-center greeting-section_info_title>
              Строй карьеру <br> через комьюнити <span>careerspace</span>
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
import { mapActions, mapGetters } from "vuex";
import LoginForm from '../LoginForm';
import DropdownMenu from '../DropdownMenu';
import Header from '../Header.vue'


export default {
  components: {
    LoginForm,
    DropdownMenu,
  },
  data () {
    return {
      tool: false,
      gradient: 'to top right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)',
      links:[
        {
          href: 'https://t.me/bezaspera',
          title: 'Медиа'
        }
      ],
      routerLinks: [
        {
          to: "/career-map",
          title: "Карьерная карта"
        },
        {
          to: '/jobsflow',
          title: 'Вакансии'
        },
      ],
      email: '',
      password: '',
      registerSuccess: false,
    }
  },

  computed: {
    ...mapGetters("Auth", ["isAuthenticated"]),
    isShowDrop() {
      return this.$vuetify.breakpoint.smAndDown ? true : false;
    },
    getAllLinks() {
      const newlinkList = [];

      this.routerLinks.forEach( el => newlinkList.push(el))
      this.links.forEach( el =>  newlinkList.push(el) )

      return newlinkList;
    }
  },
  methods: {
    ...mapActions("Auth", ["registerByEmail", 'userLogin']),

    async userRegisterByEmail(){
      if (this.isAuthenticated) return;
      const result = await this.registerByEmail({ payload: { email: this.email } })
      if (result === 'login') this.$router.push({ name: 'AuthPage', params: { email: this.email }, query: { type: 'login' } })
      else this.$router.push({ name: 'AuthPage', params: {  email: this.email }, query: { type: 'signup' } })
    },
  }

}
</script>
