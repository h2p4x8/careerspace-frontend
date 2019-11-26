<template >
  <v-flex v-if='$vuetify.breakpoint.mdAndUp'>
    <v-card class='vacancy-reply-card'>
      <v-layout row wrap justify-space-between vacancy-reply-container v-if='!replySuccess'>
        <v-flex xs12 name-input>
          <div class='filter-select-title'>Имя</div>
          <v-text-field
              label="Иван"
              v-model='firstName'
              solo
              flat
              class='input-border'
              height='60'
              hide-details
              :rules="[rules.required]"
            ></v-text-field>
            </v-flex>
            <v-flex xs12 name-input>
            <div class='filter-select-title'>Фамилия</div>
            <v-text-field
              label="Иванов"
              v-model='lastName'
              height='60'
              solo
              flat
              class='input-border'
              hide-details
              :rules="[rules.required]"
            ></v-text-field>
            </v-flex>
            <v-flex xs12 reply-title>
              <div class='filter-select-title'>Сопроводительное письмо</div>
            </v-flex>
            <v-flex xs12 coveringLetter>
              <v-textarea
                solo
                flat
                :rows='$vuetify.breakpoint.mdAndUp ? 7 : 8'
                class='input-border'
                v-model='coveringLetter'
                hide-details
                label='Напиши информативное письмо'
                :rules="[rules.required]"
              ></v-textarea>
            </v-flex>
            <v-flex xs12 resume>
                <div class='filter-select-title'>Резюме</div>
                <v-btn v-if='getUserCVList.length === 0' block class='button' depressed :to='{ name: "ResumeTool", query: { id: "new" }}' color='#009954' dark>
                  Создать резюме
                </v-btn>
                <v-select
                  v-if='!resume&&getUserCVList.length > 0'
                  solo
                  flat
                  chips
                  clearable
                  attach
                  class='input-border select'
                  hide-details
                  height='60'
                  single-line
                  :items="getUserCVList"
                  item-text='name'
                  item-value='id'
                  v-model='cv'
                  @change='resume = null'
                >
                <template v-slot:selection="{ item }">
                  <v-chip color='#009954' dark label large class='chips'>
                    <div class='title-small'>{{ item.name }}</div>
                  </v-chip>
                </template>

                </v-select>
                <v-btn block class='button' outline @click='pickFile' color='#009954' dark v-if='!cv'>
                {{this.resume?this.resume.name:"Прикрепить файл"}}
                <input
                  type="file"
                  style="display: none"
                  ref="cv"
                  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                  @change="onFilePicked"
                >
                </v-btn>
            </v-flex>
            <v-flex xs12 make-reply v-if='$vuetify.breakpoint.mdAndUp'>
              <v-btn class='button' depressed width='245px' color='#F0652F'  block :dark='isActive' @click='makeReply' :disabled='!isActive'>Отправить отклик</v-btn>
            </v-flex>
            <v-flex xs6 go-back v-if='$vuetify.breakpoint.smAndDown'>
              <v-btn class='button'
                     block
                     color='#009954'
                     flat
                     dark
                     @click='$emit("reply-close")'>
                Скрыть
              </v-btn>
            </v-flex>
            <v-flex xs6 make-reply-sm v-if='$vuetify.breakpoint.smAndDown'>
              <v-btn class='button'
                     block
                     color='#F0652F'
                     :dark='isActive'
                     depressed
                     @click='makeReply'
                     :disabled='!isActive'>
                Откликнуться
              </v-btn>
            </v-flex>
      </v-layout>

      <v-layout fill-height justify-center row wrap text-xs-center succes-reply v-else>
        <v-flex xs12 reply-title>
          Отклик успешно отправлен!
        </v-flex>
        <v-flex xs12 reply-to-info>
          Ответ от работодателя придет тебе на почту: <span style='color: #009954'>{{ getUserInfo.email }}</span>
        </v-flex>
        <v-flex xs12 make-reply>
          <v-btn class='button' color='#009954' depressed dark @click='$emit("reply-close")'>Хорошо, спасибо!</v-btn>
        </v-flex>
      </v-layout>

    </v-card>
  </v-flex>
  <v-flex v-else>
    <v-card class='mobile-reply'>
      <v-layout row wrap justify-space-between>
        <v-flex xs12>
        <v-btn class='button'
               block
               outline
               color='#009954'
               flat
               dark
               @click='$emit("reply-close")'>
          Скрыть
        </v-btn>
        </v-flex>
        <v-flex xs12 steps-circle>
          <div class='circle active' @click='showAction("showName")'></div>
          <div class='line' :class='{ "active" : showCL||showCV }'></div>
          <div class='circle' :class='{ "active" : showCL||showCV }' @click='showAction("showCL")'></div>
          <div class='line' :class='{ "active" : showCV }'></div>
          <div class='circle' :class='{ "active" : showCV }' @click='showAction("showCV")'></div>
        </v-flex>
        <v-flex xs3 text-xs-center @click='showAction("showName")' legend>
          Как тебя зовут?
        </v-flex>
        <v-flex xs6 text-xs-center @click='showAction("showCL")' legend>
          Почему стоит тебя рассмотреть?
        </v-flex>
        <v-flex xs3 text-xs-center @click='showAction("showCV")' legend>
          Какое резюме отправим?
        </v-flex>
        <v-flex xs12 name-input v-if='showName'>
          <div class='filter-select-title'>Имя</div>
          <v-text-field
              label="Иван"
              v-model='firstName'
              solo
              flat
              class='input-border'
              height='60'
              hide-details
              :rules="[rules.required]"
            ></v-text-field>
            <div class='filter-select-title'>Фамилия</div>
            <v-text-field
              label="Иванов"
              v-model='lastName'
              height='60'
              solo
              flat
              class='input-border'
              hide-details
              :rules="[rules.required]"
            ></v-text-field>
        </v-flex>
        <v-flex xs12 coveringLetter v-if='showCL'>
          <div class='filter-select-title'>Сопроводительное письмо</div>
          <v-textarea
            solo
            flat
            :rows='$vuetify.breakpoint.mdAndUp ? 7 : 8'
            class='input-border'
            v-model='coveringLetter'
            hide-details
            label='Напиши информативное письмо'
            :rules="[rules.required]"
          ></v-textarea>
        </v-flex>
        <v-flex xs12 resume-box v-if='showCV'>
          <v-flex xs12 v-if='getUserCVList.length > 0&&!resume' chips-box>
            <div class='filter-select-title'>Резюме</div>
            <v-chip :color='cv !== el.id ? "#F9F9F9" : "#009954"' v-for='el in getUserCVList' :dark='cv === el.id' @click='addCV(el.id)'>
              {{ el.name }}
            </v-chip>
          </v-flex>
          <v-flex xs12>
            <v-btn block class='button' outline @click='pickFile' color='#009954' dark v-if='!cv'>
            {{this.resume?this.resume.name:"Прикрепить файл"}}
            <input
              type="file"
              style="display: none"
              ref="cv"
              accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
              @change="onFilePicked"
            >
            </v-btn>
          </v-flex>
        </v-flex>
        <v-flex xs12>
        <v-btn class='button'
               block
               :color='showName||showCL ? "#009954" : "#E85218"'
               :dark='showName||showCL ? true : isActive'
               depressed
               @click='makeStep'
               :disabled='showName||showCL ? false : !isActive'>
           {{ showName||showCL ? 'Далее' : 'Откликнуться через careerspace' }}
        </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ['replySuccess'],
  name: "jobCard",
  data() {
    return {
      linkCV: "",
      coveringLetter: "",
      lastName: '',
      firstName: '',
      resume: null,
      cv: "",
      rules: {
        required: value => !!value || "Обязательно к заполнению.",
        isLink: value => {
          const pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
          return pattern.test(value) || "Invalid link.";
        }
      },
      showName: true,
      showCL: false,
      showCV: false,
    };
  },
  methods: {
    ...mapActions("UserPage", ["refreshUserInfo", 'refreshUserVacancyList']),
    makeReply() {
      // const data = {};
      // if (this.firstName && this.lastName) data.fullName = `${this.firstName} ${this.lastName}`;
      // data.cv = this.cv;
      // data.coveringLetter = this.coveringLetter;
      // console.log(data)
      // this.$emit("make-reply", data)
      let formData = new FormData();
      formData.append("fullName", `${this.firstName} ${this.lastName}`);

      formData.append("coveringLetter", this.coveringLetter);
      if (this.resume) formData.append("file", this.resume);
      else formData.append("cv", this.cv);
      this.$emit("make-reply", formData);
    },
    pickFile() {
      if (this.resume) this.resume = null;
      else this.$refs.cv.click();
    },
    onFilePicked(e) {
      this.cv = ''
      const files = e.target.files;
      this.resume = files[0];
    },
    showAction(action) {
      this.showName = false;
      this.showCV = false;
      this.showCL = false;
      this[action] = true;
    },
    makeStep(){
      if (this.showName) {
        this.showName = false;
        this.showCL = true;
      } else if (this.showCL){
        this.showCL = false;
        this.showCV = true;
      } else {
        this.makeReply()
      }
    },
    addCV(id){
      if (this.cv != id){
        this.cv = id;
      } else {
        this.cv = null
      }
    }
  },
  computed: {
    ...mapGetters("UserPage", ["getUserInfo", 'getUserCVList']),
    isActive() {
      if (this.getUserInfo.fullName) {
        return this.coveringLetter && (this.resume || this.cv)
          ? true
          : false;
      } else {
        return this.coveringLetter &&
          this.lastName &&
          this.firstName &&
          (this.resume || this.cv)
          ? true
          : false;
      }
    }
  },
  beforeMount() {
    this.refreshUserInfo();
    this.refreshUserVacancyList()
  },
  mounted() {
    if (this.getUserInfo.fullName) {
      this.firstName = this.getUserInfo.fullName.split(" ")[0];
      this.lastName = this.getUserInfo.fullName.split(" ")[1];
    }
  }
};
</script>

<style>
.circle {
  border: 1px dotted #009954;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block
}

.circle.active {
  border: 1px solid #009954;
  background: #009954;
}

.line.active {
  border: 1px solid #009954;
}

.line {
  border: 1px dotted #009954;
  width: 125px;
  display: inline-block;
  margin-bottom: 9px;
}

.mobile-reply {
  padding: 30px 23px;
  font-size: 14px;
  line-height: 17px;
}

.steps {
  font-size: 14px;
  line-height: 17px;
}
.steps-circle {
  margin: 60px 30px 17px;
}

.mobile-reply {
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
}

.legend {
  margin-bottom: 30px;
}

.mobile-reply .input-border{
  margin-bottom: 20px;
}

.mobile-reply .resume-box {
  margin-bottom: 30px
}

.mobile-reply .name-input {
    margin-bottom: 10px;
}

.mobile-reply .coveringLetter .filter-select-title {
    padding-bottom: 16px;
}

.chips-box {
  margin-bottom: 30px;
}

.mobile-reply .button {
  padding: 0;
  margin: 0;
}

.reply-made-box {
  margin-bottom: 20px;
}
</style>
