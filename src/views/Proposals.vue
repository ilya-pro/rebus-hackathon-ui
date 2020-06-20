<template>
    <div class="proposals">
        <!--Список-->
        <!--<router-link :to="{ name: 'ProposalPage', params: { id: 123 }}">Страниа</router-link>
        align="start" justify="start"-->
        <v-row >
            <!--:cols="8" xs="12" sm="12" lg="8"-->
            <v-col cols="12"  md="8" >
                <ProposalsList />
            </v-col>
            <v-col cols="12" md="4"
                   >
                <ActivityStats />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ProposalsList from "../components/ProposalsList";
    import ActivityStats from "../components/ActivityStats";

    export default {
        name: "Proposals",
        components: {ActivityStats, ProposalsList}
    }
</script>

<style scoped>

</style>
