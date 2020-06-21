<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Профиль</v-toolbar-title>
    </v-toolbar>
    <!--token= {{ $store.state.token }}-->
    <v-tabs vertical>
      <v-tab class="justify-start" style="text-transform: none">Личная информация</v-tab>
      <v-tab class="justify-start" style="text-transform: none">
        <span>Активность</span>
        <span style="float: right; color: orange">
          <v-icon color="orange">mdi-star</v-icon>
          {{ bonuses }}
        </span>
      </v-tab>
      <v-tab class="justify-start" style="text-transform: none">Предложения</v-tab>
      <v-tab class="justify-start" style="text-transform: none">Проекты</v-tab>
      <v-tab class="justify-start" style="text-transform: none">Уведомления</v-tab>
      <v-tab-item>
        <v-row align="start" justify="start">
          <v-col cols="12" md="10">
            <v-card class="pa-2" tile>
              <v-card-text style="display: flex">
                <v-avatar class="ma-3" size="164" :left="true" tile>
                  <v-img :src="profile.avatar"></v-img>
                </v-avatar>
                <v-container>
                  <h2 style="margin-bottom: 16px;">{{ profile.name }}</h2>
                  <p>{{ profile.position }}</p>
                  <p>{{ profile.division }}</p>
                  <p>
                    <v-icon>mdi-map-marker</v-icon>
                    {{ profile.city }}
                    <v-icon>mdi-cake-variant</v-icon>
                    {{ profile.birthday }}
                  </p>
                </v-container>
              </v-card-text>
              <v-card-text>
                <p>
                  <b>Контактная информация</b>
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
          <v-col cols="12" md="2">
            <v-card class="pa-2" color="rgba(215, 222, 233, 1)">
              <v-card-text>
                <h3 style="margin-bottom: 16px;">Достижения</h3>
                <div>
                  <v-row>
                    <v-col cols="12" md="5">Рейтинг</v-col>
                    <v-col cols="12" md="3">
                      <v-progress-linear
                        color="light-green"
                        height="14"
                        :value="raiting.current/raiting.next*100"
                        striped
                      ></v-progress-linear>
                    </v-col>
                    <v-col cols="12" md="4">
                      <span style="float: right">{{raiting.current}}/{{raiting.next}}</span>
                    </v-col>
                  </v-row>
                </div>
                <div>
                  Бонусы
                  <span style="float: right">
                    <v-icon color="orange">mdi-star</v-icon>
                    {{ bonuses }}
                  </span>
                </div>
                <v-divider style="margin: 16px 0px 16px 0px;"></v-divider>
                <div>
                  Генератор идей
                  <span v-if="proposal.reward>0" style="float: right">
                    <v-icon color="orange">mdi-medal</v-icon>
                    {{ proposal.reward }} место
                  </span>
                </div>
                <div style="padding-top: 4px;">
                  {{ proposal.proposals }} предложения
                  <span style="float: right">
                    <v-icon>mdi-thumb-up-outline</v-icon>
                    {{ proposal.comments}}
                  </span>
                </div>
                <v-divider style="margin: 16px 0px 16px 0px;"></v-divider>
                <div>Любимчик публики</div>
                <div>
                  {{ like.comments }} комментария
                  <span style="float: right;">
                    <v-icon color="green">mdi-thumb-up-outline</v-icon>
                    {{ like.likes }}
                  </span>
                </div>
                <v-divider style="margin: 16px 0px 16px 0px;"></v-divider>
                <h3 style="margin-bottom: 16px;">Статистика</h3>
                <div>
                  Всего предложений
                  <span style="float: right;">{{ stats.proposals }}</span>
                </div>
                <div>
                  На модерации / публикации
                  <span style="float: right;">{{ stats.moderations }}</span>
                </div>
                <div>
                  Реализованные идеи
                  <span style="float: right;">{{ stats.realized }}</span>
                </div>
                <v-progress-linear
                  color="light-green"
                  height="14"
                  :rounded="true"
                  :value="stats.realized/stats.proposals*100"
                ></v-progress-linear>
              </v-card-text>
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
        <v-card align="center">
          <v-card-title>История начисления и списания баллов</v-card-title>
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
      <v-tab-item>
        <v-card>
          <v-card-title>Мои предложения</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="proposal in proposals" :key="proposal.id" cols="12" md="4">
                <ProposalItemCard :value="proposal" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            Мои проекты
            <v-spacer></v-spacer>
            <v-text-field
              v-model="projectTable.search"
              append-icon="mdi-magnify"
              label="Поиск"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="projectTable.headers"
            :items="projectTable.projects"
            :search="projectTable.search"
            @click:row="goToProject"
          ></v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item></v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Vue from "vue";
import { API_BASE_URL } from "../utils/axios-helper";
import ProposalItemCard from "../components/ProposalItemCard";

export default {
  name: "Account",
  components: { ProposalItemCard },
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
      raiting: {
        current: 0,
        next: 0
      },
      bounses: 0,
      proposal: {
        reward: 0,
        proposals: 0,
        comments: 0
      },
      stats: {
        proposals: 56,
        moderations: 7,
        realized: 41
      },
      like: {
        comments: 32,
        likes: 56
      },
      editing: false,
      valid: false,
      // TODO: Подключиться к справочнику должностей
      positions: ["Разработчик", "Кассир", "Экономист"],
      // TODO: Подключиться к справочнику департаментов
      divisions: [
        "Департамент",
        "Служба",
        "Сектор развития цифровых продуктов"
      ],
      proposals: [],
      projectTable: {
        search: "",
        headers: [
          { text: "Проект", value: "name" },
          { text: "Начало проекта", value: "started" },
          { text: "Окончание проекта", value: "finished" },
          { text: "Статус работ", value: "state" },
          { text: "Участники", value: "users" }
        ],
        projects: [
          {
            name: "Проект 3",
            started: "15.05.2020",
            finished: "",
            state: "Приостановлен",
            users: "Иванов, Петров"
          },
          {
            name: "Проект 2",
            started: "20.01.2020",
            finished: "",
            state: "В работе",
            users: "Петров, Сидоров"
          },
          {
            name: "Проект 1",
            started: "20.01.2019",
            finished: "21.09.2019",
            state: "Завершен",
            users: "Петров, Васильев, Сергеев"
          }
        ]
      }
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
    goToProject(event) {
      // Реализовать переход в карточку проекта
      console.log(event);
      Vue.notify({
        type: "error",
        group: "notifications",
        title: "Отсутствует страница карточки проекта",
        position: "top center"
      });
    },
    getProfile() {
      const config = {
        method: "get",
        url: API_BASE_URL + "users/profile/",
        headers: { Authorization: "Bearer " + this.$store.state.token }
      };
      axios(config)
        .then(response => {
          // Получение и разбор личных данных (профиля)
          this.profile = {
            name: [
              response.data.last_name,
              response.data.first_name,
              response.data.patronymic
            ].join(" "),
            division: response.data.department,
            position: response.data.position,
            avatar: response.data.photo,
            email: response.data.email,
            phone: response.data.phone,
            workphone: response.data.internal_phone,
            birthday: response.data.birthday,
            city: response.data.city
          };
          // Тесто вые данные, которые выводятся в блоке "Личные данные/Достижения"
          // TODO: Сделать запрос на получение статистики и достижений пользователя
          this.raiting = {
            current: 1040,
            next: 1975
          };
          this.bonuses = 1200;
          this.proposal = {
            reward: 1,
            proposals: 4,
            comments: 1205
          };
          this.like = {
            comments: 32,
            likes: 56
          };
          this.stats = {
            proposals: 56,
            moderations: 7,
            realized: 41
          };
          // Подготовка данных для раздела "Предложения"
          // TODO: Сделать запрос для получения предложений пользователя
          this.proposals = [
            {
              id: 1,
              title: "Корпоративу быть",
              img: "https://visualart-tver.ru/wp-content/uploads/2019/01/IMG-20180401-WA0005.jpg",
              answers: 24,
              comments: 2,
              likes: 10,
              dislikes: 10,
              status: {
                create: "27.05.2020",
                title: "Опубликована"
              },
              is_draft: false
            },
            {
              id: 2,
              title: "12 августа. Укрощаем бурные реки Карелии. Сплав на байдарках",
              img: "https://rentakayak.ru/wp-content/uploads/2015/05/Prijon-Excursion.jpg",
              answers: 0,
              comments: 0,
              likes: 0,
              dislikes: 0,
              status: {
                create: "02.06.2020",
                title: "Создана"
              },
              is_draft: true
            }
          ];
          // Подготовка данных для раздела "Активность"
          // TODO: Сделать запрос для получения данных
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
