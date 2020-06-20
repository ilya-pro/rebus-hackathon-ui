<template>
  <v-app>
    <!-- navigation drawer -->
    <Drawer v-model="drawer"
            :items="items"/>

    <!-- header -->
    <v-app-bar app
               color="#262C40"
               dark
               >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <img width="200" height="40" src="./assets/logo-white.svg" >
      <v-spacer></v-spacer>
      <Tabs class="hidden-sm-and-down"
              :items="items"/>
      <!--кнопка для широкого экрана-->
      <v-btn class="hidden-sm-and-down"
              @click="clickNewTender()"
              color="primary"
      >Есть предложение</v-btn>
      <!-- кнопка для мобильного экрана-->
      <v-btn class="hidden-md-and-up"
             fab
             small
             @click="clickNewTender()"
             color="primary"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-avatar class="ma-3" size="40"
                tile
                @click="clickAvatar()"
                style="cursor: pointer"
      >
        <v-icon v-if="!$store.state.user.avatarSmall" dark>mdi-account</v-icon>
        <v-img v-if="$store.state.user.avatarSmall" :src="$store.state.user.avatarSmall"></v-img>
      </v-avatar>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- view for current route -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!--{{ $route.name }}-->
    </v-footer>
    <notifications group="notifications" />
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import Tabs from "./components/Tabs";
import {LOAD_USER_DATA} from "./store/mutation-types";
export default {
  name: 'App',

  components: {
    Tabs,
    Drawer
  },

  data: () => ({
    drawer: false,
    // пункты навигаии
    items: [
      /*{id: 'home', title: 'Главная', icon: 'mdi-star', path: '/'},*/
      {id: 'proposals', title: 'Предложения', icon: 'mdi-lightbulb', path: '/proposals'},
      /*{id: 'account', title: 'Аккаунт', icon: 'mdi-account', path: '/account'}*/
      {id: 'projects', title: 'Проекты', icon: 'mdi-star', path: '/projects'},
      {id: 'shop', title: 'Магазин', icon: 'mdi-star', path: '/shop'},
    ],
  }),

  mounted() {
    // TODO debug only
    window.router = this.$router;
    console.log('router', window.router);
    //console.log('ТОКЕН', this.$store.state.token);

    // если токена нет, выходим на страницу логина
    if (!this.$store.state.token) {
      this.$router.push('/login');
    }
    this.$store.dispatch(LOAD_USER_DATA);
  },
  methods: {
    clickNewTender() {
      console.log('clickNewTender');
      // переход к профилю
      this.$router.push('/proposals/new')
    },
    clickAvatar() {
      // переход к профилю
      this.$router.push('/account')
    }
  }
};
</script>
