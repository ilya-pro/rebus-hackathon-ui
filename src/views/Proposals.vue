<template>
    <div class="proposals">
        Список
        <!--<router-link :to="{ name: 'ProposalPage', params: { id: 123 }}">Страниа</router-link>-->
        <ProposalsList />
    </div>
</template>

<script>
    import ProposalsList from "../components/ProposalsList";

    export default {
        name: "Proposals",
        components: {ProposalsList}
    }
</script>

<style scoped>

</style>
