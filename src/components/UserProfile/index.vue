<template>
  <v-container>
    <v-layout row wrap profile-page another-person v-if='userProfileUrl_get !== url'>
    <v-flex md9 offset-md3 profile-head-box xs12>
      <v-layout row wrap text-xs-center text-md-left>
        <v-flex shrink profile-image>
          <v-avatar class='avatar' :class="anotherUserProfile_get.user.avatarUrl ? 'is-image' : 'no-photo'" size='150'>
          <v-img :src="anotherUserProfile_get.user.avatarUrl||require('@/assets/profile-photo.png')"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex :grow='$vuetify.breakpoint.mdAndUp' :xs12='$vuetify.breakpoint.smAndDown' align-self-center personal-ids>
          <v-flex grow personal-name align-self-center>
            <span class='name-box'> {{ anotherUserProfile_get.user.fullName }}</span>
          </v-flex>
          <v-flex :grow='$vuetify.breakpoint.mdAndUp' :xs12='$vuetify.breakpoint.smAndDown' personal-url align-self-center>
            <span class='name-box'> {{ anotherUserProfile_get.url }}</span>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs10 offset-xs1 md3 offset-md3 text-xs-center text-md-left>
      <v-layout row wrap>
        <v-flex  xs12 description>
          {{ anotherUserProfile_get.description }}
        </v-flex>
        <v-flex grow align-self-center>
          <v-layout row job-info v-for='el in anotherUserProfile_get.jobList'>
            <v-flex align-self-center grow>
              <span class='position-name'>{{ el.positionName }}</span> в {{ el.companyName }}
            </v-flex>
          </v-layout>
          </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md2 offset-md1 xs10 offset-xs1 v-if='anotherUserProfile_get.readyToMeeting' class='invite-button'>
      <v-btn class='button'
             depressed
             color='#009954'
             :light='!isInviteAllowed'
             :disabled='!isInviteAllowed'
             block
             :dark='isInviteAllowed'
             @click='openInvite'>
        Пригласить на кофе
      </v-btn>
      <div class='invite-message text-md-left text-xs-center' v-if='!isInviteAllowed'>Разреши людям приглашать тебя на кофе, тогда сможешь приглашать других</div>
      <v-dialog
        v-model="invite"
        max-width="920"
        scrollable
        :fullscreen='$vuetify.breakpoint.smAndDown'
        content-class='invite-dialog'
      >
        <InviteDialog :allowToInvite='!notReadyToCoffee'
                      :telegram='userProfile_get.telegram'
                      @close='invite = false'
                      :fullName='userProfile_get.user ? userProfile_get.user.fullName : false'
                      :jobs='userProfile_get.jobList ? userProfile_get.jobList.length > 0 : false'
                      :photo='getUserInfo.avatarUrl'
                      :description='userProfile_get.description'
                      @fillProfile='$router.push({ name: "UserProfile", params: { profileUrl: userProfileUrl_get } })'
                      @invite='openTelegram'/>
      </v-dialog>
    </v-flex>
    </v-layout>
    <v-layout row wrap profile-page my-profile v-else>
      <v-flex md9 offset-md3 profile-head-box xs12>
        <v-layout row wrap text-xs-center text-md-left>
          <v-flex shrink profile-image grey-hover @click='changeImage'>
            <v-avatar class='avatar' :class="getUserInfo.avatarUrl ? 'is-image' : 'no-photo'" size='150'>
            <v-img :src="getUserInfo.avatarUrl||require('@/assets/profile-photo.png')"></v-img>
            <div class='reload-photo'>
              <div class='inner-box'>
                Обновить фото
              </div>
            </div>
            </v-avatar>
            <input v-show="false" ref="personalImage" type="file" name="personalImage" accept=".jpg, .jpeg" @change="onFilePicked()">
          </v-flex>

          <v-flex :grow='$vuetify.breakpoint.mdAndUp' :xs12='$vuetify.breakpoint.smAndDown' align-self-center personal-ids>
            <v-flex grow personal-name align-self-center @click='showPrices({ payload: { isShow: true, type: "name"} })'>
              <span class='grey-hover name-box'> {{ getUserInfo.fullName ? getUserInfo.fullName : userProfile_get.url }}</span>

            </v-flex>
            <v-flex grow personal-url align-self-center v-if='userProfile_get.user.fullName' @click='showPrices({ payload: { isShow: true, type: "url"} })'>
              <span class='grey-hover name-box'> {{ userProfile_get.url }}</span>

            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10 offset-xs1 md3 offset-md3 text-xs-center text-md-left>
        <v-layout row wrap>
          <v-flex  xs12 description grey-hover :no-text='!userProfile_get.description' v-if='!descriptionEditor' @click='descriptionEditor = true, jobEditor = false'>
            {{ userProfile_get.description ? userProfile_get.description : 'Кратко расскажи о себе. Чем занимаешься, в чём разбираешься и с кем тебе было бы интересно пообщаться?' }}
          </v-flex>
          <v-flex  xs12 description v-else>
            <DescriptionEditor :description='userProfile_get.description' @save='saveInfo' @close='descriptionEditor = false'/>
          </v-flex>
          <v-flex xs12 v-if='!jobEditor'>
          <draggable v-model="jobList" :handle="$vuetify.breakpoint.smAndDown ? '' : '.handle'" ghost-class="ghost" @choose='isDrag = true' @end='isDrag = false'>
              <v-layout job-list row v-for='el in jobList' :key="el.name" :grey-hover='!isDrag'>
              <v-flex shrink drag-icon handle align-self-center v-if='$vuetify.breakpoint.mdAndUp'>
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.5" cy="1.5" r="1.5" fill="#C4C4C4" fill-opacity="0.6"/>
                <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" fill-opacity="0.6"/>
                <circle cx="7.5" cy="13.5" r="1.5" fill="#C4C4C4" fill-opacity="0.6"/>
                <circle cx="1.5" cy="13.5" r="1.5" fill="#C4C4C4" fill-opacity="0.6"/>
                <circle cx="7.5" cy="7.5" r="1.5" fill="#C4C4C4" fill-opacity="0.6"/>
                <circle cx="1.5" cy="7.5" r="1.5" fill="#C4C4C4" fill-opacity="0.6"/>
                </svg>
            </v-flex>
                <v-flex xs12 align-self-center>
                  <v-layout row job-info @click='openJobEditor(el.id)' fill-height>
                    <v-flex align-self-center>
                      <span class='position-name'>{{ el.positionName }}</span> в {{ el.companyName }}
                      <span v-if='el.industry.length === 0||el.functions.length === 0' style='padding-left: 5px;'><svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3.5" cy="3.5" r="3.5" fill="#E85218"/>
                      </svg></span>
                    </v-flex>
                    <v-flex icon-box @click.stop='deleteUserJob(el.id)'>
                      <v-layout row wrap fill-height>
                        <v-flex align-self-center>
                          <v-icon class='material-icons-outlined' size='20'>close</v-icon>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  </v-flex>
              </v-layout>
          </draggable>

            <v-flex xs12 description grey-hover v-if='userProfile_get.jobList.length < 5' no-text @click='openJobEditor("new")'>
              Добавь место работы
            </v-flex>
          </v-flex>
          <v-flex v-else xs12>
            <JobEditor :functions='functionList_get'
                       :industry='industryList_get'
                       :job='editedJob'
                       @save='saveUserJob'
                       @close='closeJobEditor'/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md3 offset-md1 xs10 offset-xs1 text-xs-center text-md-left>
        <v-layout row wrap justify-center>
          <v-flex  xs12 need-to-fill v-if='notReadyToCoffee'>
              <v-flex xs12 fill-title>
                Несколько простых действий и сможешь расширять свой нетворк на платформе
              </v-flex>
                <v-flex xs12 v-if='!userProfile_get.user.fullName' add-title grey-hover @click='showPrices({ payload: { isShow: true, type: "name"} })'>
                  Расскажи, как тебя зовут
                </v-flex>
                <v-flex xs12 v-if='!userProfile_get.description' add-title grey-hover @click='descriptionEditor = true'>
                  Кратко расскажи о себе
                </v-flex>
                <v-flex xs12 v-if='jobList_get.length < 1' add-title grey-hover @click='openJobEditor("new")'>
                  Добавь места работы
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 v-if='!getUserInfo.avatarUrl' add-title grey-hover @click='changeImage'>
                  Добавь фотографию
            </v-flex>
            <v-flex shrink v-if='!userProfile_get.telegram' add-title grey-hover @click='showPrices({ payload: { isShow: true, type: "telegram"} })'>
                  Добавь свой контакт в Telegram
            </v-flex>
          </v-flex>
          <v-flex  xs12 v-else ready-to-meeting>
            <v-flex toogle-box :hover='$vuetify.breakpoint.mdAndUp ? hover : false' text-xs-center>
                      <div class='custom-toogle'
                            :class='readyToMeeting.title === el.title ? "active" : "non-active"'
                            v-for='el in coffeeReady'
                            @click='makeReadyToMeeting(el)'
                            @mouseover='readyToMeeting === el ? "" : hover = true'
                            @mouseout='readyToMeeting === el ? "" : hover = false'
                            >
                              {{ el.title }}
                            </div>
            </v-flex>
            <v-flex xs11 ready-to-meet-text v-if='readyToMeeting.value'>
              Спасибо, что вносишь вклад в сообщество своим желанием общаться с людьми и делиться знаниями!
            </v-flex>
          </v-flex>
      </v-layout>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DescriptionEditor from './DescriptionEditor.vue';
import JobEditor from './JobEditor.vue';
import InviteDialog from './InviteDialog.vue';
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      profile:{},
      descriptionEditor: false,
      jobEditor: false,
      editedJob: '',
      isDrag: false,
      coffeeReady: [
        {
          title: 'Встречусь на кофе',
          value: true,
        },
        {
          title: 'Не хочу общаться',
          value: false,
        },
      ],
      readyToMeeting: {
        title: 'Не хочу общаться',
        value: false,
      },
      hover: false,
      invite: false,
    };
  },
  components: {
    DescriptionEditor,
    JobEditor,
    draggable,
    InviteDialog
  },
  methods: {
    ...mapActions('UserPage',
    [
      'getUserProfile',
      'updateUserProfile',
      'createNewJob',
      'readUserJob',
      'updateJob',
      'changePersonalImage',
      'updateJobList',
      'showPrices',
      'changeUserAvatar',
      'refreshUserInfo',
      'deleteJob'
    ]),

    ...mapActions('CareerMapNew',
    [
      'functionListUpdate',
      'refreshIndustryList',
    ]),

    async saveInfo(data) {
      this.updateUserProfile({ payload: {data} })
          .then(res => {
            if (res) {
              this.refreshData();
              this.descriptionEditor = false;
            }
          })

    },

    async refreshData() {
      this.getUserProfile({ payload: this.url });
    },

    async openJobEditor(id) {
      if (this.userProfile_get.jobList.length >= 5) return;
      this.functionListUpdate();
      this.refreshIndustryList();
      if (id !== 'new') {
        return this.readUserJob({ payload: id })
            .then(res => {
              this.editedJob = Object.assign({}, res)
              this.jobEditor = true;
              this.descriptionEditor = false;
              return;
            })
      }
      this.jobEditor = true;
    },
    async saveUserJob(data){
      if (!this.editedJob) {
        data.order = this.userProfile_get.jobList.length + 1;
        this.createNewJob({ payload: { data } })
            .then(res => {
              if (res) {
                this.refreshData();
                this.jobEditor = false;
              }
            })
      } else {
        this.updateJob({ payload: { data, id: this.editedJob.id } })
            .then(res => {
              if (res) {
                this.refreshData();
                this.jobEditor = false;
              }
            })
      }
    },

    async closeJobEditor(){
      this.editedJob = '';
      this.jobEditor = false;
    },

    changeImage(){
      this.$refs.personalImage.click();
    },

    onFilePicked(){
      console.log('1')
      console.log(event.target.files[0])
      this.changeUserAvatar({ payload: { file: event.target.files[0] } })
          .then(res => {
            if (res) {
              this.refreshData();
              this.refreshUserInfo()
            }
          })
    },
    makeReadyToMeeting(el) {
      this.hover = false;
      this.readyToMeeting = el;
      const data = {
        readyToMeeting: el.value
      }
      this.updateUserProfile({ payload: {data} })
          .then(res => {
            if (res) {
              this.refreshData();
            }
          })
    },
    openTelegram(){
      window.open(`https://t.me/${this.anotherUserProfile_get.telegram}`, "_blank")
    },
    openInvite(){
      if (!this.isAuthenticated) this.$router.push({ name: "AuthPage", query: { type: "login" } })
      else this.invite = true
    },

    deleteUserJob(id){
      this.deleteJob({ payload: { id } })
          .then(res => {
            if (res) this.refreshData()
          })
    }
  },
  async beforeMount() {
    this.refreshData()
  },
  mounted() {
    if (this.userProfileUrl_get === this.url) document.title = this.getUserInfo.fullName;
    else document.title = this.anotherUserProfile_get.user.fullName;
    if (Object.keys(this.userProfile_get).length > 0) {
      this.readyToMeeting = this.coffeeReady.find(el => el.value === this.userProfile_get.readyToMeeting)
    }
  },
  computed: {
    ...mapGetters('UserPage', [
      'userProfile_get',
      'jobList_get',
      'getUserInfo',
      'userProfileUrl_get',
      'anotherUserProfile_get'
    ]),

    ...mapGetters("CareerMapNew", [
      'functionList_get',
      'industryList_get'
    ]),

    ...mapGetters("Auth", ["isAuthenticated"]),

    jobList:  {
        get() {
          return this.jobList_get;
        },
        set(value) {
          this.updateJobList({ payload: value })
        }
    },

    notReadyToCoffee(){
      if (!this.isAuthenticated) return true;
      return (!this.getUserInfo.fullName||!this.userProfile_get.description||this.jobList_get.length < 1||!this.getUserInfo.avatarUrl||!this.userProfile_get.telegram)
    },

    isInviteAllowed(){
      if (!this.userProfileUrl_get) return true;
      else if (this.notReadyToCoffee) return true;
      else if (this.userProfile_get.readyToMeeting) return true;
      else return false;
    }
  },
  watch: {
    userProfile_get(newVal, oldVal) {
      if (Object.keys(newVal).length > 0) {
        this.readyToMeeting = this.coffeeReady.find(el => el.value === this.userProfile_get.readyToMeeting)
      }
    },
    url(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.userProfileUrl_get === this.url) document.title = this.getUserInfo.fullName;
        else document.title = this.anotherUserProfile_get.user.fullName;
      }
    },
    notReadyToCoffee(newVal, oldVal){
      if (newVal !==oldVal){
        if (!newVal) {
          const data = {
            readyToMeeting: true
          }
          this.updateUserProfile({ payload: {data} })
              .then(res => {
                if (res) this.refreshData()
              })
        } else if (newVal) {
          const data = {
            readyToMeeting: false
          }
          this.updateUserProfile({ payload: {data} })
              .then(res => {
                if (res) this.refreshData()
              })
        }
      }
    }
  },
  props: ['url']
};
</script>

<style>

.profile-page {
  margin-bottom: 15px;
}

.personal-ids {
  padding-left: 10px;
}

.personal-name {
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
}

.personal-url {
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
}

.profile-page .profile-image{
  padding: 5px;
  border-radius: 100px;
}



.profile-page  .description {
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: 300;
}

.profile-page  .description.no-text{
  color: #9D9D9D;
}

.add-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: #9D9D9D;
  padding: 10px;
  border-radius: 3px;
}

.profile-page .grey-hover.no-text:hover {
  color: #414141;
}

.profile-page .grey-hover:hover {
  background: rgba(196, 196, 196, 0.4);
  cursor: pointer;
}

.job-list.grey-hover:hover{
  background: none;
}

.job-list.grey-hover:hover .job-info {
  background: rgba(196, 196, 196, 0.4);
  color: #414141;
  cursor: pointer;
}

.job-list.grey-hover:active .job-info {
  background: none;
}

.job-list .ghost {
  background: rgba(254, 254, 254, 0.6);
  color: #9D9D9D;
}

.job-list {
  min-height: 29px;
}

.drag-icon {
  margin-right: 5px;
  height: 15px;
}

.sortable-drag {
  background: rgba(254, 254, 254, 0.6);
  color: #9D9D9D;
}

.need-to-fill .fill-title {
  margin-bottom: 10px;
}

.profile-head-box {
  margin-bottom: 34px;
  margin-top: 100px;
}

.description-editor .button,  .job-editor .button{
  height: 40px;
  margin: 0;
}

.description-return  {
  padding-left: 5px
}

.job-info .position-name {
  font-weight: 600;
}

.job-info {
  padding: 1px 1px 1px 10px;
  border-radius: 3px
}

.job-info .icon-box {
  padding: 3px 4px 2px;
  border-radius: 3px;
  color: #000000;
  min-width: 26px;
  max-width: 26px;
}

.job-info .icon-box .theme--light.v-icon{
  color: #000000;
}
.job-info .icon-box:hover {
  background: rgba(196, 196, 196, 0.6);
}

.job-info .icon-box:hover .theme--light.v-icon{
  color: #00A7F2;
}

.ghost .job-info {
  background: rgba(254, 254, 254, 0.6);
  color: #9D9D9D;
}
.profile-image, .description, .job-list,  .another-person .job-info, .job-editor {
  margin-left: 14px;
}

.job-list:hover {
  margin-left: 0;
}

.job-list > .drag-icon, .job-list > .flex > .job-info > .icon-box .v-icon {
  display: none;
}

.job-list:hover > .drag-icon, .job-list:hover > .flex > .job-info > .icon-box .v-icon{
  display: inline-block;
}

.name-box {
  padding: 5px;
  border-radius: 3px;
}

.reload-photo{
  position: relative;
  display: none;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  background: rgba(196, 196, 196, 0.4);
  border-radius: 3px;
  width: 150px;
  height: 150px;
  border-radius: 100px;
}
.reload-photo .inner-box{
  padding: 10px 5px;
  background: rgba(196, 196, 196, 0.8);
  border-radius: 3px;
  width: fit-content;
  margin: 89px auto 0;
  color: #000000;
}

.profile-image .v-image{
  position: absolute;
}

.profile-image:hover .is-image .reload-photo{
  display: inline-block;
}

.profile-page .toogle-box .custom-toogle{
  font-size: 12px;
  line-height: 14px;
  padding: 8px 10px;
}

.ready-to-meet-text {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  margin-top: 10px
}

.invite-dialog {
  min-height: 600px;
}

.invite-dialog .add-title {
  padding: 0
}

.job-editor {
  margin-top: 13px;
}

.job-editor .info-input{
  font-weight: 300;
  margin-bottom: 15px;
}

.description .v-text-field.v-text-field--enclosed .v-text-field__details, .description .v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
    padding: 5px;
}

.description .v-textarea textarea {
  padding: 0;
}

.description .v-textarea.v-text-field--box .v-text-field__prefix, .description .v-textarea.v-text-field--enclosed .v-text-field__prefix, .description .v-textarea.v-text-field--box textarea, .description .v-textarea.v-text-field--enclosed textarea {
  margin-top: 0;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
}

.description .v-textarea.v-text-field--box.v-text-field--single-line .v-label, .description .v-textarea.v-text-field--enclosed.v-text-field--single-line .v-label {
    top: 0;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
}

.filter-select-title.tip {
  color: #E85218
}

.invite-message {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  margin-top: 9px;
  word-spacing: -1px;
}

.profile-card .profile-image {
  margin-left: 0;
}

.profile-card {
  padding: 34px 0;
  margin-bottom: 10px;
}

.profile-card .profile-info {
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
}

.profile-card .profile-name {
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
  margin-bottom:3px;
}


@media only screen and (max-width: 600px) {
  .profile-page .profile-image {
    margin: auto;
  }

  .personal-ids {
    padding-left: 0;
  }

  .need-to-fill {
    margin-top: 30px;
  }

  .profile-image, .description, .job-list, .another-person .job-info, .job-editor {
    margin-left: 0;
  }

  .ready-to-meeting, .invite-button {
    margin-top: 73px;
  }

  .profile-page .toogle-box .custom-toogle{
    padding: 18px 10px;
  }

  .profile-card .profile-info {
    margin: 0;
  }

  .profile-card {
    padding: 20px 0;
  }

  .profile-card .profile-name {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-bottom:5px;
  }

  .profile-card .profile-job {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    margin-bottom:3px;
  }

  .profile-card .profile-job:last-child {
    margin-bottom:0;
  }
}





</style>
