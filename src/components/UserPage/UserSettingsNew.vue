<template>
  <v-layout row wrap user-settings>
    <v-layout row wrap outer-container>
      <v-flex offset-xs1 info-section inner-container>
        <v-layout row wrap v-if='!isContact'>
        <v-flex md6 xs11>
        <div class='setting-title'>Персональная информация</div>
        <div class='filter-select-title'>Email</div>
        <v-text-field
          label="Email"
          solo
          flat
          height='60'
          hide-details
          type='email'
          class='settings-input input-border'
          v-model='email'
        ></v-text-field>
        <div class='filter-select-title'>Имя</div>
        <v-text-field
          label="Имя"
          solo
          flat
          hide-details
          height='60'
          class='settings-input input-border'
          v-model='name'
        ></v-text-field>
        <div class='filter-select-title'>Фамилия</div>
        <v-text-field
          label="Фамилия"
          solo
          flat
          height='60'
          hide-details
          class='settings-input input-border'
          v-model='surname'
        ></v-text-field>
        <v-layout row wrap style='margin-bottom: 20px'>
        <v-flex xs12>
          <div class='setting-title'>Ссылка на профиль (URL)</div>
        </v-flex>
        <v-flex shrink align-self-center url-title>
          careerspace.app/@
        </v-flex>
        <v-flex grow profile-url-input telegram-input>
          <v-text-field
            label="ivanov"
            solo
            flat
            height='60'
            hide-details
            class='settings-input input-border'
            v-model='url'
            :rules="[rules.latin]"
            @change='$emit("check-availability", url)'
          ></v-text-field>
          </v-flex>
          <v-flex xs10 filter-select-title error-message v-if='userProfile.url !== url ? !urlAvailabile : false'>
            Такой url уже занят
          </v-flex>
        </v-layout>
        </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
        <v-flex xs12>
          <div class='setting-title'>Добавь ник в Telegram, чтобы расширять свой нетворк</div>
        </v-flex>
        <v-flex md6 xs11>
            <div class='filter-select-title'>Telegram</div>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex shrink align-self-center pr-1>
                    @
                </v-flex>
                <v-flex grow telegram-input>
                  <v-text-field
                    label="nickname"
                    solo
                    flat
                    height='60'
                    hide-details
                    class='settings-input input-border'
                    v-model='telegram'
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-flex xs12 button-box>
      <v-layout row wrap>
        <v-flex offset-xs1 md4 xs10>
          <v-btn class='button' block depressed color="#009654" dark @click='update'>Сохранить</v-btn>
        </v-flex>
      </v-layout>

    </v-flex>
  </v-layout>

</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      position: '',
      company: '',
      imageName: '',
      imageFile: '',
      imageUrl: '',
      telegram: '',
      rules: {
        latin: value => {
          const pattern = /\w$/;
          return pattern.test(value) || "Неправильное значение.";
        },
      },
      url: '',
    }
  },
  computed: {

  },
  components: {},
  methods: {
    ...mapActions('UserPage', [
        'changeUserAvatar',
        'refreshUserInfo',
        'cancelSubscription'
      ]),
    update() {
      const date = {};
      if (this.name != 'undefined'||typeof this.surname != 'undefined') {
        date.fullName = `${this.name} ${this.surname}`;
        if (date.fullName == ' ') date.fullName = '';
      }
      if (this.email) date.email = this.email;
      if (this.url) date.url = this.url;
      if (typeof this.telegram != 'undefined') {

        date.telegram = this.telegram.replace(' ', '').replace('@', '');
      }
      console.log(date);
      this.$emit("userInfoSave", date);
    },
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },

  },
  mounted() {
    if (this.user) {
      if (this.user.fullName) {
        this.name = this.user.fullName.split(" ")[0];
        this.surname = this.user.fullName.split(" ")[1];
      }
      this.company = this.user.company;
      this.email = this.user.email;
      this.position = this.user.position;
    }
    if (this.userProfile) {
      console.log(this.userProfile)
      this.url = this.userProfile.url
      if (this.userProfile.telegram) this.telegram = this.userProfile.telegram
    }
  },
  props: ["user", "successText", 'isContact', 'urlAvailabile', 'userProfile']
};
</script>
