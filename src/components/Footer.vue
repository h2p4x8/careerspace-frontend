<template>
    <v-footer  style='background-color: #fcfcfc'  height='auto' absolute app>
      <v-container footer>
        <v-layout wrap row footer-iner>
          <v-flex xs12 offset-xs0 offset-md3 md6>

            <v-layout text-xs-center :class='$vuetify.breakpoint.smAndDown ? "column" : "row"'>
              <v-flex xs3 v-for='link in usersRoutes' footer-link order-md1 order-xs2 :action-box='$vuetify.breakpoint.mdAndUp'>
                <router-link :to="link.to">{{ link.title }}</router-link>
              </v-flex>
              <v-flex footer-link xs6 order-md2 order-xs3 align-self-center :action-box='$vuetify.breakpoint.mdAndUp'>
                <Terms title='Пользовательское соглашение'/>
              </v-flex>
              <v-flex xs3 v-for='link in usersLinks' footer-link order-md3 order-xs1 :action-box='$vuetify.breakpoint.mdAndUp'>
                <a :href="link.href" target="_blank">{{ link.title }}</a>
              </v-flex>

            </v-layout>
          </v-flex>

          <v-flex offset-md5 text-xs-center md2 xs12  copyright>
              Сайт принадлежит ИП Егорова Арина Андреевна. <br v-if='$vuetify.breakpoint.smAndDown'>ОГРН: 318505300158221. ИНН: 691103819703

          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
</template>

<script>
import Terms from './Terms_and_Conditions/Terms.vue';

export default {
  components: {
    Terms
  },
  data() {
    return {
      usersLinks: [
        {
          href: 'https://t.me/CareerspaceSupportBot',
          title:'Поддержка'
        },
      ],
      usersRoutes: [
        {
          to: '/jobs',
          title:'Вакансии'
        }
      ],
      companiesLinks: [
        {
          to: '/',
          title: 'Разместить вакансию'
        },
        {
          to: '/',
          title: 'Создать личный кабинет'
        }
      ]
    }
  }
}

</script>
