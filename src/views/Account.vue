<template>
  <div class="rb-viewAccount">
    <h1>Настройки аккаунта</h1>
    <v-card max-width="434" tile>
      <v-avatar class="ma-3" size="164" tile>
        <v-img :src="profile.avatar"></v-img>
      </v-avatar>
      <v-card-title>{{ profile.name }}</v-card-title>
      <v-card-subtitle>{{ profile.division }}, {{ profile.position }}</v-card-subtitle>
      <v-card-text> Рейтинг: <v-rating
          v-model="rating"
          background-color="orange lighten-3"
          color="orange"
          medium
          :readonly="true"
        ></v-rating></v-card-text>
      <v-card-actions>
        <v-btn v-if="!isEditing()" class="mx-2" dark medium color="primary" @click="editing=true">
          <v-icon dark>mdi-pencil</v-icon>Изменить
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="isEditing()">
      <v-card-title>Редактирование данных профиля</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-file-input accept="image/*" label="Фотография"></v-file-input>
          <v-text-field v-model="profile.name" label="Фамилия, имя, отчество" required></v-text-field>
          <v-text-field v-model="profile.email" label="E-mail" required></v-text-field>
          <v-text-field v-model="profile.phone" return-masked-value label="Телефон" required></v-text-field>
          <v-autocomplete
            v-model="profile.division"
            :items="divisions"
            :filter="customFilter"
            label="Место работы"
          ></v-autocomplete>
          <v-autocomplete
            v-model="profile.position"
            :items="positions"
            :filter="customFilter"
            label="Должность"
          ></v-autocomplete>
          <v-btn :disabled="!valid" @click="editing=false; saveProfile();" color="primary">Сохранить</v-btn>
          <v-btn text @click="editing=false" color="primary">Закрыть</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Vue from "vue";

export default {
  name: "Account",
  components: {},
  data() {
    return {
      profile: {
        name: "",
        division: "",
        position: "",
        avatar: "",
        email: "",
        phone: ""
      },
      rating: 0,
      editing: false,
      valid: false,
      positions: [],
      divisions: [],
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    customFilter(item, queryText) {
      const itemText = item.toLowerCase();
      const searchText = queryText.toLowerCase();
      return itemText.indexOf(searchText) > -1;
    },
    isEditing() {
      return this.editing;
    },
    saveProfile() {
      Vue.notify({
        type: "success",
        group: "notifications",
        title: "Изменения сохранены",
        position: "bottom right"
      });
    },
    getProfile() {
      const filter = "";
      axios
        .get(
          "https://rebus-leadersofdigital-2020.herokuapp.com/api/health/" +
            filter
        )
        .then(response => {
          console.log("roger that", response.data);
          //     this.profile = response.data;
          this.profile = {
            name: "Иванов Иван Иванович",
            division: "Сектор развития цифровых продуктов",
            position: "Разработчик",
            avatar:
              "https://st.kp.yandex.net/images/actor_iphone/iphone360_92072.jpg",
            email: "ivanov@gpb.ru",
            phone: "+71234567890"
          };
          this.rating = 4;
          (this.positions = ["Разработчик", "Кассир", "Экономист"]),
            (this.divisions = [
              "Департамент",
              "Служба",
              "Сектор развития цифровых продуктов"
            ]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
