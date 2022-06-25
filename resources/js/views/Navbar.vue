<template>
    <div id="Navbar">
    <ul>
        <li><router-link to="Register">Register</router-link></li>
        <li><router-link to="Companies">Companies</router-link></li>
    </ul>
    </div>
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