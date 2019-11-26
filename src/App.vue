<template>
  <div id="app">
    <v-app>
      <Header v-if='!isAuthenticated'/>
      <UserPage v-else @lock='lockSidebar = true' @flow='lockSidebar = false' :lockSidebarMain='lockSidebar' :openPrices='openPrices' @openedPrices='openPrices = false'/>
      <v-content :style='{"margin-top": isAuthenticated ? "70px" : $vuetify.breakpoint.smAndDown ? "" : "50px"}'>
        <v-container style='padding: 0; overflow-x: hidden' :fill-height='$route.name === "AuthPage"' :fluid='isAuthenticated'>
          <v-layout row wrap v-if='isAuthenticated' :mainpage='isAuthenticated' :lock-sidebar='lockSidebar&&isAuthenticated'>
              <v-flex v-if='isShowAttention'>
                <AttentionForFreeUser @openPrices='openPrices = true' :reason='showAttentionReason_get' @closeAttention='showAttention({ payload: false })'/>
              </v-flex>
              <v-flex :xs8='!$route.query.id&&!lockSidebar&&$route.name === "ResumeTool"'
                      :xs10='!$route.query.id&&lockSidebar&&$route.name === "ResumeTool"'
                      :xs11='$route.query.id&&$route.name === "ResumeTool"'
                      :offset-xs1='(lockSidebar&&$route.name === "ResumeTool")||($route.name === "CareerMap"&&!lockSidebar)'
                      :offset-xs2='(!lockSidebar&&$route.name === "ResumeTool")||(!lockSidebar&&$route.name === "UserCareerMaterails"&&$vuetify.breakpoint.mdAndUp)'
                      :xs12='$route.name === "JobsFlow"||$route.name === "Jobs Desc"||$route.name === "UserCareerMaterails"'
                      main-box>
                <router-view/>
              </v-flex>
          </v-layout>
          <router-view v-else/>
        </v-container>
      </v-content>
      <Footer v-if='showFooter'/>
    </v-app>
  </div>
</template>

<script>
  import Footer from "./components/Footer";
  import Header from "./components/Header";
  import UserPage from "./components/UserPage/index.vue";
  import { mapActions, mapGetters } from "vuex";
  import AttentionForFreeUser from './components/AttentionForFreeUser.vue'

  export default {
    components: {
      Footer,
      Header,
      UserPage,
      AttentionForFreeUser
    },
    data () {
      return {
        lockSidebar: this.$vuetify.breakpoint.mdAndUp,
        openPrices: false,
      }
    },
    computed: {
    ...mapGetters('Auth', ['isAuthenticated']),
    ...mapGetters("UserPage", [
      'subscriptionStatus_get',
      'showAttention_get',
      'showAttentionReason_get',
      'subscriptionOptions_get'
    ]),
      isAdmin() {
        return localStorage.getItem("user-role") == 1;
      },
      careerMapWidth(){
        return this.$route.name === 'CareerMap' ? {minWidth: '1700px'} : null
      },
      showFooter(){
        if (this.$route.name === 'Home' || this.$route.name === 'AuthPage') return true;
        else return false;
      },
      isShowAttention(){
        if (this.$route.name === 'ResumeTool'|| this.$route.name === 'CareerMap'||this.$route.name === 'Jobs Desc'||this.$route.name === 'UserCareerMaterails') {
          if (this.$route.name === 'UserCareerMaterails' && !this.subscriptionOptions_get.some(el => el === 'webinars')) {
            return true;
          } else if (this.$route.name === 'ResumeTool' || this.$route.name === 'JobsFlow'||this.$route.name === 'Jobs Desc'||this.$route.name === 'CareerMap') {
            return this.showAttention_get
          }
        }
        return false;
      }
    },
    methods: {
      ...mapActions("UserPage", ["showAttention"]),
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap&subset=cyrillic');
.scroll::-webkit-scrollbar-track{
        margin-top: -10px;
        margin-bottom: -10px;
        margin-left: -10px;
        margin-right: -100px;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  //font-family: 'Open Sans';
  // font-family: '.SFNSDisplay-Regular', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fcfcfc;
}

.auth-box {
  margin: 143px 0;
}

.container {
  padding: 0;
}

.header {
   height: 50px;
   z-index: 10;
   position: fixed;
   width: 100%;
   background-color: #fcfcfc
}

.header a{
  text-decoration: none;
}



.v-label {
  font-size: 14px;
}

.greeting-section .success-text {
  padding-left: 20px;

}

.logo-text {
  color: #009954;
  font-size: 32px;
  line-height: 20px;
  text-decoration: none;
  font-weight: 100;
  height: 33px;
}

.header .logo-icon {
  margin-right: 8px;
}


.header-on-mainpage .header-box{
  max-width: 1440px;
  margin: auto;
}

.link {
    text-decoration: none;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    width: 100%
}

.header .link.signup, .header .link.login {
  padding: 8px 20px;
  font-size: 14px;
  line-height: 17px;
}

.header .link.login {
  margin-right: 10px;
}

.card-info .layout.column > .flex {
    margin-bottom: 10px;
}

.header .greeting_nav {
  margin-left: 87px;
}

.header .link.signup {
  background: #009954;
  border-radius: 3px;
  color: #ffffff;
}

.header .link.signup:hover {
  background: #00723e;
  color: #e0e0e0;
}

.header .link.login:hover {
  border-radius: 3px;
  background: rgba(196, 196, 196, 0.4);
  color: #000000;
}

.nav_link .link {
  color: #000000;
}

.about-section .action-title{
  font-size: 24px;
  line-height: 44px;
  font-weight: 600;
}

.about-section .actions .instead-title {
  color: #9D9D9D;
  padding-left: 18px;
}

.about-section .actions .instead-card {
  padding-bottom: 10px;
}

.about-section .actions .instead-card:last-child {
  padding-bottom: 0;
}

.about-section .instead-title .action-titles-box {
  margin-bottom: 31px;
}

.about-section .actions:first-child {
  margin-top: 0;
}

.about-section .actions {
  margin-top: 94px;
}

.tariffs {
  padding: 0
}

.home-page .tariffs {
  margin-bottom: 169px;
}

.nav_link .link.router-link-exact-active, .jobCard:active .jobCard_title, .dropdown_link .v-list__tile--active,  .map-titles .function:active, .profile-card:active .profile-name{
  color: #009954 !important;
}



.link:hover, .jobCard:hover .jobCard_title, .jobCard_CareerMap:hover .jobCard_title_careerMap, .about-section .link:hover, .map-titles .function:hover, .profile-card:hover .profile-name{
  color: #00A7F2;
}



.button {
    text-transform: none;
    font-weight: 400;
    height: 62px;
    font-size: 14px;
    line-height: 17px;
    border-radius: 3px;
}

.greeting_nav .link {
  color: #000000;
}

.greeting-section_info_title {
  color: #000000;
  font-weight: bold;
  font-size: 80px;
  line-height: 90px;
  margin-bottom:50px;
}

.greeting-section_info_title > span{
  color: #009954;
}

.about-section .main-title, .tariffs .main-title{
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 50px;
  letter-spacing: -1px;
}

.greeting-section .section-registration {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 25px;

}

.greeting-section .section-registration.input {
  margin-bottom: 3px;
}

.greeting-section .registration {
  margin-top: 6px;
}

.greeting-section {
  height: 100%;
  padding-top: 92px;
}

.about-section .action-titles-box {
  margin-bottom: 37px;
}



.about-section .card-in-about {
  padding-right: 23px;
  line-height: 17px;
  margin-bottom: 37px;
  font-weight: 300;
}

.showed {
  display: none;
}

.header-nav {
  font-weight: 500;
  font-size: 18px;
  margin: auto 0;
  text-align: center;
}

.header-info_button {
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-transform: none;
 }

 .about-section .button {
   margin: 0;
   width: 254px;
 }

.about-section .check-position-container {
  margin-top: 54px;
}

.about-section .check-position-container .position-input{
  margin-left: 98px;
}
.prices-box {
  padding-top: 51px;
}
.about-section .check-position-container .position-button{
  margin-left: 13px;
}

.about-section-title {
  padding-bottom: 39px;
}

.about-section-title h1 {
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
}

.about-section h2 {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #009654;
  padding-bottom: 15px;
  letter-spacing: -1px
}

.greeting-section .button.career {
  width: 254px;
  margin: 0 8px 0 0;
}

.greeting-section .button.vacancy {
  margin: 0;
  margin-left: 5px;
  width: 235px;
}

.about-section-card-info_text {
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #5C5961;
}

.about-section-card-info {
  text-align: left;
  min-width: 250px;
}

.about-section-card-info:last-child {
  padding-right: 0
}

.about-section-card-info:last-child {
  padding-right: 0
}

.about-section_text-input {
  margin-right: 7px;
  padding-right: 6px;
}

 .tariff_card {
  margin-top: 20px;
}

.home-page .tariff-box {
  padding: 0 4px;
  margin-bottom: 78px;
}

.vacancy-info .button {
  width: 170px;
}

.vacancy-info .check-position-container .about-section_text-input.function {
  margin-left: 134px;
}

.about-section.vacancy-info  {
  margin-bottom: 189px;
}


.footer {
  min-height: 250px;
  padding: 0;
  background-color: #F9F9F9;
}

.footer h2 {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.1em;
  color: #9D9D9D;
  padding-bottom: 16px;
}

.footer a {
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: #f8f8f8;
  text-decoration: none;
}

.footer-link {
  margin-top: 56px;
}

.footer .copyright {
  padding-top: 58px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 300;
  color: #9D9D9D;
}

.footer-link span, .footer a, {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  text-decoration: none;
}

.login-dialog {
  overflow-y: visible;
  box-shadow: none;
  height: 334px
}

.login-form_close {
  position: relative;
  bottom: 10px;
  font-size: 60px
}

.login-form {
  padding: 45px 18px 0 48px;
  background-color: #f8f8f8;
}

.login-form .blue-link {
  color: #00A7F2;
  cursor: pointer;
}

.login-form .tip {
  font-size: 14px;
  line-height: 17px;
  font-weight: normal;
}

.login-form .tips-container {
  margin-bottom: 22px;
}

.login-form .password-container {
  margin-bottom: 19px;
}

.login-form .password-container .input-border {
  margin-bottom: 24px;
}

.login-form .email-container {
  margin-bottom: 26px;
}

.login-form .email-container .tip {
  font-size: 12px;
  line-height: 17px;
  color: #9D9D9D;
}

.login-form .terms.tip {
  margin-top: 26px;
  font-size: 12px;
  line-height: 14px;
}

.login-form .terms.tip .title-terms {
  color: #00A7F2;
}

.footer-link.action-box {
  margin-bottom: 0;
  padding-bottom: 2px
}

.close-icon:hover {
  color: #00A7F2;
}

.close-icon:active {
  color: #009954;
}

.login-form .terms {
  font-size: 9px;
  line-height: 12px;
  color: #9D9D9D;
}

.login-form .button {
  font-size: 14px;
  line-height: 19px;
  margin:0;
}


.login-form-headline {
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  padding: 0;
  margin-bottom: 22px;
}

.terms-and-conditions_primary-title {
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #130425;
  margin: 0 auto;
}

.terms-and-conditions_text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #130425
}

.terms-and-conditions_text h2 {
  font-size: 20px;
  padding-bottom: 9px;
}

.flat-button {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
}

.jobCard_date {
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: #9D9D9D;
}

.jobCard_title {
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
}

.filter {
  position: fixed;
  max-width: 280px;
  min-width: 280px;
}

.filter .button{
  margin-top: 30px;
}

.filter .select {
  margin-bottom: 24px
}

.favorite {
  cursor: pointer;
}

.fav-icon {
  margin-right: 14px;
}

.favorite span{
  color: #009654;
  font-size: 12px;
  line-height: 14px;
}

.jobDescription {
  margin-top: 50px;
  margin-bottom: 292px;
  padding: 0;
}

.jobDescription .v-card__title{
  padding: 0;
}


.jobDescription .jobDescription_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 44px;
  padding-bottom: 30px;
}

.jobDescription .salary-number {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
}

.jobDescription_text {
  font-weight: normal;
  font-size: 24px;
  line-height: 33px;
}

.jobDescription_point h3 {
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
}

.jobDescription_point li {
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  padding-bottom: 22px;
}

.jobDescription_point ul {
  padding-left: 29px;
  padding-top: 29px;
}

.jobDescription-card .jobDescription_point {
  padding-bottom: 36px;
}

.jobDescription .comment {
  font-size: 14px;
  line-height: 19px;
  color: #009654;
  padding-right: 20px;
  max-width: 200px;
}

.jobDescription .card-info {
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
}


.jobDescription .contact .card-info {
  padding: 24px 13px 12px;
  margin-bottom: 10px;
}

.jobDescription .contact {
  position: fixed;
  width: 25%;
  max-width: 300px;
}

.jobDescription .contact .note {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #9D9D9D;
  padding-top: 14px
}

.jobDescription .contact .button {
  font-size: 14px;
  line-height: 19px;
  margin: 0;
  min-height: 60px;
}

.jobDescription-card {
  padding: 34px 24px 58px;
}

.jobDescription-card div {
  padding: 0
}

.jobDescription-card .favorite_and-date {
  padding-bottom: 58px;
}


.jobDescription .reply-option-box .button {
  margin-bottom: 10px;
}

.jobDescription-card .jobDescription_info {
  padding-bottom: 37px;
}

.jobDescription-card .job-summary h2 {
  margin-bottom: 17px;
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
}

.jobDescription-card .job-summary p {
  margin-bottom: 29px;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
}

  .company-name {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }

  .salary-info {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }

  .jobDescription-card .job-summary ul {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }

.jobDescription-card .job-summary ul {
  margin-left: 9px;
}

.jobDescription-card .job-summary  li {
  margin-bottom: 17px;
}

.jobDescription_info .company-name {
  margin-bottom: 3px;
}

.user-info{
  margin: 46px 0 0 0;
  padding: 0 62px 32px 0;
  border-bottom: 1px solid #9D9D9D
}

.user-info .name {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}

.user-page {
  padding: 45px 5px 166px;
}

.no-title {
  font-size: 14px;
  line-height: 17px;
  color: #9D9D9D;
}

.user-vacancies .button {
  width: 353px;
  font-size: 14px;
  line-height: 19px;
  margin: 0
}

.user-info .position {
  font-size: 14px;
  line-height: 19px;
  color: #009654;
  padding-bottom: 11px;
}

.user-info .email {
  font-size: 14px;
  line-height: 19px;
  color: #5C5961;
  margin-bottom: 11px;
}

.user-info .to-setting {
  color: #00A7F2;
  cursor: pointer;
}

.user-page .avatar {
  cursor: pointer;
}

.user-page .link {
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  color: #9D9D9D;
  cursor: pointer;
}

.user-page .link:hover {
  color: #00A7F2;
}

.vacancy-card-small {
  margin: 0 15px 15px 0
}

.vacancy-card-small h3 {
  padding-bottom: 25px;
  font-weight: normal;
}

.vacancy-card {
  padding-bottom: 64px
}

.user-page .active {
  color: #009654;
}

.user-page h1 {
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  padding-bottom: 34px
}

.user-setting .subscription_text {
  font-weight: bold;
  font-size: 21px;
  line-height: 29px;
  color: #9D9D9D;
  padding-bottom: 36px
}

.user-setting .subscription_text span{
  color: #009654;
}

.user-setting .button {
  text-transform: none;
  width: 353px;
  margin: 0;
  font-size: 14px
}

.subscription .button {
  width: 227px;
}

.user-setting .info-section {
  padding-top: 71px;
}

.user-page .info-section h1 {
  padding-bottom: 35px;
}

.user-setting .password{
  padding-top: 62px;
}

.v-card {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}

.v-card.v-card--flat{
  box-shadow: none;
}

.successText {
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 21px;
}

.user-setting .settings-input {
  width: 355px;
  margin-bottom: 26px;
}

.input-border {
  border: 1px solid #D0D0D0;
  border-radius: 3px;
  background-color: #ffffff
}

.error--text {
  border-color: red;
}

.user-setting .add-photo {
  border: 1px solid #009654;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 70px;
}

.career-materials .no-title {
  padding-bottom: 22px;
}

.career-materials .button {
  width: 353px;
  margin: 0;
  font-size: 14px;
  line-height: 19px;
}

.career-materials .no-subscription-user-box {
  padding-top: 14px;
  padding-bottom: 19px;
}

.jobs-flow, .network {
  padding-top: 44px;
  padding-bottom: 98px;
  padding-right: 0;
  padding-left: 0;
}

.dropdown_link .v-list__tile__title {
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
}

.dropdown_link {
  padding-bottom: 65px;
  padding-left: 25px;
}


.create-vacancy {
  padding-top: 50px
}

.header .container {
  padding: 3px 0;
  border-bottom: 1px solid #D0D0D0;
}

.filter-sm .select1 {
    padding-bottom: 20px;
}

.jobCard {
  padding: 21px 40px 30px;
  margin-bottom: 15px;
}

.jobCard div{
  padding: 0;
}

.jobCard .to-fav {
  padding-bottom: 19px;
}

.jobCard .position-title {
  padding-bottom: 27px;
}

.tariffs_page_title {
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
}

.tariff_card {
  padding: 21px 0 0 15px;
  min-height: 280px;
}

.tariff_card > div {
  padding: 0;
}

.tariff-constructor .toogle-box{
  width: fit-content;
}

.toogle-box{
  border-radius: 100px;
  background: #F9F9F9;
}

.custom-toogle {
  display: inline-block;
  padding: 8px 24px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 12px;
  line-height: 14px;
  width: 50%;
  font-weight: 300;
}

.v-chip {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
}

.tariff-constructor .v-chip {
  margin-right: 0;
}

.tariff-constructor .tariff_price {
  margin-bottom: 20px
}

.tariff-constructor .chips-box{
  margin-top: 10px;
  margin-bottom: 15px;
}

.tariff-constructor .button{
  margin: 0;
}

.toogle-box.hover {
  box-shadow: 0 0 0 1px #009954;
  color: #009954;
}

.custom-toogle.active {
  background: #009954;
  box-shadow: 0 0 0 1px #009954;
  color: #ffffff;
}

.tariff_card .button{
  font-size: 12px;
  line-height: 16px;
  heigth: 50px;
}

.tariff_name {
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
}

.tariff_price {
  font-size: 18px;
  line-height: 29px;
  font-weight: 500;
  margin-top: 24px;
}


.tariff_card .points {
  margin-bottom: 15px;
}

.tariff_card .list-icon {
  margin-right: 8px;
}

.tariff_price .price{
  font-size: 32px;
  line-height: 44px;
  font-weight: bold;
  margin-right: 13px;
}

.tariff_text {
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 15px;
}

.tariff_text .minus {
  color: #9D9D9D;
}

.button-container {
  padding-bottom: 65px;
}

.button-container .back-button {
  font-size: 14px;
  line-height: 19px;
  text-align: left;
  padding-left: 8px;
}

.button-container .button {
  height: 38px
}

.tariff-subscription-card .period-title h2{
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  width: 100%
}

.tariff-subscription-card .tariff_price{
  padding-bottom: 30px;
}

.tariff-subscription-card .period-title {
  padding-bottom: 7px;
}

.tariff-subscription-card .button, .tariff_card .button {
    font-size: 14px;
}
.tariff-info{
  padding-left: 10px;
  padding-top: 15px;
}

.tariff-info h2{
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  padding-bottom: 18px;
}

.sum-price {
  color: #9D9D9D;
}

.sum-price .price{
  font-size: 30px
}

.vacancy-reply-card {
  padding: 10px 13px 20px 14px;
}

.vacancy-reply-card .make-reply .button {
  margin: 0;
}

.vacancy-reply-card  .filter-select-title {
    padding-bottom: 12px;
}

.vacancy-reply-card .select {
  margin-bottom: 20px;
}

.name-input {
  margin-bottom: 20px
}
.coveringLetter {
  margin-bottom: 20px;
}
.reply-title {
  padding-bottom: 3px;
}

.vacancy-reply-container .resume .button {
  font-size: 14px;
  line-height: 19px;
  margin: 0;
  margin-bottom: 20px;
}

.CV-style-settings {
  padding-top: 164px;
}

.CV-style-settings h2 {
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;
  padding-bottom: 20px;
}

.CV-style-settings .color-button {
  width: 31px;
  height: 31px;
}
.font-name {
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  cursor: pointer;
  padding-bottom: 16px;
  color: #5C5961
}

.CV-card {
  padding: 11px 42px 70px 11px;
}

.CV-card > div {
  padding: 15px 0 0 39px;
}

.CV-card > .no-padding-editor {
  padding-left: 0
}

.CV-card > .no-padding-editor.personal-info-box {
  padding-left: 26px;
}

.CV-card .personal-info-box .personalInfoTitle{
  padding-right: 5px
}

.CV-card {
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
}

.CV-card .cv-icon {
  cursor: pointer;
  color: #9D9D9D;
}

.CV-card .cv-icon:hover {
  color: #00A7F2;
}

.CV-card .cv-icon:active {
  color: #009954;
}

.CV-card .extra-info .editor_editor .title-box {
  padding-left: 35px;
}

.CV-card > .layout {
  width: 100%
}

.CV-card h3 {
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  padding-bottom: 1px;
}

.CV-card .border {
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
}

.CV-card .career-history-box .add-box {
  padding-right: 5px;
  padding-left: 5px;
}

.CV-card .career-history-box .list-title {
  padding-top: 8px;
}

.CV-card .list-title.theme--light.v-input:not(.v-input--is-disabled) textarea {
    font-size: 11px;
    line-height: 15px;
}

.CV-card .education-box .add-box{
  padding-bottom: 20px;
}

.CV-card .education-box .education-position-editor {
  padding-left: 33px;
}

.CV-card .education-box .education-position-editor .institution-box {
  padding-left: 17px
}

.CV-card  .arrow-box {
  max-width: 10px;
  margin-right: 11px;
}

.CV-card .education-list-box .arrow-box, .CV-card .career-history-box .arrow-box{
  margin-left: 13px;
}

.CV-card .career-history-box .positions-box {
  padding-left: 0;
}

.CV-card .position-description .add-box {
  padding-top: 8px;
  color: #00A7F2;
}

.CV-card .extra-info .border {
    margin-bottom: 10px;
}

.CV-card .extra-info .add-box {
    padding-left: 10px;
    padding-right: 15px;
}

.CV-card .editor-editor .add-box {
  padding-bottom: 20px;
}

.CV-card .name-box h1, .CV-card .name-box .name-input{
  font-weight: bold;
  font-size: 25px;
  line-height: 34px;
}

.CV-card .name-box .theme--light.v-input:not(.v-input--is-disabled) input {
  color: #009954;
}

.CV-card .name-box {
  padding-top: 13px;
}

.CV-card .personal-description {
}

.CV-card .education-box .university-name {
  font-weight: bold;
}

.career-history-box .company-name {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 0;
}

.career-history-box .position-name {
  padding-bottom: 0;
}

.career-history-box .position {
  font-size: 14px;
  line-height: 20px;
}

.career-history-box .list-title .list-title-text{
  font-size: 12px;
  line-height: 16px
}

.career-history-box .company-description {
  font-size: 11px;
  line-height: 15px;
}

.career-history-box .list-title {
  font-size: 12px;
  line-height: 16px;
}

.career-history-box .list-title li{
  margin-bottom: 10px;
  list-style-type: disc;
  list-style-position: outside;
}

.career-history-box .list-title li:first-child{
  margin-top: 5px;
}

.career-history-box .list-title li:last-child{
  margin-bottom: 0;
}

.career-history-box .list-positions .list-position-text, .career-history-box .company-description{
  color: #414141;
}

.addTitle.minor {
  font-size: 12px;
  line-height: 16px;
  padding: 7px 0;
}

.reply-box {
  max-width: 46%;
  margin-bottom: 10px;
}
.reply-box .login-form div {
  padding: 0
}

.reply-box .login-form {
  padding: 16px 15px 91px 15px;
  background-color: #ffffff;
  margin-left: 2%;
  margin-right: 2%
}

.reply-box .login-form .button {
    height: 60px;
}

.reply-made-box .button-done {
  height: 30px;
  width: 30px;
  border: 1px solid #009954;
}

.reply-made-box .title-text {
  font-size: 14px;
  line-height: 17px;
  padding-top: 10px;
  padding-bottom: 27px;
}

.reply-made-box .info-text {
  font-size: 12px;
  line-height: 14px;
}

.reply-box .login-form  .login-form-headline {
  font-size: 18px;
  line-height: 8px;;
  padding-bottom: 22px;;
}

.reply-box .login-form  .tip {
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 49px;
}

.reply-box .login-form  .filter-select-title {
  padding-bottom: 12px;
}

.reply-box .login-form .input-box {
  padding-bottom: 24px;
}

.reply-box .login-form .terms {
  font-size: 12px;
  line-height: 14px;
}

.vacancy-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  padding-bottom: 25px;
  padding-top: 19px;
}

.filter-select-title {
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 10px;
}

.succes-reply {
  padding-top: 20px;
}

.succes-reply .reply-title{
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  padding-bottom: 20px;
}

.succes-reply .reply-to-info{
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 20px;
}

.no-data-info{
  font-size: 14px;
  line-height: 17px;
  color: #9D9D9D;
  margin-bottom: 155px;
}

.user-resume .resume-cards{
  margin-bottom: 55px;
}

.user-resume .make-resume-box .button {
  width: 232px;
  margin: 0;
}


.user-resume .button {
  margin: 0;
}

.user-resume .resume-card {
  padding: 27px 18px 77px 14px;
  margin-right: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.user-resume .resume-card .resume-title{
  font-size: 18px;
  min-height: 170px;
  font-weight: 500;
  line-height: 29px;
}

.user-resume .resume-card .resume-title:hover{
  color: #00A7F2;
}

.user-resume .resume-card .resume-title:active{
  color: #009954;
}

.v-overlay--active:before {
  opacity: 0.1 !important;
}

.v-dialog {
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.2);
}

.user-resume .resume-card .date-title{
  font-size: 14px;
  line-height: 17px;
  color: #9D9D9D;
}

.user-resume .resume-card .edit-button {
  margin-bottom: 7px;
}

.jobDescription .atention-box {
  margin: 0;
  border: none
}

.jobDescription .atention-box .button{
  min-height: 40px;
}

.jobDescription .atention-box .text{
  margin-bottom: 10px;
}

.jobDescription .atention-box .close-text {
  color: #000000;
  cursor: pointer;
  margin-bottom: 38px;
  font-weight: 300;
}

.attention {
  background-color: #ffffff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  padding: 30px 31px;
}

.attention.atention-box .text {
  margin-top: 60px;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 50px;
}

.jobDescription .attention.atention-box .button {
  width: 100%;
  min-height: 60px;
}


.user-resume .resume-card .edit-button .button, .button.outlined {
    border: 1px solid #009654;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 2px;
}

.user-page .info-box {
  margin-top: 11px;
}

.user-page  .more-title {
  font-size: 14px;
  line-height: 17px;
  color: #9D9D9D;
}

.function-chose-title {
  font-size: 32px;
  line-height: 44px;
  font-weight: bold;
  margin-bottom: 106px;
}

.function-chose-bubles {
  margin-top: 50px;
}

.tariff_card .button.outlined {
    border-color: #E85218;
}


.editor-switch {
  padding-left: 23px;
}

.editor-switch .button {
  height: 60px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-transform: none;
  width: 50%;
  margin: 0;
}

.editor-switch .button .v-btn__content{
  color: #9D9D9D
}

.editor-switch .preview {
  border-radius: 3px 0px 0px 3px;
}

.editor-switch .editor {
  border-radius: 0px 3px 3px 0px;
}

.editor-switch .active-button .v-btn__content{
  color: #ffffff;
}

.editor-switch .non-active-button .v-btn__content {
  color: #9D9D9D
}

.editor-switch .non-active-button {
  border: 1px solid #9D9D9D;
}

.info-block {
  margin-top: 30px;
}

.map-titles .function {
  font-size: 32px;
  line-height: 44px;
  font-weight: bold;
  cursor: pointer
}

.map-titles .position {
  font-size: 28px;
  line-height: 33px;
  font-weight: 600;
  color: #009954;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-top: 24px;
  margin-bottom: 33px;
}

.info-about-map {
 line-height: 18px;
}

.icon-map-legend, .editor-switch  {
  margin-bottom: 22px;
}

.info-about-map .start-title {
  font-size: 18px;
  line-height: 29px;
  font-weight: 500;
}

.position-info .button-box {
  margin-bottom: 30px;
}

.info-about-map .start-text {
    margin-top: 15px;
    margin-bottom: 35px;
    font-weight: 300;
}

.position-bubble {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 17px;
}

 .info-block .position-legend, .info-block .position-description {
  font-weight: 300;
}

.position-info .title-name {
  font-size: 18px;
  line-height: 29px;
  font-weight: 600;
}


.position-info .title-name {
  margin-bottom: 15px;
}

.position-info .title {
  margin-top: 13px;
  margin-bottom: 4px;
}

.track-title {
font-size: 18px;
line-height: 29px;
font-weight: 500;
}

.main-track-box {
  position: relative;
}

.track-box {
  padding: 23px 14px;
  position: relative;
  width: fit-content;
  background: #FFFFFF;
  border: 1px solid #f8f8f8;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}


.career-map {
  padding: 0;
  margin-bottom: 78px;
}

.salary-info {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
}

@media only screen and (min-width: 1904px) {
  .container {
    max-width: 1440px
  }
  .user-profile.container {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    padding: 0
  }

  .custom-toogle {
    min-width: 113px
  }
  .prices-box {
    padding-bottom: 50px
  }

   .no-scroll {
      position:fixed;
   }

  .greeting-section {
    margin-top: 30px;
  }

  .onboarding-box {
    margin: 0;
  }

  .mainpage {
    min-width: 372px;
  }

  .tariff_card {
    padding: 21px 15px;
  }

  .header {
    height: 100%;
  }

  .header .logo {
     margin-left: 0;
     margin-top: 32px;
  }

  .header .container {
    border: none;
  }

  .header {
    position: static;
  }

  .jobs-flow, .network {
    padding: 0px;
    margin-top: 55px;
    margin-bottom: 55px;
  }

  .jobCard {
    padding: 22px 20px 24px 29px;
    margin-bottom: 10px;
  }

  .jobCard .to-fav, .jobCard .position-title {
    padding-bottom: 20px;
  }

  .filter-card {
    background-color: #ffffff;
  }

  .greeting-section_info_title {
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
  }

  .greeting-section .section-registration:first-child {
    font-size: 18px;
    line-height: 25px;
  }

  .greeting-section .section-registration {
    margin-bottom: 15px
  }

  .about-section .action-title {
    font-size: 24px;
    line-height: 44px;
  }

  .outer-container {
    width: 100%;
    overflow: hidden;
  }

  .outer-container.actions {
    height: 90px;
  }

  .inner-container {
    height: 100%;
    overflow-y: hidden;
    overflow-x: scroll;
    margin-right: 50px;
  }

  .link-box {
    min-width: 200px;
    padding: 18px 0 0 0;
  }

  .inner-container::-webkit-scrollbar {
    display: none;
  }

  .actions-info .cards-box {
    min-width: 230px;
  }

  .actions-info .image-box {
    min-width: 381px;
  }

  .about-section {
    margin-top: 100px;
    margin-bottom: 70px;
  }

  .about-section .main-title, .tariffs .main-title{
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    margin-bottom: 20px;
  }

  .about-section .action-titles-box {
    margin-bottom: 30px;
  }

  .about-section .link:hover{
    color: #009954;
  }

  .home-page .tariffs {
    margin-bottom: 100px;
  }

  .about-section .card-in-about {
    margin-right: 15px;
    line-height: 19px;
  }

  .about-section-title h1 {
    font-size: 24px;
    line-height: 44px;
  }

  .about-section-title {
    padding-bottom: 74px;
  }

  .about-section-card-info {
    text-align: center;
    padding-bottom: 67px;
    padding-left: 29px;
    padding-right: 29px;
  }

  .about-section .check-position-container {
    margin-top: 7px;
  }
  .about-section .check-position-container .position-button {
    margin-left: 0;
    margin-top: 45px;
  }

  .about-section .button {
    width: 338px;
  }

  .about-section .check-position-container .position-input {
      margin-left: 18px;
      margin-right: 23px;
  }



  .about-section-card-info h2 {
    font-size: 21px;
    padding-bottom: 18px;
  }

  .about-section-card-info_text {
    font-size: 16px;
  }

  .about-section.vacancy-info {
    padding-top: 115px;
  }

  .vacancy-info .check-position-container .about-section_text-input.function, .vacancy-info .check-position-container .about-section_text-input {
    margin: 0;
  }

  .vacancy-info .check-position-container{
    margin: 8px 23px 0;
  }

  .footer {
    min-height: 140px;
  }

  .vacancy-info .about-section-button {
    padding-top: 0
  }

  .greeting-section_button-container {
    padding-top: 19px;
  }

  .about-section_text-input {
    padding-right: 0;
    padding-bottom: 35px;
  }

  .about-section.vacancy-info {
    margin-bottom: 100px;
  }

  .footer-link {
    margin-top: 42px;
  }

  .terms-and-conditions_primary-title {
    font-size: 28px;
    padding: 8px
  }

  .terms-and-conditions_text h2 {
    font-size: 24px;
  }

  .login-form {
    padding: 93px 33px 29px;
  }

  .login-form .tips-container {
    margin-bottom: 31px;
  }

  .login-form .email-container {
    margin-bottom: 40px;
  }

  .login-form .password-container .input-border {
    margin-bottom: 36px;
  }

  .login-form-headline {
    font-size: 28px;
    line-height: 38px;
  }

  .login-form .tip {
    font-size: 14px;
    line-height: 17px;
  }

  .login-form .terms {
    font-size: 9px;
    line-height: 12px;
    color: #9D9D9D;
  }

  .header {
    max-height: 103px
  }

  .header.transparent {
    box-shadow: none;
  }

  .filter-button {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 0 30px 22px;
    background: rgba(255, 255, 255, 0.8)
  }

  .filter-button .button {
    height: 60px;
  }

  .jobCard_title {
    font-size: 16px;
    line-height: 22px;
  }

  .filter-card {
    padding-top: 42px;
    padding-left: 42px;
    padding-right: 35px;
    padding-bottom: 40px;
  }

  .card-info {
    padding: 65px 31px 33px;
  }

  .filter-button.show-menu {
    padding-top: 27px;
    background-color: #ffffff;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  }

  .card-info h2 {
    font-weight: bold;
    font-size: 28px;
    line-height: 38px;
  }

  .card-info h1 {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
  }

  .card-info h3 {
    font-size: 11px;
    line-height: 15px;
    color: #9D9D9D;
  }

  .card-info .contact-info {
    margin-bottom: 20px;
  }

  .jobDescription {
    margin: 0;
  }

  .show-contact-button {
    font-size: 14px;
    font-weight: bold;
    text-transform: none;
  }

  .card-info-contact span{
    font-size: 14px;
    line-height: 19px;
  }

  .vacancy-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 29px;
    padding-top: 0;
  }

  .filter-selects {
    padding: 33px 0 22px;
  }

  .filter-sm, .comment-box, .reply-box, .contact-sm {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    padding: 0;
    margin: 0;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25)
  }

  .comment-box:before, .reply-box:before  {
    background-color: #212121;
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.46;
    position: fixed;
    right: 0;
    top: 0;
  }

  .jobDescription {
    margin-bottom: 5opx;
  }

  .jobDescription-card {
    padding: 34px 24px 58px;
    margin-bottom: 60px;
  }

  .jobDescription-card .favorite_and-date {
    padding-bottom: 37px;
  }

  .jobDescription .jobDescription_title {
    padding-bottom: 37px;
  }

  .jobDescription-card .jobDescription_info {
    padding-bottom: 45px;
  }

  .jobDescription-card .jobDescription_info h5{
    padding-bottom: 18px;
  }

  .jobDescription .jobCard_date {
    padding: 0;
  }

  .jobDescription_title {
    font-size: 21px;
    line-height: 29px;
    padding-top: 15px;
  }

  .jobDescription_point h3 {
    font-weight: 600;
    font-size: 18px;
    line-height: 29px;
  }

  .jobDescription_point ul {
    padding-left: 18px;
    padding-top: 43px;
  }

  .jobDescription-card .jobDescription_point {
    padding-bottom: 52px;
  }

  .jobDescription_header {
    padding-bottom: 32px;
  }

  .comment-box .button, .go-back .button {
    border: 1px solid #009654;
  }

  .comment-box-card, .vacancy-reply-card, .reply-box .login-form {
    padding: 38px 35px 52px;
    margin: 0;
  }

  .comment-box-card .comment {
    padding-right: 0;
    max-width: 100%;
    padding-bottom: 43px;

  }

  .comment-box-card .title {
    font-weight: 600;
    font-size: 18px;
    line-height: 29px;
    padding-bottom: 30px;
  }

  .reply-box {
    max-width: 100%;
  }

  .vacancy-reply-card .filter-select-title {
    padding-bottom: 22px;
  }

  .make-reply-sm .button {
    margin-left: 4px;
  }

  .succes-reply {
    padding: 37px 0 0 0;
  }

  .go-back .button {
    margin-right: 4px;
  }

  .succes-reply .reply-title {
    padding-bottom: 49px;
  }

  .succes-reply .reply-to-info {
    padding-bottom: 87px;
  }

  .succes-reply .make-reply .button {
    width: 100%
  }

  .name-input, .name-input:first-child {
    padding-left: 0;
    padding-right: 0;
  }

  .reply-box .login-form .input-box:first-child {
    padding-bottom: 7px;
  }

  .reply-box .login-form .input-box {
    padding-bottom: 97px;
  }

  .reply-box .login-form .input-box .input-border {
    margin-bottom: 31px;
  }

  .reply-box .login-form .tip {
    padding-bottom: 33px;
  }

  .reply-box .login-form .tip.terms {
    margin-top: 37px;
    padding-bottom: 0;
  }

  .reply-box .login-form .outlined {
    border: 1px solid #009954;
  }



  .reply-box .login-form .button-box .button.back {
    margin-top: 40px;
  }

  .reply-made-box {
    margin: 29px 73px 6px;
  }

  .user-page .info-box {
    margin-top: 60px;
  }


  .user-setting h1 {
    padding-bottom: 37px;
  }

  .user-setting .subscription_text {
    padding-bottom: 42px;
  }

  .user-setting .info-section {
    padding-top: 73px;
  }

  .user-setting .settings-input {
    margin-bottom: 28px;
  }

  .user-setting .password {
    padding-top: 100px;
  }



  .dropdown_menu_logIn {
    padding-top: 61px;
    padding-left: 36px;
    padding-bottom: 67px;
  }

  .dropdown_menu_logIn .name{
    font-size: 18px;
    line-height: 25px;
    color: #009654;
    padding-bottom: 0px;
  }

  .vacancy-card-box:first-child {
    margin-left: 30px
  }

  .footer-iner {
    margin-bottom: 25px;
    margin-top: 14px;
  }

  .user-resume .resume-card {
    padding: 68px 15px 33px 17px;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .user-resume .resume-card .date-title {
    margin-bottom: 20px;
  }

  .tariff_card {
    margin-top: 22px;
  }

  .home-page .tariff-box {
    margin-bottom: 30px;
    margin-right: 0;
  }

  .about-section .actions {
    margin-top: 70px;
  }

  .resume-card-box {
    max-width: 313px;
  }

  .tools-menu .menu-bar {
    padding: 65px 0 25px;
  }

  .tools-menu  {
    min-height: 100%;
  }


  .user-settings .button-box .button {
    margin: 20px 0;
  }

  .tools-menu  .action-box:hover {
    background-color: #f8f8f8;
  }

  .tools-menu .tariff-box {
    margin-right: 0;
    margin-bottom: 33px;
  }

  .breadcrunch {
    padding-left: 16px;
  }


  .breadcrunch {
    font-size: 18px;
    line-height: 29px;
  }

  .atention-box .button {
      margin: 0;
      margin-top: 15px;
  }

  .atention-box.attention .button {
      margin: 0;
  }

  .atention-box {
    padding: 10px 32px;
    line-height: 29px;
  }

  .atention-box.attention {
    padding: 31px 32px;
  }

  .onboarding-box {
    margin-top: 0;
  }

  .onboarding .greating-title {
    ffont-weight: 600;
    font-size: 24px;
    line-height: 44px;
  }

  .onboarding .greating-text {
    margin-bottom: 30px;
  }

  .onboarding .button-box {
    margin-top: 27px;
  }
}

@media only screen and (min-width: 1264px) {
  .container {
    max-width: 1440px
  }
}

@media only screen and (min-width: 1264px){
  .greeting-section {
    max-width: 1440px;
    padding: 0;
    padding-top: 116px;
    margin-bottom: 134px;
  }

  .tariffs {
    max-width: 1440px;
  }

   .header .container {
    max-width: 1440px;
  }

  .about-section {
    margin-top: 86px;
    margin-bottom: 161px;
    padding: 0;
  }
}

</style>
