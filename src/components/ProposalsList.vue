<template>
    <v-list
            dense
            nav
            class="py-0" >
        <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="{ name: 'ProposalPage', params: { id: item.id }}"
        >
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "ProposalsList",
        data: () => ({
            // пункты навигаии
            items: [
                {id: '123', title: 'Поставить цветы у окна'},
                {id: '125', title: 'Работать 4 дня в неделю'},
                {id: '234', title: 'Мини переговорки'}
            ]
        })
    }
</script>

<style scoped>

</style>
