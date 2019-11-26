<template>
  <v-container user-profile>
    <v-layout wrap row :flow='!lockSidebar' menu-box>
        <v-flex :shrink='!lockSidebar||!flowSidebar'
                @mouseover='$vuetify.breakpoint.smAndDown ? null : lockSidebar ? "" : flowSidebar = true'
                @mouseout='$vuetify.breakpoint.smAndDown ? null : lockSidebar ? "" : flowSidebar = false'
                sibebar-box
                >
            <Sidebar @flow='lockSidebar = false, $emit("flow"), makeSidebarLocked({ payload: false })'
                     :lockSidebar='lockSidebar'
                     :flowSidebar='flowSidebar'
                     v-show='lockSidebar||flowSidebar'
                     @showTools='showTools = true'
                     :userName='getUserInfo.fullName.split(" ")[0]'
                     @makeAction='makeAction'
                     :avatar='getUserInfo.avatarUrl'
                     :userUrl='getUserInfo.profile ? getUserInfo.profile.url : null'/>
            <div class='show-sidebar' v-if='!lockSidebar'>
            <v-icon :size='$vuetify.breakpoint.mdAndUp ? "26px" : "35px"'
                    class='show-sidebar-icon'
                    @click='lockSidebar = true, flowSidebar = false, $emit("lock"), makeSidebarLocked({ payload: true })'
                    @mouseout='$vuetify.breakpoint.smAndDown ? null : flowSidebar = false'
                    @mouseover='$vuetify.breakpoint.smAndDown ? null : flowSidebar = true'
            >
              {{ flowSidebar ? 'mdi-chevron-double-left' : 'mdi-menu' }}
            </v-icon>
            </div>
          </v-flex>
          <v-flex breadcrunch>
            <span class='path' @click='makeAction(activeCrunch.action)'>{{ activeCrunch ?  activeCrunch.title : ' ' }}</span><span v-for='(el, index) in extraCrunch' v-if='$vuetify.breakpoint.mdAndUp' @click='refreshMap(index)'><span class='separator'>/</span><span :class='{ "path" : $route.name === "CareerMap"&&index === 0 }'>{{ el }}</span></span>
          </v-flex>
    </v-layout>
    <v-dialog
      v-model="showTools"
      max-width="920"
      scrollable
      :fullscreen='$vuetify.breakpoint.smAndDown'
      content-class='tools'
    >
      <Tools        @userInfoSave='userInfoSave'
                    v-if='showTools'
                    :user='getUserInfo'
                    :subscriptionStatus='subscriptionStatus_get'
                    :subscriptionOptions='subscriptionOptions_get'
                    @cancelSubscription='cancelSubscription'
                    @changeAvatar='changeAvatar'
                    :openPrices='showTariff||showPrices_get'
                    @check-availability='checkAvailability'
                    @showedTariff='showTariff = false'
                    :urlAvailabile='urlAvailabile'
                    :userProfile = 'userProfile_get'
                    :toolsType='toolsType_get'
                    />
    </v-dialog>
    <v-dialog
      v-model="!getUserInfo.profile"
      fullscreen
      scrollable
      content-class='onboarding'
    >
      <Onboarding  @userInfoSave='userInfoSave'
                   :user='getUserInfo'
                   :functionList='functionList_get'
                   :industryList='industryList_get'
                   @check-availability='checkAvailability'
                   :urlAvailabile='urlAvailabile'
                   v-if='!getUserInfo.profile'/>
    </v-dialog>
  </v-container>

</template>

<script>
import Sidebar from './Sidebar.vue'
import Onboarding from './Onboarding.vue'
import Tools from './Tools.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      lockSidebar: true,
      flowSidebar: false,
      showTools: false,
      showTariff: false,
      actions: [
        {
          title: 'Резюме',
          action: 'ResumeTool'
        },
        {
          title: 'Видео',
          action: 'UserCareerMaterails'
        },
        {
          title: ' Нетворк',
          action: 'Network'
        },
        {
          title: 'Вакансии',
          action: 'JobsFlow'
        },
        {
          title: 'Вакансии',
          action: 'Jobs Desc'
        },
        {
          title: 'Карта',
          action: 'CareerMap'
        }
      ],
      showResume: false,
      urlAvailabile: true,
    };
  },
  components: {
    Sidebar,
    Tools,
    Onboarding
  },
  methods: {
    ...mapActions("UserPage", [
      "refreshUserInfo",
      "refreshUserVacancyList",
      "updateUserInfo",
      "changeUserAvatar",
      "changeUserPass",
      'makeSidebarLocked',
      'cancelSubscription',
      'showOnboarding',
      'showPrices',
      'checkUrlAvailability'
    ]),

    ...mapActions('CareerMapNew',
    [
      'refreshData',
      'functionListUpdate',
      'refreshIndustryList'
    ]),

    userInfoSave(data) {
      const result = this.updateUserInfo({ payload: { data } })
                         .then(res => {
                           this.showTools = false;
                           if (data.url) this.$router.push({ name: 'UserProfile', params: { profileUrl: data.url } })
                         })
    },
    makeAction(action) {
      if (this.$route.name === 'CareerMap') {
        this.refreshData({ destroy: true })
      }
      this.$router.push({ name: action });
    },
    async changeAvatar(data) {
      console.log(data)
      const result = await this.changeUserAvatar({ payload: { file: data } })
      if (result) this.refreshUserInfo();
    },
    refreshMap(index){
      if (index > 0) return;
      if (!this.$route.name === 'CareerMap') return;
      if (this.$route.name === 'CareerMap') {
        this.refreshData({ destroy: true, selectNewFuction: true })
      }
    },
    async checkAvailability(url) {
      console.log('check')
      const result = await this.checkUrlAvailability({ payload: url });
      if (!result) this.urlAvailabile = false;
      else this.urlAvailabile = true;
    }
  },
  computed: {
    ...mapGetters("UserPage", [
      "getUserVacancyFavoriteList",
      "getUserInfo",
      "getUserVacancyRepliedList",
      'getUserCVList',
      'is_lockSidebar',
      'subscriptionStatus_get',
      'isFirstVisit_get',
      'showPrices_get',
      'subscriptionOptions_get',
      'subscriptionPrice_get',
      'userProfile_get',
      'toolsType_get',
      'userProfileUrl_get'
    ]),

    ...mapGetters("CareerMapNew", [
      'positionSelected_get',
      'selectedFunction_get',
      'functionList_get',
      'industryList_get'
    ]),

    activeCrunch() {
      if (this.$route.name === 'Jobs Desc') return this.actions.find(el => el.action === 'JobsFlow')
      if (this.$route.name === 'UserProfile') {
        if (this.userProfileUrl_get === this.$route.params.name||!this.$route.params.name) return { title : 'Мой профиль' }
        else return this.actions.find(el => el.action === 'Network')
      } else return this.actions.find(el => el.action === this.$route.name)
    },
     extraCrunch() {
       if (this.selectedFunction_get) {
         const arr = [this.selectedFunction_get.name]
         if (this.positionSelected_get) arr.push(this.positionSelected_get.title)
         return arr;
       }
       if (this.userProfileUrl_get === this.$route.params.name) return [];
       return this.$route.params.name ?  [this.$route.params.name] : []
     }

  },
  async beforeMount() {
    this.refreshUserInfo();
    this.refreshUserVacancyList();
    this.functionListUpdate();
    this.refreshIndustryList();
    this.lockSidebar = this.lockSidebarMain;
  },
  watch: {
    openPrices(newVal, oldVal){
      if (newVal === true) {
        this.showTools = true;
        this.$emit('openedPrices')
      }
    },
    showPrices_get(newVal, oldVal){
      if (newVal === true) {
        console.log('show')
        this.showTools = true;
        this.showPrices({ payload: { isShow: false }})
      }
    },
  },
  props: ['lockSidebarMain', 'openPrices']
};
</script>

<style>
  .onboarding {
    background-color: #FCFCFC;
  }

  .onboarding .greating-title {
    font-size: 32px;
    line-height: 44px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .onboarding .greating-text {
    font-weight: 300;
    margin-bottom: 30px;
  }

  .onboarding .info-input {
    margin-bottom: 15px;
  }

  .onboarding .info-input:last-child {
    margin-bottom: 0;
  }

  .onboarding .info-input {
    margin-bottom: 20px;
  }

  .onboarding .button-box {
    margin-top: 50px;
  }

  .onboarding-box {
    margin: 150px 0;
  }

  .sibebar-box {
    position: fixed;
    max-width: 240px;
    height: 100%;
    z-index: 10;
  }

  .menu-box {
    max-width: 0;
  }

  .breadcrunch {
    position: fixed;
    width: 100%;
    margin-left: 240px;
    z-index: 10;
  }

  .flow .breadcrunch {
    margin-left: 60px;
  }

  .mainpage.container {
    max-width: 100%;
    margin-top: 50px;
  }

  .CV-editor-main.container {
    max-width: 1073px;
    margin-top: 44px;
  }

  .resume-card-box {
    max-width: 235px;
  }

  .mainpage.lock-sidebar {
    margin-left: 240px;
  }

  .user-profile {
    padding:0;
    position:absolute;

  }
  .user-profile .sidebar {
    padding: 0;
    background-color: #f8f8f8;
    height: 100%;
    padding: 5px 10px;
  }

.sidebar  .personal-info {
  padding: 5px 15px 5px 5px;
  cursor: pointer;
}

.sidebar  .personal-info .name-box{
  font-size: 18px;
  line-height: 29px;
  color: #414141;
  font-weight: 500;
  margin-left: 10px;
}

.sidebar  .personal-info {
  margin-bottom: 55px;
}

 .action-box {
  font-size: 18px;
  line-height: 29px;
  color: #9D9D9D;
  font-weight: 500;

  margin-bottom: 20px;
  cursor: pointer;
}

.sidebar .action-box {
  padding: 0 35px;
}

.menu-bar .action-box {
  padding: 0 10px;
}

.promo-box .action-box.active {
  background-color: rgba(196, 196, 196, 0.4);
  color: #414141;
  border-radius: 3px;
}

.promo-box .action-box {
    padding: 0 31px;
    margin-bottom: 24px;
}

.action-box.active {
  color: #414141;
}

.promocode-text {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #9D9D9D;
  margin-top: 5px;
}

.filter-select-title.error-message {
  color: red
}

.action-box:hover, .personal-info:hover {
  background-color: rgba(196, 196, 196, 0.4);
  color: #414141;
  border-radius: 3px;
}



.tools-menu {
  padding: 0;
  background-color: #FFFFFF;
}

.tools-menu .menu-bar{
  padding: 50px 10px;
  background-color: #f8f8f8;
  height: 100%

}

.tools-menu .outer-container {
  height: 550px;
  overflow: hidden;
}

.tools-menu .inner-container {
  height: 100%;
  margin-right: -50px; /* maximum width of scrollbar */
  padding-right: 50px; /* maximum width of scrollbar */
  overflow-y: scroll;
  overflow-x: hidden;
}

.tools-menu .button-box {
  border-top: 1px solid #D0D0D0;
  margin-top: 0;
}

.info-section {
  padding-top: 50px;
}

.user-settings .info-section .setting-title{
  font-size: 18px;
  line-height: 29px;
  font-weight: 500;
  margin-bottom: 25px;
}

.user-settings .info-section .button{
  width: 200px;
  margin: 0;
  margin-bottom: 27px;
}

.user-settings .settings-input {
  margin-bottom: 20px;
}

.prices-box {
  min-height: 600px;
}

.tariff-constructor .v-chip {
  margin-bottom: 10px;
}


.prices-box .button.outlined {
  border-color: #E85218;
}

.show-sidebar-icon:hover {
  background-color: rgba(196, 196, 196, 0.4);
  border-radius: 3px;
}

.show-sidebar .show-sidebar-icon {
  transform: rotate(-180deg);
}

.show-sidebar {
  padding: 20px 20px 15px;
}

.user-profile .sidebar-flow {
  position: fixed;
  z-index: 10;
  width: 240px;
  height: 550px;
  border-radius: 0px 3px 3px 0px;
  border: 1px solid #D0D0D0;
  background-color: #FFFFFF;
  top: 70px;
  left: 0;
}

.sidebar .container {
  padding:0;
}

.breadcrunch, .show-sidebar {
  min-height: 70px;
  background-color: #fcfcfc;
}

.path {
  padding: 7px 13px;
  cursor: pointer;
}

.path:hover{
  padding: 7px 13px;
  background: rgba(196, 196, 196, 0.4);
  border-radius: 3px;
}

.user-resume {
  margin-top: 50px;
  margin-bottom: 115px;
}

.new-resume-box {
  border: 1px dashed #D0D0D0;
  box-sizing: border-box;
  border-radius: 3px;
  color: #D0D0D0;
  margin-right: 8px;
  margin-bottom: 10px;
  min-height: 291px;
  max-height: 291px;
  cursor: pointer;
  min-width: 227px
}

.new-resume-box:hover {
  border-color: #00A7F2;
  color: #00A7F2;
}

.new-resume-box:active {
  border-color: #009954;
  color: #009954;
}

.breadcrunch {
  padding-left: 63px;
  padding-top: 23px;
}

.breadcrunch .separator {
  padding: 0 23px;
}

.user-tariff-info .tariff-title {
  font-size: 18px;
  line-height: 29px;
  margin-bottom: 20px;
  font-weight: 500;
}

.user-tariff-info .tariff-name-info {
  font-size: 24px;
  line-height: 44px;
  margin-bottom: 15px;
  font-weight: 600;
}

.user-tariff-info .button {
  margin-top: 50px;
}

.avatar-box {
  margin-bottom: 20px;
}

.tariff-constructor .v-chip {
  width: 100%;
}

.progress-rectangle {
  margin-bottom: 20px;
}

.progress-rectangle > div {
  background: #D0D0D0;
  border-radius: 3px;
  height: 5px;

}

.progress-rectangle.active > div {
  background: #009954;

}

.url-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  padding-right: 5px
}

.onboarding-box .filter-select-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}

.onboarding-box .chips-box {
    margin-bottom: 15px;
}

.user-settings .telegram-input .settings-input{
  margin-bottom: 0;
}


</style>
