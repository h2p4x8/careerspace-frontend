<template>
  <v-container auth-page fill-height>
    <v-layout row wrap align-center fill-height>
    <v-flex offset-md4 md4 offset-xs1 xs10>
      <v-layout auth-box row wrap justify-center>
        <v-flex xs12 text-xs-center title-box>
          {{ type }}
        </v-flex>
        <v-flex xs12>
          <v-btn color="#E85218"
                 large
                 depressed
                 height='60'
                 block
                 dark
                 v-if='!success'
                 href='/api/google-auth'
                 class='button'
                 style='margin: 0'>
            {{ type === 'Вход' ? 'Войти' : 'Зарегистрироваться'}} с помощью Google Account
          </v-btn>
        </v-flex>
        <v-flex xs12 email-box >
          <div class='filter-select-title' v-if='showInput'>Email</div>
          <v-text-field   solo
                          flat
                          type='email'
                          height='60'
                          single-line
                          hide-details
                          v-if='showInput'
                          class='select input-border'
                          label="Введи свой email..."
                          v-model='email'
                          @keyup.native.enter='userRegisterByEmail()'
                          clearable>
          </v-text-field>
          <v-btn color="#009954"
                 outline
                 large
                 depressed
                 height='62'
                 block
                 light
                 v-if='!success'
                 @click='showInput ? userRegisterByEmail() : showInput = true'
                 class='button'>
            {{type === 'Вход' ? 'Войти' : 'Зарегистрироваться' }} с помощью email
          </v-btn>
        </v-flex>
        <v-flex xs12 password-box v-if='success'>
          <v-flex md6  xs8 offset-xs2 offset-md3 text-xs-center>
            Мы только что отправили тебе временный пароль. Пожалуйста, проверь свою почту.
          </v-flex>
          <div class='filter-select-title'>Пароль</div>
          <v-text-field   solo
                          flat
                          height='60'
                          single-line
                          hide-details
                          class='select input-border'
                          @keyup.native.enter='userLoginByTemPass'
                          label="Введите полученный пароль..."
                          v-model='password'
                          clearable>
          </v-text-field>
            <v-btn large
                   depressed
                   height='62'
                   block
                   color="#009954"
                   outline
                   @click='userLoginByTemPass'
                   class='button'>
                   Продолжить с временным паролем
            </v-btn>
        </v-flex>
        <v-flex xs10 md6 terms-text text-xs-center>
          Входя на сайт вы принимаете условия <Terms title='пользовательского соглашения' type='string'/>
        </v-flex>
      </v-layout>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Terms from '../Terms_and_Conditions/Terms.vue';

export default {
  data () {
    return {
      password: '',
      email: '',
      errorMessage: '',
      type: 'Вход',
      success: false,
      showInput: false,
    }
  },
  components: {
    Terms,
  },
  methods: {
    ...mapActions("Auth", ["registerByEmail", 'userLogin', 'authByGoogle']),
    ...mapActions("UserPage", ["showOnboarding"]),

    async userRegisterByEmail(){
      const result = await this.registerByEmail({ payload: { email: this.email } });
      if (result) this.success = true;
      if (result !== this.$route.query.type) {
        this.$router.push({ name: 'AuthPage', query: { type: result }})
        if (result === 'login') {
          this.type = 'Вход'
        } else {
          this.type = 'Регистрация'
        }
      }
    },

    async userLoginByTemPass() {
        const data = {
          email: this.email,
          password: this.password
        }

        const result = await this.userLogin({ payload: { data } });
        console.log(result)

        if (result){
          this.$router.push({ name: 'JobsFlow' })
        }
      }
  },
  beforeMount(){
    if (this.$route.query.type === 'login') {
      this.type = 'Вход'
    } else if (this.$route.query.type === 'signup'){
      this.type = 'Регистрация'
    } else if (this.$route.query.type === 'gauth'){
      this.authByGoogle()
          .then(res => {
            console.log('this.$route.query.user', this.$route.query.user)
            if (this.$route.query.user === 'new') {
              this.showOnboarding({ payload: true })
            }
            if (res) this.$router.push({ name: 'JobsFlow' })
            else this.$router.push({ name: 'AuthPage', query: { type: 'login' } });
          })
    }
    if (this.$route.params.email) {
      this.email = this.$route.params.email;
      this.success = true;
      this.showInput = true;
    }
  }
}
</script>

<style>
.auth-page {
  padding: 0;
}

.resume-card-box .button {
  margin-bottom: 64px;
}

.email-box {
  margin-bottom: 20px;
}

.auth-page .button {
  margin-top: 10px;
}

.email-box .filter-select-title {
  margin-top: 30px;
}

.auth-page .title-box {
  font-size: 32px;
  line-height: 44px;
  font-weight: 700;
  margin-bottom: 25px;
}

.terms-text {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #9D9D9D
}


@media only screen and (max-width: 600px) {
  .auth-page {
    margin:0;
  }

  .auth-box {
    margin-top: 102px;
    margin-bottom: 82px;
  }
  .auth-page .title-box {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 30px;
  }

}
</style>
