<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h5 class="text-center">Welcome to the SPA in the Laravel & Vue JS</h5>
                <button class="btn btn-danger" @click="logout">Logout</button>
                <router-link class="btn btn-primary float-right" to="/register">Register</router-link>
            </div>
        </div>
        <br>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <b-table striped hover 
                    :items="companies_items" 
                    :fields="fields"
                    :select-mode="selectMode"
                    responsive="sm"
                    ref="selectableTable"
                    selectable
                    @row-selected="onRowSelected"
                >

                    <!-- Example scoped slot for select state illustrative purposes -->
                    <template #cell(selected)="{ rowSelected }">
                        <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">Selected</span>
                        </template>
                        <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">Not selected</span>
                        </template>
                    </template>
                </b-table>
                <b-button size="sm" @click="clearSelected">Clear selected</b-button>
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
                fields: ['id', 'name', 'address', 'city', 'profession', 'vat', 'irs'],
                companies_items: [],
                selected: [],
                selectMode: 'single',
            }
        },
        methods: {
            getCompanies(){
                const axios = require('axios');
                axios.get('api/v1/companies').then((response) => {
                    this.companies = response.data.data
                    this.companies_items = response.data.data
                    // console.log(response.data.data)
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
                            // console.log(response)
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
            },

            onRowSelected(items) {
                this.selected = items
                if (this.selected.length) {
                    console.log(this.selected)
                    console.log(this.selected[0].id)
                    console.log(this.selected[0].vat)
                }

            },
            clearSelected() {
                this.$refs.selectableTable.clearSelected()
            },
        },

        mounted() {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            this.getCompanies()
        }
    }
</script>