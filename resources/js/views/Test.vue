<template>
    <b-card bg-variant="primary" text-variant="white" header="Header" class="m-3 text-center">
        <b-card-text>{{message}}</b-card-text>
    </b-card>
</template>

<script>
    export default {
        computed: {},
        data() {
            return {
                message:'Hello test'
            }
        }
    };
</script>