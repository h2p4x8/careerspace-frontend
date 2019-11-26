<template>
    <v-container jobDescription :no-scroll='$vuetify.breakpoint.smAndDown&&(telegramAttention||facebookAttention||showReplyMenu||showContact)'>
        <v-layout row wrap>
              <v-flex xs12 text-xs-center v-if='$vuetify.breakpoint.smAndDown && isReplied' reply-made-box>
                <v-btn color='#009954' flat dark class='button-done' outlined icon>
                  <v-icon dark size='25'>check</v-icon>
                </v-btn>
                <div class='title-text'>
                  Мы уже отправили твой отклик на эту вакансию
                </div>
                <div class='info-text'>
                  Ответ работодателя придёт тебе на почту <span style='color: #009954'>{{ getUserInfo.email }}</span>
                </div>
              </v-flex>
                <v-flex :offset-md2='!is_lockSidebar'  :offset-md1='is_lockSidebar' :md6='is_lockSidebar' :md5='!is_lockSidebar' card-container xs12>
                      <v-card class="jobDescription-card">
                        <v-layout row wrap align-center favorite_and-date>
                        <v-flex xs6 company-name>
                          <v-card-text>
                          {{ currentJob.companyName.name }}
                          </v-card-text>
                        </v-flex>
                          <v-flex xs6 text-xs-right>
                            <v-card-text class='jobCard_date'>
                              <span>{{ getDate }}</span>
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-center>
                          <v-flex xs12 jobDescription_title>
                            <v-card-title>
                              <h4>{{currentJob.positionName}}</h4>
                            </v-card-title>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap jobDescription_info>
                          <v-flex xs12 salary-info>
                            <v-card-text>
                              {{ currentJob.salaryInfo.toLowerCase() }}
                            </v-card-text>
                          </v-flex>
                          <v-flex grow salary-number>
                            <v-card-text>
                                от {{currentJob.salaryFrom.toLocaleString('ru-RU', { minimumFractionDigits: 0 })}} до {{currentJob.salaryTo.toLocaleString('ru-RU', { minimumFractionDigits: 0 })}} ₽/мес

                            </v-card-text>
                          </v-flex>
                          <v-flex shrink text-xs-right salary-number>
                            <v-card-text>
                                {{ currentJob.city }}
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                        <v-flex xs12 job-summary v-html='currentJob.summary' v-if='currentJob.summary'>
                        </v-flex>
                        <v-flex xs12 v-else>
                        <v-flex jobDescription_point xs12>
                            <v-card-title>
                              <v-layout row wrap>
                                <v-flex xs9 md12>
                                  <h3>Какие задачи будут перед тобой стоять</h3>
                                </v-flex>
                                <v-flex xs3 md12 text-xs-right v-if='currentJob.commentToDuties && $vuetify.breakpoint.smAndDown'>
                                  <v-icon color='#009954'
                                          class="material-icons-outlined"
                                          size='30'
                                          @click='showCommentToUser("commentToDuties")'>
                                            sms
                                          </v-icon>
                                </v-flex>
                              </v-layout>
                            </v-card-title>
                            <v-card-text class="pt-0 pb-0 pr-0 pl-0" ref='duties'>
                              <ul>
                                    <li v-for='slot in currentJob.duties'>{{ slot }}</li>
                              </ul>
                            </v-card-text>
                        </v-flex>

                        <v-flex jobDescription_point xs12>
                            <v-card-title>
                            <v-layout row wrap>
                              <v-flex xs9 md12>
                                <h3>Чего мы ждем от тебя</h3>
                              </v-flex>
                              <v-flex xs3 md12 text-xs-right v-if='currentJob.commentToRequirements && $vuetify.breakpoint.smAndDown'>
                                <v-icon color='#009954'
                                        class="material-icons-outlined"
                                        size='30'
                                        @click='showCommentToUser("commentToRequirements")'>
                                          sms
                                </v-icon>
                              </v-flex>
                            </v-layout>
                            </v-card-title>
                            <v-card-text class="pt-0 pb-0 pr-0 pl-0" ref='requirements'>
                              <ul>
                                    <li v-for='slot in currentJob.requirements'>{{ slot }}</li>
                              </ul>
                            </v-card-text>
                        </v-flex>

                        <v-flex jobDescription_point xs12 v-if='currentJob.extra.length > 0'>
                            <v-card-title>
                            <v-layout row wrap>
                              <v-flex xs9 md12>
                                <h3>Будет плюсом</h3>
                              </v-flex>
                              <v-flex xs3 md12 text-xs-right v-if='currentJob.commentToExtra && $vuetify.breakpoint.smAndDown'>
                                <v-icon color='#009954'
                                        class="material-icons-outlined"
                                        size='30'
                                        @click='showCommentToUser("commentToExtra")'>
                                          sms
                                </v-icon>
                              </v-flex>
                            </v-layout>
                            </v-card-title>
                            <v-card-text class="pt-0 pb-0 pr-0 pl-0" ref='extra'>
                              <ul>
                                    <li v-for='slot in currentJob.extra'>{{ slot }}</li>
                              </ul>
                            </v-card-text>
                        </v-flex>

                        <v-flex jobDescription_point xs12>
                            <v-card-title>
                            <v-layout row wrap>
                              <v-flex xs9 md12>
                                <h3>Причины работать с нами</h3>
                              </v-flex>
                              <v-flex xs3 md12 text-xs-right v-if='currentJob.commentToReasons && $vuetify.breakpoint.smAndDown'>
                                <v-icon color='#009954'
                                        class="material-icons-outlined"
                                        size='30'
                                        @click='showCommentToUser("commentToReasons")'>
                                          sms
                                </v-icon>
                              </v-flex>
                            </v-layout>
                            </v-card-title>
                            <v-card-text class="pt-0 pb-0 pr-0 pl-0" ref='reasons'>
                              <ul>
                                    <li v-for='slot in currentJob.reasons'>{{ slot }}</li>
                              </ul>
                            </v-card-text>
                        </v-flex>
                        </v-flex>
                      </v-card>
                  </v-flex>
                  <v-flex xs3 hidden-sm-and-down reply-option-box offset-md1>
                        <v-layout column contact outer-container>
                        <div class='inner-container'>
                        <v-flex xs12 text-xs-center v-if='isReplied' reply-made-box>
                          <v-btn color='#009954' flat dark class='button-done' outlined icon>
                            <v-icon dark size='25'>check</v-icon>
                          </v-btn>
                          <div class='title-text'>
                            Мы уже отправили твой отклик на эту вакансию
                          </div>
                          <div class='info-text'>
                            Ответ работодателя придёт тебе на почту <span style='color: #009954'>{{ getUserInfo.email }}</span>
                          </div>
                        </v-flex>
                        <v-flex contact-info-box xs12>
                        <v-btn depressed
                               class='button'
                               v-if='currentJob.contact'
                               block
                               color='#E85218'
                               dark
                               @click='isAuthenticated ? showContact ? showContact = false : showContactById() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                               :outline='showContact'>
                                {{ showContact ? 'Скрыть прямые контакты' : 'Посмотреть прямые контакты'}}
                        </v-btn>
                        <v-card class='card-info' v-if='showContact && isAuthenticated'>
                          <v-layout column v-if='currentJob.contact&&subscriptionStatus_get&&subscriptionOptions_get.some(el => el === "directContacts")'>
                            <v-flex>
                                {{contact.name}}
                            </v-flex>
                            <v-flex v-if='contact.telegram'>
                                telegram: {{`@${contact.telegram}`}}
                            </v-flex>
                            <v-flex v-if='contact.email'>
                                email: {{contact.email}}
                            </v-flex>
                            <v-flex v-if='contact.phone'>
                                + 7 ({{contact.phone.toString().slice(0, 3)}})-{{contact.phone.toString().slice(3, 6)}}-{{contact.phone.toString().slice(6, 8)}}-{{contact.phone.toString().slice(8, 10)}}
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap atention-box v-else text-xs-center>
                            <v-flex xs12 text>
                              Прямые контакты — часть платного функционала. Открой для себя весь careerspace,
                            </v-flex>
                            <v-flex xs12>
                            <v-btn color='#E85218' dark class='button' depressed @click='showPrices({ payload: { isShow: true, type: "tariff" } })'>
                              инвестируй в себя
                            </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-card>
                        </v-flex>

                        <v-btn depressed
                              class='button'
                              color='#0088CC'
                              dark
                              v-if='currentJob.contact ? currentJob.contact.telegram : false'
                              @click='isAuthenticated ? openTelegram() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                              block>Написать в Telegram</v-btn>
                        <v-layout row wrap atention-box v-if='telegramAttention' text-xs-center justify-center>
                          <v-flex xs12 text>
                                  Прямые контакты — часть платного функционала. Открой для себя весь careerspace,
                          </v-flex>
                          <v-flex xs12>
                            <v-btn color='#E85218' dark class='button' depressed @click='showPrices({ payload: { isShow: true, type: "tariff" } })'>
                                  инвестируй в себя
                            </v-btn>
                          </v-flex>
                          <v-flex shrink close-text path @click='telegramAttention = false'>
                            Не хочу
                          </v-flex>
                        </v-layout>
                        <v-btn depressed
                               class='button'
                               color='#3B5998'
                               dark
                               v-if='currentJob.facebookLink'
                               @click='isAuthenticated ? openFacebook() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                               block>Перейти к посту в Facebook</v-btn>
                               <v-layout justify-center row wrap atention-box v-if='facebookAttention' text-xs-center>
                                 <v-flex xs12 text>
                                         Прямые контакты — часть платного функционала. Открой для себя весь careerspace,
                                 </v-flex>
                                 <v-flex xs12>
                                   <v-btn color='#E85218' dark class='button' depressed @click='showPrices({ payload: { isShow: true, type: "tariff" } })'>
                                         инвестируй в себя
                                   </v-btn>
                                 </v-flex>
                                 <v-flex shrink close-text path @click='facebookAttention = false'>
                                   Не хочу
                                 </v-flex>
                               </v-layout>
                        <v-btn depressed
                               class='button'
                               v-if='currentJob.contact&&!isReplied ? currentJob.contact.email : false'
                               color='#009954'
                               dark
                               :outline='reply'
                               @click='isAuthenticated ? reply=!reply : $router.push({ name: "AuthPage", query: { type: "login" } })' block>
                               {{ reply ? 'Передумал' : 'Откликнуться через careerspace'}}
                        </v-btn>
                        <v-flex reply-box v-if='reply' xs12>
                          <VacancyReply @reply-close='reply=false, replySuccess=false'  @make-reply='makeReply' :replySuccess='replySuccess' v-if='isAuthenticated'/>
                        </v-flex>
                        <v-btn depressed
                               class='button'
                               color='#009954'
                               dark
                               v-if='currentJob.formLink'
                               @click='isAuthenticated ? openLink() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                               block>
                                Заполнить форму работодателя
                        </v-btn>

                      </div>
                    </v-layout>
                  </v-flex>

                  <v-flex filter-button :show-menu='showReplyMenu'  v-if='$vuetify.breakpoint.smAndDown' >
                    <v-flex v-if='!showReplyMenu'>
                      <v-btn block
                             dark
                             class='button'
                             color='#E85218'
                             depressed
                             @click='showReplyMenu = true'
                      >
                          Откликнуться
                      </v-btn>

                      </v-flex>
                      <v-flex v-else>

                      <v-btn block
                             dark
                             outline
                             class='button'
                             color='#009954'
                             depressed
                             @click='showReplyMenu = false'
                             style='margin-bottom: 41px;'
                      >
                         Скрыть
                      </v-btn>
                      <v-btn depressed
                             class='button'
                             color='#009954'
                             dark
                             v-if='currentJob.formLink'
                             @click='isAuthenticated ? openLink() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                             block>
                              Заполнить форму работодателя
                      </v-btn>
                      <v-btn dark
                             class='button'
                             color="#009954"
                             block
                             depressed
                             v-if='currentJob.contact&&!isReplied ? currentJob.contact.email : false'
                             @click='isAuthenticated ? reply=true : $router.push({ name: "AuthPage", query: { type: "login" } })'>
                         Откликнуться через careerspace
                      </v-btn>
                      <v-btn depressed
                             class='button'
                             color='#3B5998'
                             dark
                             v-if='currentJob.facebookLink'
                             @click='isAuthenticated ? openFacebook() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                             block>Перейти к посту в Facebook</v-btn>
                      <v-btn depressed
                            class='button'
                            color='#0088CC'
                            dark
                            v-if='currentJob.contact ? currentJob.contact.telegram : false'
                            @click='isAuthenticated ? openTelegram() : $router.push({ name: "AuthPage", query: { type: "login" } })'
                            block>Написать в Telegram</v-btn>
                      <v-btn dark
                             class='button'
                             color="#E85218"
                             depressed
                             block
                             v-if='currentJob.contact'
                             @click='isAuthenticated ? showContactById() : $router.push({ name: "AuthPage", query: { type: "login" } })'>
                        Посмотреть прямые контакты
                      </v-btn>
                      </v-flex>
                  </v-flex>
                <v-flex hidden-md-and-up style='position: fixed; bottom: 0; z-index: 10; width: 100%'>
                <v-expand-transition >
                  <v-flex xs12 v-show='telegramAttention||facebookAttention||(!subscriptionStatus_get&&!subscriptionOptions_get.some(el => el === "directContacts")&&showContact)' >
                  <v-layout row wrap atention-box attention text-xs-center>
                  <v-flex xs12>
                  <v-btn block
                         dark
                         outline
                         class='button'
                         color='#009954'
                         depressed
                         @click='telegramAttention = false, facebookAttention = false, showReplyMenu = true, showContact = false'
                  >
                     Скрыть
                  </v-btn>
                  </v-flex>
                    <v-flex xs6 offset-xs3 text>
                      Прямые контакты — часть платного функционала. Открой для себя весь careerspace,
                    </v-flex>
                    <v-flex xs12>
                    <v-btn color='#E85218' dark class='button' block depressed @click='showPrices({ payload: { isShow: true, type: "tariff" } })'>
                      инвестируй в себя
                    </v-btn>
                    </v-flex>
                  </v-layout>
                  </v-flex>
                </v-expand-transition>
                  <v-expand-transition >
                    <v-flex xs12 contact-sm  v-show='showContact&&subscriptionStatus_get&&subscriptionOptions_get.some(el => el === "directContacts")' >
                    <v-card class='card-info' v-if='currentJob.contact'>
                      <v-layout row wrap text-xs-center>
                        <v-flex xs12 v-if='contact.name' contact-info>
                            {{contact.name}}
                        </v-flex>
                        <v-flex card-info-contact xs12 v-if='contact.email' contact-info>
                            email: {{contact.email}}
                        </v-flex>
                        <v-flex v-if='contact.telegram' contact-info>
                            telegram: {{`@${contact.telegram}`}}
                        </v-flex>
                        <v-flex card-info-contact xs12 v-if='contact.phone !== 0&&contact.phone' contact-info>
                          phone: + 7 ({{contact.phone.toString().slice(0, 3)}})-{{contact.phone.toString().slice(3, 6)}}-{{contact.phone.toString().slice(6, 8)}}-{{contact.phone.toString().slice(8, 10)}}
                        </v-flex>
                        <v-flex>
                        <v-btn block
                               dark
                               outline
                               class='button'
                               color='#009954'
                               depressed
                               style='margin-top: 40px'
                               @click='showContact = false, showReplyMenu = true'
                        >
                           Скрыть
                        </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card>
                    </v-flex>
                  </v-expand-transition>
                  <v-expand-transition >
                    <v-flex xs12 v-show='reply'>
                      <VacancyReply @reply-close='reply=false, replySuccess=false'  @make-reply='makeReply' :replySuccess='replySuccess' v-if='isAuthenticated'/>
                    </v-flex>
                  </v-expand-transition>
                  </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VacancyReply from "./VacancyReply.vue";

export default {
  name: "jobDescription",
  data: function() {
    return {
      currentJob: {},
      posD: "",
      posRes: "",
      posReq: "",
      posE: "",
      showContact: false,
      contact: {},
      companyName: "",
      reply: false,
      replySuccess: false,
      comment: 'Задачи классные, есть реальная возможность прокачаться. Особенно подойдет людям из Market Research',
      showComment: false,
      showReplyMenu: false,
      telegramAttention: false,
      facebookAttention: false,
    };
  },
  methods: {
    ...mapActions("VacancyFlow", ["vacancyGetById", "makeReplyToVacancy"]),
    ...mapActions("CompanyEditor", ["companyGetById", "contactGetById"]),
    ...mapActions("UserPage", ["refreshUserVacancyList",'showAttention', 'showReason', 'showPrices', 'subscriptionOptions_get']),

    goBack() {
      this.$router.push({ name: "JobsFlow" });
    },
    async showContactById() {
      if (this.$vuetify.breakpoint.smAndDown) this.showReplyMenu = false;
      if (!this.subscriptionStatus_get&&!this.subscriptionOptions_get.some(el => el === 'directContacts')) {
        this.showContact = true;
        return;
      } else {
        this.contactGetById({payload: { id: this.currentJob.contact.id }})
                                  .then(res => {
                                    if (!res) return;
                                    this.contact = res;
                                    this.showContact = true;
                                  })
      }

    },

    openFacebook(){
      if (!this.subscriptionStatus_get&&!this.subscriptionOptions_get.some(el => el === 'directContacts')) {
        this.facebookAttention = true;
        if (this.$vuetify.breakpoint.smAndDown) this.showReplyMenu = false;
      } else {
        window.open(this.currentJob.facebookLink, '_blank')
      }

    },

    async makeReply(data) {
      const result = await this.makeReplyToVacancy({
        payload: { data, vacancyId: this.currentJob.id }
      });
      console.log(result);
      if (result.success) {
        this.refreshUserVacancyList();
        this.replySuccess = true;
        this.reply = false;
      } else {
        if (result.result.message === 'off limit') {
          this.showReason({ payload: 'offLimit' })
          this.showAttention({ payload: true })
        }
      }

    },
    openTelegram(){
      if (!this.subscriptionStatus_get&&!this.subscriptionOptions_get.some(el => el === 'directContacts')) {
        this.telegramAttention = true;
        if (this.$vuetify.breakpoint.smAndDown) this.showReplyMenu = false;
        return;
      } else {
        this.contactGetById({payload: { id: this.currentJob.contact.id }})
                                  .then(res => {
                                    if (!res) return;
                                    this.contact = res;
                                    window.open(`https://t.me/${this.contact.telegram}`, '_blank')
                                  })

      }
    },
    openLink(){
      window.open(this.currentJob.formLink, '_blank')
    },
    showCommentToUser(commentName) {
      this.comment = this.currentJob[commentName];
      this.showComment = true;
    },
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },

  },
  async beforeMount() {
    let id = this.id;
    this.currentJob = await this.vacancyGetById({ payload: { id } })
                                .then(res => {
                                  document.title = `${res.positionName} в ${res.companyName.name}`
                                  return res;
                                })
  },
  computed: {
    ...mapGetters("Auth", ["isAuthenticated"]),
    ...mapGetters("UserPage", ["getUserInfo", 'getUserVacancyRepliedList', 'getUserVacancyRepliedList', 'is_lockSidebar',
  'subscriptionStatus_get', 'subscriptionOptions_get']),
    isReplied() {
      const user = localStorage.getItem('user-token');
      if (user) {
        const id = this.currentJob.id
        return this.getUserVacancyRepliedList.find(el => el.vacancy == id) ? true : false;
      } else {
        return false;
      }
    },
    getDate() {
      const lastDay = new Date(this.currentJob.createdAt),
            now = new Date();

      var daysLag = Math.ceil(Math.abs(now.getTime() - lastDay.getTime()) / (1000 * 3600 * 24));

      if (daysLag <= 1) return 'Сегодня';
      if (daysLag >= 1 && daysLag < 14) return `${daysLag} ${this.declOfNum(daysLag, ['день', 'дня', 'дней'])} назад`;
      if (daysLag >= 14 && daysLag < 28) return `Две недели назад`;
      if (daysLag >= 28 && daysLag < 35) return `Три недели назад`;
      if (daysLag >= 35) return `Четыре недели назад`;
    }
  },
  props: ["id"],
  components: {
    VacancyReply,
  },
  mounted(){

  },

  destroyed(){
  },
  watch: {

  },
  beforeDestroy(){
    this.showAttention({ payload: false })
  },
};
</script>
