<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" name="email" v-model="formData.email">
                            <p class="text-danger" v-text="errors.email"></p>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" v-model="formData.password">
                            <p class="text-danger" v-text="errors.password"></p>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <button @click="login" class="btn btn-primary">Login</button>
                                </div>
                            </div>
                            <div class="col-md-6 text-right">
                                <router-link to="/register">Create New Account!</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                formData: {
                    email: '',
                    password: '',
                    device_name: 'browser'
                },
                errors: {}
            }
        },
        methods: {
            login(){
                // const axios = require('axios');
                axios.post('api/v1/authenticate', this.formData).then((response) => {
                    localStorage.setItem('token', response.data.token)
                    console.log(response.data.token)
                    this.$router.push('/companies')
                }).catch((errors) => {
                    this.errors = errors.response.data.errors
                })
            }
        }
    }
</script>