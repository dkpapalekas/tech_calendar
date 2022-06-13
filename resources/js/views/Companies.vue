<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h5 class="text-center">Welcome to the SPA in Laravel & Vue JS</h5>
<!--            <button class="btn btn-danger" @click="logout">Logout</button> -->
                <router-link class="btn btn-primary float-right" to="/register">Register</router-link>
            </div>
        </div>
        <br>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Profession</th>
                            <th>Vat</th>
                            <th>IRS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index) in companies" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{company.name}}</td>
                            <td>{{company.address}}</td>
                            <td>{{company.city}}</td>
                            <td>{{company.profession}}</td>
                            <td>{{company.vat}}</td>
                            <td>{{company.irs}}</td>
                            <td>
                                <router-link :to="{name: 'edit', params: {id: company.id}}" class="btn btn-success">Edit</router-link>
                                <a @click="deleteCompany(company.id)" class="btn btn-danger">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    window.axios = require('axios')
    import swal from 'sweetalert2';
    window.Swal = swal; 

    export default {
        data() {
            return {
                companies: {},
                currentUser: {},
                token: localStorage.getItem('token'),
                errors: [],
            }
        },
        methods: {
            getCompanies(){
                const axios = require('axios');
                axios.get('api/v1/companies').then((response) => {
                    this.companies = response.data.data
                    console.log(response.data.data)
                    console.log(this.companies)
                }).catch((errors) => {
                    console.log(errors)
                });
            },
            deleteCompany(company_id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('api/v1/companies/' + company_id).then((response) => {
                            this.getCompanies()
                            console.log(response)
                        }).catch((errors) => {
                            console.log(errors)
                            this.errors.push(errors)
                            Swal.fire(
                            'error!',
                            'You have added customers for this company',
                            'error'
                        )
                        })
                        Swal.fire(
                            'Deleted!',
                            'Your record has been deleted.',
                            'success'
                        )
                    }
                })
            },
            logout(){
                axios.post('api/logout').then((response) => {
                    localStorage.removeItem('token')
                    this.$router.push('/')
                }).catch((errors) => {
                    console.log(errors)
                })
            }
        },
        mounted() {
            // window.axios = require('axios');
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            this.getCompanies()
        }
    }
</script>