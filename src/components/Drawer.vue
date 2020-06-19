<template>
    <!--
    color="blue"-->
    <v-navigation-drawer app
                         :mini-variant="true"
                         :expand-on-hover="true" >
        <v-list
                dense
                nav
                class="py-0" >
            <!--link-->
            <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="{ path: item.path}"
                     >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Выйти</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        data: () => ({
            items: [
                {id: 'account', title: 'Главная', icon: 'mdi-star', path: '/'},
                {id: 'proposals', title: 'Предложения', icon: 'mdi-lightbulb', path: '/proposals'},
                {id: 'account', title: 'Аккаунт', icon: 'mdi-account', path: '/account'}
            ],
        })
    }
</script>

<style scoped>

</style>
