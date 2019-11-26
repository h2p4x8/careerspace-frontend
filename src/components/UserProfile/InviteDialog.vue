<template>
    <v-layout row wrap fill-height invite-box v-if='allowToInvite'>
      <v-flex md3 offset-md2 offset-xs1 xs10>
        <v-layout row wrap fill-height text-xs-center text-md-left invite-points>
          <v-flex xs12>
            <v-flex xs12 invite-box-title>
              Приглашение на кофе
            </v-flex>
            <v-flex xs12 invite-box-point>
              Представься
            </v-flex>
            <v-flex xs12 invite-box-point>
              Сообщи, где нашел контакт
            </v-flex>
            <v-flex xs12 invite-box-point>
              Обозначь тему письма
            </v-flex>
            <v-flex xs12 invite-box-point>
              Конкретизируй свой запрос
            </v-flex>
            <v-flex xs12 invite-box-point>
              Вежливо попроси о встрече
            </v-flex>
          </v-flex>
          <v-flex  xs12 align-self-end v-if='$vuetify.breakpoint.mdAndUp'>
            <v-btn class='button' depressed color='#009954'  block dark @click='$emit("invite")'>
              Пригласить на кофе
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 offset-xs1 xs10 letter>
        <v-flex xs12 invite-box-title text-xs-center text-md-left>
          Пример письма
        </v-flex>
        <v-flex xs12 invite-box-point>
          <p>Иван, добрый день!</p>

          <p>Меня зовут Игорь, я отвечаю за продукт в careerspace. </p>

          <p>Пишу, чтобы спросить ваше экспертное мнение. Контакт нашёл на careerspace.app. Вот, кстати, мой профиль: careerspace.app/@igor</p>

          <p>Вы специализируетесь на создании интерфейсов для соц. сетей. Хочу обсудить с вами 2 темы:</p>

          <p>1. Как правильно делать примеры заполнения форм в соц. сетях так, чтобы их хотелось заполнить.</p>

          <p>2. Как адаптировать под мобильную версию то, что адаптировать нельзя.</p>

          <p>Буду признателен, если найдете час времени встретиться со мной. Я подъеду куда и когда вам будет удобно. Понимаю, что ваше время стоит денег, поэтому готов его оплатить.</p>

          <p>Игорь</p>

        </v-flex>
        <v-flex  xs12 button-box align-self-end v-if='$vuetify.breakpoint.smAndDown'>
          <v-btn class='button' depressed color='#009954'  block dark @click='$emit("invite")'>
            Пригласить на кофе
          </v-btn>
          <v-btn class='button' depressed outline color='#009954'  block dark @click='$emit("close")'>
            Скрыть
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout row wrap invite-box v-else>
      <v-flex xs10 offset-xs2>
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <v-flex xs12 invite-box-title>
              Заполни профиль, перед тем как приглашать людей на кофе
            </v-flex>
            <v-flex md5 invite-box-point xs10>
              Несколько простых действий и сможешь расширять свой нетворк на платформе
            </v-flex>
            <v-flex xs12 invite-box-point add-title v-if='!fullName'>
              Расскажи, как тебя зовут
            </v-flex>
            <v-flex xs12 invite-box-point add-title v-if='!description'>
              Кратко расскажи о себе
            </v-flex>
            <v-flex xs12 invite-box-point add-title v-if='!jobs'>
              Добавь места работы
            </v-flex>
            <v-flex xs12 invite-box-point add-title v-if='!photo'>
              Добавь фотографию
            </v-flex>
            <v-flex xs12 invite-box-point add-title v-if='!telegram'>
              Добавь свой контакт в Telegram
            </v-flex>
          </v-flex>
          <v-flex md4 xs10 align-self-end>
            <v-btn class='button' depressed color='#009954'  block dark @click='$emit("fillProfile")'>
              Заполнить профиль
            </v-btn>
            <v-btn class='button' depressed outline color='#009954'  block dark @click='$emit("close")' v-if='$vuetify.breakpoint.smAndDown'>
              Скрыть
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  components: {

  },
  methods: {

  },
  beforeMount() {

  },
  watch: {
  },
  computed: {

  },
  props: ['allowToInvite', 'telegram', 'fullName', 'jobs', 'photo', 'description']
};
</script>

<style>
  .invite-box-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 29px;
    margin-bottom: 30px;
  }

  .invite-box-point {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 17px;
  }

  .invite-dialog {
    background: #FEFEFE;
    padding: 50px 0;
  }

  @media only screen and (max-width: 600px) {
    .invite-points {
      margin-bottom: 52px;
    }

    .letter .invite-box-point {
      margin-bottom: 50px;
    }

    .invite-dialog .button-box {
      margin-bottom: 37px;
    }
  }


</style>
