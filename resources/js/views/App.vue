<template>
    <div>
    <Navbar></Navbar>
        <b-card bg-variant="outline-primary" header="Σύστημα Διαχείρισης Εργασιών" class="m-3 text-center">
            <b-nav-item><div class="menu-item"><router-link to="/jobs">Εργασίες</router-link></div></b-nav-item>
        </b-card>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'

    export default {
        components:{
            Navbar
        },
        computed: {},
        data() {
            return {
                message:'Hello World'
            }
        }
    };
</script>