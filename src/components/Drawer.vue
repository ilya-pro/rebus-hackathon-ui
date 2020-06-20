<template>
    <v-navigation-drawer app
                         :disable-resize-watcher="true"
                         :value="value"
                         >
        <v-list
                dense
                nav
                class="py-0" >
            <v-list-item
                    v-for="item in items"
                    :key="item.id"
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

            <v-list-item
                    @click="clickExit()">
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
    import {AUTH_LOGOUT} from '../store/mutation-types'

    export default {
        name: "Drawer",
        props: {
            // для работы v-model снаружи, отображать панель или нет
            value: {
                type: Boolean,
                required: true
            },
            // пункты навигаии
            items: Array
        },
        data: () => ({

        }),
        methods: {
            clickExit() {
                console.log('exit');
                this.$store.dispatch(AUTH_LOGOUT).then(() => {
                    console.log('exit AUTH_LOGOUT');
                    this.$router.push('/login')
                })
            }
        }
    }
</script>

<style scoped>

</style>
