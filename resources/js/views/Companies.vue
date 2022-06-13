<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h5 class="text-center">Welcome to the SPA in the Laravel & Vue JS</h5>
                <button class="btn btn-danger" @click="logout">Logout</button>
                <router-link class="btn btn-primary float-right" to="/register">Register</router-link>
            </div>
            <div class="col-md-10">
                <b-col lg="6" class="my-1">
                    <b-form-group
                    label="Filter"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    >
                    <b-input-group size="sm">
                        <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                        ></b-form-input>

                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>
            </div>
            <div class="col-md-10">
                <h5 class="text-center">  </h5>
                <button type="button" @click="clearSelected" class="btn btn-primary">Clear selections</button>
                <button type="button" @click="deleteCompany()" class="btn btn-danger">Delete Selected</button>
            </div>
        </div>
        <br>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <b-table striped hover 
                    :items="items" 
                    :fields="fields"
                    :select-mode="selectMode"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    responsive="sm"
                    ref="selectableTable"
                    selectable
                    @row-selected="onRowSelected"
                    @filtered="onFiltered"
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
                fields: [
                    {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc', },
                    {key: 'name', label: 'Ονομασία', sortable: true, sortDirection: 'desc', },
                    {key: 'address', label: 'Διεύθυνση', sortable: true, sortDirection: 'desc', },
                    {key: 'city', label: 'Πόλη', sortable: true, sortDirection: 'desc', },
                    {key: 'profession', label: 'Εξειδίκευση', sortable: true, sortDirection: 'desc', },
                    {key: 'vat', label: 'ΑΦΜ', sortable: true, sortDirection: 'desc', },
                    {key: 'irs', label: 'ΔΟΥ', sortable: true, sortDirection: 'desc',},
                ],
                items: [],
                selected: [],
                selectMode: 'single',
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
            }
        },

        methods: {
            getCompanies(){
                const axios = require('axios');
                axios.get('api/v1/companies').then((response) => {
                    this.companies = response.data.data
                    this.items = response.data.data
                    // console.log(response.data.data)
                }).catch((errors) => {
                    console.log(errors)
                });
            },
            
            deleteCompany(){
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
                        axios.delete('api/v1/companies/' + this.selected[0].id).then((response) => {
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
                  onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                // this.currentPage = 1
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