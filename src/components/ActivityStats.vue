<template>
    <!--style="border: 1px solid red;"-->
    <v-list>
        <v-card tile>
            <v-card-title class="text-h4">{{ previousMonthTitle }}</v-card-title>

            <v-card-title>Генератор идей</v-card-title>
            <v-card-title>Любимчик публики</v-card-title>
            <v-card-title>Статистика предложений</v-card-title>
        </v-card>
    </v-list>
</template>

<script>
    export default {
        name: "ActivityStats",
        data: () => ({
            previousMonthTitle: 'Активисты Май 2020'
        })
    }
</script>

<style scoped>

</style>
