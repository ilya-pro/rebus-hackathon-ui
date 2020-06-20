<template>
    <v-tabs dark
    >
        <v-tab v-for="item in items"
               :key="item.id"
               :to="{ path: item.path}"
        >{{ item.title }}</v-tab>

    </v-tabs>
</template>

<script>
    export default {
        name: "Tabs",
        props: {
            // пункты навигаии
            items: Array
        },
        data: () => ({

        })
    }
</script>

<style scoped>

</style>
