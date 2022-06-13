<template>
    <b-card bg-variant="primary" text-variant="white" header="Header" class="m-3 text-center">
        <b-card-text>{{message}}</b-card-text>
        <router-link class="btn btn-primary float-right" to="/register">Create</router-link>
    </b-card>
</template>

<script>
    export default {
        computed: {},
        data() {
            return {
                message:'Hello World'
            }
        }
    };
</script>