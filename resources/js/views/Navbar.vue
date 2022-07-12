<template>
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">Fridgital</b-navbar-brand>

        <b-text><router-link to="/login">Log In</router-link></b-text>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><div class="menu-item"><router-link to="/">Home</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/jobs">Εργασίες</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/customers">Πελάτες</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/addresses">Διευθύνσεις</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/job_lines">Ανάγκες Εργασιών</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/materials">Γενικά Υλικά</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/appliances">Συσκευές</router-link></div></b-nav-item>
            <b-nav-item><div class="menu-item"><router-link to="/companies">Εταιρείες</router-link></div></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item><router-link to="/login">Log In</router-link></b-dropdown-item>
              <b-dropdown-item><router-link to="/register">Create New</router-link></b-dropdown-item>
              <b-dropdown-item><button class="btn btn-danger" @click="logout">Log out</button></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>   
</template>

<script>
    export default {
        props: ['string'],
        computed: {},
        data() {
            return {
                message:'Hello World'
            }
        },

        methods: {
            logout(){
                axios.post('api/v1/revoke').then((response) => {
                    localStorage.removeItem('token')
                    this.$router.push('/')
                }).catch((errors) => {
                    console.log(errors)
                })
            },
        }
    };
</script>