<template>
  <!--dense class="py-0" -->
  <v-row>
    <v-col v-for="proposal in items" :key="proposal.id" cols="12" md="4">
      <ProposalItemCard :value="proposal" />
    </v-col>
  </v-row>
  <!--<v-list
            nav
             >
        <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="{ name: 'ProposalPage', params: { id: item.id }}"
                tile
        >
            &lt;!&ndash;<v-card width="100%" tile>
                <v-list-item-title class="text-h5">{{ item.caption }}</v-list-item-title>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>

                </v-list-item-content>
            </v-card>&ndash;&gt;
            &lt;!&ndash;<v-row>
                <v-col v-for="proposal in proposals" :key="proposal.id" cols="12" md="4">

                </v-col>
            </v-row>&ndash;&gt;
            &lt;!&ndash;v-for="proposal in items" :key="proposal.id" cols="12" md="4"&ndash;&gt;
            <v-row>
                <v-col >
                    <ProposalItemCard :value="item" />
                </v-col>
            </v-row>
        </v-list-item>
  </v-list>-->
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../utils/axios-helper";
import ProposalItemCard from "./ProposalItemCard";

export default {
  name: "ProposalsList",
  components: { ProposalItemCard },
  data: () => ({
    // пункты навигаии
    items: [
      { id: "123", caption: "Поставить цветы у окна" },
      { id: "125", caption: "Работать 4 дня в неделю" },
      { id: "234", caption: "Мини переговорки" }
    ]
  }),
  mounted() {
    this.loadList();
  },
  methods: {
    loadList() {
      console.log("loadList");
      const config = {
        method: "get",
        url: API_BASE_URL + "accelerator/tenders/",
        headers: { Authorization: "Bearer " + this.$store.state.token }
      };
      axios(config).then(response => {
        console.log("loadList  loaded", response.data);
        this.items = response.data.map(item => {
          return {
            id: item.id,
            title: item.caption,
            img: item.presentation,
            answers: 1,
            comments: item.comment_count,
            likes: item.like_count,
            dislikes: item.dislike_count,
            status: {
              create: "02.06.2020",
              title: "Создана"
            },
            is_draft: item.status === "draft"
          };
        });
      });
    }
  }
};
</script>

<style scoped>
</style>
