<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Профиль</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        Личная информация
      </v-tab>
      <v-tab>
       Активность 
      </v-tab>
      <v-tab>
        Проекты
      </v-tab>
      <v-tab>
        Уведомления
      </v-tab>
      <v-tab-item>
        <v-row align="start" justify="start" style="width: 1000px">
          <v-col>
            <v-card max-width="500" tile>
              <v-avatar class="ma-3" size="164" tile>
                <v-img :src="profile.avatar"></v-img>
              </v-avatar>
              <v-card-title>{{ profile.name }}</v-card-title>
              <v-card-text>
                <p>{{ profile.position }}</p>
                <p>{{ profile.division }}</p>
                <p>
                  <b>Контактная информация</b>
                </p>
                <p>
                  <v-icon>mdi-map-marker</v-icon>
                  {{ profile.city }}
                  <v-icon>mdi-cake-variant</v-icon>
                  {{ profile.birthday }}
                </p>
                <p>
                  <v-icon>mdi-phone</v-icon>
                  {{profile.workphone}}
                </p>
                <p>
                  <v-icon>mdi-cellphone</v-icon>
                  {{profile.phone}}
                </p>
                <p>
                  <v-icon>mdi-at</v-icon>
                  {{profile.email}}
                </p>
                <!-- Рейтинг:
                <v-rating
                  v-model="rating"
                  background-color="orange lighten-3"
                  color="orange"
                  medium
                  :readonly="true"
                ></v-rating>-->
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="!isEditing()"
                  class="mx-2"
                  dark
                  medium
                  color="primary"
                  @click="editing=true"
                >
                  <v-icon dark>mdi-pencil</v-icon>Изменить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card max-width="500" tile>
              <v-card-title>Достижения</v-card-title>
              <v-card-text>В разработке</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card v-if="isEditing()">
          <v-card-title>Редактирование данных профиля</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-file-input accept="image/*" label="Фотография"></v-file-input>
              <v-text-field v-model="profile.name" label="Фамилия, имя, отчество" required></v-text-field>
              <v-text-field v-model="profile.email" label="E-mail" :readonly="true"></v-text-field>
              <v-text-field v-model="profile.phone" label="Телефон" required></v-text-field>
              <v-text-field v-model="profile.workphone" label="Рабочий телефон" required></v-text-field>
              <v-text-field v-model="profile.city" label="Город" required></v-text-field>
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
              <v-btn
                :disabled="!valid"
                @click="editing=false; saveProfile();"
                color="primary"
              >Сохранить</v-btn>
              <v-btn text @click="editing=false" color="primary">Закрыть</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card max-width="800" align="center">
          <v-card-text>
            <v-timeline>
              <v-container v-for="activity in activities" :key="activity.message">
                <v-timeline-item
                  v-if="activity.changed>0"
                  color="green lighten-1"
                  fill-dot
                  right
                  small
                >
                  <v-card>
                    <v-card-title class="green lighten-1">Зачислено баллов: {{ activity.changed }}</v-card-title>
                    <v-card-subtitle
                      class="green lighten-2"
                    >Накоплено баллов: {{ activity.summary }}</v-card-subtitle>
                    <v-card-text class="green lighten-3">{{ activity.title }}</v-card-text>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item
                  v-if="activity.changed<0"
                  color="red lighten-1"
                  fill-dot
                  left
                  small
                >
                  <v-card>
                    <v-card-title
                      class="red lighten-1"
                    >Зачислено баллов: {{ Math.abs(activity.changed) }}</v-card-title>
                    <v-card-subtitle class="red lighten-2">Накоплено баллов: {{ activity.summary }}</v-card-subtitle>
                    <v-card-text class="red lighten-3">{{ activity.title }}</v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-container>
            </v-timeline>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="loadActivities();" color="primary">Загрузить еще</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item></v-tab-item>

      <v-tab-item></v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Vue from "vue";
import { API_BASE_URL } from "../utils/axios-helper";

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
        phone: "",
        workphone: "",
        birthday: "",
        city: ""
      },
      activities: [{ summary: 0, changed: 0, title: "" }],
      rating: 0,
      editing: false,
      valid: false,
      positions: [],
      divisions: []
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
        position: "top center"
      });
    },
    loadActivities() {
      Vue.notify({
        type: "success",
        group: "notifications",
        title: "Загрузка активностей выполнена",
        position: "top center"
      });
    },
    getProfile() {
      const filter = "";
      axios
        .get(API_BASE_URL + "health/" + filter)
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
            phone: "+71234567890",
            workphone: "12345",
            birthday: "21.01.1990",
            city: "Москва"
          };
          this.rating = 4;
          this.positions = ["Разработчик", "Кассир", "Экономист"];
          this.divisions = [
            "Департамент",
            "Служба",
            "Сектор развития цифровых продуктов"
          ];
          this.activities = [
            {
              summary: 200,
              changed: -800,
              title: "Получены билеты в кино за баллы"
            },
            {
              summary: 1000,
              changed: 400,
              title: "За участие в реализации проекта 1"
            },
            { summary: 600, changed: 500, title: "Идея вошла в ТОП-10" },
            { summary: 100, changed: 100, title: "За регистрацию на портале" }
          ];
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
