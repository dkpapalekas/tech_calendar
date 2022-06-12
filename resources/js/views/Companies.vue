<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h5 class="text-center">Welcome to the SPA in Laravel & Vue JS</h5>
<!--            <button class="btn btn-danger" @click="logout">Logout</button> -->
                <router-link class="btn btn-primary float-right" to="/create">Create</router-link>
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
                                <!--<router-link :to="{name: 'edit', params: {id: employee.id}}" class="btn btn-success">Edit</router-link>
                                <a @click="deleteEmployee(employee.id)" class="btn btn-danger">Delete</a> -->
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
    window.axios = require('axios');
    export default {
        data() {
            return {
                companies: {},
                currentUser: {},
                token: localStorage.getItem('token')
            }
        },
        methods: {
            getCompanies(){
                const axios = require('axios');
                axios.get('api/v1/companies').then((response) => {
                    this.companies = response.data.data
                    console.log(response.data.data)
                }).catch((errors) => {
                    console.log(errors)
                });
            },
            deleteEmployee(employee_id){
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
                        axios.post('employee/delete/' + employee_id).then((response) => {
                            this.getEmployees()
                            console.log(response)
                        }).catch((errors) => {
                            console.log(errors)
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
                    this.$router.push('/login')
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