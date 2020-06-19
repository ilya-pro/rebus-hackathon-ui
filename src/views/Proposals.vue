<template>
    <div class="proposals">
        Список
        <router-link :to="{ name: 'ProposalPage', params: { id: 123 }}">Страниа</router-link>
    </div>
</template>

<script>
    export default {
        name: "Proposals"
    }
</script>

<style scoped>

</style>
