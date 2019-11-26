<template>
  <v-container tools-menu>
    <v-layout wrap row :fill-height='$vuetify.breakpoint.mdAndU'>
      <v-flex md2 xs12 menu-links>
        <v-container menu-bar>
        <v-layout row wrap align-start :text-xs-center='$vuetify.breakpoint.smAndDown'>
          <v-flex md12 xs4  v-for='link in navLinks' action-box @click='makeAction(link.action)' :class='{"active": isActive(link.action)}'>
            {{ link.title }}
          </v-flex>
          <v-spacer>
          </v-spacer>
        </v-layout>
        </v-container>
      </v-flex>
      <v-flex md10 xs12 v-if='profile||contact'>
        <UserSettingsNew :user='user'
                         @userInfoSave='userInfoSave'
                         @changeAvatar='changeAvatar'
                         :isContact='contact'
                         @check-availability='checkAvailability'
                         :urlAvailabile='urlAvailabile'
                         :userProfile = 'userProfile'/>
      </v-flex>
      <v-flex md10 xs11 offset-xs1  offset-md0 v-if='subscription' prices-box>
        <Prices :subscriptionStatus='subscriptionStatus'
                :subscriptionOptions='subscriptionOptions'
                :tariffPrice='user.subscriptionPrice'
                :userPeriod='user.subscriptionPeriod'
                :userDate='user.subscriptionDateTo'
                @cancelSubscription='$emit("cancelSubscription")'/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserSettingsNew from './UserSettingsNew.vue'
import Prices from './Prices.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      navLinks: [
        {
          title: "Профиль",
          action: "profile"
        },
        {
          title: "Контакты",
          action: "contact"
        },
        {
          title: "Подписка",
          action: "subscription"
        },
        {
          title: "Выйти",
          action: "logOut"
        },
      ],
      profile: true,
      subscription: false,
      contact: false,
    }
  },
  components: {
    UserSettingsNew,
    Prices
  },
  methods: {
    ...mapActions('Auth', [
      "userLogout",
    ]),
    async makeAction(action) {
      if ( action === 'logOut') {
          const result = await this.userLogout()
          if (result) this.$router.go();
        } else {
          this.profile = false;
          this.subscription = false;
          this.contact = false;
          this[action] = true;
        }
      },

      userInfoSave(data){
        this.$emit('userInfoSave', data)
      },
      changeAvatar(data){
        this.$emit('changeAvatar', data)
        console.log(data)
      },
      isActive(name){
        return this[name];
      },
      checkAvailability(data) {
        console.log(data)
        this.$emit('check-availability', data)
      }
  },
  computed: {

  },
  props: ["user", 'subscriptionStatus', 'openPrices', 'subscriptionOptions', 'urlAvailabile', 'userProfile', 'toolsType'],

  mounted(){
    if(this.toolsType === 'telegram') {
      this.subscription = false;
      this.profile = false;
      this.contact = true;
    } else if (this.toolsType === 'name'||this.toolsType === 'url') {
      this.subscription = false;
      this.profile = true;
      this.contact = false;
    } else if (this.toolsType === 'tariff') {
      console.log(this.toolsType )
      this.subscription = true;
      this.profile = false;
    }
  },
};
</script>
