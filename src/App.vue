<template>
  <v-app>
    <!--<v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>-->


    <!-- navigation drawer -->
    <Drawer v-model="drawer"
            :items="items"/>

    <!-- header -->
    <v-app-bar app
               color="#262C40"
               dark
               >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <!--<img width="200" height="40" src="./assets/logo_gazprombank.svg" >-->
      <img width="200" height="40" src="./assets/logo-white.svg" >
      <Tabs :items="items"/>
      <v-btn
              @click="clickNewTender();"
              color="primary"
      >Есть предложение</v-btn>
      <v-avatar class="ma-3" size="40" tile
                @click="clickAvatar()"
                style="cursor: pointer">
        <v-img :src="$store.state.user.avatarSmall"></v-img>
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
      {{ $route.name }}
    </v-footer>
    <notifications group="notifications" />
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

import Drawer from "./components/Drawer";
import Tabs from "./components/Tabs";
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
  },
  methods: {
    clickNewTender() {
      console.log('clickNewTender');
    },
    clickAvatar() {
      // переход к профилю
      this.$router.push('/account')
    }
  }
};
</script>
