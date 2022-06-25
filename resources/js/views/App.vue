<template>
    <div>
    <Navbar></Navbar>
        <b-card bg-variant="primary" text-variant="white" header="Header" class="m-3 text-center">
            <b-card-text>{{message}}</b-card-text>
            <router-link class="btn btn-primary float-right" to="/register">Create</router-link>
        </b-card>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'

    export default {
        components:{
            Navbar // register component
        },
        computed: {},
        data() {
            return {
                message:'Hello World'
            }
        }
    };
</script>