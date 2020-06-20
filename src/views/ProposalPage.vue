<template>
    <div class="rb-ProposalPage">
        <h1>Страница</h1>
        {{ this.$route.name }}= {{ this.$route.params.id }}
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'ProposalPage',
        components: {

        }
    }
</script>
