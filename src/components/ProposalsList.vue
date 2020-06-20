<template>
    <!--dense class="py-0" -->
    <v-list
            nav
             >
        <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="{ name: 'ProposalPage', params: { id: item.id }}"
                tile
        >
            <v-card width="100%" tile>
                <v-list-item-title class="text-h5">{{ item.caption }}</v-list-item-title>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>

                </v-list-item-content>
            </v-card>
        </v-list-item>
    </v-list>
</template>

<script>
    import axios from "axios";
    import {API_BASE_URL} from "../utils/axios-helper";

    export default {
        name: "ProposalsList",
        data: () => ({
            // пункты навигаии
            items: [
                {id: '123', caption: 'Поставить цветы у окна'},
                {id: '125', caption: 'Работать 4 дня в неделю'},
                {id: '234', caption: 'Мини переговорки'}
            ]
        }),
        mounted() {
            this.loadList();
        },
        methods: {
            loadList() {
                console.log('loadList');
                const config = {
                    method: 'get',
                    url: API_BASE_URL + 'accelerator/tenders/',
                    headers: { 'Authorization': 'Bearer '+ this.$store.state.token }
                }
                axios(config).then(response => {
                    console.log('loadList  loaded', response.data);
                    this.items = response.data;
                });
            }
        }
    }
</script>

<style scoped>

</style>
